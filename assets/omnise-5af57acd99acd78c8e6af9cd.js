/* 
  @Author Omnise
  @Description Slider vendor
  @Version 1.3 - Fixed: duplicate select handler, autoScroll listener leak,
                 closure width in updateUI, lastIndex reset, dead removeEventListener
*/
if (!window.omnise_slider) {
  window.omnise_slider = (wrapper) => {

    // =====================
    // Helper: Check if autoplay is allowed (read-only from parent window)
    // Returns true if disabledInspector is true (inspector disabled = autoplay allowed)
    // =====================
    function isAutoplayAllowed() {
      try {
        if (window.parent && window.parent !== window && window.parent.ebEditorState) {
          return window.parent.ebEditorState.disabledInspector === true;
        }
        if (window.top && window.top !== window && window.top.ebEditorState) {
          return window.top.ebEditorState.disabledInspector === true;
        }
        return true;
      } catch (e) {
        return true;
      }
    }

    // =====================
    // Local State
    // =====================
    let embla = null;
    let dots = [];
    let autoplayTimeout = null;
    let autoplayDelay = 3000;
    let lastStartTime = null;
    let remainingTime = null;
    let boundEmblaNode = null;
    let progressValue = 0;
    let progressRAF = null;
    let isHovering = false;
    let stopAtEnd = false;
    let isLockedByChildDrag = false;

    // =====================
    // AutoScroll State
    // =====================
    let autoScrollPlugin = null;
    let currentInitOptions = null;
    let currentInitPlugins = [];

    // =====================
    // Utils
    // =====================
    function isDraggingActive(node) {
      return !!node.querySelector('[data-omnise-dragging="true"]');
    }

    function parseTransition(value) {
      if (!value) return 3000;
      value = value.trim();
      if (value.endsWith("ms")) return parseFloat(value);
      if (value.endsWith("s")) return parseFloat(value) * 1000;
      return parseFloat(value);
    }

    function getItemsPerView(width, node) {
      const desktop = parseFloat(node.getAttribute("data-item") || 1);
      const tablet  = parseFloat(node.getAttribute("data-item-tablet") || 1);
      const mobile  = parseFloat(node.getAttribute("data-item-mobile") || 1);
      return width >= 1180 ? desktop : width >= 767.79 ? tablet : mobile;
    }

    function getPaginationViewWidth(node, defaultWidth = 80) {
      const raw = parseFloat(node.getAttribute("data-pagination-width"));
      return isNaN(raw) ? defaultWidth : raw;
    }

    function isSliderLayout(width, node) {
      const desktopLayout = node.getAttribute("data-desktop-layout");
      const tabletLayout  = node.getAttribute("data-tablet-layout");
      const mobileLayout  = node.getAttribute("data-mobile-layout");
      if (width >= 1180)   return desktopLayout === "slider";
      if (width >= 767.79) return (tabletLayout || desktopLayout) === "slider";
      return mobileLayout === "slider";
    }

    function blockInteractionWhenDragging(emblaNode) {
      const target = emblaNode.querySelector('.omnise-slider-items') || emblaNode;
      const handler = (e) => {
        if (isDraggingActive(emblaNode)) {
          e.preventDefault();
          e.stopPropagation();
        }
      };
      target.addEventListener("wheel",        handler, { passive: false });
      target.addEventListener("touchmove",    handler, { passive: false });
      target.addEventListener("pointermove",  handler, { passive: false });
    }

    // =====================
    // AutoScroll helpers
    // =====================
    function getAutoScrollPlugin(speed, stopOnInteraction, direction) {
      if (typeof EmblaCarouselAutoScroll !== "function") return null;
      return EmblaCarouselAutoScroll({ speed, stopOnInteraction, direction, playOnInit: true });
    }

    function buildEmblaPlugins(isFade, autoScrollEnabled, speed, direction, stopOnInteraction, axis) {
      let plugins = isFade ? [EmblaCarouselFade()] : [];
      if (autoScrollEnabled && isAutoplayAllowed()) {
        const resolvedDirection = direction;
        const scrollPlugin = getAutoScrollPlugin(speed, stopOnInteraction, resolvedDirection);
        if (scrollPlugin) plugins = [...plugins, scrollPlugin];
      }
      return plugins;
    }

    function ensureAutoScrollActive(emblaNode, emblaInstance, options, pluginList) {
      if (emblaNode.getAttribute("data-auto-scroll") !== "true") return;
      if (!isAutoplayAllowed()) return;
      if (typeof EmblaCarouselAutoScroll !== "function") return;

      const activate = () => {
        if (emblaInstance.scrollSnapList().length <= 1) return false;
        const pluginMap = emblaInstance.plugins?.() || {};
        if (!pluginMap.autoScroll) emblaInstance.reInit(options, pluginList);
        setupAutoScroll(emblaNode, emblaInstance);
        playAutoScroll();
        return true;
      };

      if (!activate()) {
        requestAnimationFrame(() => {
          if (!activate()) requestAnimationFrame(activate);
        });
      }
    }

    function setupAutoScroll(emblaNode, emblaInstance) {
      if (!emblaInstance) return;
      if (emblaNode.getAttribute("data-auto-scroll") !== "true") return;
      if (!isAutoplayAllowed()) return;

      const plugins = emblaInstance.plugins?.() || {};
      const scrollPlugin = plugins.autoScroll;
      if (!scrollPlugin) return;

      autoScrollPlugin = scrollPlugin;

      // FIX: guard against duplicate listener binding
      if (emblaNode.dataset.autoScrollBound === "true") return;
      emblaNode.dataset.autoScrollBound = "true";

      emblaNode.addEventListener("mouseenter", () => {
        scrollPlugin.stop();
        isHovering = true;
      });
      emblaNode.addEventListener("mouseleave", () => {
        isHovering = false;
        if (!isLockedByChildDrag) scrollPlugin.play();
      });
    }

    function stopAutoScroll() { autoScrollPlugin?.stop?.(); }
    function playAutoScroll() {
      if (!isHovering && !isLockedByChildDrag) autoScrollPlugin?.play?.();
    }

    // =====================
    // Autoplay
    // =====================
    function resetProgress() {
      progressValue = 0;
      updateProgressBarUI(0);
    }

    function animateProgressBar() {
      cancelAnimationFrame(progressRAF);
      const step = () => {
        if (!embla) return;
        const emblaNode = wrapper.querySelector(".omnise-slider-wrapper");
        if (!emblaNode) return;

        const isLoopEnabled   = embla.internalEngine()?.options?.loop;
        const selectedIndex   = embla.selectedScrollSnap();
        const totalSlides     = embla.slideNodes().length;
        const itemsPerView    = getItemsPerView(window.innerWidth, emblaNode);
        const isAtLastSlide   = selectedIndex >= totalSlides - itemsPerView;

        if (isHovering || stopAtEnd) {
          updateProgressBarUI(progressValue);
          progressRAF = requestAnimationFrame(step);
          return;
        }

        const elapsed = Date.now() - lastStartTime;
        progressValue = Math.min((elapsed / autoplayDelay) * 100, 100);
        updateProgressBarUI(progressValue);

        if (elapsed >= autoplayDelay) {
          if (!isLoopEnabled && isAtLastSlide) { stopAtEnd = true; return; }
          embla.scrollNext();
          lastStartTime = Date.now();
          progressValue = 0;
        }
        progressRAF = requestAnimationFrame(step);
      };
      progressRAF = requestAnimationFrame(step);
    }

    function updateProgressBarUI(value) {
      const emblaNode = wrapper.querySelector(".omnise-slider-wrapper");
      const controls  = wrapper.querySelector(".omnise-slider-controls");
      if (!emblaNode || !controls) return;
      const autoplayEnabled = emblaNode.getAttribute("data-play") === "true";
      controls.style.setProperty("--omnise-progress", autoplayEnabled ? `${value}` : "100");
    }

    function startAutoplay() {
      clearTimeout(autoplayTimeout);
      cancelAnimationFrame(progressRAF);
      lastStartTime = Date.now();
      progressValue = 0;
      stopAtEnd = false;
      animateProgressBar();
    }

    function pauseAutoplay() {
      clearTimeout(autoplayTimeout);
      cancelAnimationFrame(progressRAF);
      if (lastStartTime) {
        const elapsed = Date.now() - lastStartTime;
        remainingTime = Math.max(autoplayDelay - elapsed, 0);
        progressValue = (elapsed / autoplayDelay) * 100;
      }
    }

    function resumeAutoplay() {
      clearTimeout(autoplayTimeout);
      cancelAnimationFrame(progressRAF);
      lastStartTime = remainingTime != null
        ? Date.now() - (autoplayDelay - remainingTime)
        : Date.now();
      animateProgressBar();
    }

    function setupAutoplay(node, autoplay, delay) {
      if (boundEmblaNode) {
        boundEmblaNode.removeEventListener("mouseenter", onMouseEnterPause);
        boundEmblaNode.removeEventListener("mouseleave", onMouseLeaveResume);
        boundEmblaNode = null;
      }
      pauseAutoplay();
      cancelAnimationFrame(progressRAF);
      autoplayDelay = delay;
      progressValue = 0;
      stopAtEnd = false;

      if (autoplay && node && isAutoplayAllowed()) {
        startAutoplay();
        node.addEventListener("mouseenter", onMouseEnterPause);
        node.addEventListener("mouseleave", onMouseLeaveResume);
        boundEmblaNode = node;
      }
    }

    function onMouseEnterPause() { isHovering = true; pauseAutoplay(); }
    function onMouseLeaveResume() {
      isHovering = false;
      if (!stopAtEnd) resumeAutoplay();
    }

    // =====================
    // UI Helpers
    // =====================
    function updateSlideActive(itemsPerView, isFade) {
      if (!embla) return;
      const slides        = embla.slideNodes();
      const totalSlides   = slides.length;
      const selectedIndex = embla.selectedScrollSnap();
      const isLoop        = embla.internalEngine().options.loop;

      slides.forEach(s => s.classList.remove("active", "active-prev", "active-next", "active-main"));
      slides[selectedIndex]?.classList.add("active-main");

      if (isFade) {
        slides[selectedIndex]?.classList.add("active");
        slides[(selectedIndex - 1 + totalSlides) % totalSlides]?.classList.add("active-prev");
        slides[(selectedIndex + 1) % totalSlides]?.classList.add("active-next");
      } else {
        const activeIndexes = Array.from({ length: itemsPerView }, (_, i) =>
          isLoop ? (selectedIndex + i) % totalSlides : selectedIndex + i
        );
        const prevIndex = isLoop ? (selectedIndex - 1 + totalSlides) % totalSlides : selectedIndex - 1;
        const nextIndex = isLoop ? (selectedIndex + itemsPerView) % totalSlides   : selectedIndex + itemsPerView;
        slides.forEach((slide, index) => {
          if (activeIndexes.includes(index))  slide.classList.add("active");
          else if (index === prevIndex)        slide.classList.add("active-prev");
          else if (index === nextIndex)        slide.classList.add("active-next");
        });
      }
    }

    function createPagination(wrapper, emblaNode, paginationType, totalPages) {
      const paginationWrapper = wrapper.querySelector(".omnise-slider-pagination-wrapper");
      if (!paginationWrapper) return { dotsArr: [], paginationWrapperInner: null };
      paginationWrapper.innerHTML = "";

      let paginationWrapperInner = null;
      const enableSvg = paginationWrapper.dataset.paginationSvg === "true";

      const appendSvgToDot = (dot) => {
        if (!(paginationType === "dots" || paginationType === "numbers")) return;
        if (!enableSvg || dot.querySelector(".circular-progress")) return;
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "circular-progress");
        svg.setAttribute("aria-hidden", "true");
        svg.style.pointerEvents = "none";
        ["circular-progress__bg", "circular-progress__fg"].forEach(cls => {
          const circle = document.createElementNS(svgNS, "circle");
          circle.setAttribute("cx", "50");
          circle.setAttribute("cy", "50");
          circle.setAttribute("r",  "45");
          circle.setAttribute("class", cls);
          svg.appendChild(circle);
        });
        dot.appendChild(svg);
      };

      const makeDot = (i, parent) => {
        const dot = document.createElement("span");
        dot.className = "omnise-slider-pagination";
        if (paginationType === "numbers") dot.textContent = i + 1;
        dot.addEventListener("click", () => embla.scrollTo(i));
        parent.appendChild(dot);
        return dot;
      };

      let dotsArr;
      if (paginationType === "dynamic-dots") {
        paginationWrapper.style.cssText += ";position:relative;overflow:hidden;";
        paginationWrapper.style.width = `${getPaginationViewWidth(emblaNode)}px`;
        paginationWrapperInner = document.createElement("div");
        paginationWrapperInner.classList.add("pagination-bullets-dynamic");
        paginationWrapperInner.style.cssText = "display:flex;position:relative;transition:left 0.3s ease;";
        paginationWrapper.appendChild(paginationWrapperInner);
        dotsArr = Array.from({ length: totalPages }, (_, i) => makeDot(i, paginationWrapperInner));
      } else {
        paginationWrapper.style.width = "auto";
        dotsArr = Array.from({ length: totalPages }, (_, i) => {
          const dot = makeDot(i, paginationWrapper);
          appendSvgToDot(dot);
          return dot;
        });
      }

      return { dotsArr, paginationWrapperInner };
    }

    function updateProgress(wrapper, selectedIndex, totalPages) {
      const progressWrapper = wrapper.querySelector(".omnise-slider-pagination-progress");
      if (!progressWrapper) return;
      const progressEl = progressWrapper.querySelector("span");
      if (!progressEl) return;
      const type = progressWrapper.getAttribute("data-progress") || "grow";
      if (type === "slider") {
        const stepPercent = 100 / totalPages;
        progressEl.style.width = `${stepPercent}%`;
        progressEl.style.left  = `${selectedIndex * stepPercent}%`;
      } else {
        progressEl.style.width = `${((selectedIndex + 1) / totalPages) * 100}%`;
        progressEl.style.left  = "0";
      }
    }

    function bindDragLockWatcher(emblaNode, embla) {
      new MutationObserver(() => {
        const locked = isDraggingActive(emblaNode);
        isLockedByChildDrag = locked;
        if (locked) { pauseAutoplay(); stopAutoScroll(); }
        else         { resumeAutoplay(); playAutoScroll(); }
        if (embla && typeof embla.reInit === "function" && currentInitOptions) {
          embla.reInit(currentInitOptions, currentInitPlugins);
        }
      }).observe(emblaNode, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-omnise-dragging"],
      });
    }

    // =====================
    // Timeline Pagination
    // =====================
    function updateTimelinePagination(wrapper, selectedIndex) {
      const controlsWrp    = wrapper.querySelector(".omnise-slider-controls-wrp");
      const timelineWrapper = wrapper.querySelector(".omnise-timeline-pagination-wrp");
      if (!timelineWrapper) return;

      const items = timelineWrapper.querySelectorAll(".omnise-timeline-pagination");
      items.forEach((item, i) => {
        item.classList.remove("active", "prev");
        if (i === selectedIndex)      item.classList.add("active");
        else if (i < selectedIndex)   item.classList.add("prev");
      });

      // Scroll active item into center of controls wrapper (mobile auto-scroll)
      if (!controlsWrp) return;
      const activeItem = items[selectedIndex];
      if (!activeItem) return;
      const containerRect = controlsWrp.getBoundingClientRect();
      const itemRect      = activeItem.getBoundingClientRect();
      const scrollOffset  = controlsWrp.scrollLeft +
        (itemRect.left + itemRect.width / 2) - (containerRect.left + containerRect.width / 2);
      controlsWrp.scrollTo({ left: scrollOffset, behavior: "smooth" });
    }

    function setupTimelineProgress(wrapper, selectedIndex, totalPages) {
      const timelineWrapper = wrapper.querySelector(".omnise-timeline-pagination-wrp");
      if (!timelineWrapper) return;
      if (!wrapper.querySelector(".omnise-timeline-pagination-progress span")) return;
      // index 0 → 0%, last index → 100%
      const percent = totalPages <= 1 ? 0 : (selectedIndex / (totalPages - 1)) * 100;
      timelineWrapper.style.setProperty("--omnise-transform", `${percent}%`);
    }

    function bindTimelinePaginationClick(wrapper) {
      const timelineWrapper = wrapper.querySelector(".omnise-timeline-pagination-wrp");
      if (!timelineWrapper || timelineWrapper.dataset.timelineBound === "true") return;
      timelineWrapper.querySelectorAll(".omnise-timeline-pagination").forEach((item, i) => {
        item.addEventListener("click", () => embla?.scrollTo(i));
      });
      timelineWrapper.dataset.timelineBound = "true";
    }

    function resetTimelineBound(wrapper) {
      const tw = wrapper.querySelector(".omnise-timeline-pagination-wrp");
      if (tw) delete tw.dataset.timelineBound;
    }

    // =====================
    // Main Init
    // =====================
    function initSlider() {
      const emblaNode = wrapper.querySelector(".omnise-slider-wrapper");
      if (!emblaNode) return;
      const width = window.innerWidth;

      // Non-slider layout — clean up and exit
      if (!isSliderLayout(width, emblaNode)) {
        embla?.destroy();
        embla = null;
        autoScrollPlugin = null;
        wrapper.querySelector(".omnise-slider-pagination-wrapper")?.replaceChildren();
        const controls = wrapper.querySelector(".omnise-slider-controls");
        controls?.removeAttribute("show-desktop");
        controls?.removeAttribute("show-tablet");
        controls?.removeAttribute("show-mobile");
        setupAutoplay(null, false, 3000);
        return;
      }

      // Config
      const slidesToScrollRaw = parseInt(emblaNode.getAttribute("data-scroll") || "1", 10);
      const alignValue        = emblaNode.getAttribute("data-align") || "start";
      const paginationType    = emblaNode.getAttribute("data-pagination") || "dots";
      const autoplay          = emblaNode.getAttribute("data-play") === "true";
      const transition        = parseTransition(emblaNode.getAttribute("data-transition"));
      const isFade            = (emblaNode.getAttribute("data-effect") || "slide") === "fade";
      const isSlideshow       = wrapper.getAttribute("data-bnode-icon") === "slideshow";

      // AutoScroll config
      const autoScrollEnabled          = emblaNode.getAttribute("data-auto-scroll") === "true";
      const autoScrollSpeed            = parseFloat(emblaNode.getAttribute("data-auto-scroll-speed") || "1");
      const autoScrollDirection        = emblaNode.getAttribute("data-auto-scroll-direction") || "forward";
      const autoScrollStopOnInteraction = emblaNode.getAttribute("data-auto-scroll-stop-on-interaction") !== "false";

      let itemsPerView    = getItemsPerView(width, emblaNode);
      const slidesToScroll = isFade ? 1 : Math.min(slidesToScrollRaw, itemsPerView);
      const items          = emblaNode.querySelectorAll(".omnise-slider-item");
      const totalItems     = items.length;
      const itemLast       = items[items.length - 1];

      let isLoop = emblaNode.getAttribute("data-loop") === "true";
      if (totalItems <= itemsPerView) isLoop = false;
      itemLast.style.marginRight = isLoop ? "" : "0px";
      emblaNode.setAttribute("data-init-loop", isLoop);

      // Determine axis
      const mediaProduct    = wrapper.closest('.omnise-media-product') || wrapper.querySelector('.omnise-media-product');
      const isThumb         = ['omnise-product-media-thumbs', 'omnise-product-thumb-slide'].some(c => emblaNode.classList.contains(c));
      const pos             = mediaProduct?.dataset?.positionThumbs;
      const isVerticalThumb = isThumb && width > 767.79 && (pos === 'left' || pos === 'right');
      const axis            = isThumb ? (isVerticalThumb ? 'y' : 'x') : (emblaNode.getAttribute('data-axis') || 'x');
      emblaNode.setAttribute("data-axis", axis);

      // FIX: call once, use result for both draggable & watchDrag
      const autoplayAllowed = isAutoplayAllowed();
      const options = {
        loop: isLoop,
        slidesToScroll,
        draggable:      autoplayAllowed && !isFade,
        watchDrag:      autoplayAllowed,
        dragFree:       false,
        containScroll:  isFade ? false : "trimSnaps",
        align:          alignValue,
        axis,
      };

      const plugins = buildEmblaPlugins(
        isFade, autoScrollEnabled, autoScrollSpeed,
        autoScrollDirection, autoScrollStopOnInteraction, axis
      );
      currentInitOptions = options;
      currentInitPlugins = plugins;

      // Vertical axis styles
      const itemsNode = emblaNode.querySelector('.omnise-slider-items');
      if (itemsNode) {
        const isVertical = axis === 'y';
        Object.assign(itemsNode.style, {
          flexDirection: isVertical ? 'column' : '',
          marginLeft:    isVertical ? '0' : '',
        });
        itemsNode.querySelectorAll('.omnise-slider-item').forEach(item => {
          Object.assign(item.style, {
            paddingLeft: isVertical ? '0' : '',
            flex:        isVertical ? '0 0 auto' : '',
            width:       isVertical ? '100%' : '',
          });
        });
      }

      // Init or reInit embla
      if (embla) {
        embla.reInit(options, plugins);
      } else {
        embla = EmblaCarousel(emblaNode, options, plugins);
        blockInteractionWhenDragging(emblaNode);
        bindDragLockWatcher(emblaNode, embla);
        embla.on("init", () => ensureAutoScrollActive(emblaNode, embla, options, plugins));
      }
      wrapper.embla = embla;

      if (autoScrollEnabled) {
        ensureAutoScrollActive(emblaNode, embla, options, plugins);
      } else {
        autoScrollPlugin = null;
      }

      // FIX: off previous select handler before binding new one
      // lastIndex lives outside so it persists correctly across reInits
      embla.off("select", onSliderSelect);
      embla.on("select",  onSliderSelect);

      function onSliderSelect() {
        if (isLockedByChildDrag) {
          embla.scrollTo(embla.selectedScrollSnap(), true);
          return;
        }

        const itemsNode          = emblaNode.querySelector('.omnise-slider-items');
        const selectedIndex      = embla.selectedScrollSnap();
        const totalSlides        = embla.slideNodes().length;
        const currentWidth       = Math.floor(window.innerWidth);
        const currentItemsPerView = getItemsPerView(currentWidth, emblaNode);

        if (itemsNode && !autoplayAllowed) {
          itemsNode.style.marginTop = '1px';
          const handleSettle = () => {
            itemsNode.style.marginTop = '';
            if (isSlideshow && currentItemsPerView <= 1 && !emblaNode.closest('.omnise-product-media-main')) {
              const rect    = emblaNode.getBoundingClientRect();
              const offset  = 10;
              const centerX = rect.right - offset;
              const centerY = rect.top + offset;
              const target  = document.elementFromPoint(centerX, centerY);
              if (target) {
                const slideItem = target.closest('.omnise-slider-item') || target;
                const opts = { view: window, bubbles: true, cancelable: true, clientX: centerX, clientY: centerY };
                slideItem.dispatchEvent(new MouseEvent('mousedown', opts));
                slideItem.dispatchEvent(new MouseEvent('mouseup',   opts));
                slideItem.dispatchEvent(new MouseEvent('click',     opts));
              }
            }
            embla.off("settle", handleSettle);
          };
          embla.on("settle", handleSettle);
        }

        emblaNode.setAttribute("data-dir", selectedIndex > lastIndex ? "left" : "right");

        if (stopAtEnd && selectedIndex < totalSlides - currentItemsPerView) {
          stopAtEnd = false;
          resumeAutoplay();
          animateProgressBar();
        }

        remainingTime = autoplayDelay;
        lastStartTime = Date.now();
        lastIndex     = selectedIndex;
        resetProgress();
      }

      // Pagination setup
      if (isFade) itemsPerView = 1;
      const getTotalPages = () => embla.scrollSnapList().length;
      let { dotsArr, paginationWrapperInner } = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
      dots = dotsArr;

      // =====================
      // Update UI
      // =====================
      function updateUI() {
        const selectedIndex = embla.selectedScrollSnap();
        const totalPages    = getTotalPages();
        // FIX: read current width, not closure width from initSlider
        const currentWidth  = window.innerWidth;

        // Counter
        const paginationTotalEl = wrapper.querySelector(".omnise-slider-pagination-total span");
        if (paginationTotalEl) paginationTotalEl.textContent = `${selectedIndex + 1}/${totalPages}`;

        // Dots
        wrapper.querySelectorAll(".omnise-slider-pagination").forEach((dot, i) => {
          dot.className = "omnise-slider-pagination";
          if      (i === selectedIndex)     dot.classList.add("active");
          else if (i === selectedIndex - 1) dot.classList.add("prev");
          else if (i === selectedIndex - 2) dot.classList.add("prev-prev");
          else if (i === selectedIndex + 1) dot.classList.add("next");
          else if (i === selectedIndex + 2) dot.classList.add("next-next");
        });

        updateProgress(wrapper, selectedIndex, totalPages);

        // Dynamic dots move
        if (paginationType === "dynamic-dots" && paginationWrapperInner) {
          const realDots = wrapper.querySelectorAll(".omnise-slider-pagination");
          if (realDots.length) {
            const style    = getComputedStyle(realDots[0]);
            const DOT_FULL = (parseFloat(style.width) || 0) + (parseFloat(style.marginLeft) || 0) * 2;
            const offset   = DOT_FULL * 2 - selectedIndex * DOT_FULL;
            realDots.forEach(dot => { dot.style.left = `${offset}px`; });
          }
        }

        // Controls visibility
        const controls = wrapper.querySelector(".omnise-slider-controls");
        setTimeout(() => {
          if (!controls) return;
          controls.removeAttribute("show-desktop");
          controls.removeAttribute("show-tablet");
          controls.removeAttribute("show-mobile");
          if      (currentWidth >= 1180 && totalItems > getItemsPerView(1180,   emblaNode)) controls.setAttribute("show-desktop", "true");
          else if (currentWidth >= 767  && currentWidth <= 1180 && totalItems > getItemsPerView(767.79, emblaNode)) controls.setAttribute("show-tablet",  "true");
          else if (currentWidth <= 767  && totalItems > getItemsPerView(375,    emblaNode)) controls.setAttribute("show-mobile",  "true");
          controls.style.setProperty("--height-controls", `${controls.offsetHeight}px`);
        }, 100);

        // Nav buttons
        const btnPrev = wrapper.querySelector(".omnise-slider-nav-left");
        const btnNext = wrapper.querySelector(".omnise-slider-nav-right");
        if (btnPrev) { btnPrev.disabled = !embla.canScrollPrev(); btnPrev.classList.toggle("disabled", !embla.canScrollPrev()); }
        if (btnNext) { btnNext.disabled = !embla.canScrollNext(); btnNext.classList.toggle("disabled", !embla.canScrollNext()); }

        // Timeline
        updateTimelinePagination(wrapper, selectedIndex);
        setupTimelineProgress(wrapper, selectedIndex, totalPages);

        updateSlideActive(itemsPerView, isFade);
      }

      // Nav button listeners (bind once)
      const btnPrev = wrapper.querySelector(".omnise-slider-nav-left");
      const btnNext = wrapper.querySelector(".omnise-slider-nav-right");
      if (btnPrev && !btnPrev.dataset.hasListener) {
        btnPrev.addEventListener("click", () => embla?.scrollPrev());
        btnPrev.dataset.hasListener = "true";
      }
      if (btnNext && !btnNext.dataset.hasListener) {
        btnNext.addEventListener("click", () => embla?.scrollNext());
        btnNext.dataset.hasListener = "true";
      }

      embla.off("select", updateUI);
      embla.on("select",  updateUI);

      embla.on("reInit", () => {
        blockInteractionWhenDragging(emblaNode);
        setupAutoplay(
          embla.containerNode(),
          embla.containerNode().getAttribute("data-play") === "true",
          parseTransition(embla.containerNode().getAttribute("data-transition"))
        );
        if (autoScrollEnabled) { setupAutoScroll(emblaNode, embla); playAutoScroll(); }
        resetProgress();

        // FIX: dots cleanup — removeEventListener with anonymous fn is a no-op,
        // createPagination already does innerHTML="" so just reset the array
        dots = [];
        const result = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
        dots = result.dotsArr;
        paginationWrapperInner = result.paginationWrapperInner;

        resetTimelineBound(wrapper);
        bindTimelinePaginationClick(wrapper);
        updateTimelinePagination(wrapper, embla.selectedScrollSnap());
        setupTimelineProgress(wrapper, embla.selectedScrollSnap(), getTotalPages());

        updateUI();
      });

      // Inspector state change handler
      function handleInspectorStateChange() {
        const shouldAutoplay  = emblaNode.getAttribute("data-play") === "true";
        const allowed         = isAutoplayAllowed();
        const newOptions      = { ...options, draggable: allowed && !isFade, watchDrag: allowed };
        const freshPlugins    = buildEmblaPlugins(
          isFade, autoScrollEnabled, autoScrollSpeed,
          autoScrollDirection, autoScrollStopOnInteraction, axis
        );
        currentInitOptions = newOptions;
        currentInitPlugins = freshPlugins;
        embla.reInit(newOptions, freshPlugins);
        setupAutoplay(emblaNode, shouldAutoplay && allowed, parseTransition(emblaNode.getAttribute("data-transition")));
        if (autoScrollEnabled) {
          if (allowed) ensureAutoScrollActive(emblaNode, embla, newOptions, freshPlugins);
          else         stopAutoScroll();
        }
      }
      window.addEventListener("omnise-inspector-state-change", handleInspectorStateChange);

      setupAutoplay(emblaNode, autoplay, transition);
      bindTimelinePaginationClick(wrapper);
      resetProgress();
      updateUI();

      // =====================
      // Thumbnails
      // =====================
      if (wrapper.emblaThumb) { wrapper.emblaThumb.destroy(); wrapper.emblaThumb = null; }

      function initEmblaThumbs(wrapper) {
        const mediaProduct  = wrapper.querySelector('.omnise-media-product');
        const emblaThumbNode = wrapper.querySelector('.omnise-product-thumb-slide');
        if (!emblaThumbNode) return;

        const vw = window.innerWidth;
        const isVertical = vw > 1180
          ? mediaProduct?.dataset.positionThumbs !== 'bottom'
          : vw > 767
            ? mediaProduct?.dataset.positionThumbsTablet !== 'bottom'
            : false;

        if (wrapper.emblaThumb) { wrapper.emblaThumb.destroy(); wrapper.emblaThumb = null; }

        const emblaThumb = EmblaCarousel(emblaThumbNode, {
          dragFree:      true,
          containScroll: 'keepSnaps',
          selectedClass: 'is-active',
          align:         emblaNode.getAttribute("data-align") || "start",
          axis:          isVertical ? 'y' : 'x',
        });
        wrapper.emblaThumb = emblaThumb;

        const syncThumbs = () => {
          const index = wrapper.embla.selectedScrollSnap();
          emblaThumb.slideNodes().forEach((thumb, i) => thumb.classList.toggle('is-active', i === index));
          emblaThumb.scrollTo(index);
        };
        wrapper.embla.on('select', syncThumbs);
        syncThumbs();
        emblaThumb.slideNodes().forEach((thumb, i) => {
          thumb.addEventListener('click', () => wrapper.embla.scrollTo(i));
        });
      }

      initEmblaThumbs(wrapper);
      let thumbResizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(thumbResizeTimer);
        thumbResizeTimer = setTimeout(() => initEmblaThumbs(wrapper), 300);
      });

      // =====================
      // Editor support
      // =====================
      function attachActivatedObserver(embla) {
        const slideNodes = embla.slideNodes();
        if (!slideNodes.length) return;
        new MutationObserver(mutations => {
          for (const m of mutations) {
            if (m.attributeName === "data-omnise-block-activated" &&
                m.target.getAttribute("data-omnise-block-activated") === "true") {
              const index = Array.from(slideNodes).indexOf(m.target);
              if (index !== -1) embla.scrollTo(index, true);
            }
          }
        }).observe(emblaNode, {   // observe container so new slides are covered
          subtree: true,
          attributes: true,
          attributeFilter: ["data-omnise-block-activated"],
        });
      }

      function observeItemReorder(embla, container) {
        let debounceTimer = null;
        new MutationObserver(() => {
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => attachActivatedObserver(embla), 1000);
        }).observe(container, { childList: true, subtree: true });
      }

      attachActivatedObserver(embla);
      observeItemReorder(embla, embla.containerNode());
    }

    // =====================
    // Shared lastIndex (outside initSlider so it persists across reInits)
    // =====================
    let lastIndex = 0;

    // =====================
    // Resize debounce
    // =====================
    let resizeTimeout;
    let lastWidth = window.innerWidth;
    const emblaNodeObserver = wrapper.querySelector(".omnise-slider-wrapper");

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentWidth = window.innerWidth;
        if (Math.abs(currentWidth - lastWidth) >= 100) {
          if (emblaNodeObserver) {
            const hasActivated = emblaNodeObserver.querySelector('[data-omnise-block-activated]');
            if (hasActivated) {
              setTimeout(() => {
                const activeItem = emblaNodeObserver.querySelector(".omnise-slider-item.active");
                if (activeItem) activeItem.click();
              }, 50);
            }
          }
          initSlider();
          lastWidth = currentWidth;
        }
      }, 100);
    });

    // =====================
    // Mutation observer for attrs
    // =====================
    if (emblaNodeObserver) {
      const watchedAttrs = [
        "data-loop", "data-effect", "data-align", "data-scroll",
        "data-pagination-width", "data-pagination", "data-navigation",
        "data-item", "data-item-table", "data-item-mobile",
        "data-play", "data-transition",
        "data-desktop-layout", "data-tablet-layout", "data-mobile-layout",
        "data-position-thumbs", "data-position-thumbs-tablet",
        "data-auto-scroll", "data-auto-scroll-speed",
        "data-auto-scroll-direction", "data-auto-scroll-stop-on-interaction",
      ];
      new MutationObserver(mutations => {
        if (mutations.some(m => watchedAttrs.includes(m.attributeName))) initSlider();
      }).observe(emblaNodeObserver, { attributes: true });
    }

    const mediaProductEl = wrapper.closest('.omnise-media-product') || wrapper.querySelector('.omnise-media-product');
    if (mediaProductEl) {
      new MutationObserver(mutations => {
        for (const m of mutations) {
          if (m.attributeName === 'data-position-thumbs' || m.attributeName === 'data-position-thumbs-tablet') {
            initSlider();
          }
        }
      }).observe(mediaProductEl, {
        attributes: true,
        attributeFilter: ['data-position-thumbs', 'data-position-thumbs-tablet'],
      });
    }

    initSlider();
  };
}


!function (n, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = "undefined" != typeof globalThis ? globalThis : n || self).EmblaCarousel = t() }(this, (function () { "use strict"; function n(n) { return "number" == typeof n } function t(n) { return "string" == typeof n } function e(n) { return "boolean" == typeof n } function r(n) { return "[object Object]" === Object.prototype.toString.call(n) } function o(n) { return Math.abs(n) } function i(n) { return Math.sign(n) } function c(n, t) { return o(n - t) } function u(n) { return f(n).map(Number) } function s(n) { return n[a(n)] } function a(n) { return Math.max(0, n.length - 1) } function d(n, t) { return t === a(n) } function l(n, t = 0) { return Array.from(Array(n), ((n, e) => t + e)) } function f(n) { return Object.keys(n) } function p(n, t) { return [n, t].reduce(((n, t) => (f(t).forEach((e => { const o = n[e], i = t[e], c = r(o) && r(i); n[e] = c ? p(o, i) : i })), n)), {}) } function m(n, t) { return void 0 !== t.MouseEvent && n instanceof t.MouseEvent } function g() { let n = []; const t = { add: function (e, r, o, i = { passive: !0 }) { let c; if ("addEventListener" in e) e.addEventListener(r, o, i), c = () => e.removeEventListener(r, o, i); else { const n = e; n.addListener(o), c = () => n.removeListener(o) } return n.push(c), t }, clear: function () { n = n.filter((n => n())) } }; return t } function h(n, t, e, r) { const o = g(), i = 1e3 / 60; let c = null, u = 0, s = 0; function a(n) { if (!s) return; c || (c = n, e(), e()); const o = n - c; for (c = n, u += o; u >= i;)e(), u -= i; r(u / i), s && (s = t.requestAnimationFrame(a)) } function d() { t.cancelAnimationFrame(s), c = null, u = 0, s = 0 } return { init: function () { o.add(n, "visibilitychange", (() => { n.hidden && (c = null, u = 0) })) }, destroy: function () { d(), o.clear() }, start: function () { s || (s = t.requestAnimationFrame(a)) }, stop: d, update: e, render: r } } function x(n = 0, t = 0) { const e = o(n - t); function r(t) { return t < n } function i(n) { return n > t } function c(n) { return r(n) || i(n) } return { length: e, max: t, min: n, constrain: function (e) { return c(e) ? r(e) ? n : t : e }, reachedAny: c, reachedMax: i, reachedMin: r, removeOffset: function (n) { return e ? n - e * Math.ceil((n - t) / e) : n } } } function y(n, t, e) { const { constrain: r } = x(0, n), i = n + 1; let c = u(t); function u(n) { return e ? o((i + n) % i) : r(n) } function s() { return c } function a() { return y(n, s(), e) } const d = { get: s, set: function (n) { return c = u(n), d }, add: function (n) { return a().set(s() + n) }, clone: a }; return d } function v(n, t, r, u, s, a, d, l, f, p, h, y, v, b, S, w, E, L, D) { const { cross: I, direction: M } = n, A = ["INPUT", "SELECT", "TEXTAREA"], F = { passive: !1 }, T = g(), O = g(), P = x(50, 225).constrain(b.measure(20)), z = { mouse: 300, touch: 400 }, H = { mouse: 500, touch: 600 }, k = S ? 43 : 25; let V = !1, B = 0, C = 0, N = !1, R = !1, j = !1, G = !1; function q(n) { if (!m(n, u) && n.touches.length >= 2) return U(n); const t = a.readPoint(n), e = a.readPoint(n, I), r = c(t, B), o = c(e, C); if (!R && !G) { if (!n.cancelable) return U(n); if (R = r > o, !R) return U(n) } const i = a.pointerMove(n); r > w && (j = !0), p.useFriction(.3).useDuration(.75), l.start(), s.add(M(i)), n.preventDefault() } function U(n) { const t = h.byDistance(0, !1).index !== y.get(), e = a.pointerUp(n) * (S ? H : z)[G ? "mouse" : "touch"], r = function (n, t) { const e = y.add(-1 * i(n)), r = h.byDistance(n, !S).distance; return S || o(n) < P ? r : E && t ? .5 * r : h.byIndex(e.get(), 0).distance }(M(e), t), u = function (n, t) { if (0 === n || 0 === t) return 0; if (o(n) <= o(t)) return 0; const e = c(o(n), o(t)); return o(e / n) }(e, r), s = k - 10 * u, d = L + u / 50; R = !1, N = !1, O.clear(), p.useDuration(s).useFriction(d), f.distance(r, !S), G = !1, v.emit("pointerUp") } function W(n) { j && (n.stopPropagation(), n.preventDefault(), j = !1) } return { init: function (n) { if (!D) return; function o(o) { (e(D) || D(n, o)) && function (n) { const e = m(n, u); if (G = e, j = S && e && !n.buttons && V, V = c(s.get(), d.get()) >= 2, e && 0 !== n.button) return; if (function (n) { const t = n.nodeName || ""; return A.includes(t) }(n.target)) return; N = !0, a.pointerDown(n), p.useFriction(0).useDuration(0), s.set(d), function () { const n = G ? r : t; O.add(n, "touchmove", q, F).add(n, "touchend", U).add(n, "mousemove", q, F).add(n, "mouseup", U) }(), B = a.readPoint(n), C = a.readPoint(n, I), v.emit("pointerDown") }(o) } const i = t; T.add(i, "dragstart", (n => n.preventDefault()), F).add(i, "touchmove", (() => { }), F).add(i, "touchend", (() => { })).add(i, "touchstart", o).add(i, "mousedown", o).add(i, "touchcancel", U).add(i, "contextmenu", U).add(i, "click", W, !0) }, destroy: function () { T.clear(), O.clear() }, pointerDown: function () { return N } } } function b(n, t) { let e, r; function i(n) { return n.timeStamp } function c(e, r) { const o = "client" + ("x" === (r || n.scroll) ? "X" : "Y"); return (m(e, t) ? e : e.touches[0])[o] } return { pointerDown: function (n) { return e = n, r = n, c(n) }, pointerMove: function (n) { const t = c(n) - c(r), o = i(n) - i(e) > 170; return r = n, o && (e = n), t }, pointerUp: function (n) { if (!e || !r) return 0; const t = c(r) - c(e), u = i(n) - i(e), s = i(n) - i(r) > 170, a = t / u; return u && !s && o(a) > .1 ? a : 0 }, readPoint: c } } function S(n, t, r, i, c, u, s) { const a = [n].concat(i); let d, l, f = [], p = !1; function m(n) { return c.measureSize(s.measure(n)) } return { init: function (c) { u && (l = m(n), f = i.map(m), d = new ResizeObserver((r => { (e(u) || u(c, r)) && function (e) { for (const r of e) { if (p) return; const e = r.target === n, u = i.indexOf(r.target), s = e ? l : f[u]; if (o(m(e ? n : i[u]) - s) >= .5) { c.reInit(), t.emit("resize"); break } } }(r) })), r.requestAnimationFrame((() => { a.forEach((n => d.observe(n))) }))) }, destroy: function () { p = !0, d && d.disconnect() } } } function w(n, t, e, r, i) { const c = i.measure(10), u = i.measure(50), s = x(.1, .99); let a = !1; function d() { return !a && (!!n.reachedAny(e.get()) && !!n.reachedAny(t.get())) } return { shouldConstrain: d, constrain: function (i) { if (!d()) return; const a = n.reachedMin(t.get()) ? "min" : "max", l = o(n[a] - t.get()), f = e.get() - t.get(), p = s.constrain(l / u); e.subtract(f * p), !i && o(f) < c && (e.set(n.constrain(e.get())), r.useDuration(25).useBaseFriction()) }, toggleActive: function (n) { a = !n } } } function E(n, t, e, r) { const o = t.min + .1, i = t.max + .1, { reachedMin: c, reachedMax: u } = x(o, i); return { loop: function (t) { if (!function (n) { return 1 === n ? u(e.get()) : -1 === n && c(e.get()) }(t)) return; const o = n * (-1 * t); r.forEach((n => n.add(o))) } } } function L(n, t, e, r, c) { const { reachedAny: u, removeOffset: a, constrain: d } = r; function l(n) { return n.concat().sort(((n, t) => o(n) - o(t)))[0] } function f(t, r) { const o = [t, t + e, t - e]; if (!n) return t; if (!r) return l(o); const c = o.filter((n => i(n) === r)); return c.length ? l(c) : s(o) - e } return { byDistance: function (e, r) { const i = c.get() + e, { index: s, distance: l } = function (e) { const r = n ? a(e) : d(e), i = t.map(((n, t) => ({ diff: f(n - r, 0), index: t }))).sort(((n, t) => o(n.diff) - o(t.diff))), { index: c } = i[0]; return { index: c, distance: r } }(i), p = !n && u(i); return !r || p ? { index: s, distance: e } : { index: s, distance: e + f(t[s] - l, 0) } }, byIndex: function (n, e) { return { index: n, distance: f(t[n] - c.get(), e) } }, shortcut: f } } function D(t, r, o, i, c, u, s, a) { const d = { passive: !0, capture: !0 }; let l = 0; function f(n) { "Tab" === n.code && (l = (new Date).getTime()) } return { init: function (p) { a && (u.add(document, "keydown", f, !1), r.forEach(((r, f) => { u.add(r, "focus", (r => { (e(a) || a(p, r)) && function (e) { if ((new Date).getTime() - l > 10) return; s.emit("slideFocusStart"), t.scrollLeft = 0; const r = o.findIndex((n => n.includes(e))); n(r) && (c.useDuration(0), i.index(r, 0), s.emit("slideFocus")) }(f) }), d) }))) } } } function I(t) { let e = t; function r(t) { return n(t) ? t : t.get() } return { get: function () { return e }, set: function (n) { e = r(n) }, add: function (n) { e += r(n) }, subtract: function (n) { e -= r(n) } } } function M(n, t) { const e = "x" === n.scroll ? function (n) { return `translate3d(${n}px,0px,0px)` } : function (n) { return `translate3d(0px,${n}px,0px)` }, r = t.style; let o = null, i = !1; return { clear: function () { i || (r.transform = "", t.getAttribute("style") || t.removeAttribute("style")) }, to: function (t) { if (i) return; const c = (u = n.direction(t), Math.round(100 * u) / 100); var u; c !== o && (r.transform = e(c), o = c) }, toggleActive: function (n) { i = !n } } } function A(n, t, e, r, o, i, c, s, a) { const d = .5, l = u(o), f = u(o).reverse(), p = function () { const n = c[0]; return h(g(f, n), e, !1) }().concat(function () { const n = t - c[0] - 1; return h(g(l, n), -e, !0) }()); function m(n, t) { return n.reduce(((n, t) => n - o[t]), t) } function g(n, t) { return n.reduce(((n, e) => m(n, t) > 0 ? n.concat([e]) : n), []) } function h(o, c, u) { const l = function (n) { return i.map(((e, o) => ({ start: e - r[o] + d + n, end: e + t - d + n }))) }(c); return o.map((t => { const r = u ? 0 : -e, o = u ? e : 0, i = u ? "end" : "start", c = l[t][i]; return { index: t, loopPoint: c, slideLocation: I(-1), translate: M(n, a[t]), target: () => s.get() > c ? r : o } })) } return { canLoop: function () { return p.every((({ index: n }) => m(l.filter((t => t !== n)), t) <= .1)) }, clear: function () { p.forEach((n => n.translate.clear())) }, loop: function () { p.forEach((n => { const { target: t, translate: e, slideLocation: r } = n, o = t(); o !== r.get() && (e.to(o), r.set(o)) })) }, loopPoints: p } } function F(n, t, r) { let o, i = !1; return { init: function (c) { r && (o = new MutationObserver((n => { i || (e(r) || r(c, n)) && function (n) { for (const e of n) if ("childList" === e.type) { c.reInit(), t.emit("slidesChanged"); break } }(n) })), o.observe(n, { childList: !0 })) }, destroy: function () { o && o.disconnect(), i = !0 } } } function T(n, t, e, r) { const o = {}; let i, c = null, u = null, s = !1; return { init: function () { i = new IntersectionObserver((n => { s || (n.forEach((n => { const e = t.indexOf(n.target); o[e] = n })), c = null, u = null, e.emit("slidesInView")) }), { root: n.parentElement, threshold: r }), t.forEach((n => i.observe(n))) }, destroy: function () { i && i.disconnect(), s = !0 }, get: function (n = !0) { if (n && c) return c; if (!n && u) return u; const t = function (n) { return f(o).reduce(((t, e) => { const r = parseInt(e), { isIntersecting: i } = o[r]; return (n && i || !n && !i) && t.push(r), t }), []) }(n); return n && (c = t), n || (u = t), t } } } function O(t, e, r, i, c, d, l, f, p) { const { startEdge: m, endEdge: g, direction: h } = t, x = n(r); return { groupSlides: function (n) { return x ? function (n, t) { return u(n).filter((n => n % t == 0)).map((e => n.slice(e, e + t))) }(n, r) : function (n) { return n.length ? u(n).reduce(((t, r, u) => { const x = s(t) || 0, y = 0 === x, v = r === a(n), b = c[m] - d[x][m], S = c[m] - d[r][g], w = !i && y ? h(l) : 0, E = o(S - (!i && v ? h(f) : 0) - (b + w)); return u && E > e + p && t.push(r), v && t.push(n.length), t }), []).map(((t, e, r) => { const o = Math.max(r[e - 1] || 0); return n.slice(o, t) })) : [] }(n) } } } function P(n, e, r, f, p, m, P) { const { align: z, axis: H, direction: k, startIndex: V, loop: B, duration: C, dragFree: N, dragThreshold: R, inViewThreshold: j, slidesToScroll: G, skipSnaps: q, containScroll: U, watchResize: W, watchSlides: $, watchDrag: Q, watchFocus: X } = m, Y = { measure: function (n) { const { offsetTop: t, offsetLeft: e, offsetWidth: r, offsetHeight: o } = n; return { top: t, right: e + r, bottom: t + o, left: e, width: r, height: o } } }, J = Y.measure(e), K = r.map(Y.measure), Z = function (n, t) { const e = "rtl" === t, r = "y" === n, o = !r && e ? -1 : 1; return { scroll: r ? "y" : "x", cross: r ? "x" : "y", startEdge: r ? "top" : e ? "right" : "left", endEdge: r ? "bottom" : e ? "left" : "right", measureSize: function (n) { const { height: t, width: e } = n; return r ? t : e }, direction: function (n) { return n * o } } }(H, k), _ = Z.measureSize(J), nn = function (n) { return { measure: function (t) { return n * (t / 100) } } }(_), tn = function (n, e) { const r = { start: function () { return 0 }, center: function (n) { return o(n) / 2 }, end: o }; function o(n) { return e - n } return { measure: function (o, i) { return t(n) ? r[n](o) : n(e, o, i) } } }(z, _), en = !B && !!U, rn = B || !!U, { slideSizes: on, slideSizesWithGaps: cn, startGap: un, endGap: sn } = function (n, t, e, r, i, c) { const { measureSize: u, startEdge: a, endEdge: l } = n, f = e[0] && i, p = function () { if (!f) return 0; const n = e[0]; return o(t[a] - n[a]) }(), m = function () { if (!f) return 0; const n = c.getComputedStyle(s(r)); return parseFloat(n.getPropertyValue(`margin-${l}`)) }(), g = e.map(u), h = e.map(((n, t, e) => { const r = !t, o = d(e, t); return r ? g[t] + p : o ? g[t] + m : e[t + 1][a] - n[a] })).map(o); return { slideSizes: g, slideSizesWithGaps: h, startGap: p, endGap: m } }(Z, J, K, r, rn, p), an = O(Z, _, G, B, J, K, un, sn, 2), { snaps: dn, snapsAligned: ln } = function (n, t, e, r, i) { const { startEdge: c, endEdge: u } = n, { groupSlides: a } = i, d = a(r).map((n => s(n)[u] - n[0][c])).map(o).map(t.measure), l = r.map((n => e[c] - n[c])).map((n => -o(n))), f = a(l).map((n => n[0])).map(((n, t) => n + d[t])); return { snaps: l, snapsAligned: f } }(Z, tn, J, K, an), fn = -s(dn) + s(cn), { snapsContained: pn, scrollContainLimit: mn } = function (n, t, e, r, o) { const i = x(-t + n, 0), u = e.map(((n, t) => { const { min: r, max: o } = i, c = i.constrain(n), u = !t, s = d(e, t); return u ? o : s || l(r, c) ? r : l(o, c) ? o : c })).map((n => parseFloat(n.toFixed(3)))), a = function () { const n = u[0], t = s(u); return x(u.lastIndexOf(n), u.indexOf(t) + 1) }(); function l(n, t) { return c(n, t) <= 1 } return { snapsContained: function () { if (t <= n + o) return [i.max]; if ("keepSnaps" === r) return u; const { min: e, max: c } = a; return u.slice(e, c) }(), scrollContainLimit: a } }(_, fn, ln, U, 2), gn = en ? pn : ln, { limit: hn } = function (n, t, e) { const r = t[0]; return { limit: x(e ? r - n : s(t), r) } }(fn, gn, B), xn = y(a(gn), V, B), yn = xn.clone(), vn = u(r), bn = h(f, p, (() => (({ dragHandler: n, scrollBody: t, scrollBounds: e, options: { loop: r } }) => { r || e.constrain(n.pointerDown()), t.seek() })(Hn)), (n => (({ scrollBody: n, translate: t, location: e, offsetLocation: r, previousLocation: o, scrollLooper: i, slideLooper: c, dragHandler: u, animation: s, eventHandler: a, scrollBounds: d, options: { loop: l } }, f) => { const p = n.settled(), m = !d.shouldConstrain(), g = l ? p : p && m, h = g && !u.pointerDown(); h && s.stop(); const x = e.get() * f + o.get() * (1 - f); r.set(x), l && (i.loop(n.direction()), c.loop()), t.to(r.get()), h && a.emit("settle"), g || a.emit("scroll") })(Hn, n))), Sn = gn[xn.get()], wn = I(Sn), En = I(Sn), Ln = I(Sn), Dn = I(Sn), In = function (n, t, e, r, c, u) { let s = 0, a = 0, d = c, l = u, f = n.get(), p = 0; function m(n) { return d = n, h } function g(n) { return l = n, h } const h = { direction: function () { return a }, duration: function () { return d }, velocity: function () { return s }, seek: function () { const t = r.get() - n.get(); let o = 0; return d ? (e.set(n), s += t / d, s *= l, f += s, n.add(s), o = f - p) : (s = 0, e.set(r), n.set(r), o = t), a = i(o), p = f, h }, settled: function () { return o(r.get() - t.get()) < .001 }, useBaseFriction: function () { return g(u) }, useBaseDuration: function () { return m(c) }, useFriction: g, useDuration: m }; return h }(wn, Ln, En, Dn, C, .68), Mn = L(B, gn, fn, hn, Dn), An = function (n, t, e, r, o, i, c) { function u(o) { const u = o.distance, s = o.index !== t.get(); i.add(u), u && (r.duration() ? n.start() : (n.update(), n.render(1), n.update())), s && (e.set(t.get()), t.set(o.index), c.emit("select")) } return { distance: function (n, t) { u(o.byDistance(n, t)) }, index: function (n, e) { const r = t.clone().set(n); u(o.byIndex(r.get(), e)) } } }(bn, xn, yn, In, Mn, Dn, P), Fn = function (n) { const { max: t, length: e } = n; return { get: function (n) { return e ? (n - t) / -e : 0 } } }(hn), Tn = g(), On = T(e, r, P, j), { slideRegistry: Pn } = function (n, t, e, r, o, i) { const { groupSlides: c } = o, { min: u, max: f } = r; return { slideRegistry: function () { const r = c(i), o = !n || "keepSnaps" === t; return 1 === e.length ? [i] : o ? r : r.slice(u, f).map(((n, t, e) => { const r = !t, o = d(e, t); return r ? l(s(e[0]) + 1) : o ? l(a(i) - s(e)[0] + 1, s(e)[0]) : n })) }() } }(en, U, gn, mn, an, vn), zn = D(n, r, Pn, An, In, Tn, P, X), Hn = { ownerDocument: f, ownerWindow: p, eventHandler: P, containerRect: J, slideRects: K, animation: bn, axis: Z, dragHandler: v(Z, n, f, p, Dn, b(Z, p), wn, bn, An, In, Mn, xn, P, nn, N, R, q, .68, Q), eventStore: Tn, percentOfView: nn, index: xn, indexPrevious: yn, limit: hn, location: wn, offsetLocation: Ln, previousLocation: En, options: m, resizeHandler: S(e, P, p, r, Z, W, Y), scrollBody: In, scrollBounds: w(hn, Ln, Dn, In, nn), scrollLooper: E(fn, hn, Ln, [wn, Ln, En, Dn]), scrollProgress: Fn, scrollSnapList: gn.map(Fn.get), scrollSnaps: gn, scrollTarget: Mn, scrollTo: An, slideLooper: A(Z, _, fn, on, cn, dn, gn, Ln, r), slideFocus: zn, slidesHandler: F(e, P, $), slidesInView: On, slideIndexes: vn, slideRegistry: Pn, slidesToScroll: an, target: Dn, translate: M(Z, e) }; return Hn } const z = { align: "center", axis: "x", container: null, slides: null, containScroll: "trimSnaps", direction: "ltr", slidesToScroll: 1, inViewThreshold: 0, breakpoints: {}, dragFree: !1, dragThreshold: 10, loop: !1, skipSnaps: !1, duration: 25, startIndex: 0, active: !0, watchDrag: !0, watchResize: !0, watchSlides: !0, watchFocus: !0 }; function H(n) { function t(n, t) { return p(n, t || {}) } const e = { mergeOptions: t, optionsAtMedia: function (e) { const r = e.breakpoints || {}, o = f(r).filter((t => n.matchMedia(t).matches)).map((n => r[n])).reduce(((n, e) => t(n, e)), {}); return t(e, o) }, optionsMediaQueries: function (t) { return t.map((n => f(n.breakpoints || {}))).reduce(((n, t) => n.concat(t)), []).map(n.matchMedia) } }; return e } function k(n, e, r) { const o = n.ownerDocument, i = o.defaultView, c = H(i), u = function (n) { let t = []; return { init: function (e, r) { return t = r.filter((({ options: t }) => !1 !== n.optionsAtMedia(t).active)), t.forEach((t => t.init(e, n))), r.reduce(((n, t) => Object.assign(n, { [t.name]: t })), {}) }, destroy: function () { t = t.filter((n => n.destroy())) } } }(c), s = g(), a = function () { let n, t = {}; function e(n) { return t[n] || [] } const r = { init: function (t) { n = t }, emit: function (t) { return e(t).forEach((e => e(n, t))), r }, off: function (n, o) { return t[n] = e(n).filter((n => n !== o)), r }, on: function (n, o) { return t[n] = e(n).concat([o]), r }, clear: function () { t = {} } }; return r }(), { mergeOptions: d, optionsAtMedia: l, optionsMediaQueries: f } = c, { on: p, off: m, emit: h } = a, x = A; let y, v, b, S, w = !1, E = d(z, k.globalOptions), L = d(E), D = []; function I(t) { const e = P(n, b, S, o, i, t, a); if (t.loop && !e.slideLooper.canLoop()) { return I(Object.assign({}, t, { loop: !1 })) } return e } function M(e, r) { w || (E = d(E, e), L = l(E), D = r || D, function () { const { container: e, slides: r } = L, o = t(e) ? n.querySelector(e) : e; b = o || n.children[0]; const i = t(r) ? b.querySelectorAll(r) : r; S = [].slice.call(i || b.children) }(), y = I(L), f([E, ...D.map((({ options: n }) => n))]).forEach((n => s.add(n, "change", A))), L.active && (y.translate.to(y.location.get()), y.animation.init(), y.slidesInView.init(), y.slideFocus.init(V), y.eventHandler.init(V), y.resizeHandler.init(V), y.slidesHandler.init(V), y.options.loop && y.slideLooper.loop(), b.offsetParent && S.length && y.dragHandler.init(V), v = u.init(V, D))) } function A(n, t) { const e = O(); F(), M(d({ startIndex: e }, n), t), a.emit("reInit") } function F() { y.dragHandler.destroy(), y.eventStore.clear(), y.translate.clear(), y.slideLooper.clear(), y.resizeHandler.destroy(), y.slidesHandler.destroy(), y.slidesInView.destroy(), y.animation.destroy(), u.destroy(), s.clear() } function T(n, t, e) { L.active && !w && (y.scrollBody.useBaseFriction().useDuration(!0 === t ? 0 : L.duration), y.scrollTo.index(n, e || 0)) } function O() { return y.index.get() } const V = { canScrollNext: function () { return y.index.add(1).get() !== O() }, canScrollPrev: function () { return y.index.add(-1).get() !== O() }, containerNode: function () { return b }, internalEngine: function () { return y }, destroy: function () { w || (w = !0, s.clear(), F(), a.emit("destroy"), a.clear()) }, off: m, on: p, emit: h, plugins: function () { return v }, previousScrollSnap: function () { return y.indexPrevious.get() }, reInit: x, rootNode: function () { return n }, scrollNext: function (n) { T(y.index.add(1).get(), n, -1) }, scrollPrev: function (n) { T(y.index.add(-1).get(), n, 1) }, scrollProgress: function () { return y.scrollProgress.get(y.offsetLocation.get()) }, scrollSnapList: function () { return y.scrollSnapList }, scrollTo: T, selectedScrollSnap: O, slideNodes: function () { return S }, slidesInView: function () { return y.slidesInView.get() }, slidesNotInView: function () { return y.slidesInView.get(!1) } }; return M(e, r), setTimeout((() => a.emit("init")), 0), V } return k.globalOptions = void 0, k }));



!function (n, t) { "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (n = "undefined" != typeof globalThis ? globalThis : n || self).EmblaCarouselFade = t() }(this, (function () { "use strict"; function n(n, t, e) { return Math.min(Math.max(n, t), e) } function t(n) { return "number" == typeof n && !isNaN(n) } function e(e = {}) { const o = 1, i = 0, r = .68; let s, l, c, a, f = [], d = 0, u = 0, p = 0, g = !1; function y() { b(s.selectedScrollSnap(), o) } function E() { g = !1 } function S() { g = !1, d = 0, u = 0 } function h() { const n = s.internalEngine().scrollBody.duration(); u = n ? 0 : o, g = !0, n || y() } function m(n) { const { scrollSnaps: e, location: o, target: i } = s.internalEngine(); !t(n) || f[n] < .5 || (o.set(e[n]), i.set(o)) } function b(t, e) { s.scrollSnapList().forEach(((r, l) => { const c = Math.abs(e), a = f[l], u = l === t, y = n(u ? a + c : a - c, i, o); f[l] = y; const E = u && g, S = s.previousScrollSnap(); E && (f[S] = 1 - y), u && function (n, t) { const { index: e, dragHandler: o, scrollSnaps: i } = s.internalEngine(), r = o.pointerDown(), l = 1 / (i.length - 1); let c = n, a = r ? s.selectedScrollSnap() : s.previousScrollSnap(); if (r && c === a) { const n = -1 * Math.sign(d); c = a, a = e.clone().set(a).add(n).get() } const f = a * l, u = (c - a) * l; p = f + u * t }(t, y), function (n) { const t = s.internalEngine().slideRegistry[n], { scrollSnaps: e, containerRect: o } = s.internalEngine(), r = f[n]; t.forEach((t => { const l = s.slideNodes()[t].style, c = parseFloat(r.toFixed(2)), a = c > i, f = function (n) { const { axis: t } = s.internalEngine(); return `translate${t.scroll.toUpperCase()}(${t.direction(n)}px)` }(a ? e[n] : o.width + 2); a && (l.transform = f), l.opacity = c.toString(), l.pointerEvents = r > .5 ? "auto" : "none", a || (l.transform = f) })) }(l) })) } function v() { const { dragHandler: n, index: t, scrollBody: e } = s.internalEngine(), o = s.selectedScrollSnap(); if (!n.pointerDown()) return o; const i = Math.sign(e.velocity()), r = Math.sign(d), l = t.clone().set(o).add(-1 * i).get(); return i && r ? r === i ? l : o : null } function x() { const { target: n, location: e } = s.internalEngine(), i = n.get() - e.get(), c = Math.abs(i) >= 1, a = v(), p = !t(a); return function (n) { const { dragHandler: e, scrollBody: i } = n.internalEngine(), s = e.pointerDown(), c = i.velocity(), a = i.duration(), p = v(), g = !t(p); if (s) { if (!c) return; d += c, u = Math.abs(c / l), m(p) } if (!s) { if (!a || g) return; u += (o - f[p]) / a, u *= r } g || b(p, u) }(s), !p && !c && f[a] > .999 } function M() { return p } return { name: "fade", options: e, init: function (t) { s = t; const e = s.selectedScrollSnap(), { scrollBody: r, containerRect: d, axis: u } = s.internalEngine(), p = u.measureSize(d); l = n(.75 * p, 200, 500), g = !1, f = s.scrollSnapList().map(((n, t) => t === e ? o : i)), c = r.settled, a = s.scrollProgress, r.settled = x, s.scrollProgress = M, s.on("select", h).on("slideFocus", y).on("pointerDown", S).on("pointerUp", E), function () { const { translate: n, slideLooper: t } = s.internalEngine(); n.clear(), n.toggleActive(!1), t.loopPoints.forEach((({ translate: n }) => { n.clear(), n.toggleActive(!1) })) }(), y() }, destroy: function () { const { scrollBody: n } = s.internalEngine(); n.settled = c, s.scrollProgress = a, s.off("select", h).off("slideFocus", y).off("pointerDown", S).off("pointerUp", E), s.slideNodes().forEach((n => { const t = n.style; t.opacity = "", t.transform = "", t.pointerEvents = "", n.getAttribute("style") || n.removeAttribute("style") })) } } } return e.globalOptions = void 0, e }));



try {
        let wrapper = document.querySelector('[data-bnode="omnise-lqvibw"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-lqvibw",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-dnny76"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-dnny76",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-r4rk3r"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-r4rk3r",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-p5q35n"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-p5q35n",
              env = "live";
            (function(id, wrapper, env, window, document) {
              window.omnise_slider(wrapper);
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ghqvy0"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ghqvy0",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-9n3kx3"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-9n3kx3",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
window.omnise_slider(wrapper);

let rawFormat = "$" + "{{amount}} USD";
rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, "");
const moneyFormat = rawFormat;
const currency = "USD";

function normalizeToCents(value) {
    if (value == null) return 0;
    if (typeof value === "string") {
        if (value.includes(".")) {
            return Math.round(parseFloat(value) * 100);
        }
        return parseInt(value, 10);
    }
    if (value < 1000 && value % 1 !== 0) {
        return Math.round(value * 100);
    }
    return value;
}

function formatMoney(value, format = moneyFormat) {
    let cents = normalizeToCents(value);
    function formatWithDelimiters(
        number,
        precision = 2,
        thousands = ",",
        decimal = "."
    ) {
        number = number.toFixed(precision);
        const parts = number.split(".");
        const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
        const centsPart = parts[1] ? decimal + parts[1] : "";
        return dollars + centsPart;
    }
    return format.replace(/{{\s*(\w+)\s*}}/g, (_, token) => {
        switch (token) {
            case "amount":
                return formatWithDelimiters(cents / 100, 2);
            case "amount_no_decimals":
                return formatWithDelimiters(cents / 100, 0);
            case "amount_with_comma_separator":
                return formatWithDelimiters(cents / 100, 2, ".", ",");
            case "amount_no_decimals_with_comma_separator":
                return formatWithDelimiters(cents / 100, 0, ".", ",");
            case "currency":
                return currency;
            default:
                return formatWithDelimiters(cents / 100, 2);
        }
    });
}

function init() {
    wrapper.querySelectorAll(".omnise-slider-item").forEach(productCard => {

        const productEl = productCard.querySelector(".product-json-data");
        if (!productEl) return;

        let productData = {};
        let currentVariant = null;
        try {
            const raw = JSON.parse(productEl.textContent || "{}");
            const source = raw.product ? raw.product : raw;
            const normalizeVariant = (v) => {
                const cleanId = String(v.id || "").split("/").pop();
                const isEditor = (typeof env !== 'undefined' && env === 'editor');
                const price = isEditor ? Math.round(Number(v.price) * 100) : Number(v.price || 0);
                const compareAtPrice = isEditor
                    ? Math.round(Number(v.compare_at_price || v.compareAtPrice || 0) * 100)
                    : Number(v.compare_at_price || 0);

                let vOptions = [];
                if (v.options && Array.isArray(v.options)) {
                    vOptions = v.options;
                } else if (v.title && v.title.includes(' / ')) {
                    vOptions = v.title.split(' / ');
                } else {
                    vOptions = [v.option1, v.option2, v.option3].filter(Boolean);
                }

                return {
                    id: cleanId,
                    price: price,
                    compareAtPrice: compareAtPrice,
                    inventoryQuantity: v.inventory_quantity ?? v.inventoryQuantity ?? 0,
                    availableForSale: v.available ?? v.availableForSale ?? false,
                    options: vOptions,
                    image: v.featured_image?.src || v.image?.url || null,
                    sku: v.sku || ""
                };
            };

            let rawVariants = [];
            if (Array.isArray(source.variants)) {
                rawVariants = source.variants;
            } else if (source.variants?.edges) {
                rawVariants = source.variants.edges.map(e => e.node);
            }

            productData = {
                id: String(source.id || "").split("/").pop(),
                title: source.title,
                handle: source.handle,
                options: source.options || [],
                variants: rawVariants.map(normalizeVariant),
                featuredImage: source.featuredImage?.src || source.featuredImage
            };
            console.log("Parsed New Data for ID:", productData.id);

        } catch (e) {
            console.error("Error parse JSON:", e);
        }
        const variantSelect = productCard.querySelector("[data-omnise-variant-select]");

        const normalize = (v) =>
            String(v || "").trim().toLowerCase();

        function getSelectedOptions() {
            const arr = [];

            productCard.querySelectorAll(".omnise-option").forEach((optEl, i) => {
                const radio = optEl.querySelector("input.omnise-radio:checked");
                const select = optEl.querySelector(".omnise-swatch-sel");
                arr[i] = radio?.value || select?.value || "";
            });

            return arr;
        }

        function findVariant(selected) {
            const selectedNorm = selected.map(normalize);
            return productData.variants.find(v => {
                const values = (v.options || []).map(normalize);
                return values.every((val, i) => val === selectedNorm[i]);
            });
        }

        function updatePrice(v) {
            console.log('aaaaaaaaaa: ', v)
            const priceEl = productCard.querySelector(".omnise-product-price");
            const compareEl = productCard.querySelector(".omnise-product-price-compare");
            const wrap = productCard.querySelector(".omnise-product-price-wrapper");
            if (!priceEl) return;
            const isContact = v.price <= 0;
            const onSale = !isContact && v.compareAtPrice > v.price;
            if (isContact) {
                priceEl.textContent = "Contact";
                if (compareEl) compareEl.style.display = "none";
                wrap?.classList.remove("omnise-on-sale");
                return;
            }
            priceEl.textContent = formatMoney(v.price, moneyFormat);
            if (onSale) {
                compareEl.textContent = formatMoney(v.compareAtPrice, moneyFormat);
                compareEl.style.display = "inline";
                wrap?.classList.add("omnise-on-sale");
            } else {
                compareEl.style.display = "none";
                wrap?.classList.remove("omnise-on-sale");
            }
        }

        function updateInventory(v) {
            const el = productCard.querySelector(".omnise-inventory");
            if (!el) return;
            console.log("Checking Inventory for Variant ID:", v.id, "| Qty:", v.inventoryQuantity, "| Available:", v.availableForSale);
            const qty = Number(v.inventoryQuantity || 0);
            const available = v.availableForSale;
            const low = Number(el.dataset.low || 0);
            const critical = Number(el.dataset.critical || 0);
            const max = Number(el.dataset.max || 100);

            const stateMap = {
                OUT: !available || qty <= 0,
                CRITICAL: qty > 0 && qty <= critical,
                LOW: qty > critical && qty <= low,
                IN: qty > low,
            };
            let currentState = "IN";
            if (stateMap.OUT) currentState = "OUT";
            else if (stateMap.CRITICAL) currentState = "CRITICAL";
            else if (stateMap.LOW) currentState = "LOW";

            const stateClassMap = {
                OUT: "omnise-inventory-out",
                CRITICAL: "omnise-inventory-critical",
                LOW: "omnise-inventory-low",
                IN: "omnise-inventory-in",
            };
            el.classList.remove(
                "omnise-inventory-out",
                "omnise-inventory-critical",
                "omnise-inventory-low",
                "omnise-inventory-in"
            );
            el.classList.add(stateClassMap[currentState]);

            const visibilityMap = {
                instock: currentState === "IN",
                lowstock: currentState === "LOW",
                criticalstock: currentState === "CRITICAL" || currentState === "OUT",
            };
            el.querySelectorAll("[data-omnise-inventory]").forEach((child) => {
                const type = child.dataset.omniseInventory;
                child.classList.toggle("omnise-show", !!visibilityMap[type]);
                const template = child.dataset.template || "";
                if (template.includes("{stock}")) {
                    child.textContent = template.replace(/\{stock\}/g, qty);
                }
            });
            const bar = el.querySelector(".omnise-inventory-progress-bar");
            if (bar) {
                if (stateMap.OUT) {
                    bar.style.width = "0%";
                } else {
                    const percent = max > 0 ? Math.min(100, (qty / max) * 100) : 0;
                    bar.style.width = percent + "%";
                }
            }
        }

        function updateSKU(v) {
            const skuEl = productCard.querySelector(".omnise-sku");
            if (!skuEl) return;

            const sku = v?.sku || '';

            skuEl.textContent = "SKU: " + sku;
        }

        function updateButton(v) {
            const buttons = productCard.querySelectorAll(".omnise-atc-btn, .omnise-co-btn");
            buttons.forEach(btn => {
                const isCheckout = btn.classList.contains('omnise-co-btn');
                const price = v.price;
                const available = v.availableForSale;

                const isSoldOut = !available;
                const isContact = price <= 0;

                let state = isCheckout ? "co" : "atc";

                let label = isCheckout
                    ? (btn.getAttribute('data-co-text') || "Checkout")
                    : (btn.getAttribute('data-atc-text') || "Add to cart");

                if (isSoldOut) {
                    state = "soldout";
                    label = btn.getAttribute('data-sold-out-text') || "Sold out";
                } else if (isContact) {
                    state = "contact";
                    label = btn.getAttribute('data-contact-text') || "Contact";
                }

                btn.classList.remove(
                    "omnise-btn-atc", "omnise-btn-co",
                    "omnise-btn-soldout", "omnise-btn-contact"
                );
                btn.classList.add("omnise-btn-" + state);

                btn.dataset.state = state;
                btn.disabled = isSoldOut || isContact;

                const textEl = btn.querySelector(".omnise-atc-text, .omnise-checkout-text") || btn;
                if (textEl) {
                    textEl.textContent = label;
                }
            });
        }

        function updateImage(v) {
            const img = productCard.querySelector(".omnise-img-main");
            if (!img) return;

            const hasOptionSelector = productCard.querySelector(".omnise-option-selector") !== null;
            let url = "";

            if (hasOptionSelector) {
                url = (typeof v.image === 'string') ? v.image : (v.image?.url || v.featured_image?.src);

                if (!url) {
                    url = productData.featuredImage?.url || productData.featuredImage;
                }
            } else {
                url = productData.featuredImage?.url || productData.featuredImage;
            }

            if (url && typeof url === 'string') {
                img.setAttribute('src', url);
                img.setAttribute('srcset', url);
            }
        }
        function bindQtyWarning(v) {
            const qtyInput = productCard.querySelector(".omnise-qty-input");
            const warning = productCard.querySelector(".omnise-qty-warning");
            const btn = productCard.querySelector(".omnise-atc-btn");
            if (!qtyInput || !warning || !btn) return;
            currentVariant = v;

            const getStock = () => Number(currentVariant?.inventoryQuantity || 0);

            const getTemplate = () => {
                if (!warning.dataset.template) {
                    warning.dataset.template = warning.innerHTML;
                }
                return warning.dataset.template;
            };

            const showError = (stock) => {
                warning.style.display = "block";
                warning.innerHTML = getTemplate().replace(/\{stock\}/g, stock);
            };

            const hideError = () => {
                warning.style.display = "none";
            };

            hideError();

            if (btn && !btn._qtyBound) {
                btn.addEventListener("click", (e) => {
                    const qty = parseInt(qtyInput.value, 10) || 0;
                    const stock = getStock();

                    if (qty > stock || qty <= 0) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        showError(stock);
                        return false;
                    }
                }, true);

                btn._qtyBound = true;
            }
            qtyInput.addEventListener("input", () => {
                hideError();
            });

            qtyInput.addEventListener("change", () => {
                hideError();
            });
        }

        function apply(v) {
            if (!v) return;
            currentVariant = v;

            if (variantSelect) variantSelect.value = v.id;

            updatePrice(v);
            updateInventory(v);
            updateSKU(v)
            updateButton(v);
            updateImage(v);
            bindQtyWarning(v);
        }

        function initVariant() {
            const selected = getSelectedOptions();

            console.log('selected: ', getSelectedOptions())
            let v = findVariant(selected);
            if (!v) {
                v =
                    productData.variants.find(x => x.availableForSale) ||
                    productData.variants[0];
            }

            
            console.log('v: ', v)

            apply(v);
        }


        function initCheckoutEvent() {
            const btn = productCard.querySelector(".omnise-co-btn");
            if (!btn) return;
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                if (btn.disabled) return;
                const form = btn.closest('form[action="/cart/add"]');
                if (!form) return;
                let returnTo = form.querySelector('input[name="return_to"]');
                if (!returnTo) {
                    returnTo = document.createElement('input');
                    returnTo.type = 'hidden';
                    returnTo.name = 'return_to';
                    form.appendChild(returnTo);
                }
                returnTo.value = '/checkout';
                form.submit();
            });
        }

        function initQuantity() {
            const qtyWrapper = productCard.querySelector('.omnise-qty');
            if (!qtyWrapper) return;

            const input = qtyWrapper.querySelector('.omnise-qty-input');
            const btnMinus = qtyWrapper.querySelector('.omnise-qty-btn-m');
            const btnPlus = qtyWrapper.querySelector('.omnise-qty-btn-p');

            if (!input || !btnMinus || !btnPlus) return;

            btnMinus.addEventListener('click', () => {
                let qty = parseInt(input.value, 10);
                if (!isNaN(qty) && qty > 1) input.value = qty - 1;

            });

            btnPlus.addEventListener('click', () => {
                let qty = parseInt(input.value, 10);
                if (!isNaN(qty)) input.value = qty + 1;
            });

            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }

        function initATCAndCheckout() {
            if (env === "editor") return;

            const buttonATC = productCard.querySelector(".omnise-atc-btn");
            const btnCheckout = productCard.querySelector(".omnise-co-btn");

            const root = window.Shopify?.routes?.root || "/";

            async function addToCart() {
                const variantId = currentVariant?.id;
                if (!variantId) {
                    return false;
                }

                const qtyInput = productCard.querySelector("input[name='quantity']");
                const quantity = Number(qtyInput?.value || 1);

                const res = await fetch(`${root}cart/add.js`, {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        id: variantId,
                        quantity,
                    }),
                });

                if (!res.ok) {
                    const err = await res.text();
                    console.error("Add error:", err);
                    return false;
                }

                await res.json();
                return true;
            }

            buttonATC?.addEventListener("click", async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (buttonATC.disabled) return;

                try {
                    buttonATC.disabled = true;

                    const ok = await addToCart();
                    if (!ok) return;

                    window.location.href = `${root}cart`;
                } catch (err) {
                    console.error(err);
                } finally {
                    buttonATC.disabled = false;
                }
            });

            btnCheckout?.addEventListener("click", async (e) => {
                e.preventDefault();
                if (btnCheckout.disabled) return;

                try {
                    btnCheckout.disabled = true;

                    const ok = await addToCart();
                    if (!ok) return;

                    window.location.href = `${root}checkout`;
                } catch (err) {
                    console.error(err);
                } finally {
                    btnCheckout.disabled = false;
                }
            });
        }
        initVariant();
        initCheckoutEvent();
        initQuantity();
        initATCAndCheckout();

        productCard.addEventListener("change", (e) => {
            const t = e.target;
            if (t.matches(".omnise-radio") || t.matches(".omnise-swatch-sel")) {
                if (t.type === "radio" && !t.checked) return;
                const v = findVariant(getSelectedOptions());
                if (v) apply(v);
            }
        });

    })
}

if (env !== 'editor') {
    init();

} else {
    wrapper.querySelectorAll(".omnise-slider-item").forEach(card => {
        if (card._omniseCardObserver) {
            card._omniseCardObserver.disconnect();
        }
    });
    const observeCard = (card) => {
        let timeout;
        const getCardFingerprint = () => {
            const blockCount = card.querySelectorAll('[data-bnode]').length;
            const jsonEl = card.querySelector(".product-json-data");
            const jsonData = jsonEl ? jsonEl.textContent : "";
            return blockCount + "-" + jsonData.length;
        };
        let lastFingerprint = getCardFingerprint();
        const observer = new MutationObserver(() => {
            const currentFingerprint = getCardFingerprint();
            if (currentFingerprint !== lastFingerprint) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    lastFingerprint = currentFingerprint;
                    init();
                }, 300);
            }
        });
        observer.observe(card, {
            childList: true,
            subtree: true,
            characterData: true
        });
        card._omniseCardObserver = observer;
    };
    wrapper.querySelectorAll(".omnise-slider-item").forEach(observeCard);

    init();
}


            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-hplsvk"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-hplsvk",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ah3jiq"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ah3jiq",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ah3jiq"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ah3jiq",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ah3jiq"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ah3jiq",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-1a20aa"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-1a20aa",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const debounce = (fn, delay) => {
      let t;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, delay);
      };
    };
    const getType = () => {
      const w = window.innerWidth;
      if (w <= 766) return "mobile";
      if (w <= 1180) return "tablet";
      return "desktop";
    };
    let currentType = "";
    const updateVideo = () => {
      const videoEl = wrapper.querySelector(".omnise-video-background");
      if(!videoEl) return
      videoEl.muted = true;
      const type = getType();
      if (type === currentType) return;
      currentType = type;
      const source = videoEl.querySelector("source");
      if (!source) return;
      const newSrc = videoEl.dataset[type] || videoEl.dataset.desktop;
      if (!newSrc) return;
      if (source.getAttribute("src") !== newSrc) {
        source.setAttribute("src", newSrc);
        videoEl.load();
      }
    }
    updateVideo();
    window.addEventListener("resize", debounce(updateVideo, 200));
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ad37wf"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ad37wf",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-p3mp56"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-p3mp56",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    window.omnise_slider(wrapper);
    let rawFormat = "$" + "{{amount}} USD";
    rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, "");
    const moneyFormat = rawFormat;
    const currency = "USD";

    function normalizeToCents(value) {
        if (value == null) return 0;
        if (typeof value === "string") {
            if (value.includes(".")) {
                return Math.round(parseFloat(value) * 100);
            }
            return parseInt(value, 10);
        }
        if (value < 1000 && value % 1 !== 0) {
            return Math.round(value * 100);
        }
        return value;
    }

    function formatMoney(value, format = moneyFormat) {
        let cents = normalizeToCents(value);
        function formatWithDelimiters(
            number,
            precision = 2,
            thousands = ",",
            decimal = "."
        ) {
            number = number.toFixed(precision);
            const parts = number.split(".");
            const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
            const centsPart = parts[1] ? decimal + parts[1] : "";
            return dollars + centsPart;
        }
        return format.replace(/{{\s*(\w+)\s*}}/g, (_, token) => {
            switch (token) {
                case "amount":
                    return formatWithDelimiters(cents / 100, 2);
                case "amount_no_decimals":
                    return formatWithDelimiters(cents / 100, 0);
                case "amount_with_comma_separator":
                    return formatWithDelimiters(cents / 100, 2, ".", ",");
                case "amount_no_decimals_with_comma_separator":
                    return formatWithDelimiters(cents / 100, 0, ".", ",");
                case "currency":
                    return currency;
                default:
                    return formatWithDelimiters(cents / 100, 2);
            }
        });
    }
    function init() {
        wrapper.querySelectorAll(".omnise-slider-item").forEach(productCard => {

        const productEl = productCard.querySelector(".product-json-data");
        if (!productEl) return;

        let productData = {};
        let currentVariant = null;
        try {
            const raw = JSON.parse(productEl.textContent || "{}");
            const source = raw.product ? raw.product : raw;
            const normalizeVariant = (v) => {
            const cleanId = String(v.id || "").split("/").pop();
            const isEditor = (typeof env !== 'undefined' && env === 'editor');
            const price = isEditor ? Math.round(Number(v.price) * 100) : Number(v.price || 0);
            const compareAtPrice = isEditor 
                ? Math.round(Number(v.compare_at_price || v.compareAtPrice || 0) * 100) 
                : Number(v.compare_at_price || 0);

        return {
            id: cleanId,
            price: price,
            compareAtPrice: compareAtPrice,
            inventoryQuantity: v.inventory_quantity ?? v.inventoryQuantity ?? 0,
            availableForSale: v.available ?? v.availableForSale ?? false, 
            options: v.options ||
            (v.selectedOptions
                ? v.selectedOptions.map((o) => o.value)
                : [v.option1, v.option2, v.option3].filter(Boolean)),
            image: v.featured_image?.src || v.image?.url || null,
            sku: v.sku || ""
        };
    };

    let rawVariants = [];
    if (Array.isArray(source.variants)) {
        rawVariants = source.variants;
    } else if (source.variants?.edges) {
        rawVariants = source.variants.edges.map(e => e.node);
    }

    productData = {
        id: String(source.id || "").split("/").pop(),
        title: source.title,
        handle: source.handle,
        options: source.options || [],
        variants: rawVariants.map(normalizeVariant),
        featuredImage: source.featuredImage?.src || source.featuredImage
    };

    } catch (e) {
        console.error("Error parse JSON:", e);
    }
        const variantSelect = productCard.querySelector("[data-omnise-variant-select]");

        const normalize = (v) =>
            String(v || "").trim().toLowerCase();

        function getSelectedOptions() {
            const arr = [];

            productCard.querySelectorAll(".omnise-option").forEach((optEl, i) => {
                const radio = optEl.querySelector("input.omnise-radio:checked");
                const select = optEl.querySelector(".omnise-swatch-sel");
                arr[i] = radio?.value || select?.value || "";
            });

            return arr;
        }

    function findVariant(selected) {
        const selectedNorm = selected.map(normalize);
        return productData.variants.find(v => {
            const values = (v.options || []).map(normalize);
            return values.every((val, i) => val === selectedNorm[i]);
        });
    }

    function updatePrice(v) {
        const priceEl = productCard.querySelector(".omnise-product-price");
        const compareEl = productCard.querySelector(".omnise-product-price-compare");
        const wrap = productCard.querySelector(".omnise-product-price-wrapper");
        if (!priceEl) return;
        const isContact = v.price <= 0;
        const onSale = !isContact && v.compareAtPrice > v.price;
        if (isContact) {
            priceEl.textContent = "Contact";
            if (compareEl) compareEl.style.display = "none";
            wrap?.classList.remove("omnise-on-sale");
            return;
        }
        priceEl.textContent = formatMoney(v.price, moneyFormat);
        if (onSale) {
            compareEl.textContent = formatMoney(v.compareAtPrice, moneyFormat);
            compareEl.style.display = "inline";
            wrap?.classList.add("omnise-on-sale");
        } else {
            compareEl.style.display = "none";
            wrap?.classList.remove("omnise-on-sale");
        }
    }

    function updateInventory(v) {
        const el = productCard.querySelector(".omnise-inventory");
        if (!el) return;
        const qty = Number(v.inventoryQuantity || 0);
        const available = v.availableForSale;
        const low = Number(el.dataset.low || 0);
        const critical = Number(el.dataset.critical || 0);
        const max = Number(el.dataset.max || 100);

        const stateMap = {
            OUT: !available || qty <= 0,
            CRITICAL: qty > 0 && qty <= critical,
            LOW: qty > critical && qty <= low,
            IN: qty > low,
        };
        let currentState = "IN";
        if (stateMap.OUT) currentState = "OUT";
        else if (stateMap.CRITICAL) currentState = "CRITICAL";
        else if (stateMap.LOW) currentState = "LOW";

        const stateClassMap = {
            OUT: "omnise-inventory-out",
            CRITICAL: "omnise-inventory-critical",
            LOW: "omnise-inventory-low",
            IN: "omnise-inventory-in",
        };
        el.classList.remove(
            "omnise-inventory-out",
            "omnise-inventory-critical",
            "omnise-inventory-low",
            "omnise-inventory-in"
        );
        el.classList.add(stateClassMap[currentState]);

        const visibilityMap = {
            instock: currentState === "IN",
            lowstock: currentState === "LOW",
            criticalstock: currentState === "CRITICAL" || currentState === "OUT",
        };
        el.querySelectorAll("[data-omnise-inventory]").forEach((child) => {
            const type = child.dataset.omniseInventory;
            child.classList.toggle("omnise-show", !!visibilityMap[type]);
            const template = child.dataset.template || "";
            if (template.includes("{stock}")) {
                child.textContent = template.replace(/\{stock\}/g, qty);
            }
        });
        const bar = el.querySelector(".omnise-inventory-progress-bar");
        if (bar) {
            if (stateMap.OUT) {
                bar.style.width = "0%";
            } else {
                const percent = max > 0 ? Math.min(100, (qty / max) * 100) : 0;
                bar.style.width = percent + "%";
            }
        }
    }

    function updateSKU(v) {
        const skuEl = productCard.querySelector(".omnise-sku");
        if (!skuEl) return;

        const sku = v?.sku || '';

        skuEl.textContent = "SKU: " + sku;
    }

    function updateButton(v) {
        const buttons = productCard.querySelectorAll(".omnise-atc-btn, .omnise-co-btn");
        buttons.forEach(btn => {
        const isCheckout = btn.classList.contains('omnise-co-btn');
        const price = v.price;
        const available = v.availableForSale; 
        
        const isSoldOut = !available;
        const isContact = price <= 0;
        
        let state = isCheckout ? "co" : "atc";
       
        let label = isCheckout 
            ? (btn.getAttribute('data-co-text') || "Checkout") 
            : (btn.getAttribute('data-atc-text') || "Add to cart");

        if (isSoldOut) {
            state = "soldout";
            label = btn.getAttribute('data-sold-out-text') || "Sold out";
        } else if (isContact) {
            state = "contact";
            label = btn.getAttribute('data-contact-text') || "Contact";
        }

        btn.classList.remove(
            "omnise-btn-atc", "omnise-btn-co",
            "omnise-btn-soldout", "omnise-btn-contact"
        );
        btn.classList.add("omnise-btn-" + state);
        
        btn.dataset.state = state;
        btn.disabled = isSoldOut || isContact;

        const textEl = btn.querySelector(".omnise-atc-text, .omnise-checkout-text");
            if (textEl) {
                textEl.textContent = label;
            }
        });
    }

    function updateImage(v) {
        const img = productCard.querySelector(".omnise-img-main");
        if (!img) return;

        const hasOptionSelector = productCard.querySelector(".omnise-option-selector") !== null;
        let url = "";

        if (hasOptionSelector) {
            url = (typeof v.image === 'string') ? v.image : (v.image?.url || v.featured_image?.src);
            
            if (!url) {
                url = productData.featuredImage?.url || productData.featuredImage;
            }
        } else {
            url = productData.featuredImage?.url || productData.featuredImage;
        }

        if (url && typeof url === 'string') {
            img.setAttribute('src', url);
            img.setAttribute('srcset', url);
        }
    }
    function bindQtyWarning(v) {
        const qtyInput = productCard.querySelector(".omnise-qty-input");
        const warning = productCard.querySelector(".omnise-qty-warning");
        const btn = productCard.querySelector(".omnise-atc-btn");
        if (!qtyInput || !warning || !btn) return;
        currentVariant = v;

        const getStock = () => Number(currentVariant?.inventoryQuantity || 0);

        const getTemplate = () => {
            if (!warning.dataset.template) {
                warning.dataset.template = warning.innerHTML;
            }
            return warning.dataset.template;
        };

        const showError = (stock) => {
            warning.style.display = "block";
            warning.innerHTML = getTemplate().replace(/\{stock\}/g, stock);
        };

        const hideError = () => {
            warning.style.display = "none";
        };

        hideError();

        if (btn && !btn._qtyBound) {
            btn.addEventListener("click", (e) => {
                const qty = parseInt(qtyInput.value, 10) || 0;
                const stock = getStock();

                if (qty > stock || qty <= 0) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    showError(stock);
                    return false;
                }
            }, true);

            btn._qtyBound = true;
        }
        qtyInput.addEventListener("input", () => {
            hideError();
        });

        qtyInput.addEventListener("change", () => {
            hideError();
        });
    }

    function apply(v) {
        if (!v) return;
        currentVariant = v;

        if (variantSelect) variantSelect.value = v.id;

        updatePrice(v);
        updateInventory(v);
        updateSKU(v)
        updateButton(v);
        updateImage(v);
        bindQtyWarning(v);
    }

    function initVariant() {
        const selected = getSelectedOptions();
        let v = findVariant(selected);
        if (!v) {
            v =
                productData.variants.find(x => x.availableForSale) ||
                productData.variants[0];
        }
        apply(v);
    }


    function initCheckoutEvent() {
        const btn = productCard.querySelector(".omnise-co-btn");
        if (!btn) return;
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (btn.disabled) return;
            const form = btn.closest('form[action="/cart/add"]');
            if (!form) return;
            let returnTo = form.querySelector('input[name="return_to"]');
            if (!returnTo) {
                returnTo = document.createElement('input');
                returnTo.type = 'hidden';
                returnTo.name = 'return_to';
                form.appendChild(returnTo);
            }
            returnTo.value = '/checkout';
            form.submit();
        });
    }

    function initQuantity() {
        const qtyWrapper = productCard.querySelector('.omnise-qty');
        if (!qtyWrapper) return;

        const input = qtyWrapper.querySelector('.omnise-qty-input');
        const btnMinus = qtyWrapper.querySelector('.omnise-qty-btn-m');
        const btnPlus = qtyWrapper.querySelector('.omnise-qty-btn-p');

        if (!input || !btnMinus || !btnPlus) return;

        btnMinus.addEventListener('click', () => {
            let qty = parseInt(input.value, 10);
            if (!isNaN(qty) && qty > 1) input.value = qty - 1;

        });

        btnPlus.addEventListener('click', () => {
            let qty = parseInt(input.value, 10);
            if (!isNaN(qty)) input.value = qty + 1;
        });

        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    function initATCAndCheckout() {
        if (env === "editor") return;

        const buttonATC = productCard.querySelector(".omnise-atc-btn");
        const btnCheckout = productCard.querySelector(".omnise-co-btn");

        const root = window.Shopify?.routes?.root || "/";

        async function addToCart() {
            const variantId = currentVariant?.id;
            if (!variantId) {
                return false;
            }

            const qtyInput = productCard.querySelector("input[name='quantity']");
            const quantity = Number(qtyInput?.value || 1);

            const res = await fetch(`${root}cart/add.js`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    id: variantId,
                    quantity,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                console.error("Add error:", err);
                return false;
            }

            await res.json();
            return true;
        }

        buttonATC?.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (buttonATC.disabled) return;

            try {
                buttonATC.disabled = true;

                const ok = await addToCart();
                if (!ok) return;

                window.location.href = `${root}cart`;
            } catch (err) {
                console.error(err);
            } finally {
                buttonATC.disabled = false;
            }
        });

        btnCheckout?.addEventListener("click", async (e) => {
            e.preventDefault();
            if (btnCheckout.disabled) return;

            try {
                btnCheckout.disabled = true;

                const ok = await addToCart();
                if (!ok) return;

                window.location.href = `${root}checkout`;
            } catch (err) {
                console.error(err);
            } finally {
                btnCheckout.disabled = false;
            }
        });
    }
        initVariant();
        initCheckoutEvent();
        initQuantity();
        initATCAndCheckout();

        productCard.addEventListener("change", (e) => {
        const t = e.target;
            if (t.matches(".omnise-radio") || t.matches(".omnise-swatch-sel")) {
            if (t.type === "radio" && !t.checked) return;
            const v = findVariant(getSelectedOptions());
            if (v) apply(v);
            }
        });
        
    })
}
   
    if (env !== 'editor') {
        init();
        
    } else {
        wrapper.querySelectorAll(".omnise-slider-item").forEach(card => {
            if (card._omniseCardObserver) {
                card._omniseCardObserver.disconnect();
            }
        });
        const observeCard = (card) => {
            let timeout;
            const getCardFingerprint = () => {
                const blockCount = card.querySelectorAll('[data-bnode]').length;
                const jsonEl = card.querySelector(".product-json-data");
                const jsonData = jsonEl ? jsonEl.textContent : "";
                return blockCount + "-" + jsonData.length;
            };
            let lastFingerprint = getCardFingerprint();
            const observer = new MutationObserver(() => {
                const currentFingerprint = getCardFingerprint();
                if (currentFingerprint !== lastFingerprint) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        lastFingerprint = currentFingerprint;
                        init(); 
                    }, 300);
                }
            });
            observer.observe(card, {
                childList: true,
                subtree: true,
                characterData: true
            });
            card._omniseCardObserver = observer;
        };
        wrapper.querySelectorAll(".omnise-slider-item").forEach(observeCard);
        
        init();
    }
   
    
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-ui9jza"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-ui9jza",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-gdw5fe"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-gdw5fe",
              env = "live";
            (function(id, wrapper, env, window, document) {
              window.omnise_slider(wrapper);
const dots = wrapper.querySelectorAll(".omnise-lb-dot");
const slides = wrapper.querySelectorAll(".omnise-slider-item");
const emblaApi = wrapper.embla;

if (dots.length && slides.length && emblaApi) {
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = dot.getAttribute("data-index");

      if (index !== null) {
        emblaApi.scrollTo(Number(index));
      }
    });
  });

  const updateDots = () => {
    const selectedIndex = emblaApi.selectedScrollSnap();

    dots.forEach((dot) => {
      const index = Number(dot.getAttribute("data-index"));
      dot.classList.toggle("active", index === selectedIndex);
    });
  };

  emblaApi.on("select", updateDots);
  emblaApi.on("init", updateDots);

  updateDots();
}

            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-drifet"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-drifet",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    window.omnise_slider(wrapper);
    let rawFormat = "$" + "{{amount}} USD";
    rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, "");
    const moneyFormat = rawFormat;
    const currency = "USD";

    function normalizeToCents(value) {
        if (value == null) return 0;
        if (typeof value === "string") {
            if (value.includes(".")) {
                return Math.round(parseFloat(value) * 100);
            }
            return parseInt(value, 10);
        }
        if (value < 1000 && value % 1 !== 0) {
            return Math.round(value * 100);
        }
        return value;
    }

    function formatMoney(value, format = moneyFormat) {
        let cents = normalizeToCents(value);
        function formatWithDelimiters(
            number,
            precision = 2,
            thousands = ",",
            decimal = "."
        ) {
            number = number.toFixed(precision);
            const parts = number.split(".");
            const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
            const centsPart = parts[1] ? decimal + parts[1] : "";
            return dollars + centsPart;
        }
        return format.replace(/{{\s*(\w+)\s*}}/g, (_, token) => {
            switch (token) {
                case "amount":
                    return formatWithDelimiters(cents / 100, 2);
                case "amount_no_decimals":
                    return formatWithDelimiters(cents / 100, 0);
                case "amount_with_comma_separator":
                    return formatWithDelimiters(cents / 100, 2, ".", ",");
                case "amount_no_decimals_with_comma_separator":
                    return formatWithDelimiters(cents / 100, 0, ".", ",");
                case "currency":
                    return currency;
                default:
                    return formatWithDelimiters(cents / 100, 2);
            }
        });
    }
    function init() {
        wrapper.querySelectorAll(".omnise-slider-item").forEach(productCard => {

        const productEl = productCard.querySelector(".product-json-data");
        if (!productEl) return;

        let productData = {};
        let currentVariant = null;
        try {
            const raw = JSON.parse(productEl.textContent || "{}");
            const source = raw.product ? raw.product : raw;
            const normalizeVariant = (v) => {
            const cleanId = String(v.id || "").split("/").pop();
            const isEditor = (typeof env !== 'undefined' && env === 'editor');
            const price = isEditor ? Math.round(Number(v.price) * 100) : Number(v.price || 0);
            const compareAtPrice = isEditor 
                ? Math.round(Number(v.compare_at_price || v.compareAtPrice || 0) * 100) 
                : Number(v.compare_at_price || 0);

        return {
            id: cleanId,
            price: price,
            compareAtPrice: compareAtPrice,
            inventoryQuantity: v.inventory_quantity ?? v.inventoryQuantity ?? 0,
            availableForSale: v.available ?? v.availableForSale ?? false, 
            options: v.options ||
            (v.selectedOptions
                ? v.selectedOptions.map((o) => o.value)
                : [v.option1, v.option2, v.option3].filter(Boolean)),
            image: v.featured_image?.src || v.image?.url || null,
            sku: v.sku || ""
        };
    };

    let rawVariants = [];
    if (Array.isArray(source.variants)) {
        rawVariants = source.variants;
    } else if (source.variants?.edges) {
        rawVariants = source.variants.edges.map(e => e.node);
    }

    productData = {
        id: String(source.id || "").split("/").pop(),
        title: source.title,
        handle: source.handle,
        options: source.options || [],
        variants: rawVariants.map(normalizeVariant),
        featuredImage: source.featuredImage?.src || source.featuredImage
    };

    } catch (e) {
        console.error("Error parse JSON:", e);
    }
        const variantSelect = productCard.querySelector("[data-omnise-variant-select]");

        const normalize = (v) =>
            String(v || "").trim().toLowerCase();

        function getSelectedOptions() {
            const arr = [];

            productCard.querySelectorAll(".omnise-option").forEach((optEl, i) => {
                const radio = optEl.querySelector("input.omnise-radio:checked");
                const select = optEl.querySelector(".omnise-swatch-sel");
                arr[i] = radio?.value || select?.value || "";
            });

            return arr;
        }

    function findVariant(selected) {
        const selectedNorm = selected.map(normalize);
        return productData.variants.find(v => {
            const values = (v.options || []).map(normalize);
            return values.every((val, i) => val === selectedNorm[i]);
        });
    }

    function updatePrice(v) {
        const priceEl = productCard.querySelector(".omnise-product-price");
        const compareEl = productCard.querySelector(".omnise-product-price-compare");
        const wrap = productCard.querySelector(".omnise-product-price-wrapper");
        if (!priceEl) return;
        const isContact = v.price <= 0;
        const onSale = !isContact && v.compareAtPrice > v.price;
        if (isContact) {
            priceEl.textContent = "Contact";
            if (compareEl) compareEl.style.display = "none";
            wrap?.classList.remove("omnise-on-sale");
            return;
        }
        priceEl.textContent = formatMoney(v.price, moneyFormat);
        if (onSale) {
            compareEl.textContent = formatMoney(v.compareAtPrice, moneyFormat);
            compareEl.style.display = "inline";
            wrap?.classList.add("omnise-on-sale");
        } else {
            compareEl.style.display = "none";
            wrap?.classList.remove("omnise-on-sale");
        }
    }

    function updateInventory(v) {
        const el = productCard.querySelector(".omnise-inventory");
        if (!el) return;
        const qty = Number(v.inventoryQuantity || 0);
        const available = v.availableForSale;
        const low = Number(el.dataset.low || 0);
        const critical = Number(el.dataset.critical || 0);
        const max = Number(el.dataset.max || 100);

        const stateMap = {
            OUT: !available || qty <= 0,
            CRITICAL: qty > 0 && qty <= critical,
            LOW: qty > critical && qty <= low,
            IN: qty > low,
        };
        let currentState = "IN";
        if (stateMap.OUT) currentState = "OUT";
        else if (stateMap.CRITICAL) currentState = "CRITICAL";
        else if (stateMap.LOW) currentState = "LOW";

        const stateClassMap = {
            OUT: "omnise-inventory-out",
            CRITICAL: "omnise-inventory-critical",
            LOW: "omnise-inventory-low",
            IN: "omnise-inventory-in",
        };
        el.classList.remove(
            "omnise-inventory-out",
            "omnise-inventory-critical",
            "omnise-inventory-low",
            "omnise-inventory-in"
        );
        el.classList.add(stateClassMap[currentState]);

        const visibilityMap = {
            instock: currentState === "IN",
            lowstock: currentState === "LOW",
            criticalstock: currentState === "CRITICAL" || currentState === "OUT",
        };
        el.querySelectorAll("[data-omnise-inventory]").forEach((child) => {
            const type = child.dataset.omniseInventory;
            child.classList.toggle("omnise-show", !!visibilityMap[type]);
            const template = child.dataset.template || "";
            if (template.includes("{stock}")) {
                child.textContent = template.replace(/\{stock\}/g, qty);
            }
        });
        const bar = el.querySelector(".omnise-inventory-progress-bar");
        if (bar) {
            if (stateMap.OUT) {
                bar.style.width = "0%";
            } else {
                const percent = max > 0 ? Math.min(100, (qty / max) * 100) : 0;
                bar.style.width = percent + "%";
            }
        }
    }

    function updateSKU(v) {
        const skuEl = productCard.querySelector(".omnise-sku");
        if (!skuEl) return;

        const sku = v?.sku || '';

        skuEl.textContent = "SKU: " + sku;
    }

    function updateButton(v) {
        const buttons = productCard.querySelectorAll(".omnise-atc-btn, .omnise-co-btn");
        buttons.forEach(btn => {
        const isCheckout = btn.classList.contains('omnise-co-btn');
        const price = v.price;
        const available = v.availableForSale; 
        
        const isSoldOut = !available;
        const isContact = price <= 0;
        
        let state = isCheckout ? "co" : "atc";
       
        let label = isCheckout 
            ? (btn.getAttribute('data-co-text') || "Checkout") 
            : (btn.getAttribute('data-atc-text') || "Add to cart");

        if (isSoldOut) {
            state = "soldout";
            label = btn.getAttribute('data-sold-out-text') || "Sold out";
        } else if (isContact) {
            state = "contact";
            label = btn.getAttribute('data-contact-text') || "Contact";
        }

        btn.classList.remove(
            "omnise-btn-atc", "omnise-btn-co",
            "omnise-btn-soldout", "omnise-btn-contact"
        );
        btn.classList.add("omnise-btn-" + state);
        
        btn.dataset.state = state;
        btn.disabled = isSoldOut || isContact;

        const textEl = btn.querySelector(".omnise-atc-text, .omnise-checkout-text");
            if (textEl) {
                textEl.textContent = label;
            }
        });
    }

    function updateImage(v) {
        const img = productCard.querySelector(".omnise-img-main");
        if (!img) return;

        const hasOptionSelector = productCard.querySelector(".omnise-option-selector") !== null;
        let url = "";

        if (hasOptionSelector) {
            url = (typeof v.image === 'string') ? v.image : (v.image?.url || v.featured_image?.src);
            
            if (!url) {
                url = productData.featuredImage?.url || productData.featuredImage;
            }
        } else {
            url = productData.featuredImage?.url || productData.featuredImage;
        }

        if (url && typeof url === 'string') {
            img.setAttribute('src', url);
            img.setAttribute('srcset', url);
        }
    }
    function bindQtyWarning(v) {
        const qtyInput = productCard.querySelector(".omnise-qty-input");
        const warning = productCard.querySelector(".omnise-qty-warning");
        const btn = productCard.querySelector(".omnise-atc-btn");
        if (!qtyInput || !warning || !btn) return;
        currentVariant = v;

        const getStock = () => Number(currentVariant?.inventoryQuantity || 0);

        const getTemplate = () => {
            if (!warning.dataset.template) {
                warning.dataset.template = warning.innerHTML;
            }
            return warning.dataset.template;
        };

        const showError = (stock) => {
            warning.style.display = "block";
            warning.innerHTML = getTemplate().replace(/\{stock\}/g, stock);
        };

        const hideError = () => {
            warning.style.display = "none";
        };

        hideError();

        if (btn && !btn._qtyBound) {
            btn.addEventListener("click", (e) => {
                const qty = parseInt(qtyInput.value, 10) || 0;
                const stock = getStock();

                if (qty > stock || qty <= 0) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    showError(stock);
                    return false;
                }
            }, true);

            btn._qtyBound = true;
        }
        qtyInput.addEventListener("input", () => {
            hideError();
        });

        qtyInput.addEventListener("change", () => {
            hideError();
        });
    }

    function apply(v) {
        if (!v) return;
        currentVariant = v;

        if (variantSelect) variantSelect.value = v.id;

        updatePrice(v);
        updateInventory(v);
        updateSKU(v)
        updateButton(v);
        updateImage(v);
        bindQtyWarning(v);
    }

    function initVariant() {
        const selected = getSelectedOptions();
        let v = findVariant(selected);
        if (!v) {
            v =
                productData.variants.find(x => x.availableForSale) ||
                productData.variants[0];
        }
        apply(v);
    }


    function initCheckoutEvent() {
        const btn = productCard.querySelector(".omnise-co-btn");
        if (!btn) return;
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            if (btn.disabled) return;
            const form = btn.closest('form[action="/cart/add"]');
            if (!form) return;
            let returnTo = form.querySelector('input[name="return_to"]');
            if (!returnTo) {
                returnTo = document.createElement('input');
                returnTo.type = 'hidden';
                returnTo.name = 'return_to';
                form.appendChild(returnTo);
            }
            returnTo.value = '/checkout';
            form.submit();
        });
    }

    function initQuantity() {
        const qtyWrapper = productCard.querySelector('.omnise-qty');
        if (!qtyWrapper) return;

        const input = qtyWrapper.querySelector('.omnise-qty-input');
        const btnMinus = qtyWrapper.querySelector('.omnise-qty-btn-m');
        const btnPlus = qtyWrapper.querySelector('.omnise-qty-btn-p');

        if (!input || !btnMinus || !btnPlus) return;

        btnMinus.addEventListener('click', () => {
            let qty = parseInt(input.value, 10);
            if (!isNaN(qty) && qty > 1) input.value = qty - 1;

        });

        btnPlus.addEventListener('click', () => {
            let qty = parseInt(input.value, 10);
            if (!isNaN(qty)) input.value = qty + 1;
        });

        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }

    function initATCAndCheckout() {
        if (env === "editor") return;

        const buttonATC = productCard.querySelector(".omnise-atc-btn");
        const btnCheckout = productCard.querySelector(".omnise-co-btn");

        const root = window.Shopify?.routes?.root || "/";

        async function addToCart() {
            const variantId = currentVariant?.id;
            if (!variantId) {
                return false;
            }

            const qtyInput = productCard.querySelector("input[name='quantity']");
            const quantity = Number(qtyInput?.value || 1);

            const res = await fetch(`${root}cart/add.js`, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    id: variantId,
                    quantity,
                }),
            });

            if (!res.ok) {
                const err = await res.text();
                console.error("Add error:", err);
                return false;
            }

            await res.json();
            return true;
        }

        buttonATC?.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (buttonATC.disabled) return;

            try {
                buttonATC.disabled = true;

                const ok = await addToCart();
                if (!ok) return;

                window.location.href = `${root}cart`;
            } catch (err) {
                console.error(err);
            } finally {
                buttonATC.disabled = false;
            }
        });

        btnCheckout?.addEventListener("click", async (e) => {
            e.preventDefault();
            if (btnCheckout.disabled) return;

            try {
                btnCheckout.disabled = true;

                const ok = await addToCart();
                if (!ok) return;

                window.location.href = `${root}checkout`;
            } catch (err) {
                console.error(err);
            } finally {
                btnCheckout.disabled = false;
            }
        });
    }
        initVariant();
        initCheckoutEvent();
        initQuantity();
        initATCAndCheckout();

        productCard.addEventListener("change", (e) => {
        const t = e.target;
            if (t.matches(".omnise-radio") || t.matches(".omnise-swatch-sel")) {
            if (t.type === "radio" && !t.checked) return;
            const v = findVariant(getSelectedOptions());
            if (v) apply(v);
            }
        });
        
    })
}
   
    if (env !== 'editor') {
        init();
        
    } else {
        wrapper.querySelectorAll(".omnise-slider-item").forEach(card => {
            if (card._omniseCardObserver) {
                card._omniseCardObserver.disconnect();
            }
        });
        const observeCard = (card) => {
            let timeout;
            const getCardFingerprint = () => {
                const blockCount = card.querySelectorAll('[data-bnode]').length;
                const jsonEl = card.querySelector(".product-json-data");
                const jsonData = jsonEl ? jsonEl.textContent : "";
                return blockCount + "-" + jsonData.length;
            };
            let lastFingerprint = getCardFingerprint();
            const observer = new MutationObserver(() => {
                const currentFingerprint = getCardFingerprint();
                if (currentFingerprint !== lastFingerprint) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        lastFingerprint = currentFingerprint;
                        init(); 
                    }, 300);
                }
            });
            observer.observe(card, {
                childList: true,
                subtree: true,
                characterData: true
            });
            card._omniseCardObserver = observer;
        };
        wrapper.querySelectorAll(".omnise-slider-item").forEach(observeCard);
        
        init();
    }
   
    
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-pb0qz1"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-pb0qz1",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-q8vqnx"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-q8vqnx",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-2oyae6"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-2oyae6",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-slkfdd"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-slkfdd",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
      window.omnise_slider(wrapper);
    
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-4nr1rt"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-4nr1rt",
              env = "live";
            (function(id, wrapper, env, window, document) {
              window.omnise_slider(wrapper);
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-4wxgtb"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-4wxgtb",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const debounce = (fn, delay) => {
      let t;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, delay);
      };
    };
    const getType = () => {
      const w = window.innerWidth;
      if (w <= 766) return "mobile";
      if (w <= 1180) return "tablet";
      return "desktop";
    };
    let currentType = "";
    const updateVideo = () => {
      const videoEl = wrapper.querySelector(".omnise-video-background");
      if(!videoEl) return
      videoEl.muted = true;
      const type = getType();
      if (type === currentType) return;
      currentType = type;
      const source = videoEl.querySelector("source");
      if (!source) return;
      const newSrc = videoEl.dataset[type] || videoEl.dataset.desktop;
      if (!newSrc) return;
      if (source.getAttribute("src") !== newSrc) {
        source.setAttribute("src", newSrc);
        videoEl.load();
      }
    }
    updateVideo();
    window.addEventListener("resize", debounce(updateVideo, 200));
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-t84z8u"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-t84z8u",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-t84z8u"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-t84z8u",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-t84z8u"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-t84z8u",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-t84z8u"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-t84z8u",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-t84z8u"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-t84z8u",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const scrollSmooth = (targetId) => {
      const target = document.querySelector('[data-bnode="' + targetId + '"]');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return !!target;
    };

    wrapper.addEventListener('click', (e) => {
      const h = wrapper.getAttribute('href');
      if (h && h.startsWith('#') && h !== '#') {
        if (scrollSmooth(h.substring(1))) e.preventDefault();
      }
    });

    if (window.location.hash && !window.omniseScrollHashHandled) {
      window.omniseScrollHashHandled = true;
      setTimeout(() => scrollSmooth(window.location.hash.substring(1)), 300);
    }
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-8cp07d"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-8cp07d",
              env = "live";
            (function(id, wrapper, env, window, document) {
              const debounce = (fn, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), wait);
    };
};


function setupMarquee(wrapperEl, trackEl) {
    if (!trackEl) return;

    let currentDirection = wrapperEl.dataset.direction === 'right' ? 'right' : 'left';
    let isUpdating = false;
    let cloneTimeout;

    function getCleanClone(node) {
        if (!node) return null;
        const clone = node.cloneNode(true);
        clone.querySelectorAll('style, script').forEach(s => s.remove());
        return clone;
    }

    // Hàm này sẽ được gọi ngay lập tức khi hướng thay đổi
    function applyAnimation() {
        const animName = currentDirection === 'right' ? 'marquee-right' : 'marquee-left';
        // Reset để trình duyệt nhận diện animation mới
        trackEl.style.animationName = 'none';
        trackEl.style.transform = 'translateX(0)';

        // Trigger reflow
        void trackEl.offsetWidth;

        trackEl.style.animationName = animName;
        trackEl.style.animationPlayState = 'running';
    }

    function buildClones() {
        const contentEl = trackEl.querySelector('.omnise-1kwker-content');
        if (!contentEl) return;

        // xóa clone cũ
        trackEl.querySelectorAll('[data-is-full-clone]').forEach(n => n.remove());

        // chỉ clone đúng 1 lần
        const clone = contentEl.cloneNode(true);

        clone.dataset.isFullClone = 'true';
        clone.setAttribute('aria-hidden', 'true');

        trackEl.appendChild(clone);
    }

    function runClone(shouldApplyAnim = true) {
        clearTimeout(cloneTimeout);
        cloneTimeout = setTimeout(() => {
            if (isUpdating) return;
            isUpdating = true;

            contentObserver.disconnect();
            buildClones();

            // Chỉ áp dụng lại animation nếu không phải do đổi hướng (tránh bị reset 2 lần)
            if (shouldApplyAnim) applyAnimation();

            contentObserver.observe(trackEl, {
                childList: true,
                subtree: true,
                characterData: true
            });

            setTimeout(() => { isUpdating = false; }, 300);
        }, 50); // Giảm delay xuống 50ms để nhanh hơn
    }

    // Observer theo dõi nội dung bên trong (thêm/xóa phần tử)
    const contentObserver = new MutationObserver(debounce((mutations) => {
        if (isUpdating) return;
        const isSignificant = mutations.some(m => {
            const target = m.target?.nodeType === 1 ? m.target : m.target?.parentElement;
            if (target?.closest?.('[data-cloned], [data-is-full-clone]')) return false;
            return true;
        });
        if (isSignificant) runClone(true);
    }, 300));

    // Pause/Play khi hover
    const pause = () => trackEl.style.animationPlayState = 'paused';
    const play = () => trackEl.style.animationPlayState = 'running';
    wrapperEl.addEventListener('pointerenter', pause);
    wrapperEl.addEventListener('pointerleave', play);

    // QUAN TRỌNG: Theo dõi attribute direction
    const dirObserver = new MutationObserver(() => {
        const newDir = wrapperEl.dataset.direction;
        if (newDir !== currentDirection) {
            currentDirection = newDir;

            // 1. Chạy animation ngay lập tức
            applyAnimation();

            // 2. Cập nhật lại clone sau (không cần applyAnim lại trong runClone)
            isUpdating = false;
            runClone(false);
        }
    });

    dirObserver.observe(wrapperEl, { attributes: true, attributeFilter: ['data-direction'] });
    contentObserver.observe(trackEl, { childList: true, subtree: true, characterData: true });

    // Khởi tạo lần đầu
    runClone(true);

    const onResize = debounce(() => runClone(true), 400);
    window.addEventListener('resize', onResize);

    return {
        update: () => runClone(true),
        dispose: () => {
            dirObserver.disconnect();
            contentObserver.disconnect();
            clearTimeout(cloneTimeout);
            window.removeEventListener('resize', onResize);
            wrapperEl.removeEventListener('pointerenter', pause);
            wrapperEl.removeEventListener('pointerleave', play);
        }
    };
}

// Khởi tạo thực tế
const targetWrapper = typeof wrapper !== 'undefined' ? wrapper : document.querySelector('.omnise-1kwker-wrapper');
const targetTrack = targetWrapper?.querySelector('.omnise-1kwker-track');

if (targetWrapper && targetTrack) {
    const marquee = setupMarquee(targetWrapper, targetTrack);
}
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };try {
        let wrapper = document.querySelector('[data-bnode="omnise-y0rrpw"]');
        if (wrapper) {
          if (!wrapper.getAttribute('data-executed-scripts')) {
            wrapper.setAttribute('data-executed-scripts', true);
            let id = "omnise-y0rrpw",
              env = "live";
            (function(id, wrapper, env, window, document) {
              
    const debounce = (fn, delay) => {
      let t;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, delay);
      };
    };
    const getType = () => {
      const w = window.innerWidth;
      if (w <= 766) return "mobile";
      if (w <= 1180) return "tablet";
      return "desktop";
    };
    let currentType = "";
    const updateVideo = () => {
      const videoEl = wrapper.querySelector(".omnise-video-background");
      if(!videoEl) return
      videoEl.muted = true;
      const type = getType();
      if (type === currentType) return;
      currentType = type;
      const source = videoEl.querySelector("source");
      if (!source) return;
      const newSrc = videoEl.dataset[type] || videoEl.dataset.desktop;
      if (!newSrc) return;
      if (source.getAttribute("src") !== newSrc) {
        source.setAttribute("src", newSrc);
        videoEl.load();
      }
    }
    updateVideo();
    window.addEventListener("resize", debounce(updateVideo, 200));
  
            })(id, wrapper, env, window, document);
          }
        }
      } catch (ex) { console.error('Omnise Editor JS Error: ' + ex.message) };