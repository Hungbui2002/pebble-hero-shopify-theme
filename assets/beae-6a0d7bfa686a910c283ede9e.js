
(() => { if (window.BEAEPAGEJS === undefined) {
            window.BEAEPAGEJS = [];
          }

          if(window.beaePageSetting == undefined) {
            window.beaePageSetting = {};
          }
          
          window.beaePageSetting.pageId = "6a0d7bfa686a910c283ede9e";
              window.beaePageSetting.pageTitle = "test"; 
              window.beaePageSetting.pageType = "product";

          let js_S3LJ7NHN = () => { let BeaeUseHooks = {};
      try {
        let argid = 'beae-yz7l6pm1section-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-yz7l6pm1',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-yz7l6pm1');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-yz7l6pm1: ', ex)
      };
    

      try {
        let argid = 'beae-l3z9ob3rsection-featured-product',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-l3z9ob3r',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-l3z9ob3r');
        args.el = args.els[0];
        ((a) => { var w,$;const n=a.el.querySelector('script[data-id="Product-json-'+a.id+'"]')||a.el.querySelector("#Product-json-"+a.id);let t=!1;const o=JSON.parse(n!=null&&n.innerHTML?n==null?void 0:n.innerHTML:"{}");let r=o!=null&&o.selected_or_first_available_variant?o==null?void 0:o.selected_or_first_available_variant:(w=o.variants)==null?void 0:w[0];window.BeaeMoneyFormat||(window.BeaeMoneyFormat=($=a.el.querySelector(".beae-money-format"))==null?void 0:$.innerHTML),r&&(r=o.variants.find(C=>C.id==r.id)),x(r);function l(C){const _=a.el.querySelector(".beae-attr-sku");if(C){if(_){_.style.removeProperty("display");const M=_.querySelector(".beae-attr-value");M&&(M.innerHTML=`${C.sku?C.sku:"N/A"}`)}}else _&&(_.style.display="none")}function p(C){var _,M,V,L,T;if(C!=null&&C.unitPriceMeasurement){const N=(_=a.el)==null?void 0:_.querySelectorAll(".product__unit-price");if(N){let E="",P=window.BeaeFormatMoney(C.unitPrice);P&&typeof P=="string"&&(P=P.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")),((M=C.unitPriceMeasurement)==null?void 0:M.referenceValue)!=1&&((V=C.unitPriceMeasurement)==null?void 0:V.referenceValue)!=0&&(E+=C.unitPriceMeasurement.referenceValue),((L=C.unitPriceMeasurement)==null?void 0:L.referenceUnit)!==null&&((T=C.unitPriceMeasurement)==null?void 0:T.referenceUnit)!==""&&(E+=C.unitPriceMeasurement.referenceUnit),N.forEach(O=>{P!=null&&P!=""&&E!=null&&E!=""?O.innerHTML=`${P}/${E}`:O.innerHTML="Price per unit not available"})}}}function d(C){if(!window.BeaeMoneyFormat)return;const _=a.el.querySelectorAll(".beae-product-single__price:not(.beae-recommendation-item .beae-product-single__price)");_&&_.forEach(V=>{if(V){let L=window.BeaeFormatMoney(C.price);L&&typeof L=="string"&&(L=L.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")),V.innerHTML=L}});const M=a.el.querySelectorAll(".beae-product-single__price--regular:not(.beae-recommendation-item .beae-product-single__price--regular)");M&&M.forEach(V=>{var L,T;if(V){const N=V.parentNode;if(C.compare_at_price){V.style.display="block";let E=window.BeaeFormatMoney(C.compare_at_price);E&&typeof E=="string"&&(E=E.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")),V.innerHTML=E,(L=N==null?void 0:N.querySelector(".beae-product-single__price"))==null||L.setAttribute("data-sale",!0)}else V.style.display="none",(T=N==null?void 0:N.querySelector(".beae-product-single__price"))==null||T.removeAttribute("data-sale")}})}function c(C){var L,T,N,E;const _=a.el.querySelectorAll(".beae-product-single__price--badged"),M=parseFloat((T=(L=C.price)==null?void 0:L.toString())==null?void 0:T.replace(",","")),V=parseFloat((E=(N=C.compare_at_price)==null?void 0:N.toString())==null?void 0:E.replace(",",""));_&&_.forEach(P=>{if(!P)return;const O=P.getAttribute("type"),I=P.getAttribute("data-sale")||"",z=P.getAttribute("data-sold-out");let H="";if(O=="percent")H=Math.floor((V-M)*100/V);else if(O=="dollar"){const j=window.BeaeFormatDecimal(C.compare_at_price)-window.BeaeFormatDecimal(C.price);H=window.BeaeFormatMoney(window.BeaeReverseFormatDecimal(j))}else if(O=="none"){P.classList.remove("beae-product-single__price--sale","beae-sale-sold-out"),P.classList.add("beae-sale-hidden"),P.innerHTML="";return}const A=C.inventory_quantity,R=C.inventory_policy;if(A>0||A<1&&R=="continue"||!C.inventory_management)if(V&&V>M){P.classList.remove("beae-sale-sold-out","beae-sale-hidden"),P.classList.add("beae-product-single__price--sale");let j=I.replace(new RegExp("{\\s*?sale\\s*?}","g"),H);j&&(j=j.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")),P.innerHTML=j}else P.classList.remove("beae-product-single__price--sale","beae-sale-sold-out"),P.classList.add("beae-sale-hidden"),P.innerHTML="";else P.classList.remove("beae-sale-hidden","beae-product-single__price--sale"),P.classList.add("beae-sale-sold-out"),P.innerHTML=z})}function s(C){var L,T,N,E;const _=parseFloat((T=(L=C.price)==null?void 0:L.toString())==null?void 0:T.replace(",","")),M=parseFloat((E=(N=C.compare_at_price)==null?void 0:N.toString())==null?void 0:E.replace(",",""));let V=a.el.querySelectorAll(".beae-badged-wrapper span");V&&V.forEach(P=>{if(!P)return;const O=P.getAttribute("type"),I=P.getAttribute("data-sale")||"",z=P.getAttribute("data-sold-out");let H="";if(O=="percent")H=Math.floor((M-_)*100/M);else if(O=="dollar"){const j=window.BeaeFormatDecimal(C.compare_at_price)-window.BeaeFormatDecimal(C.price);H=window.BeaeFormatMoney(window.BeaeReverseFormatDecimal(j))}else if(O=="none"){P.classList.remove("beae-product-single__price--sale","beae-sale-sold-out"),P.classList.add("beae-sale-hidden"),P.innerHTML="";return}const A=C.inventory_quantity,R=C.inventory_policy;if(A>0||A<1&&R=="continue"||!C.inventory_management){const j=parseFloat(C.price),D=parseFloat(C.compare_at_price);if(D&&D>j){P.classList.remove("beae-sale-sold-out","beae-sale-hidden"),P.classList.add("beae-product-single__price--sale");let q=I.replace(new RegExp("{\\s*?sale\\s*?}","g"),H);q&&(q=q.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'")),P.innerHTML=q}else P.classList.remove("beae-product-single__price--sale","beae-sale-sold-out"),P.classList.add("beae-sale-hidden"),P.innerHTML=""}else P.classList.remove("beae-sale-hidden","beae-product-single__price--sale"),P.classList.add("beae-sale-sold-out"),P.innerHTML=z})}function v(C){const _=a.el.querySelectorAll(".beae-x-product-gallery .beae-slider");_&&o&&C.featured_media&&_.forEach(M=>{const V=M.getAttribute("data-desktop-layout");if(window.innerWidth>=768&&V=="grid"){const L=M.querySelector('.beae-slide-item[data-media-id="'+C.featured_media.id+'"]');Array.from(M.querySelectorAll(".beae-slide-item.beae-grid-active")).filter(function(N){return N.nodeType===1&&N!==L}).forEach(N=>{N.classList.remove("beae-grid-active")}),y=="true"&&L.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),L&&!L.classList.contains("beae-grid-active")&&L.classList.add("beae-grid-active")}else y=="true"&&M.dispatchEvent(new CustomEvent("activeSlide",{detail:{id:C.featured_media.id},bubbles:!0,cancelable:!0,composed:!1}))})}function x(C){if(a.mode.value==="builder"&&C){const F=a.el.querySelector(".beae-x-featuted_product");F==null||F.setAttribute("data-variant-id",C.id)}const _=a.el.querySelector(".beae-x-inventory");if(!_||!C)return;const M=_.children[0],V=_.getAttribute("data-in-stock-text"),L=_.getAttribute("data-out-stock-text");_.getAttribute("data-inventory-text");const T=_.getAttribute("data-pre-order-text"),N=_.getAttribute("data-very-low-stock-text"),E=_.getAttribute("data-low-stock-text"),P=_.getAttribute("data-incoming-date-text"),O=_.getAttribute("data-low-number")??20,I=_.getAttribute("data-very-low-number")??5,z=_.getAttribute("data-show-next-incoming-date"),H=_.getAttribute("data-max-number")??60,A=_.querySelector(".beae-inventory-label"),R=_.querySelector(".beae-inventory-process-body");let j=C.inventory_quantity;a.el.querySelector(".beae-x-variant")||a.el.querySelector(".beae-x-swatch-color")||a.el.querySelector(".beae-x-add-to-cart-with-option")||(j=o.variants.reduce((F,G)=>F+(G.inventory_quantity||0),0));function q(F){return F?F.replace("{quantity}",j).replace("{next_incoming_date}",C.next_incoming_date):""}!M||!A||(C.available?C.inventory_policy==="continue"&&j<1?(A.innerHTML=q(T),M.classList="",M.classList.add("beae-inventory-pre-order")):j<=I?(A.innerHTML=q(N),M.classList="",M.classList.add("beae-inventory-very-low")):j<=O?(A.innerHTML=q(E),M.classList="",M.classList.add("beae-inventory-low")):(A.innerHTML=q(V),M.classList="",M.classList.add("beae-inventory-in-stock")):C.next_incoming_date&&z?(A.innerHTML=q(P),M.classList="",M.classList.add("beae-incoming-transfer")):(A.innerHTML=q(L),M.classList="",M.classList.add("beae-inventory-out-stock")),R&&(j<=H?R.style.width=j/H*100+"%":R.style.width="100%"))}function h(C){const _=a.el.querySelector(".beae-add-to-cart--submit");if(_){const V=_.querySelector(".beae-add-to-cart-text-content");C.available?_&&(_.removeAttribute("disabled"),V&&(V.innerHTML=_.getAttribute("data-add-to-cart-text"))):_&&(a.mode.value=="live"&&_.setAttribute("disabled","disabled"),V&&(V.innerHTML=_.getAttribute("data-sold-out-text")))}const M=a.el.querySelector(".shopify-payment-button__button");M&&(C.inventory_quantity>0?M.removeAttribute("disabled"):a.mode.value=="live"&&M.setAttribute("disabled","disabled"))}function g(C){const _=a.el.querySelector(".beae-quantity-input"),M=a.el.querySelectorAll(".beae-quantity-btn");if(M&&M.forEach(V=>{C&&C.available?V.removeAttribute("disabled"):a.mode.value=="live"&&V.setAttribute("disabled","disabled")}),_){if(C)C.available?_.removeAttribute("disabled"):a.mode.value=="live"&&_.setAttribute("disabled","disabled");else{_.value=1,a.mode.value=="live"&&_.setAttribute("disabled","disabled");return}const V=C.inventory_quantity,L=C.inventory_policy;let T=9999;C.inventory_management&&L==="deny"&&(T=V),V<1&&L=="continue"&&(T=999999);let N=parseInt(_.value);N>T&&(N=T),N=isNaN(N)||!N?1:N,_.value=N,_.setAttribute("max",T)}}function u(C){if(C){let _=a.el.querySelector(".beae-pa-container");if(_&&a.mode.value=="live"){const M=_.getAttribute("data-section-id-template");_.innerHTML="";const L=window.location.pathname.split("/").filter(N=>N);let T="";L.length>0&&(L[0].length===2||/^[a-z]{2}(-[A-Z]{2})?$/.test(L[0]))&&(T=L[0]+"/"),window.fetch(window.location.origin+"/"+T+"products/"+o.handle+"?variant="+C.id+"&section_id="+M,{method:"GET",headers:{"Content-Type":"text/html"}}).then(N=>N.text()).then(N=>{let E=N.match(/<Beae-custom-liquid-pickup>(|[\s\S]+?)<\/Beae-custom-liquid-pickup>/g);E&&E[0]&&(_.innerHTML=E[0]);let P=_.querySelector(".beae-pa--btn"),O=_.querySelector(".beae-pa--detail");if(P){const I=_.closest("section.beae-section");I&&I.getAttribute("data-sectionid"),P.addEventListener("click",()=>{window.BeaePopupLibrary.createPopup(O,{layout:_.getAttribute("data-layout"),layoutMobile:"bottom",width:_.getAttribute("data-width"),id:a.id})})}}).catch(N=>{console.warn(N.message)})}}}const f=a.el.querySelector(".beae-variant-size-guide");if(f){const C=f.querySelector(".beae-variant-size-guide-btn"),_=f.querySelector(".beae-variant-size-guide-content"),M=a.el.querySelector(".beae-content-size-chart-preview");let V=window.isPreviewTemplate&&M||_;if(C&&V){const L=a.el.getAttribute("data-sectionid");C.addEventListener("click",()=>{window!=null&&window.BeaePopupLibrary&&window.BeaePopupLibrary.createPopup(V,{layout:"center",layoutMobile:"bottom",width:"auto",sectionId:L})})}}const b=a.el.querySelectorAll(".beae-custom-select_wrp");b&&b.length&&a.mode.value=="live"&&b.forEach(C=>{const _=C.querySelector("button.beae-custom-select__btn"),M=C.closest("div.beae-block.beae-core");_.addEventListener("click",function(V){C.classList.toggle("active"),M.style.position="relative",M.style.zIndex="1"}),document.addEventListener("click",function(V){C.contains(V.target)||(C.classList.remove("active"),M.style={})})});function k(){const C=a.el.querySelector(".beae-custom-select_wrp.active");C&&C.classList.remove("active")}const m=a.el.querySelector(".beae-x-variant"),y=m==null?void 0:m.getAttribute("data-scroll");let S=!1;if(m){let C=function(H,A){if(!H)return[];let R=H.options.filter((j,D)=>D!=A);return o.variants.filter(j=>R.every(D=>j.options.includes(D)))??[]},_=function(H,A,R){if(!H)return null;let j=H.options.filter((D,q)=>q!=A);return o.variants.find(D=>D.options.every(q=>[R,...j].includes(q)))},M=function(H){if(!H)return;const A=a.el.querySelector("form.beae-product-form-next");if(A){A.getAttribute("data-variant-id",H.id);const R=A.querySelector('input[type="hidden"][name="id"]');R&&R.setAttribute("value",H.id)}m.querySelectorAll(".beae-variant-label").forEach(R=>{const j=parseInt(R.getAttribute("data-option-position"))-1;R.innerHTML=H.options[j]}),P||m.querySelectorAll(".beae-product-images-list").forEach(R=>{const j=parseInt(R.getAttribute("data-option-position"))-1;let D=[];C(H,j).forEach(q=>{D.push(`
                      <span
                        class="beae-product-swatch-item-image"
                        variant-id=${q.id}
                      >
                        <img
                          src="${q.featured_image?q.featured_image.src:"//cdn.shopify.com/shopifycloud/shopify/assets/no-image-160-1cfae84eca4ba66892099dcd26e604f5801fdadb3693bc9977f476aa160931ac_120x120_crop_center.gif"}"
                          alt="${q.title}"
                          height="120"
                          width="120"
                          loading="lazy"
                        />
                      </span>
                    `)}),R.querySelectorAll(".beae-product-variant-item-image").forEach((q,F)=>{q.innerHTML=D[F]})}),m.querySelectorAll(".beae-product-variant-item").forEach(R=>{const j=parseInt(R.getAttribute("data-option-position"))-1;let D="";const q=R.getAttribute("data-value");if(q)try{D=decodeURIComponent(q)}catch{D=q}const F=_(H,j,D);F&&(R.setAttribute("data-variant-id",F.id),F.inventory_management&&F.inventory_quantity<1&&F.inventory_policy!="continue"?R.classList.add("variant-item-disable"):R.classList.remove("variant-item-disable"))})},V=function(H){H.options.forEach((A,R)=>{let j=R+1;const D=m.querySelectorAll('.beae-variant-option-list[data-option-position="'+j+'"] > li');let q=null;const F=m.querySelector("select#"+z+"-option-"+R);if(F){for(let J=0;J<D.length;J++)D[J].classList.remove("beae-product-variant-item--selected"),decodeURIComponent(D[J].getAttribute("data-value"))==A&&(q=D[J]);q&&q.classList.add("beae-product-variant-item--selected"),F.value=A}const G=q&&q.closest(".beae-custom-select_wrp");if(G){const J=q&&q.getAttribute("data-color"),W=G.querySelector(".beae-selected-color");W&&(W.style="--beae-color-variant: "+J);const Z=G.querySelector(".beae-text-selected");Z&&(Z.innerHTML=A)}})},L=function(H,A){N(H),H&&(t=!0,r=H,x(H),g(H),h(H),c(H),s(H),M(H),d(H),l(H),p(H),E?(E=!1,new URLSearchParams(window.location.search).get("variant")&&!window.noUpdateImageFirstLoad&&setTimeout(()=>{v(H)})):v(H),u(H),a.el.dispatchEvent(new CustomEvent("changeVariant",{detail:{variant:H},bubbles:!0,cancelable:!0,composed:!1})))},T=function(){const H=a.el.querySelector('.beae-product-option-cont[data-swatch-type="variant_image"]');if(!H)return;const A=H.getAttribute("data-option-position"),R="//cdn.shopify.com/shopifycloud/shopify/assets/no-image-160-1cfae84eca4ba66892099dcd26e604f5801fdadb3693bc9977f476aa160931ac_120x120_crop_center.gif",j=a.el.querySelectorAll('.beae-product-option-cont:not([data-swatch-type="variant_image"])'),D={};j&&j.length&&j.forEach(G=>{const J=G.querySelector(".beae-product-variant-item--selected");if(!J)return;const W=J.getAttribute("data-option-position"),Z=decodeURIComponent(J.getAttribute("data-value"));D["option"+W]=Z});const q=o.variants.filter(G=>Object.keys(D).every(J=>D[J]==G[J])),F=H.querySelectorAll(".beae-product-variant-item");F&&F.length&&F.forEach(G=>{const J=decodeURIComponent(G.getAttribute("data-value")),W=q.find(Z=>Z["option"+A]==J);G.querySelector("img")||(G.innerHTML=`
                          <span class="beae-product-swatch-item-image">
                          <img
                          src="${W&&W.featured_image?W.featured_image.src:R}"
                          alt="${W&&W.title}"
                          height="100"
                          width="100"
                          loading="lazy"
                          />
                      </span>
                      `)})},N=function(H){let A=o.variants,R=H&&H.option1,j=H&&H.option2;if(!H){const F=a.el.querySelector('.beae-variant-option-list[data-option-position="1"] .beae-product-variant-item--selected');F&&(R=decodeURIComponent(F.getAttribute("data-value")));const G=a.el.querySelector('.beae-variant-option-list[data-option-position="2"] .beae-product-variant-item--selected');G&&(j=decodeURIComponent(G.getAttribute("data-value")))}let D=[],q=[];if(R&&(A=o.variants.filter(F=>F.option1==R),A.forEach(F=>{F.option2&&!(D!=null&&D.includes(F.option2))&&D.push(F.option2)}),A.forEach(F=>{F.option2==j&&F.option3&&!(q!=null&&q.includes(F.option3))&&q.push(F.option3)})),[2,3].forEach(F=>{const G=a.el.querySelectorAll('.beae-variant-option-list[data-option-position="'+F+'"] .beae-product-variant-item');if(G){let J=F==2?D:q;G.forEach(W=>{const Z=decodeURIComponent(W.getAttribute("data-value"));J.includes(Z)?W.setAttribute("data-unavailable",!1):W.setAttribute("data-unavailable",!0)})}}),!H){if(D&&D.length){const F=a.el.querySelector('.beae-variant-option-list[data-option-position="2"] .beae-product-variant-item--selected[data-unavailable="false"]'),G=a.el.querySelector('.beae-variant-option-list[data-option-position="2"] .beae-product-variant-item[data-unavailable="false"]');!F&&G&&G.click()}if(q&&q.length){a.el.querySelector('.beae-variant-option-list[data-option-position="3"] .beae-product-variant-item--selected[data-unavailable="false"]');const F=a.el.querySelector('.beae-variant-option-list[data-option-position="3"] .beae-product-variant-item[data-unavailable="false"]');F&&F.click()}}T()},E=!0,P=!1,O=m.querySelector('select[name="id"]'),I=!0;a.el.addEventListener("activeVariant",function(H){if(I){I=!1;return}if(t){t=!1;return}if(!o.variants||!H.detail.id||r&&r.featured_media&&H.detail.id==r.featured_media.id)return;const A=o.variants.find(R=>!R||!R.featured_media||!R.featured_media.id||!H.detail.id?!1:R.featured_media.id==H.detail.id);!A||r.id==A.id||(V(A),N(A),r=A,x(A),g(A),h(A),M(A),d(A),c(A),s(A),u(A),l(A),p(A))});const z=O&&O.getAttribute("id");if(O&&window.Shopify&&window.Shopify.OptionSelectors){let H=function(A){var G;E=!1;const R=parseInt(A.getAttribute("data-option-position"))-1,j=m.querySelector("select#"+z+"-option-"+R);let D=A.getAttribute("data-value")??A.value,q="";try{q=decodeURIComponent(D)}catch{q=D}if(j){const J=((G=A.parentElement)==null?void 0:G.children)??[];for(let W=0;W<J.length;W++)J[W].classList.remove("beae-product-variant-item--selected");A.classList.add("beae-product-variant-item--selected"),j.value=q,j.onchange()}const F=A.closest(".beae-custom-select_wrp");if(F){const J=A.getAttribute("data-color"),W=F.querySelector(".beae-selected-color");W&&(W.style="--beae-color-variant: "+J);const Z=F.querySelector(".beae-text-selected");Z&&(Z.innerHTML=q)}};new window.Shopify.OptionSelectors(z,{product:o,onVariantSelected:L,enableHistoryState:a.mode.value=="live"}),m.querySelectorAll(".beae-product-variant-item").forEach(A=>{if(A.querySelector("a.beae-variant--link"))return;const R=A.getAttribute("data-link");A.addEventListener("click",j=>{if(j.target.closest(".beae-product-variant-item-image")){if(R&&R!=="#"){window.location.href=R;return}P=!0,H(A);return}(!R||R==="#")&&(P=!1,H(A),k())})})}}else S=!0;o.has_only_default_variant&&(S=!0),S&&B();function B(){r&&((r==null?void 0:r.title)=="Default Title"&&(r=o.variants[0]),x(r),g(r),h(r),c(r),s(r))} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-l3z9ob3r: ', ex)
      };
    

      try {
        let argid = 'beae-8s1k54j6block-gallery',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-8s1k54j6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-8s1k54j6');
        args.el = args.els[0];
        ((a) => { setTimeout(()=>{a.el.querySelector("button.beae-media-zoom")&&a.el.querySelectorAll("button.beae-media-zoom").forEach(n=>n.addEventListener("click",t=>{a.mode.value,n.closest(".beae-slider-items")&&(a.el.querySelectorAll(".beae-slider-items>*.active").forEach(b=>b.classList.remove("active")),n.parentNode.classList.add("active"));let o=document.createElement("div"),r=a.el.querySelectorAll("div.beae-slider-items > *"),l=a.el.querySelector("div.beae-slider-content").getBoundingClientRect();o.setAttribute("class","beae-sections beae-content-wrapper"),o.innerHTML=`
        <div class="${a.id}">
          <div class="beae-gallery-zoom">
            <div class="beae-gallery-zoom-content" style="transform-origin: ${l.left}px ${l.top+l.height/2}px;">
              <div class="beae-gallery-zoom-items">
                ${Array.from(r).map((b,k)=>{const m=b.getAttribute("type");return!m||(m==null?void 0:m.toLowerCase())!="image"?"":`
                    <div class="beae-gallery-zoom-item${b.classList.contains("active")?" active":""}" style="${b.classList.contains("active")?"order: -1;":""}">
                      ${b.innerHTML}
                    </div>
                  `}).join("")}
              </div>
            </div>
            <div class="beae-gallery-zoom-controls">
              <div class="beae-gallery-zoom-pagination">
                <button class="pagination_item prev">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
                <span class="pagination_item per">0 / 0</span>
                <button class="pagination_item next">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <button class="beae-gallery-zoom-close">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
            </button>
          </div>
        </div>
      `,document.body.appendChild(o),document.body.style.overflow="hidden";let p=o.querySelector("button.beae-gallery-zoom-close"),d=o.querySelector(".beae-gallery-zoom"),c=o.querySelector(".beae-gallery-zoom-content"),s=o.querySelector(".beae-gallery-zoom-pagination .pagination_item.per"),v=o.querySelector(".pagination_item.prev"),x=o.querySelector(".pagination_item.next"),h=o.querySelectorAll(".beae-gallery-zoom-item"),g=o.querySelector(".beae-gallery-zoom-controls"),u=()=>{let b=o.querySelector(".beae-gallery-zoom-item.active"),k=0;Array.from(r).forEach(m=>{var y;((y=m.getAttribute("type"))==null?void 0:y.toLowerCase())=="image"&&k++}),k<2?g.style.display="none":g.style.display="flex",s.textContent=`${Array.from(o.querySelectorAll(".beae-gallery-zoom-item")).indexOf(b)+1} / ${k}`};u(),p.addEventListener("click",b=>{d.classList.remove("opened")}),o.querySelectorAll(".beae-gallery-zoom-item img").forEach(b=>{b.addEventListener("mousemove",k=>{b.parentNode.classList.contains("beae-gallery-zoom-more")?b.parentNode.classList.contains("beae-gallery-zoom-more")&&(b.style.objectFit==="cover"?b.style.objectPosition=100*(k.clientX/b.offsetWidth)+"% "+100*((k.clientY-b.offsetTop)/b.offsetHeight)+"%":b.style.objectPosition&&(b.style.objectPosition="")):(b.parentNode.classList.add("beae-gallery-zoom-more"),b.style.cursor="zoom-in",b.addEventListener("click",m=>{b.style.objectFit==="cover"?(b.style.objectFit="contain",m.target.style.transition="",b.style.cursor="zoom-in",b.style.objectPosition=""):(b.style.objectFit="cover",b.style.cursor="zoom-out",b.style.objectPosition=100*(m.clientX/b.offsetWidth)+"% "+100*((m.clientY-b.offsetTop)/b.offsetHeight)+"%")}))})}),d.addEventListener("transitionend",b=>{b.propertyName==="opacity"&&(d.classList.contains("opened")?(p.style.opacity=1,o.querySelectorAll(".beae-gallery-zoom-item img").forEach(k=>{k.removeAttribute("srcset"),k.removeAttribute("sizes")}),o.querySelector(".beae-gallery-zoom-item.active").style.order="",c.scrollTo({left:o.querySelector(".beae-gallery-zoom-item.active").offsetLeft})):(o.remove(),document.body.style.overflow=""))});let f=0;c.addEventListener("scroll",b=>{clearTimeout(f),f=setTimeout(()=>{h.forEach(k=>{Math.abs(b.target.scrollLeft-k.offsetLeft)<2?(k.classList.add("active"),u()):k.classList.remove("active")})},250)}),v.addEventListener("click",()=>{let b=o.querySelector(".beae-gallery-zoom-item.active");if(b.previousElementSibling)b.previousElementSibling.classList.add("active");else if(h[h.length-1]&&h.length>1)h[h.length-1].classList.add("active");else return;b.classList.remove("active"),c.scrollTo({behavior:"smooth",left:o.querySelector(".beae-gallery-zoom-item.active").offsetLeft}),u()}),x.addEventListener("click",()=>{let b=o.querySelector(".beae-gallery-zoom-item.active");if(b&&b.nextElementSibling)b.nextElementSibling.classList.add("active");else if(h[0]&&h.length>1)h[0].classList.add("active");else return;b.classList.remove("active"),c.scrollTo({behavior:"smooth",left:o.querySelector(".beae-gallery-zoom-item.active").offsetLeft}),u()}),setTimeout(()=>{d.classList.add("opened")},10)}))},1e3) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-8s1k54j6: ', ex)
      };
    

      try {
        let argid = 'beae-8s1k54j6section-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-8s1k54j6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-8s1k54j6');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-8s1k54j6: ', ex)
      };
    

      try {
        let argid = 'beae-7ajqct97block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-7ajqct97',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-7ajqct97');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-7ajqct97: ', ex)
      };
    

      try {
        let argid = 'beae-dwr0spcablock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-dwr0spca',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-dwr0spca');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-dwr0spca: ', ex)
      };
    

      try {
        let argid = 'beae-6pc79yorblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-6pc79yor',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-6pc79yor');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-6pc79yor: ', ex)
      };
    

      try {
        let argid = 'beae-89dy9rkdblock-buy',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-89dy9rkd',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-89dy9rkd');
        args.el = args.els[0];
        ((c) => { c.els&&c.els.forEach(s=>{const v=s.querySelector('.beae-quantity-btn[name="plus"]'),x=s.querySelector('.beae-quantity-btn[name="minus"]'),h=s.querySelector(".beae-quantity-input");v&&x&&h&&(h.value===""&&(h.value="1"),v.addEventListener("click",function(){v.getAttribute("disabled")!="disabled"&&h.stepUp()}),x.addEventListener("click",function(){x.getAttribute("disabled")!="disabled"&&h.stepDown()}))}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-89dy9rkd: ', ex)
      };
    

      try {
        let argid = 'beae-1c123pwcblock-add-to-cart',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-1c123pwc',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-1c123pwc');
        args.el = args.els[0];
        ((y) => { if(y.mode.value=="builder"){if(!y.els)return;for(let S=0;S<y.els.length;S++)if(S==y.loopIndex){const B=y.els[S].closest("form.beae-product-form-next");if(!B)return;const w=B.querySelector(".beae-add-to-cart--submit"),$=B.getAttribute("data-product_id"),C=B.querySelector('script[data-id="Product-json-'+$+'"]')||B.querySelector("#Product-json-"+$),M=JSON.parse(C!=null&&C.innerHTML?C==null?void 0:C.innerHTML:"{}").variants||[];let V=B.getAttribute("data-variant-id"),L=M[0];V&&(L=M.find(N=>N.id==V));const T=w.querySelector(".beae-add-to-cart-text-content");L!=null&&L.available?T&&(M.length>1?T.innerHTML=w.getAttribute("data-choose-options-text"):T.innerHTML=w.getAttribute("data-add-to-cart-text")):T&&(T.innerHTML=w.getAttribute("data-sold-out-text"))}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-1c123pwc: ', ex)
      };
    

      try {
        let argid = 'beae-rtc4lf88',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-rtc4lf88',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-rtc4lf88');
        args.el = args.els[0];
        ((w) => { setTimeout(()=>{const $=w.el.querySelector(".shopify-payment-button__button","");$&&$.classList.add(w.buyItNowType)},1e3) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-rtc4lf88: ', ex)
      };
    

      try {
        let argid = 'beae-c92iwwq7section-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-c92iwwq7',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-c92iwwq7');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-c92iwwq7: ', ex)
      };
    

      try {
        let argid = 'beae-dv9o5g3bblock-textloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-dv9o5g3b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-dv9o5g3b');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-dv9o5g3b: ', ex)
      };
    

      try {
        let argid = 'beae-dv9o5g3bblock-textloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-dv9o5g3b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-dv9o5g3b');
        args.el = args.els[1];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-dv9o5g3b: ', ex)
      };
    

      try {
        let argid = 'beae-nfgbcnlrblock-local-pickup',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-nfgbcnlr',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-nfgbcnlr');
        args.el = args.els[0];
        ((data) => { let btnPopup=data.el.querySelector(".beae-pa--btn"),contentPopup=data.el.querySelector(".beae-pa--detail"),extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(t){extOptions={},console.error(t)}if(btnPopup){const t=data.el.closest("section.beae-section");let o="";t&&(o=t.getAttribute("data-sectionid")),btnPopup.addEventListener("click",()=>{window.BeaePopupLibrary.createPopup(contentPopup,{sectionId:o,...extOptions})})} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-nfgbcnlr: ', ex)
      };
    

      try {
        let argid = 'beae-d4cz9u94block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-d4cz9u94',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-d4cz9u94');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-d4cz9u94: ', ex)
      };
    

      try {
        let argid = 'beae-yxd5r8v6section-featured-collection',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-yxd5r8v6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-yxd5r8v6');
        args.el = args.els[0];
        ((a) => { var o;window.BeaeMoneyFormat&&(window.BeaeMoneyFormat=(o=a.el.querySelector(".beae-money-format"))==null?void 0:o.innerHTML);const n=a.el.closest(".beae-body--preview");if(a.mode.value=="live"){let r=a.el.querySelector(".beae-related-product-info");if(r){let l=r.getAttribute("section-id"),p=r.getAttribute("product-id");l&&p&&fetch(window.Shopify.routes.root+"recommendations/products?product_id="+p+"&section_id="+l+"&intent="+a.intent).then(d=>d.text()).then(d=>{const c=document.createElement("div");c.innerHTML=d;const s=c.querySelector("."+a.id);return new Promise(v=>{if(s){const x=s.querySelector(".beae-related-products-content"),h=a.el.querySelector(".beae-related-products-content");x&&h&&(h.innerHTML=x.innerHTML);const g=h==null?void 0:h.querySelectorAll(".beae-recommendation-item");if(g!=null&&g.length)for(let u=0;u<g.length;u++){const f=document.createElement("form");f.innerHTML=g[u].innerHTML,Array.from(g[u].attributes).forEach(b=>{f.setAttribute(b.name,b.value)}),f.setAttribute("method","post"),f.setAttribute("action","/cart/add"),g[u].replaceWith(f)}}v()})}).then(()=>{typeof window.handleSwatchForCardForm=="function"&&(window.handleEventFormProductCard(),window.handleSwatchForCardForm(a),window.BeaeSlider&&window.BeaeSlider(a))})}}else document.addEventListener("relatedReady",r=>{typeof window.handleSwatchForCardForm=="function"&&(window.handleEventFormProductCard(),window.handleSwatchForCardForm(a))});n&&setTimeout(()=>{typeof window.handleEventFormProductCard=="function"&&(window.handleEventFormProductCard(),window.handleSwatchForCardForm(a))},100),setTimeout(()=>{typeof(a==null?void 0:a.promotionPosition)=="number"&&t(a==null?void 0:a.promotionPosition)},100);function t(r){const l=a.el.querySelector(".beae-slider-items");if(!l||a.mode.value!="live")return;const p=a.el.querySelector(".beae-promotion > *"),d=l.children;r>=d.length?l.appendChild(p):l.insertBefore(p,d[r]);const c=a.el.querySelector(".beae-promotion");c&&c.remove()} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-yxd5r8v6: ', ex)
      };
    

      try {
        let argid = 'beae-yxd5r8v6section-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-yxd5r8v6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-yxd5r8v6');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-yxd5r8v6: ', ex)
      };
    

      try {
        let argid = 'beae-x38oxbx8block-image',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-x38oxbx8',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-x38oxbx8');
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
        console.error('BEAE JS ERROR ID beae-x38oxbx8: ', ex)
      };
    

      try {
        let argid = 'beae-lgc6rqv8block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-lgc6rqv8',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-lgc6rqv8');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-lgc6rqv8: ', ex)
      };
    

      try {
        let argid = 'beae-hfrasunyblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-hfrasuny',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-hfrasuny');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-hfrasuny: ', ex)
      };
    

      try {
        let argid = 'beae-05pvh6h9block-add-to-cart',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-05pvh6h9',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-05pvh6h9');
        args.el = args.els[0];
        ((y) => { if(y.mode.value=="builder"){if(!y.els)return;for(let S=0;S<y.els.length;S++)if(S==y.loopIndex){const B=y.els[S].closest("form.beae-product-form-next");if(!B)return;const w=B.querySelector(".beae-add-to-cart--submit"),$=B.getAttribute("data-product_id"),C=B.querySelector('script[data-id="Product-json-'+$+'"]')||B.querySelector("#Product-json-"+$),M=JSON.parse(C!=null&&C.innerHTML?C==null?void 0:C.innerHTML:"{}").variants||[];let V=B.getAttribute("data-variant-id"),L=M[0];V&&(L=M.find(N=>N.id==V));const T=w.querySelector(".beae-add-to-cart-text-content");L!=null&&L.available?T&&(M.length>1?T.innerHTML=w.getAttribute("data-choose-options-text"):T.innerHTML=w.getAttribute("data-add-to-cart-text")):T&&(T.innerHTML=w.getAttribute("data-sold-out-text"))}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-05pvh6h9: ', ex)
      };
    

      try {
        let argid = 'beae-qy8mcqc4block-tabs',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-qy8mcqc4',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-qy8mcqc4');
        args.el = args.els[0];
        ((data) => { const prefixClass=`div[data-id=${data.id}] > .beae-tab-wrp`;let tabs=data.el.querySelectorAll(`${prefixClass} > .beae-tab-items > .beae-tab-item`),contents=data.el.querySelectorAll(`${prefixClass} > .beae-tab-contents > .beae-tab-content`),rightside=data.el.querySelectorAll(`${prefixClass} .beae-rightside`),accordions=data.el.querySelectorAll(`${prefixClass} > .beae-tab-contents > .beae-tab-content > .beae-accordion-title--mobile`),activeTab=window.outerWidth&&window.outerWidth<=768?data.activeTabMobile:data.activeTab,toggleImg=data.toggleImg,layout=data.layout,accordionMode=data.accordionMode;function resetActive(){tabs.forEach(f=>f.classList.remove("active")),contents.forEach(f=>f.classList.remove("active")),accordions.forEach(f=>f.classList.remove("active")),toggleImg&&rightside.forEach(f=>f.classList.remove("active")),contents.forEach(f=>{const b=f.querySelector(".beae-accordion-body").style;layout=="accordions"?b.maxHeight="0px":(b.transform="scaleY(0)",b.opacity="0")})}function setActive(f){tabs[f].classList.add("active"),contents[f].classList.add("active"),accordions[f].classList.add("active"),toggleImg&&rightside[f].classList.add("active");const b=contents[f].querySelector(".beae-accordion-body");if(b){const k=b.style;layout=="accordions"?k.maxHeight=data.mode.value=="builder"?"":b.scrollHeight+"px":(k.transform="scaleY(1)",k.transformOrigin="top center",k.opacity="1")}}function removeActive(f){tabs[f].classList.remove("active"),contents[f].classList.remove("active"),accordions[f].classList.remove("active"),toggleImg&&rightside[f].classList.remove("active");const b=contents[f].querySelector(".beae-accordion-body").style;layout=="accordions"?b.maxHeight="0px":(b.transform="scaleY(0)",b.opacity="0")}resetActive(),activeTab!=="none"&&accordionMode!="popup"&&setActive(activeTab),tabs.forEach((f,b)=>{f.addEventListener("click",()=>{resetActive(),setActive(b)})});const section=data.el.closest("section.beae-section");let sectionId="";section&&(sectionId=section.getAttribute("data-sectionid"));let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(f){extOptions={},console.error(f)}if(accordions.forEach((f,b)=>{f.addEventListener("click",()=>{if(accordionMode=="popup"&&data.mode.value!="builder"){const k=f.closest(".beae-tab-content");if(k){let m=document.createElement("div");m.innerHTML=`
                            <h3 class="beae-popup__content-title">${f.querySelector("span").innerHTML}</h3>
                            <div class="beae-popup__content-body ${data.id}">${k.querySelector(".beae-accordion-body").innerHTML}</div>
                            `,window.BeaePopupLibrary.createPopup(m,{layout:extOptions.layout?extOptions.layout:"right",width:extOptions.width?extOptions.width:"400px",layoutMobile:extOptions.layoutMobile?extOptions.layoutMobile:"bottom",sectionId})}}else accordionMode=="single"?(resetActive(),setActive(b)):f.classList.contains("active")?removeActive(b):setActive(b)})}),layout=="tabs"){const f=data.el.querySelector(".beae-tab-contents"),b=f.querySelectorAll(".beae-tab-content-wrp");let k=0,m=-1;b.forEach((S,B)=>{const w=S.offsetHeight;w>k&&(m=B,k=w)}),new ResizeObserver(()=>{f.style.setProperty("--beae-tabs-max-height",`${b[m].offsetHeight}px`)}).observe(b[m])} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-qy8mcqc4: ', ex)
      };
    

      try {
        let argid = 'beae-2gy8cqv5block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-2gy8cqv5',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-2gy8cqv5');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-2gy8cqv5: ', ex)
      };
    

      try {
        let argid = 'beae-8jhx5zxmblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-8jhx5zxm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-8jhx5zxm');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-8jhx5zxm: ', ex)
      };
    

      try {
        let argid = 'beae-rbs0tz0eblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-rbs0tz0e',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-rbs0tz0e');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-rbs0tz0e: ', ex)
      };
    

      try {
        let argid = 'beae-8h8leggfblock-share',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-8h8leggf',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-8h8leggf');
        args.el = args.els[0];
        ((s) => { const v=window.location.href;if(s.type=="label_with_icon"){if(s.mode.value=="live"){let h=function(u){switch(u){case"facebook":return"https://www.facebook.com/sharer/sharer.php?u=";case"twitter":return"https://twitter.com/intent/tweet?url=";case"linkedIn":return"https://www.linkedin.com/shareArticle?mini=true&url=";case"pinterest":return"https://pinterest.com/pin/create/button/?url=";case"reddit":return"https://reddit.com/submit?url=";case"skype":return"https://web.skype.com/share?url=";case"telegram":return"https://t.me/share/url?url=";case"whatsApp":return"https://api.whatsapp.com/send/?phone&text=";case"email":return"mailto:?&subject=&cc=&bcc=&body=";default:return"#"}};const g=s.el.querySelectorAll(".beae-share-link");g.length>0&&g.forEach((u,f)=>{let b=u.getAttribute("type"),k="";k=h(b)+v,u.setAttribute("href",k)})}}else if(s.type=="copy_link"){const h=s.el.querySelector(".beae-share-wrp");h.onclick=()=>{window.navigator.clipboard.writeText(v),x()}}else{const h=s.el.querySelector(".beae-share-wrp"),g=s.el.querySelector(".beae-share-link-copy-link");if(g&&(g.innerHTML=v),navigator.share)h.addEventListener("click",()=>{navigator.share({url:v,title:document.title})});else{const u=s.el.querySelector(".beae-share--container");s.el.querySelector(".beae-share-link-copy-btn").addEventListener("click",()=>{window.navigator.clipboard.writeText(v),x(),u.classList.remove("active")}),h.addEventListener("click",()=>{u.classList.toggle("active")}),document.addEventListener("click",function(b){u.contains(b.target)||u.classList.remove("active")})}}function x(){const h=s.el.querySelector(".beae-share--toast");h&&(h.classList.add("active"),setTimeout(()=>{h.classList.remove("active")},1e3))} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-8h8leggf: ', ex)
      };
    

      try {
        let argid = 'beae-1de5iaezbutton-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-1de5iaez',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-1de5iaez');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-1de5iaez: ', ex)
      };
    

      try {
        let argid = 'beae-k0nd0oipsection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-k0nd0oip',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-k0nd0oip');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-k0nd0oip: ', ex)
      };
    

      try {
        let argid = 'beae-g2k47cjwbutton-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-g2k47cjw',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-g2k47cjw');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-g2k47cjw: ', ex)
      };
    

      try {
        let argid = 'beae-6ksweutsbutton-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-6ksweuts',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-6ksweuts');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-6ksweuts: ', ex)
      };
    

      try {
        let argid = 'beae-m0fhsk7pbutton-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-m0fhsk7p',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-m0fhsk7p');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-m0fhsk7p: ', ex)
      };
    

      try {
        let argid = 'beae-5c67qw6bbutton-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-5c67qw6b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-5c67qw6b');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-5c67qw6b: ', ex)
      };
    

      try {
        let argid = 'beae-jy3wvjv7button-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-jy3wvjv7',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-jy3wvjv7');
        args.el = args.els[0];
        ((data) => { let buttonElm=data.el.querySelector("a.beae-button-js");buttonElm==null||buttonElm.addEventListener("click",e=>{var n,t;let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(o){extOptions={},console.error(o)}if(data.mode.value==="builder")return e.preventDefault(),!1;let selector=e.currentTarget.getAttribute("href");if(selector.indexOf("#")===0&&selector!=="#"){let o=document.querySelector(selector+","+selector.replace("#","."));if(o)return o.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),e.preventDefault(),!1}if(data.type==="popup"){if(window.isPreviewTemplate){let l=data.el.querySelector(".beae-content-size-chart-preview");window.BeaePopupLibrary.createPopup(l,{id:data.id,...extOptions}),e.preventDefault();return}const o=window.createLoading(e.currentTarget);let r=(t=(n=window.BEAE_HELPER)==null?void 0:n.routes)==null?void 0:t.root_url;return window.BeaePopupLibrary.lightbox({id:data.id,url:(r!=="/"?r:"")+((data==null?void 0:data.url)??"").replace("/popup/","/?view=beae-"),...extOptions}).then(l=>{l.querySelector(".beae-product-form-next")&&window.handleEventFormProductCard(l),o.remove()}),e.preventDefault(),!1}else if(data.type==="pages"&&data.lightbox){let o=data.pageContent.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#39;/g,"'");return window.isPreviewTemplate&&(o=data.el.querySelector(".beae-content-size-chart-preview")),window.BeaePopupLibrary.createPopup(o,{id:data.id,...extOptions}),e.preventDefault(),!1}}),data.type==="popup"&&data.lightbox&&new IntersectionObserver((t,o)=>{t.forEach(r=>{r.isIntersecting&&(o.unobserve(r.target),r.target.click())})}).observe(buttonElm) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-jy3wvjv7: ', ex)
      };
    

      try {
        let argid = 'beae-qvn9rlxtblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-qvn9rlxt',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-qvn9rlxt');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-qvn9rlxt: ', ex)
      };
    

      try {
        let argid = 'beae-oi710fefblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-oi710fef',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-oi710fef');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-oi710fef: ', ex)
      };
    

      try {
        let argid = 'beae-ckgcg4j8block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ckgcg4j8',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ckgcg4j8');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ckgcg4j8: ', ex)
      };
    

      try {
        let argid = 'beae-tsaep8p9block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-tsaep8p9',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-tsaep8p9');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-tsaep8p9: ', ex)
      };
    

      try {
        let argid = 'beae-shqco350block-image',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-shqco350',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-shqco350');
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
        console.error('BEAE JS ERROR ID beae-shqco350: ', ex)
      };
    

      try {
        let argid = 'beae-obmj69nusection-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-obmj69nu',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-obmj69nu');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-obmj69nu: ', ex)
      };
    

      try {
        let argid = 'beae-o9sxyu8bblock-imageloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-o9sxyu8b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-o9sxyu8b');
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
        console.error('BEAE JS ERROR ID beae-o9sxyu8b: ', ex)
      };
    

      try {
        let argid = 'beae-fy762cwgblock-textloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-fy762cwg',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-fy762cwg');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-fy762cwg: ', ex)
      };
    

      try {
        let argid = 'beae-pl1qicwmblock-textloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-pl1qicwm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-pl1qicwm');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-pl1qicwm: ', ex)
      };
    

      try {
        let argid = 'beae-o9sxyu8bblock-imageloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-o9sxyu8b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-o9sxyu8b');
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
        console.error('BEAE JS ERROR ID beae-o9sxyu8b: ', ex)
      };
    

      try {
        let argid = 'beae-fy762cwgblock-textloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-fy762cwg',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-fy762cwg');
        args.el = args.els[1];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-fy762cwg: ', ex)
      };
    

      try {
        let argid = 'beae-pl1qicwmblock-textloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-pl1qicwm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-pl1qicwm');
        args.el = args.els[1];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-pl1qicwm: ', ex)
      };
    

      try {
        let argid = 'beae-o9sxyu8bblock-imageloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-o9sxyu8b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-o9sxyu8b');
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
        console.error('BEAE JS ERROR ID beae-o9sxyu8b: ', ex)
      };
    

      try {
        let argid = 'beae-fy762cwgblock-textloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-fy762cwg',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-fy762cwg');
        args.el = args.els[2];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-fy762cwg: ', ex)
      };
    

      try {
        let argid = 'beae-pl1qicwmblock-textloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-pl1qicwm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-pl1qicwm');
        args.el = args.els[2];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-pl1qicwm: ', ex)
      };
    

      try {
        let argid = 'beae-o9sxyu8bblock-imageloop-3',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-o9sxyu8b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-o9sxyu8b');
        args.el = args.els[3];
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
        console.error('BEAE JS ERROR ID beae-o9sxyu8b: ', ex)
      };
    

      try {
        let argid = 'beae-fy762cwgblock-textloop-3',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-fy762cwg',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-fy762cwg');
        args.el = args.els[3];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-fy762cwg: ', ex)
      };
    

      try {
        let argid = 'beae-pl1qicwmblock-textloop-3',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-pl1qicwm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-pl1qicwm');
        args.el = args.els[3];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-pl1qicwm: ', ex)
      };
    

      try {
        let argid = 'beae-xrbzd6kosection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-xrbzd6ko',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-xrbzd6ko');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-xrbzd6ko: ', ex)
      };
    

      try {
        let argid = 'beae-wl8l2zs3block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-wl8l2zs3',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-wl8l2zs3');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-wl8l2zs3: ', ex)
      };
    

      try {
        let argid = 'beae-n44ekqbwblock-tabs',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-n44ekqbw',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-n44ekqbw');
        args.el = args.els[0];
        ((data) => { const prefixClass=`div[data-id=${data.id}] > .beae-tab-wrp`;let tabs=data.el.querySelectorAll(`${prefixClass} > .beae-tab-items > .beae-tab-item`),contents=data.el.querySelectorAll(`${prefixClass} > .beae-tab-contents > .beae-tab-content`),rightside=data.el.querySelectorAll(`${prefixClass} .beae-rightside`),accordions=data.el.querySelectorAll(`${prefixClass} > .beae-tab-contents > .beae-tab-content > .beae-accordion-title--mobile`),activeTab=window.outerWidth&&window.outerWidth<=768?data.activeTabMobile:data.activeTab,toggleImg=data.toggleImg,layout=data.layout,accordionMode=data.accordionMode;function resetActive(){tabs.forEach(f=>f.classList.remove("active")),contents.forEach(f=>f.classList.remove("active")),accordions.forEach(f=>f.classList.remove("active")),toggleImg&&rightside.forEach(f=>f.classList.remove("active")),contents.forEach(f=>{const b=f.querySelector(".beae-accordion-body").style;layout=="accordions"?b.maxHeight="0px":(b.transform="scaleY(0)",b.opacity="0")})}function setActive(f){tabs[f].classList.add("active"),contents[f].classList.add("active"),accordions[f].classList.add("active"),toggleImg&&rightside[f].classList.add("active");const b=contents[f].querySelector(".beae-accordion-body");if(b){const k=b.style;layout=="accordions"?k.maxHeight=data.mode.value=="builder"?"":b.scrollHeight+"px":(k.transform="scaleY(1)",k.transformOrigin="top center",k.opacity="1")}}function removeActive(f){tabs[f].classList.remove("active"),contents[f].classList.remove("active"),accordions[f].classList.remove("active"),toggleImg&&rightside[f].classList.remove("active");const b=contents[f].querySelector(".beae-accordion-body").style;layout=="accordions"?b.maxHeight="0px":(b.transform="scaleY(0)",b.opacity="0")}resetActive(),activeTab!=="none"&&accordionMode!="popup"&&setActive(activeTab),tabs.forEach((f,b)=>{f.addEventListener("click",()=>{resetActive(),setActive(b)})});const section=data.el.closest("section.beae-section");let sectionId="";section&&(sectionId=section.getAttribute("data-sectionid"));let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(f){extOptions={},console.error(f)}if(accordions.forEach((f,b)=>{f.addEventListener("click",()=>{if(accordionMode=="popup"&&data.mode.value!="builder"){const k=f.closest(".beae-tab-content");if(k){let m=document.createElement("div");m.innerHTML=`
                            <h3 class="beae-popup__content-title">${f.querySelector("span").innerHTML}</h3>
                            <div class="beae-popup__content-body ${data.id}">${k.querySelector(".beae-accordion-body").innerHTML}</div>
                            `,window.BeaePopupLibrary.createPopup(m,{layout:extOptions.layout?extOptions.layout:"right",width:extOptions.width?extOptions.width:"400px",layoutMobile:extOptions.layoutMobile?extOptions.layoutMobile:"bottom",sectionId})}}else accordionMode=="single"?(resetActive(),setActive(b)):f.classList.contains("active")?removeActive(b):setActive(b)})}),layout=="tabs"){const f=data.el.querySelector(".beae-tab-contents"),b=f.querySelectorAll(".beae-tab-content-wrp");let k=0,m=-1;b.forEach((S,B)=>{const w=S.offsetHeight;w>k&&(m=B,k=w)}),new ResizeObserver(()=>{f.style.setProperty("--beae-tabs-max-height",`${b[m].offsetHeight}px`)}).observe(b[m])} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-n44ekqbw: ', ex)
      };
    

      try {
        let argid = 'beae-ow33w1ijblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ow33w1ij',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ow33w1ij');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ow33w1ij: ', ex)
      };
    

      try {
        let argid = 'beae-9ekgy153block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-9ekgy153',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-9ekgy153');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-9ekgy153: ', ex)
      };
    

      try {
        let argid = 'beae-c7oedpw6block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-c7oedpw6',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-c7oedpw6');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-c7oedpw6: ', ex)
      };
    

      try {
        let argid = 'beae-081c8at8block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-081c8at8',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-081c8at8');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-081c8at8: ', ex)
      };
    

      try {
        let argid = 'beae-umz433absection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-umz433ab',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-umz433ab');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-umz433ab: ', ex)
      };
    

      try {
        let argid = 'beae-0vdwcchw',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-0vdwcchw',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-0vdwcchw');
        args.el = args.els[0];
        ((y) => { var C;if(((C=y==null?void 0:y.mode)==null?void 0:C.value)=="builder"&&!(y!=null&&y.disabled))return;let S=y.el.querySelector(".beae-marquee-content"),B=S.parentNode,w=_=>{y.el.querySelectorAll(".beae-marquee-content-clone").forEach(L=>L.parentNode.removeChild(L));let M=0,V=Math.ceil((B.offsetWidth>=y.el.offsetWidth?B.offsetWidth:y.el.offsetWidth)*2/_.offsetWidth);V=V<=10?V:10;for(let L=0;L<V;L++){let T=_.cloneNode(!0);T.classList.add("beae-marquee-content-clone");const N=T.querySelectorAll("img");N.length>0&&N.forEach(E=>{E.setAttribute("loading","lazy"),E.setAttribute("load","true")}),B.appendChild(T),M<y.el.offsetWidth&&(M+=_.offsetWidth)}B.style.setProperty("--marquee-animation-duration",M/10*.01*((y==null?void 0:y.speed)??10)+"s"),B.style.setProperty("--marquee-animation-offset",-M+"px"),window.dispatchEvent(new CustomEvent("marqueeClone",{detail:{id:y==null?void 0:y.id}}))};window.addEventListener("resize",()=>{w(S)}),w(S);let $=new IntersectionObserver(_=>{_.forEach(M=>{M.intersectionRatio>0&&(w(S),M.target.querySelectorAll('[loading="lazy"]').forEach(V=>{V.removeAttribute("loading")}),$.unobserve(M.target))})},{});$.observe(B) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-0vdwcchw: ', ex)
      };
    

      try {
        let argid = 'beae-oe37graeblock-textloop-0',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-oe37grae',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-oe37grae');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-oe37grae: ', ex)
      };
    

      try {
        let argid = 'beae-oe37graeblock-textloop-1',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-oe37grae',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-oe37grae');
        args.el = args.els[1];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-oe37grae: ', ex)
      };
    

      try {
        let argid = 'beae-oe37graeblock-textloop-2',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-oe37grae',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-oe37grae');
        args.el = args.els[2];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-oe37grae: ', ex)
      };
    

      try {
        let argid = 'beae-oe37graeblock-textloop-3',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-oe37grae',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-oe37grae');
        args.el = args.els[3];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-oe37grae: ', ex)
      };
    

      try {
        let argid = 'beae-6ve4tn3psection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-6ve4tn3p',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-6ve4tn3p');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-6ve4tn3p: ', ex)
      };
    

      try {
        let argid = 'beae-ew9lhywdblock-video',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ew9lhywd',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ew9lhywd');
        args.el = args.els[0];
        ((data) => { if(data.mode.value==="builder")return;if(data.source=="self hosted"&&data.el.querySelector(".beae_video")&&data.mute){const f=data.el.querySelector(".beae_video");f.muted=!0,f.play().catch(b=>{console.warn("Autoplay bị chặn:",b)})}const playButton=data.el.querySelector(".beae-video_overlay-icon"),playIcon=playButton&&playButton.querySelector(".beae-video-icon-play"),closePlayingButton=data.el.querySelector(".beae-close-video"),closeVideoFn=()=>{let f=playButton.closest(".beae-grid-block"),b=data.el.querySelector(".beae-x-video--wrapper");b&&b.classList.remove("playing"),f&&(f.style.zIndex=""),data.lightbox&&(document.querySelector("div.beae-builder")&&(document.querySelector("div.beae-builder").style.zIndex=""),f&&f.setAttribute("style",""),document.body.style.overflow="",document.documentElement.style.overflow="");let k=data.el.querySelector(".beae_video");k&&(k.autoplay=!1,k.pause());let m=data.el.querySelector(".beae_iframe");m&&m.getAttribute("src").indexOf("&autoplay=1")>-1&&m.setAttribute("src",m.getAttribute("src").replace("&autoplay=1",""))};if(playButton&&(playIcon&&playIcon.addEventListener("click",e=>{if(data.source=="self hosted"){let f=data.el.querySelector(".beae_video");f.autoplay=!0,f.load(),playButton.classList.remove("beae-overlay"),data.play_icon&&(data.el.querySelector(".beae-video-icon-play").style.display="none")}else{let f=data.el.querySelector(".beae_iframe"),b=f.getAttribute("src")+"&autoplay=1";f.setAttribute("src",b),playButton.classList.remove("beae-overlay"),data.play_icon&&(data.el.querySelector(".beae-video-icon-play").style.display="none")}let gridBlock=playButton.closest(".beae-grid-block"),wrapper=data.el.querySelector(".beae-x-video--wrapper");if(wrapper&&wrapper.classList.add("playing"),gridBlock&&(gridBlock.style.zIndex=1e8),data.lightbox){let extOptions={};if(data.extendOptions)try{eval("extOptions = "+data.extendOptions)}catch(f){extOptions={},console.error(f)}window.BeaePopupLibrary.createPopup(data.el.querySelector(".beae-block_video-player"),{width:"1070px",sectionId:data.id,...extOptions}),closeVideoFn()}}),closePlayingButton&&closePlayingButton.addEventListener("click",closeVideoFn)),["youtube","vimeo"].includes(data.source)&&(data.autoplay||data.loop)){let f=data.el.querySelector(".beae_iframe"),b={isloop:data.loop,autoplay:data.autoplay,idBlock:data.uniqueId||data.id,controls:data.player_controls?1:0,muted:data.mute};if(data.source=="youtube"){const k=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;let m=data.srcYoutube.match(k),y=m&&m[2].length===11?m[2]:null;const S=/[?&]t=(\d+)s/,B=data.srcYoutube.match(S),w=B?B[1]:0;b.start=w,b.id=y,b.src=location.protocol+"//www.youtube.com/embed/"+y}switch(data.source){case"youtube":setTimeout(()=>{window.BEAEVIDEO.handleLoopYoutube&&window.BEAEVIDEO.handleLoopYoutube(b,data.uniqueId||data.id)});break;case"vimeo":setTimeout(()=>{window.BEAEVIDEO.handleLoopVimeo&&window.BEAEVIDEO.handleLoopVimeo(b,f)});break}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ew9lhywd: ', ex)
      };
    

      try {
        let argid = 'beae-mqyu7psfblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-mqyu7psf',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-mqyu7psf');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-mqyu7psf: ', ex)
      };
    

      try {
        let argid = 'beae-id2xretiblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-id2xreti',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-id2xreti');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-id2xreti: ', ex)
      };
    

      try {
        let argid = 'beae-f66oo3pqblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-f66oo3pq',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-f66oo3pq');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-f66oo3pq: ', ex)
      };
    

      try {
        let argid = 'beae-v9i7i2wpsection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-v9i7i2wp',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-v9i7i2wp');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-v9i7i2wp: ', ex)
      };
    

      try {
        let argid = 'beae-7jp3tw0usection-js',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-7jp3tw0u',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-7jp3tw0u');
        args.el = args.els[0];
        ((t) => { var o;if((o=t.el.querySelector(".beae-grid-system"))==null||o.addEventListener("scroll",a=>{var r,l;let n=a.target;if(!n.classList.contains("beae-grid-carousel"))return;let s=Math.round((n.scrollLeft+n.querySelector(".beae-grid-carousel__snaps").offsetLeft)/(n.offsetWidth*.8))+1;(r=t.el.querySelector(".beae-grid-carousel__pagination div.active"))==null||r.classList.remove("active"),(l=t.el.querySelector('.beae-grid-carousel__pagination div[data-index="'+s+'"]'))==null||l.classList.add("active")}),t.mode.value=="live"){const a=t.el.querySelector('.beae-section-background-video[data-device="desktop"]'),n=t.el.querySelector('.beae-section-background-video[data-device="mobile"]'),s=[];window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection&&(window.innerWidth>=768?a&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a)&&s.push("desktop"):n&&window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n)&&s.push("mobile")),(a||n)&&window.addEventListener("resize",()=>{if(window.BEAEVIDEO&&window.BEAEVIDEO.convertBackgroundSection){if(!s.includes("desktop")&&window.innerWidth>=768&&a){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideo,a);r&&(a.innerHTML=r.html,s.push("desktop"))}if(!s.includes("mobile")&&window.innerWidth<768&&n){const r=window.BEAEVIDEO.convertBackgroundSection(t.optionsVideoMobile,n);r&&(n.innerHTML=r.html,s.push("mobile"))}}})}t.el.querySelectorAll(".beae-text-highlight").forEach(a=>{new IntersectionObserver((s,r)=>{s.forEach(l=>{l.isIntersecting&&(l.target.querySelectorAll("path, line").forEach(c=>{c.style.strokeDasharray=parseFloat(c.getAttribute("data-dash-ratio")*l.target.offsetWidth*2)+"px, 999999px"}),r.unobserve(l.target))})},{root:document,rootMargin:"0px 0px -40%"}).observe(a)}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-7jp3tw0u: ', ex)
      };
    

      try {
        let argid = 'beae-hauo3d3cblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-hauo3d3c',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-hauo3d3c');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-hauo3d3c: ', ex)
      };
    

      try {
        let argid = 'beae-hsuqug7bsection-featured-collection',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-hsuqug7b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-hsuqug7b');
        args.el = args.els[0];
        ((a) => { var d;window.BeaeMoneyFormat||(window.BeaeMoneyFormat=(d=a.el.querySelector(".beae-money-format"))==null?void 0:d.innerHTML);let n=a.el.querySelectorAll(".beae-featuted-collection-nav");const t=a.el.querySelectorAll(".beae-feature-collection-tab-content"),o=a.el.querySelector(".beae-featuted-collection-nav.nav-active"),r=a.el.closest(".beae-body--preview");n.forEach((c,s)=>{a.mode.value=="live"&&!o&&(s===0?(c.classList.add("nav-active"),t[s]&&(t[s].style.display="block",t[s].setAttribute("data-active","true"))):(c.classList.remove("nav-active"),t[s]&&(t[s].style.display="none",t[s].setAttribute("data-active","false"))));let v=!1;c.addEventListener("click",()=>{if(v)return;v=!0,n.forEach(f=>{f.classList.remove("nav-active")}),c.classList.add("nav-active");const x=c.getAttribute("data-handle"),h=a.el.querySelectorAll(".viewall-link");h&&h.forEach(f=>{f.setAttribute("href",`/collections/${x}`)});const g=a.el.querySelector(`.beae-feature-collection-tab-content[data-handle="${x}"]`),u=a.el.querySelector('.beae-feature-collection-tab-content[data-active="true"]');if(a.el.querySelector(".beae-feature-collection-tab-content.content-active")!==null&&a.el.querySelector(".beae-feature-collection-tab-content.content-active").classList.remove("content-active"),u){u.setAttribute("data-active","false");const f=l(u);setTimeout(()=>{u.style.display="none",g&&(g.style.display="block"),setTimeout(()=>{g&&g.setAttribute("data-active","true"),v=!1},50)},f)}else g&&(g.style.display="block"),setTimeout(()=>{g&&g.setAttribute("data-active","true"),v=!1},50)})});function l(c){const v=window.getComputedStyle(c).getPropertyValue("transition-duration");let x=parseFloat(v)*1e3;return v.includes("s")?x=parseFloat(v)*1e3:x=parseFloat(v),x||0}setTimeout(()=>{typeof window.handleSwatchForCardForm=="function"&&window.handleSwatchForCardForm(a),typeof(a==null?void 0:a.promotionPosition)=="number"&&p(a==null?void 0:a.promotionPosition)},100),(["builder"].includes(a.mode.value)||r)&&setTimeout(()=>{typeof window.handleEventFormProductCard=="function"&&window.handleEventFormProductCard()},100);function p(c){if(a.mode.value!="live")return;const s=a.el.querySelectorAll(".beae-slider-items");if(s&&s.length){s.forEach(x=>{const h=a.el.querySelector(".beae-promotion > *");if(!h)return;const g=h.cloneNode(!0),u=x.children;c>=u.length?x.appendChild(g):x.insertBefore(g,u[c]),c===0&&(x.scrollLeft=0)});const v=a.el.querySelector(".beae-promotion");v&&v.remove()}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-hsuqug7b: ', ex)
      };
    

      try {
        let argid = 'beae-hsuqug7bsection-slide-show',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-hsuqug7b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-hsuqug7b');
        args.el = args.els[0];
        ((g) => { window.BeaeSlider&&!g.noRunJs&&window.BeaeSlider(g) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-hsuqug7b: ', ex)
      };
    

      try {
        let argid = 'beae-iy6rvt1jblock-image',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-iy6rvt1j',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-iy6rvt1j');
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
        console.error('BEAE JS ERROR ID beae-iy6rvt1j: ', ex)
      };
    

      try {
        let argid = 'beae-ndk4mj3bblock-add-to-cart',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-ndk4mj3b',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-ndk4mj3b');
        args.el = args.els[0];
        ((y) => { if(y.mode.value=="builder"){if(!y.els)return;for(let S=0;S<y.els.length;S++)if(S==y.loopIndex){const B=y.els[S].closest("form.beae-product-form-next");if(!B)return;const w=B.querySelector(".beae-add-to-cart--submit"),$=B.getAttribute("data-product_id"),C=B.querySelector('script[data-id="Product-json-'+$+'"]')||B.querySelector("#Product-json-"+$),M=JSON.parse(C!=null&&C.innerHTML?C==null?void 0:C.innerHTML:"{}").variants||[];let V=B.getAttribute("data-variant-id"),L=M[0];V&&(L=M.find(N=>N.id==V));const T=w.querySelector(".beae-add-to-cart-text-content");L!=null&&L.available?T&&(M.length>1?T.innerHTML=w.getAttribute("data-choose-options-text"):T.innerHTML=w.getAttribute("data-add-to-cart-text")):T&&(T.innerHTML=w.getAttribute("data-sold-out-text"))}} })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-ndk4mj3b: ', ex)
      };
    

      try {
        let argid = 'beae-wthnswl1block-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-wthnswl1',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-wthnswl1');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-wthnswl1: ', ex)
      };
    

      try {
        let argid = 'beae-6qaa3srmblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-6qaa3srm',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-6qaa3srm');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-6qaa3srm: ', ex)
      };
    

      try {
        let argid = 'beae-umanmz1tblock-text',
          args = window.BEAEARGS[argid];
        if (!args) {
          args = {
            id: 'beae-umanmz1t',
            mode: {value: 'live'}
          }
        };
        args.els = document.querySelectorAll('.beae-umanmz1t');
        args.el = args.els[0];
        ((P) => { var I;let O=(I=P.el)==null?void 0:I.querySelectorAll(".beae-x-text a");O==null||O.forEach(z=>{let H=z==null?void 0:z.getAttribute("href");z&&P.mode.value!=="builder"&&(H!=null&&H.includes("#"))&&z.addEventListener("click",A=>{let R=document.querySelector(H+","+(H==null?void 0:H.replace("#",".")));if(R)return R.scrollIntoView({behavior:"smooth",block:"center",inline:"center"}),A.preventDefault(),!1})}) })(args);
      }  catch (ex) {
        console.error('BEAE JS ERROR ID beae-umanmz1t: ', ex)
      };
    }; if (window.BEAEBASE) {js_S3LJ7NHN()} else {window.BEAEPAGEJS.push(js_S3LJ7NHN)} })(); 