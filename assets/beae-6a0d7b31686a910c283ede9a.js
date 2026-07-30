
(() => { if (window.BEAEPAGEJS === undefined) {
            window.BEAEPAGEJS = [];
          }

          if(window.beaePageSetting == undefined) {
            window.beaePageSetting = {};
          }
          
          window.beaePageSetting.pageId = "6a0d7b31686a910c283ede9a";
              window.beaePageSetting.pageTitle = "test-section"; 
              window.beaePageSetting.pageType = "section";

          let js_28H251DQ = () => { let BeaeUseHooks = {};
      try {
        let argid = 'beae-8r7ai8pwsection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-8r7ai8pw',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-8r7ai8pw');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-8r7ai8pw: ', ex)
      };
    

      try {
        let argid = 'beae-sk04rqpcsection-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-sk04rqpc',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-sk04rqpc');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-sk04rqpc: ', ex)
      };
    

      try {
        let argid = 'beae-81f18wf6block-imageloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-81f18wf6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-81f18wf6');
        args.el = args.els[0];
        ((M) => { var P;if(M.el){if(M.shape){const H=M.el.closest(".beae-slider-items");H&&!H.hasAttribute("data-svg")&&(H==null||H.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${M.id}" clipPathUnits="objectBoundingBox">
                                ${M.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),H.setAttribute("data-svg","true"))}let O=M.el.querySelector(".beae-image-content-position"),I,z=window.innerWidth>=768&&M.autoHover;var V=O.querySelector(".beae-img-ratio-control"),L=O.querySelector(".beae-img-comp-container"),T=O.querySelector(".beae-img-comp-container--second");if(V&&T){let H=function(A){let R=0,j;D(),z?O.onmouseover=function(Z){q(Z)}:A.onmousedown=function(Z){q(Z)},O.onmouseup=function(){F()},A.ontouchstart=function(Z){q(Z)},O.ontouchend=function(){F()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),A.style.left&&parseInt(A.style.left)}function q(Z){check=!1,Z.preventDefault(),Z.clientX?Z.clientX:Z.touches[0].clientX,parseInt(A.style.left),R=1,O.onmousemove=function(K){G(K)},O.ontouchmove=function(K){G(K)}}function F(){R=0,check=!0}function G(Z){if(R==0)return!1;j=J(Z),j<0&&(j=0),j>100&&(j=100),W(j)}function J(Z){const K=O.getBoundingClientRect(),le=(Z.changedTouches?Z.changedTouches[0].clientX:Z.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(le*100/I)))}function W(Z){A.style.left=Z+"%",T.style.clipPath=`polygon(${Z}% 0%, ${Z}% 100%, 100% 100%, 100% 0)`,L.style.clipPath=`polygon(0% 100%, 0% 0%, ${Z}% 0%, ${Z}% 100%)`}};V&&T&&H(V),window.addEventListener("resize",function(){V&&T&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),H(V))})}}let N=(P=M.el)==null?void 0:P.querySelector("a.beae-x-image"),E=N==null?void 0:N.getAttribute("href");N&&M.mode.value!=="builder"&&(E!=null&&E.includes("#"))&&N.addEventListener("click",O=>{let I=document.querySelector(E+","+(E==null?void 0:E.replace("#",".")));if(I)return I.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),O.preventDefault(),!1}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-81f18wf6: ', ex)
      };
    

      try {
        let argid = 'beae-81f18wf6block-imageloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-81f18wf6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-81f18wf6');
        args.el = args.els[1];
        ((M) => { var P;if(M.el){if(M.shape){const H=M.el.closest(".beae-slider-items");H&&!H.hasAttribute("data-svg")&&(H==null||H.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${M.id}" clipPathUnits="objectBoundingBox">
                                ${M.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),H.setAttribute("data-svg","true"))}let O=M.el.querySelector(".beae-image-content-position"),I,z=window.innerWidth>=768&&M.autoHover;var V=O.querySelector(".beae-img-ratio-control"),L=O.querySelector(".beae-img-comp-container"),T=O.querySelector(".beae-img-comp-container--second");if(V&&T){let H=function(A){let R=0,j;D(),z?O.onmouseover=function(Z){q(Z)}:A.onmousedown=function(Z){q(Z)},O.onmouseup=function(){F()},A.ontouchstart=function(Z){q(Z)},O.ontouchend=function(){F()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),A.style.left&&parseInt(A.style.left)}function q(Z){check=!1,Z.preventDefault(),Z.clientX?Z.clientX:Z.touches[0].clientX,parseInt(A.style.left),R=1,O.onmousemove=function(K){G(K)},O.ontouchmove=function(K){G(K)}}function F(){R=0,check=!0}function G(Z){if(R==0)return!1;j=J(Z),j<0&&(j=0),j>100&&(j=100),W(j)}function J(Z){const K=O.getBoundingClientRect(),le=(Z.changedTouches?Z.changedTouches[0].clientX:Z.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(le*100/I)))}function W(Z){A.style.left=Z+"%",T.style.clipPath=`polygon(${Z}% 0%, ${Z}% 100%, 100% 100%, 100% 0)`,L.style.clipPath=`polygon(0% 100%, 0% 0%, ${Z}% 0%, ${Z}% 100%)`}};V&&T&&H(V),window.addEventListener("resize",function(){V&&T&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),H(V))})}}let N=(P=M.el)==null?void 0:P.querySelector("a.beae-x-image"),E=N==null?void 0:N.getAttribute("href");N&&M.mode.value!=="builder"&&(E!=null&&E.includes("#"))&&N.addEventListener("click",O=>{let I=document.querySelector(E+","+(E==null?void 0:E.replace("#",".")));if(I)return I.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),O.preventDefault(),!1}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-81f18wf6: ', ex)
      };
    

      try {
        let argid = 'beae-81f18wf6block-imageloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-81f18wf6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-81f18wf6');
        args.el = args.els[2];
        ((M) => { var P;if(M.el){if(M.shape){const H=M.el.closest(".beae-slider-items");H&&!H.hasAttribute("data-svg")&&(H==null||H.closest(".beae-section").insertAdjacentHTML("beforeend",`
                            <svg width="0" height="0" style="height: 0px !important; width: 0px !important; opacity: 0 !important;">
                            <defs>
                                <clipPath id="shape-${M.id}" clipPathUnits="objectBoundingBox">
                                ${M.shape.clipPath}
                                </clipPath>
                            </defs>
                            </svg>
                        `),H.setAttribute("data-svg","true"))}let O=M.el.querySelector(".beae-image-content-position"),I,z=window.innerWidth>=768&&M.autoHover;var V=O.querySelector(".beae-img-ratio-control"),L=O.querySelector(".beae-img-comp-container"),T=O.querySelector(".beae-img-comp-container--second");if(V&&T){let H=function(A){let R=0,j;D(),z?O.onmouseover=function(Z){q(Z)}:A.onmousedown=function(Z){q(Z)},O.onmouseup=function(){F()},A.ontouchstart=function(Z){q(Z)},O.ontouchend=function(){F()};function D(){new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),A.style.left&&parseInt(A.style.left)}function q(Z){check=!1,Z.preventDefault(),Z.clientX?Z.clientX:Z.touches[0].clientX,parseInt(A.style.left),R=1,O.onmousemove=function(K){G(K)},O.ontouchmove=function(K){G(K)}}function F(){R=0,check=!0}function G(Z){if(R==0)return!1;j=J(Z),j<0&&(j=0),j>100&&(j=100),W(j)}function J(Z){const K=O.getBoundingClientRect(),le=(Z.changedTouches?Z.changedTouches[0].clientX:Z.clientX)-K.left;return Math.max(0,Math.min(100,Math.round(le*100/I)))}function W(Z){A.style.left=Z+"%",T.style.clipPath=`polygon(${Z}% 0%, ${Z}% 100%, 100% 100%, 100% 0)`,L.style.clipPath=`polygon(0% 100%, 0% 0%, ${Z}% 0%, ${Z}% 100%)`}};V&&T&&H(V),window.addEventListener("resize",function(){V&&T&&(new ResizeObserver(()=>{window.requestAnimationFrame(()=>{I=T.offsetWidth})}).observe(T),H(V))})}}let N=(P=M.el)==null?void 0:P.querySelector("a.beae-x-image"),E=N==null?void 0:N.getAttribute("href");N&&M.mode.value!=="builder"&&(E!=null&&E.includes("#"))&&N.addEventListener("click",O=>{let I=document.querySelector(E+","+(E==null?void 0:E.replace("#",".")));if(I)return I.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),O.preventDefault(),!1}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-81f18wf6: ', ex)
      };
    }; if (window.BEAEBASE) {js_28H251DQ()} else {window.BEAEPAGEJS.push(js_28H251DQ)} })(); 