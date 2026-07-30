(function () {
  var selector = '[data-swiper]';
  var retryTimer;
  var retryCount = 0;

  function parseOptions(element) {
    var rawOptions = element.getAttribute('data-swiper-options');
    if (!rawOptions) return {};

    try {
      return JSON.parse(rawOptions);
    } catch (error) {
      return {};
    }
  }

  function buildOptions(element) {
    var nextElement = element.querySelector('[data-swiper-next]');
    var previousElement = element.querySelector('[data-swiper-prev]');
    var paginationElement = element.querySelector('[data-swiper-pagination]');
    var slideCount = element.querySelectorAll('.swiper-wrapper > .swiper-slide').length;
    var options = {
      slidesPerView: 1,
      spaceBetween: 0,
      watchOverflow: true,
      observer: true,
      observeParents: true,
      a11y: {
        enabled: true
      }
    };
    var customOptions = parseOptions(element);

    if (nextElement && previousElement) {
      options.navigation = {
        nextEl: nextElement,
        prevEl: previousElement
      };
    }

    if (paginationElement) {
      if (paginationElement.getAttribute('data-swiper-pagination-style') === 'fraction-line') {
        options.pagination = {
          el: paginationElement,
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return '<span class="pebble-hero__fraction"><span class="' + currentClass + '"></span><span aria-hidden="true"> / </span><span class="' + totalClass + '"></span></span><span class="pebble-hero__pagination-line" aria-hidden="true"><span class="pebble-hero__pagination-progress"></span></span>';
          }
        };
      } else {
        options.pagination = {
          el: paginationElement,
          clickable: true
        };
      }
    }

    Object.keys(customOptions).forEach(function (key) {
      options[key] = customOptions[key];
    });

    if (slideCount < 2) {
      options.loop = false;
      options.autoplay = false;
      options.allowTouchMove = false;
    }

    return options;
  }

  function setupAutoplayProgress(element, swiper) {
    var progressElement = element.querySelector('.pebble-hero__pagination-progress');
    if (!progressElement) return;

    function updateProgress(value) {
      var safeValue = Math.max(0, Math.min(1, value));
      progressElement.style.transform = 'scaleX(' + safeValue + ')';
    }

    if (!swiper.params.autoplay) {
      updateProgress(1);
      return;
    }

    updateProgress(0);
    swiper.on('autoplayTimeLeft', function (_swiper, _timeLeft, progress) {
      updateProgress(1 - progress);
    });
    swiper.on('autoplayStart', function () {
      updateProgress(0);
    });
    swiper.on('autoplayStop', function () {
      updateProgress(1);
    });
  }

  function collectSwipers(scope) {
    var elements = [];
    var root = scope || document;

    if (root.matches && root.matches(selector)) {
      elements.push(root);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll(selector).forEach(function (element) {
        elements.push(element);
      });
    }

    return elements;
  }

  function initSwipers(scope) {
    if (typeof window.Swiper !== 'function') {
      if (retryCount < 50) {
        window.clearTimeout(retryTimer);
        retryTimer = window.setTimeout(function () {
          retryCount += 1;
          initSwipers(scope);
        }, 100);
      }
      return;
    }

    retryCount = 0;
    collectSwipers(scope).forEach(function (element) {
      if (element.swiper && !element.swiper.destroyed) return;
      var swiper = new window.Swiper(element, buildOptions(element));
      setupAutoplayProgress(element, swiper);
    });
  }

  function destroySwipers(scope) {
    collectSwipers(scope).forEach(function (element) {
      if (element.swiper && !element.swiper.destroyed) {
        element.swiper.destroy(true, true);
      }
    });
  }

  function selectBlock(event) {
    var slide = event.target.closest('[data-swiper-slide-block]');
    if (!slide) return;

    var element = slide.closest(selector);
    if (!element || !element.swiper) return;

    var slideIndex = Number(slide.getAttribute('data-slide-index'));
    if (!Number.isFinite(slideIndex)) return;

    if (element.swiper.params.loop && typeof element.swiper.slideToLoop === 'function') {
      element.swiper.slideToLoop(slideIndex, 0);
    } else {
      element.swiper.slideTo(slideIndex, 0);
    }

    if (element.swiper.autoplay && element.swiper.autoplay.running) {
      element.swiper.autoplay.stop();
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSwipers(document);
  });
  window.addEventListener('load', function () {
    initSwipers(document);
  });
  document.addEventListener('shopify:section:load', function (event) {
    initSwipers(event.target);
  });
  document.addEventListener('shopify:section:unload', function (event) {
    destroySwipers(event.target);
  });
  document.addEventListener('shopify:block:select', selectBlock);

  window.KitoSwiper = {
    init: initSwipers,
    destroy: destroySwipers
  };
})();
