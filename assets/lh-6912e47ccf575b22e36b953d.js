!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarousel=t()}(this,(function(){"use strict";function n(n){return"number"==typeof n}function t(n){return"string"==typeof n}function e(n){return"boolean"==typeof n}function r(n){return"[object Object]"===Object.prototype.toString.call(n)}function o(n){return Math.abs(n)}function i(n){return Math.sign(n)}function c(n,t){return o(n-t)}function u(n){return f(n).map(Number)}function s(n){return n[a(n)]}function a(n){return Math.max(0,n.length-1)}function d(n,t){return t===a(n)}function l(n,t=0){return Array.from(Array(n),((n,e)=>t+e))}function f(n){return Object.keys(n)}function p(n,t){return[n,t].reduce(((n,t)=>(f(t).forEach((e=>{const o=n[e],i=t[e],c=r(o)&&r(i);n[e]=c?p(o,i):i})),n)),{})}function m(n,t){return void 0!==t.MouseEvent&&n instanceof t.MouseEvent}function g(){let n=[];const t={add:function(e,r,o,i={passive:!0}){let c;if("addEventListener"in e)e.addEventListener(r,o,i),c=()=>e.removeEventListener(r,o,i);else{const n=e;n.addListener(o),c=()=>n.removeListener(o)}return n.push(c),t},clear:function(){n=n.filter((n=>n()))}};return t}function h(n,t,e,r){const o=g(),i=1e3/60;let c=null,u=0,s=0;function a(n){if(!s)return;c||(c=n,e(),e());const o=n-c;for(c=n,u+=o;u>=i;)e(),u-=i;r(u/i),s&&(s=t.requestAnimationFrame(a))}function d(){t.cancelAnimationFrame(s),c=null,u=0,s=0}return{init:function(){o.add(n,"visibilitychange",(()=>{n.hidden&&(c=null,u=0)}))},destroy:function(){d(),o.clear()},start:function(){s||(s=t.requestAnimationFrame(a))},stop:d,update:e,render:r}}function x(n=0,t=0){const e=o(n-t);function r(t){return t<n}function i(n){return n>t}function c(n){return r(n)||i(n)}return{length:e,max:t,min:n,constrain:function(e){return c(e)?r(e)?n:t:e},reachedAny:c,reachedMax:i,reachedMin:r,removeOffset:function(n){return e?n-e*Math.ceil((n-t)/e):n}}}function y(n,t,e){const{constrain:r}=x(0,n),i=n+1;let c=u(t);function u(n){return e?o((i+n)%i):r(n)}function s(){return c}function a(){return y(n,s(),e)}const d={get:s,set:function(n){return c=u(n),d},add:function(n){return a().set(s()+n)},clone:a};return d}function v(n,t,r,u,s,a,d,l,f,p,h,y,v,b,S,w,E,L,D){const{cross:I,direction:M}=n,A=["INPUT","SELECT","TEXTAREA"],F={passive:!1},T=g(),O=g(),P=x(50,225).constrain(b.measure(20)),z={mouse:300,touch:400},H={mouse:500,touch:600},k=S?43:25;let V=!1,B=0,C=0,N=!1,R=!1,j=!1,G=!1;function q(n){if(!m(n,u)&&n.touches.length>=2)return U(n);const t=a.readPoint(n),e=a.readPoint(n,I),r=c(t,B),o=c(e,C);if(!R&&!G){if(!n.cancelable)return U(n);if(R=r>o,!R)return U(n)}const i=a.pointerMove(n);r>w&&(j=!0),p.useFriction(.3).useDuration(.75),l.start(),s.add(M(i)),n.preventDefault()}function U(n){const t=h.byDistance(0,!1).index!==y.get(),e=a.pointerUp(n)*(S?H:z)[G?"mouse":"touch"],r=function(n,t){const e=y.add(-1*i(n)),r=h.byDistance(n,!S).distance;return S||o(n)<P?r:E&&t?.5*r:h.byIndex(e.get(),0).distance}(M(e),t),u=function(n,t){if(0===n||0===t)return 0;if(o(n)<=o(t))return 0;const e=c(o(n),o(t));return o(e/n)}(e,r),s=k-10*u,d=L+u/50;R=!1,N=!1,O.clear(),p.useDuration(s).useFriction(d),f.distance(r,!S),G=!1,v.emit("pointerUp")}function W(n){j&&(n.stopPropagation(),n.preventDefault(),j=!1)}return{init:function(n){if(!D)return;function o(o){(e(D)||D(n,o))&&function(n){const e=m(n,u);if(G=e,j=S&&e&&!n.buttons&&V,V=c(s.get(),d.get())>=2,e&&0!==n.button)return;if(function(n){const t=n.nodeName||"";return A.includes(t)}(n.target))return;N=!0,a.pointerDown(n),p.useFriction(0).useDuration(0),s.set(d),function(){const n=G?r:t;O.add(n,"touchmove",q,F).add(n,"touchend",U).add(n,"mousemove",q,F).add(n,"mouseup",U)}(),B=a.readPoint(n),C=a.readPoint(n,I),v.emit("pointerDown")}(o)}const i=t;T.add(i,"dragstart",(n=>n.preventDefault()),F).add(i,"touchmove",(()=>{}),F).add(i,"touchend",(()=>{})).add(i,"touchstart",o).add(i,"mousedown",o).add(i,"touchcancel",U).add(i,"contextmenu",U).add(i,"click",W,!0)},destroy:function(){T.clear(),O.clear()},pointerDown:function(){return N}}}function b(n,t){let e,r;function i(n){return n.timeStamp}function c(e,r){const o="client"+("x"===(r||n.scroll)?"X":"Y");return(m(e,t)?e:e.touches[0])[o]}return{pointerDown:function(n){return e=n,r=n,c(n)},pointerMove:function(n){const t=c(n)-c(r),o=i(n)-i(e)>170;return r=n,o&&(e=n),t},pointerUp:function(n){if(!e||!r)return 0;const t=c(r)-c(e),u=i(n)-i(e),s=i(n)-i(r)>170,a=t/u;return u&&!s&&o(a)>.1?a:0},readPoint:c}}function S(n,t,r,i,c,u,s){const a=[n].concat(i);let d,l,f=[],p=!1;function m(n){return c.measureSize(s.measure(n))}return{init:function(c){u&&(l=m(n),f=i.map(m),d=new ResizeObserver((r=>{(e(u)||u(c,r))&&function(e){for(const r of e){if(p)return;const e=r.target===n,u=i.indexOf(r.target),s=e?l:f[u];if(o(m(e?n:i[u])-s)>=.5){c.reInit(),t.emit("resize");break}}}(r)})),r.requestAnimationFrame((()=>{a.forEach((n=>d.observe(n)))})))},destroy:function(){p=!0,d&&d.disconnect()}}}function w(n,t,e,r,i){const c=i.measure(10),u=i.measure(50),s=x(.1,.99);let a=!1;function d(){return!a&&(!!n.reachedAny(e.get())&&!!n.reachedAny(t.get()))}return{shouldConstrain:d,constrain:function(i){if(!d())return;const a=n.reachedMin(t.get())?"min":"max",l=o(n[a]-t.get()),f=e.get()-t.get(),p=s.constrain(l/u);e.subtract(f*p),!i&&o(f)<c&&(e.set(n.constrain(e.get())),r.useDuration(25).useBaseFriction())},toggleActive:function(n){a=!n}}}function E(n,t,e,r){const o=t.min+.1,i=t.max+.1,{reachedMin:c,reachedMax:u}=x(o,i);return{loop:function(t){if(!function(n){return 1===n?u(e.get()):-1===n&&c(e.get())}(t))return;const o=n*(-1*t);r.forEach((n=>n.add(o)))}}}function L(n,t,e,r,c){const{reachedAny:u,removeOffset:a,constrain:d}=r;function l(n){return n.concat().sort(((n,t)=>o(n)-o(t)))[0]}function f(t,r){const o=[t,t+e,t-e];if(!n)return t;if(!r)return l(o);const c=o.filter((n=>i(n)===r));return c.length?l(c):s(o)-e}return{byDistance:function(e,r){const i=c.get()+e,{index:s,distance:l}=function(e){const r=n?a(e):d(e),i=t.map(((n,t)=>({diff:f(n-r,0),index:t}))).sort(((n,t)=>o(n.diff)-o(t.diff))),{index:c}=i[0];return{index:c,distance:r}}(i),p=!n&&u(i);return!r||p?{index:s,distance:e}:{index:s,distance:e+f(t[s]-l,0)}},byIndex:function(n,e){return{index:n,distance:f(t[n]-c.get(),e)}},shortcut:f}}function D(t,r,o,i,c,u,s,a){const d={passive:!0,capture:!0};let l=0;function f(n){"Tab"===n.code&&(l=(new Date).getTime())}return{init:function(p){a&&(u.add(document,"keydown",f,!1),r.forEach(((r,f)=>{u.add(r,"focus",(r=>{(e(a)||a(p,r))&&function(e){if((new Date).getTime()-l>10)return;s.emit("slideFocusStart"),t.scrollLeft=0;const r=o.findIndex((n=>n.includes(e)));n(r)&&(c.useDuration(0),i.index(r,0),s.emit("slideFocus"))}(f)}),d)})))}}}function I(t){let e=t;function r(t){return n(t)?t:t.get()}return{get:function(){return e},set:function(n){e=r(n)},add:function(n){e+=r(n)},subtract:function(n){e-=r(n)}}}function M(n,t){const e="x"===n.scroll?function(n){return`translate3d(${n}px,0px,0px)`}:function(n){return`translate3d(0px,${n}px,0px)`},r=t.style;let o=null,i=!1;return{clear:function(){i||(r.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(t){if(i)return;const c=(u=n.direction(t),Math.round(100*u)/100);var u;c!==o&&(r.transform=e(c),o=c)},toggleActive:function(n){i=!n}}}function A(n,t,e,r,o,i,c,s,a){const d=.5,l=u(o),f=u(o).reverse(),p=function(){const n=c[0];return h(g(f,n),e,!1)}().concat(function(){const n=t-c[0]-1;return h(g(l,n),-e,!0)}());function m(n,t){return n.reduce(((n,t)=>n-o[t]),t)}function g(n,t){return n.reduce(((n,e)=>m(n,t)>0?n.concat([e]):n),[])}function h(o,c,u){const l=function(n){return i.map(((e,o)=>({start:e-r[o]+d+n,end:e+t-d+n})))}(c);return o.map((t=>{const r=u?0:-e,o=u?e:0,i=u?"end":"start",c=l[t][i];return{index:t,loopPoint:c,slideLocation:I(-1),translate:M(n,a[t]),target:()=>s.get()>c?r:o}}))}return{canLoop:function(){return p.every((({index:n})=>m(l.filter((t=>t!==n)),t)<=.1))},clear:function(){p.forEach((n=>n.translate.clear()))},loop:function(){p.forEach((n=>{const{target:t,translate:e,slideLocation:r}=n,o=t();o!==r.get()&&(e.to(o),r.set(o))}))},loopPoints:p}}function F(n,t,r){let o,i=!1;return{init:function(c){r&&(o=new MutationObserver((n=>{i||(e(r)||r(c,n))&&function(n){for(const e of n)if("childList"===e.type){c.reInit(),t.emit("slidesChanged");break}}(n)})),o.observe(n,{childList:!0}))},destroy:function(){o&&o.disconnect(),i=!0}}}function T(n,t,e,r){const o={};let i,c=null,u=null,s=!1;return{init:function(){i=new IntersectionObserver((n=>{s||(n.forEach((n=>{const e=t.indexOf(n.target);o[e]=n})),c=null,u=null,e.emit("slidesInView"))}),{root:n.parentElement,threshold:r}),t.forEach((n=>i.observe(n)))},destroy:function(){i&&i.disconnect(),s=!0},get:function(n=!0){if(n&&c)return c;if(!n&&u)return u;const t=function(n){return f(o).reduce(((t,e)=>{const r=parseInt(e),{isIntersecting:i}=o[r];return(n&&i||!n&&!i)&&t.push(r),t}),[])}(n);return n&&(c=t),n||(u=t),t}}}function O(t,e,r,i,c,d,l,f,p){const{startEdge:m,endEdge:g,direction:h}=t,x=n(r);return{groupSlides:function(n){return x?function(n,t){return u(n).filter((n=>n%t==0)).map((e=>n.slice(e,e+t)))}(n,r):function(n){return n.length?u(n).reduce(((t,r,u)=>{const x=s(t)||0,y=0===x,v=r===a(n),b=c[m]-d[x][m],S=c[m]-d[r][g],w=!i&&y?h(l):0,E=o(S-(!i&&v?h(f):0)-(b+w));return u&&E>e+p&&t.push(r),v&&t.push(n.length),t}),[]).map(((t,e,r)=>{const o=Math.max(r[e-1]||0);return n.slice(o,t)})):[]}(n)}}}function P(n,e,r,f,p,m,P){const{align:z,axis:H,direction:k,startIndex:V,loop:B,duration:C,dragFree:N,dragThreshold:R,inViewThreshold:j,slidesToScroll:G,skipSnaps:q,containScroll:U,watchResize:W,watchSlides:$,watchDrag:Q,watchFocus:X}=m,Y={measure:function(n){const{offsetTop:t,offsetLeft:e,offsetWidth:r,offsetHeight:o}=n;return{top:t,right:e+r,bottom:t+o,left:e,width:r,height:o}}},J=Y.measure(e),K=r.map(Y.measure),Z=function(n,t){const e="rtl"===t,r="y"===n,o=!r&&e?-1:1;return{scroll:r?"y":"x",cross:r?"x":"y",startEdge:r?"top":e?"right":"left",endEdge:r?"bottom":e?"left":"right",measureSize:function(n){const{height:t,width:e}=n;return r?t:e},direction:function(n){return n*o}}}(H,k),_=Z.measureSize(J),nn=function(n){return{measure:function(t){return n*(t/100)}}}(_),tn=function(n,e){const r={start:function(){return 0},center:function(n){return o(n)/2},end:o};function o(n){return e-n}return{measure:function(o,i){return t(n)?r[n](o):n(e,o,i)}}}(z,_),en=!B&&!!U,rn=B||!!U,{slideSizes:on,slideSizesWithGaps:cn,startGap:un,endGap:sn}=function(n,t,e,r,i,c){const{measureSize:u,startEdge:a,endEdge:l}=n,f=e[0]&&i,p=function(){if(!f)return 0;const n=e[0];return o(t[a]-n[a])}(),m=function(){if(!f)return 0;const n=c.getComputedStyle(s(r));return parseFloat(n.getPropertyValue(`margin-${l}`))}(),g=e.map(u),h=e.map(((n,t,e)=>{const r=!t,o=d(e,t);return r?g[t]+p:o?g[t]+m:e[t+1][a]-n[a]})).map(o);return{slideSizes:g,slideSizesWithGaps:h,startGap:p,endGap:m}}(Z,J,K,r,rn,p),an=O(Z,_,G,B,J,K,un,sn,2),{snaps:dn,snapsAligned:ln}=function(n,t,e,r,i){const{startEdge:c,endEdge:u}=n,{groupSlides:a}=i,d=a(r).map((n=>s(n)[u]-n[0][c])).map(o).map(t.measure),l=r.map((n=>e[c]-n[c])).map((n=>-o(n))),f=a(l).map((n=>n[0])).map(((n,t)=>n+d[t]));return{snaps:l,snapsAligned:f}}(Z,tn,J,K,an),fn=-s(dn)+s(cn),{snapsContained:pn,scrollContainLimit:mn}=function(n,t,e,r,o){const i=x(-t+n,0),u=e.map(((n,t)=>{const{min:r,max:o}=i,c=i.constrain(n),u=!t,s=d(e,t);return u?o:s||l(r,c)?r:l(o,c)?o:c})).map((n=>parseFloat(n.toFixed(3)))),a=function(){const n=u[0],t=s(u);return x(u.lastIndexOf(n),u.indexOf(t)+1)}();function l(n,t){return c(n,t)<=1}return{snapsContained:function(){if(t<=n+o)return[i.max];if("keepSnaps"===r)return u;const{min:e,max:c}=a;return u.slice(e,c)}(),scrollContainLimit:a}}(_,fn,ln,U,2),gn=en?pn:ln,{limit:hn}=function(n,t,e){const r=t[0];return{limit:x(e?r-n:s(t),r)}}(fn,gn,B),xn=y(a(gn),V,B),yn=xn.clone(),vn=u(r),bn=h(f,p,(()=>(({dragHandler:n,scrollBody:t,scrollBounds:e,options:{loop:r}})=>{r||e.constrain(n.pointerDown()),t.seek()})(Hn)),(n=>(({scrollBody:n,translate:t,location:e,offsetLocation:r,previousLocation:o,scrollLooper:i,slideLooper:c,dragHandler:u,animation:s,eventHandler:a,scrollBounds:d,options:{loop:l}},f)=>{const p=n.settled(),m=!d.shouldConstrain(),g=l?p:p&&m,h=g&&!u.pointerDown();h&&s.stop();const x=e.get()*f+o.get()*(1-f);r.set(x),l&&(i.loop(n.direction()),c.loop()),t.to(r.get()),h&&a.emit("settle"),g||a.emit("scroll")})(Hn,n))),Sn=gn[xn.get()],wn=I(Sn),En=I(Sn),Ln=I(Sn),Dn=I(Sn),In=function(n,t,e,r,c,u){let s=0,a=0,d=c,l=u,f=n.get(),p=0;function m(n){return d=n,h}function g(n){return l=n,h}const h={direction:function(){return a},duration:function(){return d},velocity:function(){return s},seek:function(){const t=r.get()-n.get();let o=0;return d?(e.set(n),s+=t/d,s*=l,f+=s,n.add(s),o=f-p):(s=0,e.set(r),n.set(r),o=t),a=i(o),p=f,h},settled:function(){return o(r.get()-t.get())<.001},useBaseFriction:function(){return g(u)},useBaseDuration:function(){return m(c)},useFriction:g,useDuration:m};return h}(wn,Ln,En,Dn,C,.68),Mn=L(B,gn,fn,hn,Dn),An=function(n,t,e,r,o,i,c){function u(o){const u=o.distance,s=o.index!==t.get();i.add(u),u&&(r.duration()?n.start():(n.update(),n.render(1),n.update())),s&&(e.set(t.get()),t.set(o.index),c.emit("select"))}return{distance:function(n,t){u(o.byDistance(n,t))},index:function(n,e){const r=t.clone().set(n);u(o.byIndex(r.get(),e))}}}(bn,xn,yn,In,Mn,Dn,P),Fn=function(n){const{max:t,length:e}=n;return{get:function(n){return e?(n-t)/-e:0}}}(hn),Tn=g(),On=T(e,r,P,j),{slideRegistry:Pn}=function(n,t,e,r,o,i){const{groupSlides:c}=o,{min:u,max:f}=r;return{slideRegistry:function(){const r=c(i),o=!n||"keepSnaps"===t;return 1===e.length?[i]:o?r:r.slice(u,f).map(((n,t,e)=>{const r=!t,o=d(e,t);return r?l(s(e[0])+1):o?l(a(i)-s(e)[0]+1,s(e)[0]):n}))}()}}(en,U,gn,mn,an,vn),zn=D(n,r,Pn,An,In,Tn,P,X),Hn={ownerDocument:f,ownerWindow:p,eventHandler:P,containerRect:J,slideRects:K,animation:bn,axis:Z,dragHandler:v(Z,n,f,p,Dn,b(Z,p),wn,bn,An,In,Mn,xn,P,nn,N,R,q,.68,Q),eventStore:Tn,percentOfView:nn,index:xn,indexPrevious:yn,limit:hn,location:wn,offsetLocation:Ln,previousLocation:En,options:m,resizeHandler:S(e,P,p,r,Z,W,Y),scrollBody:In,scrollBounds:w(hn,Ln,Dn,In,nn),scrollLooper:E(fn,hn,Ln,[wn,Ln,En,Dn]),scrollProgress:Fn,scrollSnapList:gn.map(Fn.get),scrollSnaps:gn,scrollTarget:Mn,scrollTo:An,slideLooper:A(Z,_,fn,on,cn,dn,gn,Ln,r),slideFocus:zn,slidesHandler:F(e,P,$),slidesInView:On,slideIndexes:vn,slideRegistry:Pn,slidesToScroll:an,target:Dn,translate:M(Z,e)};return Hn}const z={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0,watchFocus:!0};function H(n){function t(n,t){return p(n,t||{})}const e={mergeOptions:t,optionsAtMedia:function(e){const r=e.breakpoints||{},o=f(r).filter((t=>n.matchMedia(t).matches)).map((n=>r[n])).reduce(((n,e)=>t(n,e)),{});return t(e,o)},optionsMediaQueries:function(t){return t.map((n=>f(n.breakpoints||{}))).reduce(((n,t)=>n.concat(t)),[]).map(n.matchMedia)}};return e}function k(n,e,r){const o=n.ownerDocument,i=o.defaultView,c=H(i),u=function(n){let t=[];return{init:function(e,r){return t=r.filter((({options:t})=>!1!==n.optionsAtMedia(t).active)),t.forEach((t=>t.init(e,n))),r.reduce(((n,t)=>Object.assign(n,{[t.name]:t})),{})},destroy:function(){t=t.filter((n=>n.destroy()))}}}(c),s=g(),a=function(){let n,t={};function e(n){return t[n]||[]}const r={init:function(t){n=t},emit:function(t){return e(t).forEach((e=>e(n,t))),r},off:function(n,o){return t[n]=e(n).filter((n=>n!==o)),r},on:function(n,o){return t[n]=e(n).concat([o]),r},clear:function(){t={}}};return r}(),{mergeOptions:d,optionsAtMedia:l,optionsMediaQueries:f}=c,{on:p,off:m,emit:h}=a,x=A;let y,v,b,S,w=!1,E=d(z,k.globalOptions),L=d(E),D=[];function I(t){const e=P(n,b,S,o,i,t,a);if(t.loop&&!e.slideLooper.canLoop()){return I(Object.assign({},t,{loop:!1}))}return e}function M(e,r){w||(E=d(E,e),L=l(E),D=r||D,function(){const{container:e,slides:r}=L,o=t(e)?n.querySelector(e):e;b=o||n.children[0];const i=t(r)?b.querySelectorAll(r):r;S=[].slice.call(i||b.children)}(),y=I(L),f([E,...D.map((({options:n})=>n))]).forEach((n=>s.add(n,"change",A))),L.active&&(y.translate.to(y.location.get()),y.animation.init(),y.slidesInView.init(),y.slideFocus.init(V),y.eventHandler.init(V),y.resizeHandler.init(V),y.slidesHandler.init(V),y.options.loop&&y.slideLooper.loop(),b.offsetParent&&S.length&&y.dragHandler.init(V),v=u.init(V,D)))}function A(n,t){const e=O();F(),M(d({startIndex:e},n),t),a.emit("reInit")}function F(){y.dragHandler.destroy(),y.eventStore.clear(),y.translate.clear(),y.slideLooper.clear(),y.resizeHandler.destroy(),y.slidesHandler.destroy(),y.slidesInView.destroy(),y.animation.destroy(),u.destroy(),s.clear()}function T(n,t,e){L.active&&!w&&(y.scrollBody.useBaseFriction().useDuration(!0===t?0:L.duration),y.scrollTo.index(n,e||0))}function O(){return y.index.get()}const V={canScrollNext:function(){return y.index.add(1).get()!==O()},canScrollPrev:function(){return y.index.add(-1).get()!==O()},containerNode:function(){return b},internalEngine:function(){return y},destroy:function(){w||(w=!0,s.clear(),F(),a.emit("destroy"),a.clear())},off:m,on:p,emit:h,plugins:function(){return v},previousScrollSnap:function(){return y.indexPrevious.get()},reInit:x,rootNode:function(){return n},scrollNext:function(n){T(y.index.add(1).get(),n,-1)},scrollPrev:function(n){T(y.index.add(-1).get(),n,1)},scrollProgress:function(){return y.scrollProgress.get(y.offsetLocation.get())},scrollSnapList:function(){return y.scrollSnapList},scrollTo:T,selectedScrollSnap:O,slideNodes:function(){return S},slidesInView:function(){return y.slidesInView.get()},slidesNotInView:function(){return y.slidesInView.get(!1)}};return M(e,r),setTimeout((()=>a.emit("init")),0),V}return k.globalOptions=void 0,k}));

/**
 * Embla Carousel Fade
 */
!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n="undefined"!=typeof globalThis?globalThis:n||self).EmblaCarouselFade=t()}(this,(function(){"use strict";function n(n,t,e){return Math.min(Math.max(n,t),e)}function t(n){return"number"==typeof n&&!isNaN(n)}function e(e={}){const o=1,i=0,r=.68;let s,l,c,a,f=[],d=0,u=0,p=0,g=!1;function y(){b(s.selectedScrollSnap(),o)}function E(){g=!1}function S(){g=!1,d=0,u=0}function h(){const n=s.internalEngine().scrollBody.duration();u=n?0:o,g=!0,n||y()}function m(n){const{scrollSnaps:e,location:o,target:i}=s.internalEngine();!t(n)||f[n]<.5||(o.set(e[n]),i.set(o))}function b(t,e){s.scrollSnapList().forEach(((r,l)=>{const c=Math.abs(e),a=f[l],u=l===t,y=n(u?a+c:a-c,i,o);f[l]=y;const E=u&&g,S=s.previousScrollSnap();E&&(f[S]=1-y),u&&function(n,t){const{index:e,dragHandler:o,scrollSnaps:i}=s.internalEngine(),r=o.pointerDown(),l=1/(i.length-1);let c=n,a=r?s.selectedScrollSnap():s.previousScrollSnap();if(r&&c===a){const n=-1*Math.sign(d);c=a,a=e.clone().set(a).add(n).get()}const f=a*l,u=(c-a)*l;p=f+u*t}(t,y),function(n){const t=s.internalEngine().slideRegistry[n],{scrollSnaps:e,containerRect:o}=s.internalEngine(),r=f[n];t.forEach((t=>{const l=s.slideNodes()[t].style,c=parseFloat(r.toFixed(2)),a=c>i,f=function(n){const{axis:t}=s.internalEngine();return`translate${t.scroll.toUpperCase()}(${t.direction(n)}px)`}(a?e[n]:o.width+2);a&&(l.transform=f),l.opacity=c.toString(),l.pointerEvents=r>.5?"auto":"none",a||(l.transform=f)}))}(l)}))}function v(){const{dragHandler:n,index:t,scrollBody:e}=s.internalEngine(),o=s.selectedScrollSnap();if(!n.pointerDown())return o;const i=Math.sign(e.velocity()),r=Math.sign(d),l=t.clone().set(o).add(-1*i).get();return i&&r?r===i?l:o:null}function x(){const{target:n,location:e}=s.internalEngine(),i=n.get()-e.get(),c=Math.abs(i)>=1,a=v(),p=!t(a);return function(n){const{dragHandler:e,scrollBody:i}=n.internalEngine(),s=e.pointerDown(),c=i.velocity(),a=i.duration(),p=v(),g=!t(p);if(s){if(!c)return;d+=c,u=Math.abs(c/l),m(p)}if(!s){if(!a||g)return;u+=(o-f[p])/a,u*=r}g||b(p,u)}(s),!p&&!c&&f[a]>.999}function M(){return p}return{name:"fade",options:e,init:function(t){s=t;const e=s.selectedScrollSnap(),{scrollBody:r,containerRect:d,axis:u}=s.internalEngine(),p=u.measureSize(d);l=n(.75*p,200,500),g=!1,f=s.scrollSnapList().map(((n,t)=>t===e?o:i)),c=r.settled,a=s.scrollProgress,r.settled=x,s.scrollProgress=M,s.on("select",h).on("slideFocus",y).on("pointerDown",S).on("pointerUp",E),function(){const{translate:n,slideLooper:t}=s.internalEngine();n.clear(),n.toggleActive(!1),t.loopPoints.forEach((({translate:n})=>{n.clear(),n.toggleActive(!1)}))}(),y()},destroy:function(){const{scrollBody:n}=s.internalEngine();n.settled=c,s.scrollProgress=a,s.off("select",h).off("slideFocus",y).off("pointerDown",S).off("pointerUp",E),s.slideNodes().forEach((n=>{const t=n.style;t.opacity="",t.transform="",t.pointerEvents="",n.getAttribute("style")||n.removeAttribute("style")}))}}}return e.globalOptions=void 0,e}));
window.LayoutHubSlider = (wrapper) => {
  const container = wrapper.querySelector(".lh-slider-container");
  if (!container || container.getAttribute("data-lh-slider-initialized") === "true") return;
  container.setAttribute("data-lh-slider-initialized", "true");
  // =====================
  // Local State
  // =====================
  let embla = null;
  let dots = [];
  let autoplayInterval = null;
  let autoplayTimeout = null;
  let autoplayDelay = 3000;
  let lastStartTime = null;
  let remainingTime = null;
  let boundEmblaNode = null;
  let progressValue = 0;
  let progressRAF = null;
  let isHovering = false;
  let stopAtEnd = false;
  // =====================
  // Utils
  // =====================
  function parseTransition(value) {
    if (!value) return 3000;
    value = value.trim();
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) * 1000;
  }
  function getItemsPerView(width, node) {
    const desktop = parseInt(node.getAttribute("data-item") || 1, 10);
    const tablet = parseInt(node.getAttribute("data-item-tablet") || 1, 10);
    const mobile = parseInt(node.getAttribute("data-item-mobile") || 1, 10);
    return width >= 1024 ? desktop : width >= 640 ? tablet : mobile;
  }
  function getPaginationViewWidth(node, defaultWidth = 80) {
    const raw = parseFloat(node.getAttribute("data-pagination-width"));
    return isNaN(raw) ? defaultWidth : raw;
  }
  function isSliderLayout(width, node) {
    const desktopLayout = node.getAttribute("data-desktop-layout");
    const tabletLayout = node.getAttribute("data-tablet-layout");
    const mobileLayout = node.getAttribute("data-mobile-layout");
  
    if (width >= 1024) {
      return desktopLayout === "slider";
    } else if (width >= 640) {
      const layout = tabletLayout || desktopLayout;
      return layout === "slider";
    } else {
      return mobileLayout === "slider";
    }
  }

  // =====================
  // Autoplay
  // =====================
  function resetProgress() {
    progressValue = 0;
    updateProgressBarUI(progressValue);
  }
  function animateProgressBar() {
    cancelAnimationFrame(progressRAF);
    const step = () => {
      if (!embla) return;
      const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
      if (!emblaNode) return;
      const width = window.innerWidth;
      const isLoopEnabled = embla?.internalEngine()?.options?.loop;
      const selectedIndex = embla.selectedScrollSnap();
      const totalSlides = embla.slideNodes().length;
      const itemsPerView = getItemsPerView(width, emblaNode);
      const isAtLastSlide = selectedIndex >= totalSlides - itemsPerView;
      if (isHovering || stopAtEnd) {
        updateProgressBarUI(progressValue);
        progressRAF = requestAnimationFrame(step);
        return;
      }
      // time elapsed since last start
      const elapsed = Date.now() - lastStartTime;
      progressValue = Math.min(((elapsed) / autoplayDelay) * 100, 100);
      updateProgressBarUI(progressValue);
      if (elapsed >= autoplayDelay) {
        if (!isLoopEnabled && isAtLastSlide) {
          stopAtEnd = true;
          return;
        }
        embla?.scrollNext();
        lastStartTime = Date.now();
        progressValue = 0;
      }
      progressRAF = requestAnimationFrame(step);
    };

    progressRAF = requestAnimationFrame(step);
  }
  function updateProgressBarUI(value) {
    const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
    const controls = wrapper.querySelector(".lh-slider-controls");
    if (!emblaNode || !controls) return;
    const autoplayEnabled = emblaNode.getAttribute("data-play") === "true";
    controls.style.setProperty("--progress", autoplayEnabled ? `${value}` : "100");
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
    if (remainingTime != null) {
      lastStartTime = Date.now() - (autoplayDelay - remainingTime);
    } else {
      lastStartTime = Date.now();
    }
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
    if (autoplay && node) {
      startAutoplay();
      node.addEventListener("mouseenter", onMouseEnterPause);
      node.addEventListener("mouseleave", onMouseLeaveResume);
      boundEmblaNode = node;
    }
  }
  function onMouseEnterPause() {
    isHovering = true;
    pauseAutoplay();
  }
  function onMouseLeaveResume() {
    isHovering = false;
    if (!stopAtEnd) {
      resumeAutoplay();
    }
  }

  // =====================
  // UI Helpers
  // =====================
  function updateSlideActive(itemsPerView, isFade) {
    if (!embla) return;
    const slides = embla.slideNodes();
    const totalSlides = slides.length;
    const selectedIndex = embla.selectedScrollSnap();
    const isLoop = embla.internalEngine().options.loop;
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "active-prev", "active-next","active-main");
    });
    slides[selectedIndex]?.classList.add("active-main");
    if (isFade) {
      const currentSlide = slides[selectedIndex];
      if (currentSlide) {
        currentSlide.classList.add("active");
      }
      const prevIndex = (selectedIndex - 1 + totalSlides) % totalSlides;
      const nextIndex = (selectedIndex + 1) % totalSlides;
      slides[prevIndex]?.classList.add("active-prev");
      slides[nextIndex]?.classList.add("active-next");
    } else {
      const activeIndexes = Array.from({ length: itemsPerView }, (_, i) =>
        isLoop
          ? (selectedIndex + i) % totalSlides
          : selectedIndex + i
      );
      const prevIndex = isLoop
        ? (selectedIndex - 1 + totalSlides) % totalSlides
        : selectedIndex - 1;
      const nextIndex = isLoop
        ? (selectedIndex + itemsPerView) % totalSlides
        : selectedIndex + itemsPerView;
      slides.forEach((slide, index) => {
        if (activeIndexes.includes(index)) {
          slide.classList.add("active");
        } else if (index === prevIndex) {
          slide.classList.add("active-prev");
        } else if (index === nextIndex) {
          slide.classList.add("active-next");
        }
      });
    }
  }

  function createPagination(wrapper, emblaNode, paginationType, totalPages) {
    const paginationWrapper = wrapper.querySelector(".lh-slider-pagination-wrapper");
    if (!paginationWrapper) return { dotsArr: [], paginationWrapperInner: null };
    paginationWrapper.innerHTML = "";
    let paginationWrapperInner = null;
    let dotsArr = [];
    const enableSvg = paginationWrapper.dataset.paginationSvg === "true";
    const appendSvgToDot = (dot) => {
      if (!(paginationType === "dots" || paginationType === "numbers")) return;
      if (!enableSvg) return;
      if (dot.querySelector(".circular-progress")) return;
  
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "circular-progress");
      svg.setAttribute("aria-hidden", "true");
      svg.style.pointerEvents = "none";
  
      const bg = document.createElementNS(svgNS, "circle");
      bg.setAttribute("cx", "50");
      bg.setAttribute("cy", "50");
      bg.setAttribute("r", "45");
      bg.setAttribute("class", "circular-progress__bg");
  
      const fg = document.createElementNS(svgNS, "circle");
      fg.setAttribute("cx", "50");
      fg.setAttribute("cy", "50");
      fg.setAttribute("r", "45");
      fg.setAttribute("class", "circular-progress__fg");
  
      svg.appendChild(bg);
      svg.appendChild(fg);
      dot.appendChild(svg);
    };
    if (paginationType === "dynamic-dots") {
      const VIEW_WIDTH = getPaginationViewWidth(emblaNode);
      paginationWrapper.style.position = "relative";
      paginationWrapper.style.overflow = "hidden";
      paginationWrapper.style.width = `${VIEW_WIDTH}px`;
      paginationWrapperInner = document.createElement("div");
      paginationWrapperInner.classList.add("w-full", "pagination-bullets-dynamic");
      paginationWrapperInner.style.display = "flex";
      paginationWrapperInner.style.position = "relative";
      paginationWrapperInner.style.transition = "left 0.3s ease";
      paginationWrapper.appendChild(paginationWrapperInner);
      dotsArr = Array.from({ length: totalPages }, (_, i) => {
        const dot = document.createElement("span");
        dot.className = "lh-slider-pagination";
        dot.addEventListener("click", () => embla.scrollTo(i));
        paginationWrapperInner.appendChild(dot);
        return dot;
      });
    } else {
      paginationWrapper.style.width = "auto";
      dotsArr = Array.from({ length: totalPages }, (_, i) => {
        const dot = document.createElement("span");
        dot.className = "lh-slider-pagination";
        if (paginationType === "numbers") dot.textContent = i + 1;
        dot.addEventListener("click", () => embla.scrollTo(i));
        paginationWrapper.appendChild(dot);
        appendSvgToDot(dot);
        return dot;
      });
    }
    return { dotsArr, paginationWrapperInner };
  }
  function updateProgress(wrapper, selectedIndex, totalPages) {
    const progressWrapper = wrapper.querySelector(".lh-slider-pagination-progress");
    if (!progressWrapper) return;
    const progressEl = progressWrapper.querySelector("span");
    if (!progressEl) return;
    const type = progressWrapper.getAttribute("data-progress") || "grow";
    const stepPercent = 100 / totalPages;
    if (type === "slider") {
      progressEl.style.width = `${stepPercent}%`;
      progressEl.style.left = `${selectedIndex * stepPercent}%`;
    } else {
      const percent = ((selectedIndex + 1) / totalPages) * 100;
      progressEl.style.width = `${percent}%`;
      progressEl.style.left = "0";
    }
  }
  // =====================
  // Main Init
  // =====================
  function initSlider() {
    const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
    if (!emblaNode) return;
    const width = window.innerWidth;
    // Non-slider layout
    if (!isSliderLayout(width, emblaNode)) {
      embla?.destroy();
      embla = null;
      wrapper.querySelector(".lh-slider-pagination-wrapper")?.replaceChildren();
      const controls = wrapper.querySelector(".lh-slider-controls");
      controls?.removeAttribute("show-desktop");
      controls?.removeAttribute("show-tablet");
      controls?.removeAttribute("show-mobile");
      setupAutoplay(null, false, 3000);
      return;
    }
    // Config
    const slidesToScrollRaw = parseInt(emblaNode.getAttribute("data-scroll") || "1", 10);
    const alignValue = emblaNode.getAttribute("data-align") || "start";
    const paginationType = emblaNode.getAttribute("data-pagination") || "dots";
    const autoplay = emblaNode.getAttribute("data-play") === "true";
    const transition = parseTransition(emblaNode.getAttribute("data-transition"));
    const effect = emblaNode.getAttribute("data-effect") || "slide";
    const isFade = effect === "fade";
    let itemsPerView = getItemsPerView(width, emblaNode);
    const slidesToScroll = isFade ? 1 : Math.min(slidesToScrollRaw, itemsPerView);
    const totalItems = emblaNode.querySelectorAll(".lh-slide-item").length;
    let isLoop = emblaNode.getAttribute("data-loop") === "true";
    if (totalItems <= itemsPerView) {
      isLoop = false;
    }
    emblaNode.setAttribute("data-init-loop", isLoop);
    // Init Embla
    embla?.destroy();
    embla = EmblaCarousel(
      emblaNode,
      {
        loop: isLoop,
        slidesToScroll,
        draggable: !isFade,
        dragFree: false,
        containScroll: isFade ? false : "trimSnaps",
        align: alignValue,
      },
      isFade ? [EmblaCarouselFade()] : []
    );
    wrapper.embla = embla;
    // Direction attribute
    let lastIndex = embla.selectedScrollSnap();
    embla.on("select", () => {
      const selectedIndex = embla.selectedScrollSnap();
      const totalSlides = embla.slideNodes().length;
      const width = window.innerWidth;
      const itemsPerView = getItemsPerView(width, emblaNode);
      emblaNode.setAttribute("data-dir", selectedIndex > lastIndex ? "left" : "right");
      if (stopAtEnd && selectedIndex < totalSlides - itemsPerView) {
        stopAtEnd = false;
        resumeAutoplay();
        animateProgressBar();
      }
      remainingTime = autoplayDelay;
      lastStartTime = Date.now();
      lastIndex = selectedIndex;
      resetProgress();
    });
    // Pagination
    if (isFade) itemsPerView = 1;
    const getTotalPages = () => embla.scrollSnapList().length;
    let { dotsArr, paginationWrapperInner } = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
    dots = dotsArr;
    // Update UI
    function updateUI() {
      const selectedIndex = embla.selectedScrollSnap();
      const totalPages = getTotalPages();
      const dots = wrapper.querySelectorAll(".lh-slider-pagination");
      const paginationTotalEl = wrapper.querySelector(".lh-slider-pagination-total span");
      if (paginationTotalEl) paginationTotalEl.textContent = `${selectedIndex + 1}/${totalPages}`;
      dots.forEach((dot, i) => {
        dot.className = "lh-slider-pagination";
        if (i === selectedIndex) dot.classList.add("active");
        else if (i === selectedIndex - 1) dot.classList.add("prev");
        else if (i === selectedIndex - 2) dot.classList.add("prev-prev");
        else if (i === selectedIndex + 1) dot.classList.add("next");
        else if (i === selectedIndex + 2) dot.classList.add("next-next");
      });
      updateProgress(wrapper, selectedIndex, totalPages);
      // Dynamic dots move
      if (paginationType === "dynamic-dots" && paginationWrapperInner) {
        const realDots = wrapper.querySelectorAll(".lh-slider-pagination");
        if (!realDots) return;
        const style = getComputedStyle(realDots[0]);
        const DOT_SIZE = parseFloat(style.width) || 0;
        const DOT_MARGIN = parseFloat(style.marginLeft) || 0;
        const DOT_FULL = DOT_SIZE + DOT_MARGIN * 2;
        const baseOffset = DOT_FULL * 2;
        const offset = baseOffset - selectedIndex * DOT_FULL;
        realDots.forEach(dot => {
          dot.style.left = `${offset}px`;
        });
      }
      // Controls visibility
      const controls = wrapper.querySelector(".lh-slider-controls");
      setTimeout(() => {
        if (controls) {
          controls.removeAttribute("show-desktop");
          controls.removeAttribute("show-tablet");
          controls.removeAttribute("show-mobile");
          if (width >= 1024 && totalItems > getItemsPerView(1024, emblaNode)) {
            controls.setAttribute("show-desktop", "true");
          } else if (width >= 640 && width <= 1023 && totalItems > getItemsPerView(640, emblaNode)) {
            controls.setAttribute("show-tablet", "true");
          } else if (width <= 767 && totalItems > getItemsPerView(375, emblaNode)) {
            controls.setAttribute("show-mobile", "true");
          }
          if (controls) {
            controls.style.setProperty("--height-controls", `${controls.offsetHeight}px`);
          }
        }
      }, 100);
      const btnPrev = wrapper.querySelector(".lh-slider-nav-left");
      const btnNext = wrapper.querySelector(".lh-slider-nav-right");
      if (btnPrev) {
        btnPrev.disabled = !embla.canScrollPrev();
        btnPrev.classList.toggle("disabled", !embla.canScrollPrev());
      }
      if (btnNext) {
        btnNext.disabled = !embla.canScrollNext();
        btnNext.classList.toggle("disabled", !embla.canScrollNext());
      }
      updateSlideActive(itemsPerView, isFade);
    }
    wrapper.querySelector(".lh-slider-nav-left")?.addEventListener("click", embla.scrollPrev);
    wrapper.querySelector(".lh-slider-nav-right")?.addEventListener("click", embla.scrollNext);
    embla.on("select", updateUI);
    embla.on("reInit", () => {
      setupAutoplay(
        embla.containerNode(),
        embla.containerNode().getAttribute("data-play") === "true",
        parseTransition(embla.containerNode().getAttribute("data-transition"))
      );
      resetProgress();
      dots.forEach(dot => dot.removeEventListener("click", () => { }));
      dots = [];
      const result = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
      dots = result.dotsArr;
      paginationWrapperInner = result.paginationWrapperInner;
      updateUI();
    });
    setupAutoplay(emblaNode, autoplay, transition);
    resetProgress();
    updateUI();
    if (wrapper.emblaThumb) {
      wrapper.emblaThumb.destroy();
      wrapper.emblaThumb = null;
    }
    // Thumbnails
    function initEmblaThumbs(wrapper) {
      const mediaProduct = wrapper.querySelector('.lh-media-product');
      const emblaThumbNode = wrapper.querySelector('.lh-product-thumb-slide');
      if (!emblaThumbNode) return;
      const viewportWidth = window.innerWidth;
      const isVertical =
        viewportWidth > 640 &&
        mediaProduct?.dataset.positionThumbs !== 'bottom';
      const OPTIONS_THUMBS = {
        dragFree: true,
        containScroll: 'keepSnaps',
        selectedClass: 'is-active',
        axis: isVertical ? 'y' : 'x',
      };
      if (wrapper.emblaThumb) {
        wrapper.emblaThumb.destroy();
        wrapper.emblaThumb = null;
      }
      const emblaThumb = EmblaCarousel(emblaThumbNode, OPTIONS_THUMBS);
      wrapper.emblaThumb = emblaThumb;
      const syncThumbs = () => {
        const index = wrapper.embla.selectedScrollSnap();
        emblaThumb.slideNodes().forEach((thumb, i) => {
          thumb.classList.toggle('is-active', i === index);
        });
        emblaThumb.scrollTo(index);
      };
      wrapper.embla.on('select', syncThumbs);
      syncThumbs();
      emblaThumb.slideNodes().forEach((thumb, index) => {
        thumb.addEventListener('click', () => wrapper.embla.scrollTo(index));
      });
    }
    // --- Init
    initEmblaThumbs(wrapper);
    // --- Resize observer
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => initEmblaThumbs(wrapper), 300);
    });
    // --- Mutation observer
    const mediaProductEl = wrapper.querySelector('.lh-media-product');
    if (mediaProductEl) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-position-thumbs'
          ) {
            initEmblaThumbs(wrapper);
          }
        }
      });
      observer.observe(mediaProductEl, {
        attributes: true,
        attributeFilter: ['data-position-thumbs'],
      });
    }
    // Editor support
    function attachActivatedObserver(embla) {
      const items = embla.slideNodes();
      if (!items.length) return;
      const activatedObserver = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-lh-block-activated"
          ) {
            const activatedItem = mutation.target;
            if (activatedItem.getAttribute("data-lh-block-activated") === "true") {
              const index = Array.from(items).indexOf(activatedItem);
              if (index !== -1) {
                embla.scrollTo(index, true)
              }
            }
          }
        }
      });
      items.forEach(item => {
        activatedObserver.observe(item, {
          attributes: true,
          attributeFilter: ["data-lh-block-activated"],
        });
      });
    }
    function observeItemReorder(embla, wrapper) {
      let debounceTimer = null;
      const reorderObserver = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          attachActivatedObserver(embla);
        }, 1000);
      });
      reorderObserver.observe(wrapper, {
        childList: true,
        subtree: true,
      });
    }
    attachActivatedObserver(embla);
    observeItemReorder(embla, embla.containerNode());
  }

  // =====================
  // Resize debounce
  // =====================
  let resizeTimeout;
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth) >= 100) {
        let hasActivated = emblaNodeObserver.querySelector('[data-lh-block-activated]');
        if (hasActivated) {
          setTimeout(() => {
            let activeItem = emblaNodeObserver.querySelector(".lh-slide-item.active");
            if (activeItem) {
              activeItem.click();
            }
          }, 50);
        }
        initSlider();
        lastWidth = currentWidth;
      }
    }, 100);
  });

  // =====================
  // Mutation observer for attrs
  // =====================
  const emblaNodeObserver = wrapper.querySelector(".lh-slider-wrapper");
  if (emblaNodeObserver) {
    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some((m) =>
          [
            "data-loop", "data-effect", "data-align", "data-scroll",
            "data-pagination-width", "data-pagination",
            "data-item", "data-item-table", "data-item-mobile",
            "data-play", "data-transition",
            "data-desktop-layout", "data-mobile-layout",
            "data-position-thumbs"
          ].includes(m.attributeName)
        )
      ) {
        initSlider();
      }
    });
    observer.observe(emblaNodeObserver, { attributes: true });
  }
  initSlider();
};

try {
((wrapper, mode) => {/* LayoutHub assets/product-form.js */
const settingsEl = document.querySelector('#money-settings');
let rawFormat = settingsEl?.dataset.format || '{{amount}}';
rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, '');
const moneyFormat = rawFormat;

const currency = settingsEl?.dataset.currency || 'USD';

function formatMoney(cents, format = moneyFormat) {
  if (typeof cents === 'string') cents = cents.replace('.', '');
  cents = isNaN(cents) ? 0 : parseInt(cents, 10);

  function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
    const factor = Math.pow(10, precision);
    number = (Math.round(number * factor) / factor).toFixed(precision);

    const parts = number.split('.');
    const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    const centsPart = parts[1] ? decimal + parts[1] : '';

    return dollars + centsPart;
  }

  return format.replace(/{{\s*(\w+)\s*}}/g, (match, token) => {
    switch (token) {
      case 'amount':
        return formatWithDelimiters(cents / 100, 2);
      case 'amount_no_decimals':
        return formatWithDelimiters(cents / 100, 0);
      case 'amount_with_comma_separator':
        return formatWithDelimiters(cents / 100, 2, '.', ',');
      case 'amount_no_decimals_with_comma_separator':
        return formatWithDelimiters(cents / 100, 0, '.', ',');
      case 'currency':
        return currency;
      default:
        return formatWithDelimiters(cents / 100, 2);
    }
  });
}


// ========== Setup ==========
const productData = JSON.parse(wrapper.querySelector('#product-json-data').textContent);
const radios = wrapper.querySelectorAll('.lh-swatch input[type="radio"]');
const selects = wrapper.querySelectorAll('.lh-swatch-product-detail .single-option-selector');
const form = wrapper.querySelector('#add-to-cart-form');
const idInput = form?.querySelector('input[name="id"]');
let currentVariant = null;
const inventoryDefaultEl = wrapper.querySelector('.details-pro .lh-product-inventory .inventory-default');
const lowStockEl = wrapper.querySelector('.details-pro .lh-product-inventory .low-stock');
const inStockEl = wrapper.querySelector('.details-pro .lh-product-inventory .in-stock');
const lowStockTemplate = lowStockEl?.innerHTML || '';
const inStockTemplate = inStockEl?.innerHTML || '';
const errorMessage = wrapper.querySelector('.lh-error-message');
const maxMessage = errorMessage?.innerHTML || '';

// ========== Quantity Controls ==========
const quantityContainers = wrapper.querySelectorAll('.lh-product_quantity');
quantityContainers.forEach(container => {
  const input = container.querySelector('.qty-input');
  const btnIncrease = container.querySelector('.increase');
  const btnDecrease = container.querySelector('.reduced');

  btnIncrease?.addEventListener('click', () => {
    let qty = parseInt(input.value, 10);
    if (!isNaN(qty)) input.value = qty + 1;
  });

  btnDecrease?.addEventListener('click', () => {
    let qty = parseInt(input.value, 10);
    if (!isNaN(qty) && qty > 1) input.value = qty - 1;
  });

  input?.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
});

// ========== Helpers ==========
function syncSwatchInputs(variant) {
  variant.options.forEach((value, index) => {
    const swatch = wrapper.querySelector(`.lh-swatch[data-option-index="${index}"]`);
    if (swatch) {
      const radio = swatch.querySelector(`input[value="${value}"]`);
      if (radio) radio.checked = true;
    }
  });
}

function updateQuantityErrorHandler() {
  const quantityInput = wrapper.querySelector('.qty-input');
  const errorWrapper = wrapper.querySelector('.lh-error-message-wrapper');

  if (!quantityInput || !errorWrapper || !errorMessage || !form) return;

  errorWrapper.style.display = 'none';

  if (!form.dataset.listenerAttached) {
    form.addEventListener('submit', function (e) {
      const inputQty = parseInt(quantityInput.value, 10);
      const maxQty = currentVariant?.inventory_quantity ?? 0;

      if (currentVariant?.available && inputQty > maxQty) {
        e.preventDefault();
        errorWrapper.style.display = 'flex';
        errorMessage.innerHTML = maxMessage.replace('[quantity]', maxQty);
      }
    });
    form.dataset.listenerAttached = 'true';
  }
}

function updateVariantUI(variant) {
  currentVariant = variant;

  const priceBox = wrapper.querySelector('.details-pro .lh-price-taxes');
  const priceEl = wrapper.querySelector('.details-pro .lh-main-product-price .lh-special-price .lh-price');
  const compareEl = wrapper.querySelector('.details-pro .lh-main-product-price .lh-old-price .lh-price');
  const buttonActions = wrapper.querySelector('.button_actions');
  const addToCartBtn = buttonActions?.querySelector('.btn-cart');
  const buyNowBtn = buttonActions?.querySelector('.btn_buy_now');
  const stock = wrapper.querySelector('.details-pro .lh-product-inventory');
  const contactText = wrapper.querySelector('.data-tex-locales')?.dataset.textContact || 'Contact';
  const outOfStockEl = stock?.querySelector('.out-of-stock');
  const skuEl = wrapper.querySelector('.variant-sku');

  const quantity = variant.inventory_quantity ?? 0;
  const stockThreshold = parseInt(stock?.getAttribute('data-stock-threshold')) || 20;

  // SKU
  if (skuEl && variant.sku) skuEl.textContent = variant.sku;

  // Price & availability
  if (!variant.available) {
    compareEl && (compareEl.style.display = 'none');
    addToCartBtn && (addToCartBtn.disabled = true);
    buyNowBtn && (buyNowBtn.disabled = true);
    inStockEl && (inStockEl.style.display = 'none');
    lowStockEl && (lowStockEl.style.display = 'none');
    inventoryDefaultEl && (inventoryDefaultEl.style.display = 'none');
    outOfStockEl && (outOfStockEl.style.display = 'flex');
    return;
  }

  // Price
  addToCartBtn && (addToCartBtn.disabled = false);
  buyNowBtn && (buyNowBtn.disabled = false);
  if (variant.price > 0) {
    priceBox && (priceBox.style.display = 'block');
    priceEl && (priceEl.textContent = formatMoney(variant.price, moneyFormat));
    if (variant.compare_at_price > variant.price) {
      compareEl && (
        compareEl.textContent = formatMoney(variant.compare_at_price, moneyFormat),
        compareEl.style.display = 'inline'
      );
    } else {
      compareEl && (compareEl.style.display = 'none');
    }
  } else {
    priceEl && (priceEl.innerHTML = contactText);
    addToCartBtn && (addToCartBtn.disabled = true);
    buyNowBtn && (buyNowBtn.disabled = true);
    compareEl && (compareEl.style.display = 'none');
  }

  if (priceBox) {
    const isOnSale = variant.compare_at_price > variant.price && variant.price > 0;
    priceBox.querySelector('.lh-price-box').classList.toggle('lh-on-sale', isOnSale);
  }

  // Stock display
  if (lowStockEl) lowStockEl.style.display = 'none';
  if (inStockEl) inStockEl.style.display = 'none';
  if (outOfStockEl) outOfStockEl.style.display = 'none';
  inventoryDefaultEl && (inventoryDefaultEl.style.display = 'none');

  if (quantity < stockThreshold) {
    if (lowStockEl) {
      lowStockEl.style.display = 'flex';
      lowStockEl.innerHTML = lowStockTemplate.replace('[quantity]', quantity);
    }
  } else {
    if (inStockEl) {
      inStockEl.style.display = 'flex';
      inStockEl.innerHTML = inStockTemplate.replace('[quantity]', quantity);
    }
  }
  updateQuantityErrorHandler(variant);
}
function updateVariantLabels(variant) {
  if (!variant || !variant.options) return;

  variant.options.forEach((optionValue, index) => {
    const swatch = wrapper.querySelector(`.lh-swatch[data-option-index="${index}"]`);
    if (swatch) {
      const labelEl = swatch.querySelector('.lh-variant-label');
      if (labelEl) {
        labelEl.textContent = optionValue;
      }
    }
  });
}
function disableUnavailableSwatches() {
  const selectedOptions = [];

  wrapper.querySelectorAll('.lh-swatch-product-detail .lh-swatch').forEach((swatchEl) => {
    const index = parseInt(swatchEl.dataset.optionIndex);
    const selectedInput = swatchEl.querySelector('input[type="radio"]:checked');
    selectedOptions[index] = selectedInput?.value || '';
  });


  wrapper.querySelectorAll('.lh-swatch-product-detail .lh-swatch').forEach((swatchEl) => {
    const optionIndex = parseInt(swatchEl.dataset.optionIndex);
    const swatchItems = swatchEl.querySelectorAll('.lh-swatch-element');

    swatchItems.forEach((item) => {
      const input = item.querySelector('input[type="radio"]');
      const value = input?.value;
      if (!value) return;

      const testOptions = [...selectedOptions];
      testOptions[optionIndex] = value;

      const matchingVariant = productData.variants.find((v) => {
        return v.available && v.options.every((opt, i) => {
          return !testOptions[i] || testOptions[i] === opt;
        });
      });

      if (matchingVariant) {
        input.disabled = false;
        item.classList.remove('lh-sold-out');
      } else {
        input.disabled = true;
        item.classList.add('lh-sold-out');
      }
    });
  });
}

let isInitialLoad = true;
let originalSlides = null;
let originalThumbs = null;
const productGallery = wrapper.querySelector("#product-gallery");
const isFilterAlt = productGallery.getAttribute('data-filter-alt');

function selectCallback(variant) {
  if (!variant) return;


  if (originalSlides === null) {
    originalSlides = Array.from(productMediaWrapper.querySelectorAll('.lh-product-media .lh-slide-item')).map(slide => ({
      element: slide.cloneNode(true),
      parent: slide.parentNode
    }));

    
  }

  if (originalThumbs === null ) {
    originalThumbs = Array.from(productMediaWrapper.querySelectorAll('.lh-product-thumb-slide .lh-slide-item')).map(slide => ({
      element: slide.cloneNode(true),
      parent: slide.parentNode
    }));

  }

  let slidesToShow = [];
  let thumbsToShow = [];
  let activeSlideIndex = -1; 

  originalSlides.forEach((slideData, index) => {
    const thumbData = originalThumbs ? originalThumbs[index] : null;
    const mainImg = slideData.element.querySelector('img');
    const altText = mainImg?.getAttribute('alt') || '';
    const colorOption = variant.options[0];

    const match = isFilterAlt === "true" ? altText.toLowerCase().includes(colorOption.toLowerCase()) : true;

    if (match) {
      slidesToShow.push({ index, element: slideData.element });
      if (thumbData) thumbsToShow.push({ index, element: thumbData.element });

      if (variant.featured_image?.src) {
        const normalize = (url) => url?.replace(/^https?:/, '');
        const slideSrc = normalize(
          slideData.element.getAttribute('data-src') ||
          slideData.element.querySelector('img')?.getAttribute('src') ||
          ''
        );
        const featuredSrc = normalize(variant.featured_image.src);
        if (slideSrc === featuredSrc) activeSlideIndex = slidesToShow.length - 1;
      }
    }


  });

  productMediaWrapper.querySelectorAll('.lh-product-media .lh-grid-item').forEach(slide => slide.remove());
  if (productMediaWrapper.emblaThumb) {
    productMediaWrapper.emblaThumb.slideNodes().forEach(thumb => thumb.remove());
  }

  const mainContainer = productMediaWrapper.querySelector('.lh-product-media .lh-slider-content');

  slidesToShow.forEach(({ element }) => {
    element.classList.remove('active', 'active-prev', 'active-next');
    element.style.cssText = '';
    mainContainer.appendChild(element);
  });

  const thumbContainer = productMediaWrapper.querySelector('.lh-product-thumb-slide .lh-slider-content');
  thumbContainer.innerHTML ="";

  if ( thumbsToShow.length > 0) {
    thumbsToShow.forEach(({ element }) => {
      element.classList.remove('is-active');
      element.style.cssText = '';
      thumbContainer.appendChild(element);
    });
  }

  if (slidesToShow.length > 0) {
    const targetIndex = Math.max(0, activeSlideIndex >= 0 ? activeSlideIndex : 0);


    setTimeout(() => {
      const newSlides = wrapper.querySelectorAll('.lh-product-media .lh-grid-item');
      const newThumbs = wrapper.emblaThumb ? wrapper.emblaThumb.slideNodes() : [];

      if (newSlides[targetIndex]) newSlides[targetIndex].classList.add('active');
      if (newThumbs[targetIndex]) newThumbs[targetIndex].classList.add('is-active');

      productMediaWrapper.embla?.reInit();
      productMediaWrapper.embla?.scrollTo(targetIndex);

      // handleActiveThumb(targetIndex);

      if (productMediaWrapper.emblaThumb) {
        productMediaWrapper.emblaThumb.reInit();
        productMediaWrapper.emblaThumb.scrollTo(targetIndex);
        productMediaWrapper.emblaThumb.slideNodes().forEach((thumb, index) => {
          thumb.addEventListener('click', () => productMediaWrapper.embla?.scrollTo(index));
        });

        const thumbWrapper = productMediaWrapper.querySelector('.lh-product-thumb-slide');
        if (thumbWrapper) {
          thumbWrapper.style.visibility = 'visible';
          thumbWrapper.style.transition = 'opacity 0.3s ease';
          requestAnimationFrame(() => {
            thumbWrapper.style.opacity = '1';
          });
        }
      }
    }, 30);
  }

  syncSwatchInputs(variant);
  console.log('start');

  updateVariantUI(variant);

  disableUnavailableSwatches();
  updateVariantLabels(variant);

  isInitialLoad = false;
}

// ========== Bind swatches ==========

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedOptions = [];
    wrapper.querySelectorAll('.lh-swatch').forEach((sw, i) => {
      const selected = sw.querySelector('input[type="radio"]:checked');
      selectedOptions[i] = selected?.value || '';
    });

    const variant = productData.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (variant) {
      idInput.value = variant.id;
      selectCallback(variant);
    }
  });
});

selects.forEach(select => {
  select.addEventListener('change', () => {
    const selectedOptions = [];
    selects.forEach(sel => {
      selectedOptions.push(sel.value);
    });

    const variant = productData.variants.find(v =>
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (variant) {
      idInput.value = variant.id;
      selectCallback(variant);
    }
  });
});


// ========== Render default variant ==========
setTimeout(() => {
  const selectedOptions = [];
  wrapper.querySelectorAll('.lh-swatch').forEach((swatchEl, i) => {
    const checked = swatchEl.querySelector('input[type="radio"]:checked');
    selectedOptions[i] = checked?.value || '';
  });
  const matchedVariant = productData.variants.find(v =>
    v.options.every((opt, i) => opt === selectedOptions[i])
  );
  if (matchedVariant && idInput) {
    if (idInput.value !== String(matchedVariant.id)) {
      idInput.value = matchedVariant.id;
    }
    selectCallback(matchedVariant);
  } else {
    const firstValidVariant = productData.variants.find(v => v.available);
    if (firstValidVariant && idInput) {
      idInput.value = firstValidVariant.id;
      selectCallback(firstValidVariant);
    }
  }
}, 100);


// Buy It Now

if (form) {
  form.addEventListener('submit', function(e) {
    const quantityInput = wrapper.querySelector('.qty-input');
    const cartQuantityInput = form.querySelector('input[name="quantity"]');
    if (cartQuantityInput && quantityInput) {
      cartQuantityInput.value = quantityInput.value || '1';
    }
  });
}

const buyNowBtn = wrapper.querySelector('.btn_buy_now');
const quantityInput = wrapper.querySelector('.qty-input');

if (buyNowBtn && mode !== 'dev') {
  buyNowBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    if (!currentVariant?.available) return;

    const quantity = parseInt(quantityInput?.value || '1', 10);
    if (isNaN(quantity) || quantity < 1) return;

    const formData = {
      id: currentVariant.id,
      quantity: quantity
    };

    try {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      window.location.href = '/checkout';
    } catch (error) {
      console.error('Buy now failed:', error);
    }
  });
}

/* LayoutHub assets/lightbox.js */
const boxLbContent = wrapper.querySelector('.lh-lightbox-ct');
const gallerySlides = Array.from(wrapper.querySelectorAll("#product-gallery .lh-product-media .lh-slide-item"));
const sliderWrapperEl = wrapper.querySelector('.lh-slider-wrapper');

document.body.style.overflow = "visible";

function renderButtonZoom(){
  sliderWrapperEl.querySelectorAll('.lh-slide-item').forEach((item, index) => {
    const button = document.createElement('button');
    button.className = 'lh-button-zoom lh-text-color-heading';
    button.ariaLabel = 'zoom';
    button.dataset.index = index;
    button.innerHTML = `
        <svg class="bi bi-zoom-in size-full" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
          <path
            d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z" />
          <path fill-rule="evenodd"
            d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5" />
        </svg>
    `
    item.append(button);
  })
}

renderButtonZoom();

const getLightboxImages = (variant) => {
  let filtered = gallerySlides
    .filter(slide => {
      const altText = slide.querySelector('img')?.alt || '';
      const colorOption = variant?.options?.[0] || '';

      if (isFilterAlt === "true" && colorOption) {
        return altText.toLowerCase().includes(colorOption.toLowerCase());
      }
      return true;
    })
    .map(slide => slide.getAttribute("data-src"))
    .filter(Boolean);

  if (!filtered.length) {
    filtered = Array.from({ length: 5 }).map((_, i) =>
      `https://cdn.shopify.com/s/files/1/0326/1720/1797/files/image-collection-${i + 1}.svg?v=1757092840`
    );


  }

  return filtered;
};



const createLightbox = () => {
  const lightbox = document.createElement("div");
  lightbox.id = "lh-lightbox";
  lightbox.className = "lh-lightbox lh-slide-show";
  lightbox.innerHTML = `
    <div class=" lh-carousel ">
      <div class="lh-lightbox-toolbar ">

        <button data-lightbox-zoom="" class="lh-lightbox-button  lh-lightbox-button--zoom" title="Zoom">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mx-auto bi-search pointer-events-none" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>

        <button data-lightbox-thumbs="" class="lh-lightbox-button  lh-lightbox-button--thumbs" title="Thumbnails">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mx-auto bi-grid-3x3-gap pointer-events-none" viewBox="0 0 16 16">
          <path d="M4 2v2H2V2zm1 12v-2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m5 10v-2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V7a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1m0-5V2a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1M9 2v2H7V2zm5 0v2h-2V2zM4 7v2H2V7zm5 0v2H7V7zm5 0h-2v2h2zM4 12v2H2v-2zm5 0v2H7v-2zm5 0v2h-2v-2zM12 1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm-1 6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm1 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z"/>
          </svg>
        </button>
        <button data-lh-lightbox-close="" class="lh-lightbox-button lh-lightbox-button--close " title="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi mx-auto bi-x-lg pointer-events-none" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
        </button>
      </div>
      <div class="lh-slider-wrapper lh-slider lh-slider-container "
        data-desktop-layout="slider"
        data-tablet-layout="slider"
        data-mobile-layout="slider"
        data-item="1"
        data-item-table="1"
        data-item-mobile="1"
        data-effect="fade"
        data-pagination="counter"
        data-navigation="true"
        data-play="false"
        style="--data-item: 1; --data-item-table: 1;--data-item-mobile: 1; --data-gap:0px;"
      >
        <div class="lh-slider-content beae-slider-items"></div>
      </div>

      <div class="lh-slider-controls ">
        <div class="lh-slider-controls-wrp">
          <div class="lh-slider-nav-left ">${wrapper.querySelector('.lh-slider-nav-left')?.innerHTML || ''}</div>
          <div class="lh-slider-pagination-wrp">
            <div class="lh-slider-pagination-wrapper "></div>
            <div class="lh-slider-pagination-total "><span></span></div>
          </div>
          <div class="lh-slider-nav-right ">${wrapper.querySelector('.lh-slider-nav-right')?.innerHTML || ''}</div>
        </div>
      </div>
    </div>

    <div class="lh-thumbnails-grid hidden ">
      <div class="lh-thumbnails-content"></div>
    </div>

  `;

  boxLbContent.appendChild(lightbox);

  setTimeout(() => {
    window.LayoutHubSlider(boxLbContent);
  }, 100);

  setTimeout(() => {
    const embla = boxLbContent.embla;
    if (embla) {
      embla.on("select", () => {
        resetZoomState();

        const selectedIndex = embla.selectedScrollSnap();
        const thumbs = boxLbContent.querySelectorAll(".lh-thumb-item");
        thumbs.forEach((thumb, i) => {
          thumb.classList.toggle("active", i === selectedIndex);
        });
      });

    }
  }, 200);


  setTimeout(() => {
    boxLbContent.classList.add("active");
  }, 100);

  return lightbox;
};

const fillLightboxSlides = (container, images) => {
  const sliderContent = container.querySelector(".lh-slider-content");
  const thumbnailsContent = container.querySelector(".lh-thumbnails-content");

  sliderContent.innerHTML = '';
  thumbnailsContent.innerHTML = '';

  images.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "lh-slide-item lh-grid-item basis-full select-none relative overflow-hidden";
    slide.setAttribute("data-src", src);
    slide.setAttribute("type", "image");
    slide.innerHTML = `
      <div class="lh-media-lb !relative mx-auto mb-3 h-full flex items-center">
         <img src="${src}" class="img z-100 object-contain mx-auto block h-full" alt="Image ${i + 1}">
      </div>`;
    sliderContent.appendChild(slide);

    const thumb = document.createElement("div");
    thumb.className = "lh-thumb-item cursor-pointer";
    thumb.innerHTML = `<img src="${src}" class="w-full h-full object-cover rounded">`;
    thumb.addEventListener("click", () => {
      boxLbContent.embla?.scrollTo(i);
      thumbnailsContent.querySelectorAll(".lh-thumb-item.active")
        .forEach(t => t.classList.remove("active"));

      thumb.classList.add("active");
    });
    thumbnailsContent.appendChild(thumb);
  });

  const firstThumb = thumbnailsContent.querySelector(".lh-thumb-item");
  if (firstThumb) {
    firstThumb.classList.add("active");
  }
};

boxLbContent.addEventListener("click", (e) => {
  const btnThumbs = e.target.closest("[data-lightbox-thumbs]");
  if (!btnThumbs) return;

  const grid = boxLbContent.querySelector(".lh-thumbnails-grid");
  const container = boxLbContent.querySelector(".lh-carousel");

  if (grid.classList.contains("hidden")) {
    grid.classList.remove("hidden");
    container.classList.add("lh-with-thumb");
    btnThumbs.classList.add("active");
  } else {
    grid.classList.add("hidden");
    container.classList.remove("lh-with-thumb");
    btnThumbs.classList.remove("active");
  }
});

const openLightbox = (variant, index = 0) => {
  let lightbox = boxLbContent.querySelector("#lh-lightbox");
  const filteredImages = getLightboxImages(variant);
  if (!filteredImages.length) return;


  if (!lightbox) {
    lightbox = createLightbox();
    fillLightboxSlides(lightbox, filteredImages);

    setTimeout(() => {
      const slides = lightbox.querySelectorAll('.lh-slide-item');
      if (slides[index]) {
        slides[index].classList.add('active');
        boxLbContent.embla?.reInit();
        boxLbContent.embla?.scrollTo(index);
        const thumbs = lightbox.querySelectorAll(".lh-thumb-item");
        thumbs.forEach((thumb, i) => {
          thumb.classList.toggle("active", i === index);
        });
      }
    }, 100);

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

boxLbContent.addEventListener("click", (e) => {
  const lightbox = boxLbContent.querySelector("#lh-lightbox");
  if (!lightbox) return;
  const isSlide = e.target.closest(".lh-slide-item img");
  const isNavButton = e.target.closest(".lh-slider-nav-left, .lh-slider-nav-right");
  const isToolbar = e.target.closest(".lh-lightbox-toolbar");
  const isThumb = e.target.closest(".lh-thumbnails-grid");
  const isClose = e.target.closest(".lh-lightbox-button--close");

  const closeLightbox = () => {
    if (typeof resetZoomState === "function") {
      resetZoomState();
    }

    if (boxLbContent.embla) {
      boxLbContent.embla.destroy();
      boxLbContent.embla = null;
    }

    lightbox.classList.add("lh-lightbox-closing");
    lightbox.addEventListener("transitionend", function handler() {
      lightbox.remove();
      boxLbContent.classList.remove("active");
      document.body.style.overflow = "";
      const thumbsGrid = boxLbContent.querySelector(".lh-thumbnails-grid");
      if (thumbsGrid) thumbsGrid.remove();
      lightbox.removeEventListener("transitionend", handler);
    });
    zoomMode = false;

  };

  if (isClose) {
    closeLightbox();
    return;
  }

  if (isSlide || isNavButton || isToolbar || isThumb) {
    return;
  }

  if (e.target.closest(".lh-carousel") || e.target.closest("#lh-lightbox")) {
    closeLightbox();
  }
});

sliderWrapperEl.addEventListener('mousedown', (e) => {

  const zoomBtn = e.target.closest('.lh-button-zoom');

  if (!zoomBtn) return;

  const index = Number(zoomBtn.getAttribute('data-index'));


  const variantToUse = currentVariant
    || (Array.isArray(productData?.variants) ? productData.variants.find(v => v.available) : null);

  if (!variantToUse) {
    openLightbox({ options: [] }, index >= 0 ? index : 0);
    return;
  }
  openLightbox(variantToUse, index >= 0 ? index : 0);


});



/* LayoutHub assets/lightbox-zoom.js */
const galleryContainer = boxLbContent;
if (!galleryContainer) return;

let zoomMode = false;
let zoomData = new Map();

function getItemData(item) {
  if (!zoomData.has(item)) {
    zoomData.set(item, {
      isZoomed: false,
      overlay: null,
      startX: 0,
      startY: 0,
      dragged: false,
      imageURL: item.dataset.src || item.querySelector('img')?.src || ''
    });
  }
  return zoomData.get(item);
}

function resetZoomState() {
  zoomData.forEach(data => {
    if (data.overlay) {
      data.overlay.remove();
      data.overlay = null;
      data.isZoomed = false;
    }
  });

}

galleryContainer.addEventListener("click", (e) => {
  const btnZoom = e.target.closest(".lh-lightbox-button--zoom");
  if (btnZoom) {
    zoomMode = !zoomMode;
    btnZoom.classList.toggle("active", zoomMode);

    const lightbox = wrapper.querySelector(".lh-lightbox");
    if (lightbox) {
      lightbox.classList.toggle("lh-zoom-in", zoomMode);
    }

    if (!zoomMode) {
      zoomData.forEach(data => {
        if (data.overlay) {
          data.overlay.remove();
          data.overlay = null;
          data.isZoomed = false;
        }
      });
    }
  }

  //  nghe click nút trái phải
  if (e.target.closest(".lh-slider-nav-right") || e.target.closest(".lh-slider-nav-left")) {
    resetZoomState();
  }
});

// Kiểm tra mobile
if ('ontouchstart' in window) {
  function getTouchPos(e) {
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  galleryContainer.addEventListener('touchstart', (e) => {
    if (!zoomMode) return;
    e.stopPropagation();

    const item = e.target.closest('.lh-slide-item');
    if (!item) return;

    const pos = getTouchPos(e);
    const data = getItemData(item);
    data.startX = pos.x;
    data.startY = pos.y;
    data.dragged = false;

    e.preventDefault();
  }, { passive: false });

  galleryContainer.addEventListener('touchmove', (e) => {
    if (!zoomMode) return;
    e.stopPropagation();

    const item = e.target.closest('.lh-slide-item');
    if (!item) return;

    const pos = getTouchPos(e);
    const data = getItemData(item);

    const dx = Math.abs(pos.x - data.startX);
    const dy = Math.abs(pos.y - data.startY);
    if (dx > 20 || dy > 20) data.dragged = true;

    if (data.isZoomed && data.overlay) {
      const rect = item.getBoundingClientRect();
      const x = ((pos.x - rect.left) / rect.width) * 100;
      const y = ((pos.y - rect.top) / rect.height) * 100;
      data.overlay.style.backgroundPosition = `${x}% ${y}%`;
    }

    e.preventDefault();
  }, { passive: false });

  galleryContainer.addEventListener('touchend', (e) => {
    if (!zoomMode) return;
    e.stopPropagation();

    const item = e.target.closest('.lh-slide-item');
    if (!item) return;

    const data = getItemData(item);
    if (data.dragged) return;

    if (data.isZoomed) {
      data.overlay?.remove();
      data.overlay = null;
      data.isZoomed = false;
    } else {
      const overlay = document.createElement('div');
      overlay.className = 'media-hover-overlay mx-auto';
      overlay.style.backgroundImage = `url('${data.imageURL}')`;
      overlay.style.backgroundSize = "250%"; // luôn 250% trên mobile

      item.style.position = 'relative';
      item.appendChild(overlay);
      data.overlay = overlay;
      data.isZoomed = true;
    }
  });
}


galleryContainer.addEventListener("mousedown", (e) => {
  if (!zoomMode) return;
  const item = e.target.closest('.lh-slide-item');
  if (!item) return;

  const data = getItemData(item);
  data.startX = e.clientX;
  data.startY = e.clientY;
  data.dragged = false;
});

galleryContainer.addEventListener("mousemove", (e) => {
  if (!zoomMode) return;
  const overlay = e.target.closest('.media-hover-overlay');
    if (!overlay) return;
  const item = e.target.closest('.lh-slide-item');
  if (!item) return;

  const data = getItemData(item);
  const dx = Math.abs(e.clientX - data.startX);
  const dy = Math.abs(e.clientY - data.startY);

  if (dx > 20 || dy > 20) data.dragged = true;

  if (data.isZoomed && data.overlay) {
    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    data.overlay.style.backgroundPosition = `${x}% ${y}%`;
  }
});

galleryContainer.addEventListener("mouseup", (e) => {
  if (!zoomMode) return;
  const item = e.target.closest('.lh-slide-item');
  if (!item) return;

  const data = getItemData(item);
  if (data.dragged) return;

  if (data.isZoomed) {
    data.overlay?.remove();
    data.overlay = null;
    data.isZoomed = false;
  } else {
    const overlay = document.createElement('div');
    overlay.className = 'media-hover-overlay mx-auto';
    overlay.style.backgroundImage = `url('${data.imageURL}')`;

    if (window.innerWidth <= 639) {
      overlay.style.backgroundSize = "250%";
    } else {
      overlay.style.backgroundSize = "150%";
    } 

    item.style.position = 'relative';
    item.appendChild(overlay);
    data.overlay = overlay;
    data.isZoomed = true;
  }
});

galleryContainer.addEventListener('mouseleave', (e) => {
  if (!zoomMode) return;
  const item = e.target.closest('.lh-slide-item');
  if (!item) return;

  const data = getItemData(item);
  if (data.isZoomed && data.overlay) {
    data.overlay.remove();
    data.overlay = null;
    data.isZoomed = false;
  }
});

const lightbox = document.querySelector('.lh-lightbox-ct');
let hideTimeout;

function showControls() {
  if (!lightbox) return;
  lightbox.classList.add('show-controls');

  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    lightbox.classList.remove('show-controls');
  }, 3000);
}

['mousemove', 'click', 'touchstart'].forEach(evt => {
  lightbox?.addEventListener(evt, showControls);
});


/* LayoutHub assets/lh-size-chart.js */
const button = wrapper.querySelector('.lh-size-chart');
const wrapperPopup = wrapper.querySelector('.lh-popup-wrapper');


if (button && wrapperPopup) {
  button.addEventListener('click', async (e) => {

    e.preventDefault();
    wrapper.querySelector('#lh-popup').classList.remove('hidden');
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      wrapperPopup.classList.toggle('active');
    }, 100)

  });

  wrapper.querySelector('#lh-close-popup').addEventListener('click', () => {
    closePopup();
  });

  wrapper.querySelector('#lh-popup').addEventListener('click', (e) => {
    closePopup();
  });

  wrapperPopup.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  const closePopup = () => {
    wrapperPopup.classList.toggle('active');
    setTimeout(() => {
      wrapper.querySelector('#lh-popup').classList.add('hidden');
      document.body.style.overflow = "visible";
    }, 100)
  }

}

/* LayoutHub assets/collection.js */
const collectionWrapper = wrapper.querySelector('.lh-collection-wrapper');
// window.LayoutHubSlider(collectionWrapper); 

function updateSwatchThumbnail(productBox, dataSrc) {
  const thumbnail = productBox.querySelector('.lh-product-thumbnail .img-with-variant');
  if (dataSrc && thumbnail) {
    thumbnail.src = dataSrc;
    thumbnail.srcset = dataSrc;
  }
}

collectionWrapper.querySelectorAll('.lh-product-box[data-product-id]').forEach(productBox => {
  const select = productBox.querySelector('.lh-single-option-selector');
  const idInput = productBox.querySelector('[name="id"]'); 
  const priceEl = productBox.querySelector('.lh-special-price .lh-price');
  let compareContainer = productBox.querySelector('.lh-old-price');
  if (!compareContainer) {
    const priceBox = productBox.querySelector('.lh-price-box') || productBox;
    compareContainer = document.createElement('span');
    compareContainer.className = 'lh-old-price';
    compareContainer.innerHTML = '<span class="lh-price"></span>';
    priceBox.appendChild(compareContainer);
  }
  const compareEl = compareContainer.querySelector('.lh-price');
  const button = productBox.querySelector('.lh-add-to-cart');
 const scriptEl = productBox.querySelector('.lh-product-json');
 console.log('scriptEl: ', scriptEl);
  if (!scriptEl) return;
   const data = JSON.parse(scriptEl.textContent);
  const variants = data.variants || [];
  const swatches = productBox.querySelectorAll('.lh-swatch');

  // ======= Set Default Variant =======
  swatches.forEach(swatch => {
    const radios = swatch.querySelectorAll('input[type="radio"]');
    for (const radio of radios) {
      const swatchEl = radio.closest('.lh-swatch-element');
      if (!radio.disabled && !swatchEl?.classList.contains('lh-sold-out')) {
        radio.checked = true;
        if (swatchEl?.classList.contains('lh-color')) {
          updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
        }
        break;
      }
    }
  });

  updateSelectedVariant();

  productBox.addEventListener('change', e => {
    if (e.target.matches('.lh-swatch-element input[type="radio"]')) {
      updateSelectedVariant();
    }
  });

  productBox.addEventListener('click', e => {
    const swatchEl = e.target.closest('.lh-swatch-element.lh-color');
    if (swatchEl) {
      updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
    }
  });

  function updateSelectedVariant() {
    const selectedOptions = Array.from(swatches).map(swatch =>
      swatch.querySelector('input[type="radio"]:checked')?.value.trim() || ''
    );

    const matchedVariant = variants.find(v =>
      Array.isArray(v.options) &&
      v.options.every((opt, i) => opt === selectedOptions[i])
    );

    if (!matchedVariant) return;

    const contactText = document.querySelector('.data-tex-locales')?.dataset.textContact || 'Contact';

    // Update Inputs
    if (idInput) idInput.value = matchedVariant.id;
    if (select) {
      select.value = matchedVariant.id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

 // Update Price
    if (priceEl) {
      priceEl.innerHTML = matchedVariant.price === 0
        ? contactText
        : formatMoney(matchedVariant.price, moneyFormat);
    }

    if (compareEl) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        compareEl.innerHTML = formatMoney(matchedVariant.compare_at_price, moneyFormat);
        compareEl.closest('.lh-old-price')?.classList.remove('hidden');
      } else {
        compareEl.innerHTML = '';
        compareEl.closest('.lh-old-price')?.classList.add('hidden');
      }
    }
    // === Update Sale / Sold Out Badge ===
    const saleBadge = productBox.querySelector('.lh-sale-badge[data-percent="true"]');
    if (saleBadge) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        const discount = Math.round((matchedVariant.compare_at_price - matchedVariant.price) / matchedVariant.compare_at_price * 100);
        saleBadge.innerHTML = `<span class="sale-percent">-${discount}%</span>`;
        saleBadge.classList.remove('hidden');
      } else {
        saleBadge.classList.add('hidden');
      }
    }

    // === Update Sale State ===
    const priceBox = productBox.querySelector('.lh-price-box');
    if (priceBox) {
      const isOnSale = matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0;
      priceBox.classList.toggle('lh-on-sale', isOnSale);
    }


    // Update Button
    
  if (button && idInput) {
  let productLabels = {};
  const labelScript = collectionWrapper.querySelector('#product-button-labels');

  try {
    productLabels = JSON.parse(labelScript?.textContent || '{}');
  } catch (e) {
    console.warn('Failed to parse product labels:', e);
  }

  const isContact = matchedVariant.price === 0;
  const isAvailable = matchedVariant.available;
  const shouldDisable = isContact || !isAvailable;

  button.disabled = shouldDisable;
  button.style.pointerEvents = shouldDisable ? 'none' : 'auto';
  const span = button.querySelector('span');
  if (span) {
    if (!isAvailable) {
      span.textContent = productLabels.inventoryOutOfStock || 'Out of stock';
    } else if (isContact) {
      span.textContent = productLabels.chooseOptions || 'Choose options';
    } else {
      span.textContent = productLabels.addToCart || 'Add to cart';
    }
  }

  button.addEventListener('click', (e) => {
    const variantId = parseInt(idInput.value, 10);
    const variant = variants.find(v => v.id === variantId);
    if (!variant || variant.price === 0 || !variant.available) {
      e.preventDefault();
    }
  });
}



    // Disable unavailable swatches
    swatches.forEach((swatch, index) => {
      const radios = swatch.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        const value = radio.value.trim();
        const testOptions = [...selectedOptions];
        testOptions[index] = value;

        const available = variants.some(v =>
          v.available && v.options.every((opt, i) => opt === testOptions[i])
        );

        const swatchEl = radio.closest('.lh-swatch-element');
        swatchEl?.classList.toggle('lh-sold-out', !available);
      });
    });
  }

});


/* LayoutHub assets/script.js */
window.LayoutHubSlider = (wrapper) => {
  const container = wrapper.querySelector(".lh-slider-container");
  if (!container || container.getAttribute("data-lh-slider-initialized") === "true") return;
  container.setAttribute("data-lh-slider-initialized", "true");
  // =====================
  // Local State
  // =====================
  let embla = null;
  let dots = [];
  let autoplayInterval = null;
  let autoplayTimeout = null;
  let autoplayDelay = 3000;
  let lastStartTime = null;
  let remainingTime = null;
  let boundEmblaNode = null;
  let progressValue = 0;
  let progressRAF = null;
  let isHovering = false;
  let stopAtEnd = false;
  // =====================
  // Utils
  // =====================
  function parseTransition(value) {
    if (!value) return 3000;
    value = value.trim();
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) * 1000;
  }
  function getItemsPerView(width, node) {
    const desktop = parseInt(node.getAttribute("data-item") || 1, 10);
    const tablet = parseInt(node.getAttribute("data-item-tablet") || 1, 10);
    const mobile = parseInt(node.getAttribute("data-item-mobile") || 1, 10);
    return width >= 1024 ? desktop : width >= 640 ? tablet : mobile;
  }
  function getPaginationViewWidth(node, defaultWidth = 80) {
    const raw = parseFloat(node.getAttribute("data-pagination-width"));
    return isNaN(raw) ? defaultWidth : raw;
  }
  function isSliderLayout(width, node) {
    const desktopLayout = node.getAttribute("data-desktop-layout");
    const tabletLayout = node.getAttribute("data-tablet-layout");

    const mobileLayout = node.getAttribute("data-mobile-layout");
    if (width >= 1024) return desktopLayout === "slider";
    if (width >= 640) return tabletLayout === "slider";
    return mobileLayout === "slider";
  }


  // =====================
  // Autoplay
  // =====================
  function resetProgress() {
    progressValue = 0;
    updateProgressBarUI(progressValue);
  }
  function animateProgressBar() {
    cancelAnimationFrame(progressRAF);
    const step = () => {
      if (!embla) return;
      const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
      if (!emblaNode) return;
      const width = window.innerWidth;
      const isLoopEnabled = embla?.internalEngine()?.options?.loop;
      const selectedIndex = embla.selectedScrollSnap();
      const totalSlides = embla.slideNodes().length;
      const itemsPerView = getItemsPerView(width, emblaNode);
      const isAtLastSlide = selectedIndex >= totalSlides - itemsPerView;
      if (isHovering || stopAtEnd) {
        updateProgressBarUI(progressValue);
        progressRAF = requestAnimationFrame(step);
        return;
      }
      // time elapsed since last start
      const elapsed = Date.now() - lastStartTime;
      progressValue = Math.min(((elapsed) / autoplayDelay) * 100, 100);
      updateProgressBarUI(progressValue);
      if (elapsed >= autoplayDelay) {
        if (!isLoopEnabled && isAtLastSlide) {
          stopAtEnd = true;
          return;
        }
        embla?.scrollNext();
        lastStartTime = Date.now();
        progressValue = 0;
      }
      progressRAF = requestAnimationFrame(step);
    };


    progressRAF = requestAnimationFrame(step);
  }
  function updateProgressBarUI(value) {
    const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
    const controls = wrapper.querySelector(".lh-slider-controls");
    if (!emblaNode || !controls) return;
    const autoplayEnabled = emblaNode.getAttribute("data-play") === "true";
    controls.style.setProperty("--progress", autoplayEnabled ? `${value}` : "100");
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
      progressValue = (elapsed / autoplayDelay) * 100; // lưu % hiện tại
    }
  }
  function resumeAutoplay() {
    clearTimeout(autoplayTimeout);
    cancelAnimationFrame(progressRAF);
    if (remainingTime != null) {
      lastStartTime = Date.now() - (autoplayDelay - remainingTime);
    } else {
      lastStartTime = Date.now();
    }
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
    if (autoplay && node) {
      startAutoplay();
      node.addEventListener("mouseenter", onMouseEnterPause);
      node.addEventListener("mouseleave", onMouseLeaveResume);
      boundEmblaNode = node;
    }
  }
  function onMouseEnterPause() {
    isHovering = true;
    pauseAutoplay();
  }
  function onMouseLeaveResume() {
    isHovering = false;
    if (!stopAtEnd) {
      resumeAutoplay();
    }
  }


  // =====================
  // UI Helpers
  // =====================
  function updateSlideActive(itemsPerView, isFade) {
    if (!embla) return;
    const slides = embla.slideNodes();
    const totalSlides = slides.length;
    const selectedIndex = embla.selectedScrollSnap();
    const isLoop = embla.internalEngine().options.loop;
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "active-prev", "active-next", "active-main");
    });
    slides[selectedIndex]?.classList.add("active-main");
    if (isFade) {
      const currentSlide = slides[selectedIndex];
      if (currentSlide) {
        currentSlide.classList.add("active");
      }
      const prevIndex = (selectedIndex - 1 + totalSlides) % totalSlides;
      const nextIndex = (selectedIndex + 1) % totalSlides;
      slides[prevIndex]?.classList.add("active-prev");
      slides[nextIndex]?.classList.add("active-next");
    } else {
      const activeIndexes = Array.from({ length: itemsPerView }, (_, i) =>
        isLoop
          ? (selectedIndex + i) % totalSlides
          : selectedIndex + i
      );
      const prevIndex = isLoop
        ? (selectedIndex - 1 + totalSlides) % totalSlides
        : selectedIndex - 1;
      const nextIndex = isLoop
        ? (selectedIndex + itemsPerView) % totalSlides
        : selectedIndex + itemsPerView;
      slides.forEach((slide, index) => {
        if (activeIndexes.includes(index)) {
          slide.classList.add("active");
        } else if (index === prevIndex) {
          slide.classList.add("active-prev");
        } else if (index === nextIndex) {
          slide.classList.add("active-next");
        }
      });
    }
  }


  function createPagination(wrapper, emblaNode, paginationType, totalPages) {
    const paginationWrapper = wrapper.querySelector(".lh-slider-pagination-wrapper");
    if (!paginationWrapper) return { dotsArr: [], paginationWrapperInner: null };
    paginationWrapper.innerHTML = "";
    let paginationWrapperInner = null;
    let dotsArr = [];
    const enableSvg = paginationWrapper.dataset.paginationSvg === "true";
    const appendSvgToDot = (dot) => {
      if (!(paginationType === "dots" || paginationType === "numbers")) return;
      if (!enableSvg) return;
      if (dot.querySelector(".circular-progress")) return;

      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "circular-progress");
      svg.setAttribute("aria-hidden", "true");
      svg.style.pointerEvents = "none";

      const bg = document.createElementNS(svgNS, "circle");
      bg.setAttribute("cx", "50");
      bg.setAttribute("cy", "50");
      bg.setAttribute("r", "45");
      bg.setAttribute("class", "circular-progress__bg");

      const fg = document.createElementNS(svgNS, "circle");
      fg.setAttribute("cx", "50");
      fg.setAttribute("cy", "50");
      fg.setAttribute("r", "45");
      fg.setAttribute("class", "circular-progress__fg");

      svg.appendChild(bg);
      svg.appendChild(fg);
      dot.appendChild(svg);
    };
    if (paginationType === "dynamic-dots") {
      const VIEW_WIDTH = getPaginationViewWidth(emblaNode);
      paginationWrapper.style.position = "relative";
      paginationWrapper.style.overflow = "hidden";
      paginationWrapper.style.width = `${VIEW_WIDTH}px`;
      paginationWrapperInner = document.createElement("div");
      paginationWrapperInner.classList.add("w-full", "pagination-bullets-dynamic");
      paginationWrapperInner.style.display = "flex";
      paginationWrapperInner.style.position = "relative";
      paginationWrapperInner.style.transition = "left 0.3s ease";
      paginationWrapper.appendChild(paginationWrapperInner);
      dotsArr = Array.from({ length: totalPages }, (_, i) => {
        const dot = document.createElement("span");
        dot.className = "lh-slider-pagination";
        dot.addEventListener("click", () => embla.scrollTo(i));
        paginationWrapperInner.appendChild(dot);
        return dot;
      });
    } else {
      paginationWrapper.style.width = "auto";
      dotsArr = Array.from({ length: totalPages }, (_, i) => {
        const dot = document.createElement("span");
        dot.className = "lh-slider-pagination";
        if (paginationType === "numbers") dot.textContent = i + 1;
        dot.addEventListener("click", () => embla.scrollTo(i));
        paginationWrapper.appendChild(dot);
        appendSvgToDot(dot);
        return dot;
      });
    }
    return { dotsArr, paginationWrapperInner };
  }
  function updateProgress(wrapper, selectedIndex, totalPages) {
    const progressWrapper = wrapper.querySelector(".lh-slider-pagination-progress");


    if (!progressWrapper) return;
    const progressEl = progressWrapper.querySelector("span");
    if (!progressEl) return;
    const type = progressWrapper.getAttribute("data-progress") || "grow";
    const stepPercent = 100 / totalPages;
    if (type === "slider") {
      progressEl.style.width = `${stepPercent}%`;
      progressEl.style.left = `${selectedIndex * stepPercent}%`;
    } else {
      const percent = ((selectedIndex + 1) / totalPages) * 100;
      progressEl.style.width = `${percent}%`;
      progressEl.style.left = "0";
    }
  }
  // =====================
  // Main Init
  // =====================
  function initSlider() {
    const emblaNode = wrapper.querySelector(".lh-slider-wrapper");
    if (!emblaNode) return;
    const width = window.innerWidth;
    // Non-slider layout
    if (!isSliderLayout(width, emblaNode)) {
      embla?.destroy();
      embla = null;
      wrapper.querySelector(".lh-slider-pagination-wrapper")?.replaceChildren();
      const controls = wrapper.querySelector(".lh-slider-controls");
      controls?.removeAttribute("show-desktop");
      controls?.removeAttribute("show-tablet");
      controls?.removeAttribute("show-mobile");
      setupAutoplay(null, false, 3000);

      wrapper.emblaThumb?.destroy();
      wrapper.emblaThumb = null;

      return;
    }
    // Config
    const slidesToScrollRaw = parseInt(emblaNode.getAttribute("data-scroll") || "1", 10);
    const alignValue = emblaNode.getAttribute("data-align") || "start";
    const paginationType = emblaNode.getAttribute("data-pagination") || "dots";
    const autoplay = emblaNode.getAttribute("data-play") === "true";
    const transition = parseTransition(emblaNode.getAttribute("data-transition"));
    const effect = emblaNode.getAttribute("data-effect") || "slide";
    const isFade = effect === "fade";
    let itemsPerView = getItemsPerView(width, emblaNode);
    const slidesToScroll = isFade ? 1 : Math.min(slidesToScrollRaw, itemsPerView);
    const totalItems = emblaNode.querySelectorAll(".lh-slide-item").length;
    let isLoop = emblaNode.getAttribute("data-loop") === "true";
    if (totalItems <= itemsPerView) {
      isLoop = false;
    }
    emblaNode.setAttribute("data-init-loop", isLoop);
    // Init Embla
    embla?.destroy();
    embla = EmblaCarousel(
      emblaNode,
      {
        loop: isLoop,
        slidesToScroll,
        draggable: !isFade,
        dragFree: false,
        containScroll: isFade ? false : "trimSnaps",
        align: alignValue,
      },
      isFade ? [EmblaCarouselFade()] : []
    );
    wrapper.embla = embla;
    // Direction attribute
    let lastIndex = embla.selectedScrollSnap();
    embla.on("select", () => {
      const selectedIndex = embla.selectedScrollSnap();
      const totalSlides = embla.slideNodes().length;
      const width = window.innerWidth;
      const itemsPerView = getItemsPerView(width, emblaNode);
      emblaNode.setAttribute("data-dir", selectedIndex > lastIndex ? "left" : "right");
      if (stopAtEnd && selectedIndex < totalSlides - itemsPerView) {
        stopAtEnd = false;
        resumeAutoplay();
        animateProgressBar();
      }
      remainingTime = autoplayDelay;
      lastStartTime = Date.now();
      lastIndex = selectedIndex;
      resetProgress();
    });
    // Pagination
    if (isFade) itemsPerView = 1;
    const getTotalPages = () => embla.scrollSnapList().length;
    let { dotsArr, paginationWrapperInner } = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
    dots = dotsArr;
    // Update UI
    function updateUI() {

      const selectedIndex = embla.selectedScrollSnap();
      const totalPages = getTotalPages();
      const dots = wrapper.querySelectorAll(".lh-slider-pagination");
      const paginationTotalEl = wrapper.querySelector(".lh-slider-pagination-total span");
      if (paginationTotalEl) paginationTotalEl.textContent = `${selectedIndex + 1}/${totalPages}`;
      dots.forEach((dot, i) => {
        dot.className = "lh-slider-pagination";
        if (i === selectedIndex) dot.classList.add("active");
        else if (i === selectedIndex - 1) dot.classList.add("prev");
        else if (i === selectedIndex - 2) dot.classList.add("prev-prev");
        else if (i === selectedIndex + 1) dot.classList.add("next");
        else if (i === selectedIndex + 2) dot.classList.add("next-next");
      });
      updateProgress(wrapper, selectedIndex, totalPages);
      // Dynamic dots move
      if (paginationType === "dynamic-dots" && paginationWrapperInner) {
        const realDots = wrapper.querySelectorAll(".lh-slider-pagination");
        if (!realDots) return;
        const style = getComputedStyle(realDots[0]);
        const DOT_SIZE = parseFloat(style.width) || 0;
        const DOT_MARGIN = parseFloat(style.marginLeft) || 0;
        const DOT_FULL = DOT_SIZE + DOT_MARGIN * 2;
        const baseOffset = DOT_FULL * 2;
        const offset = baseOffset - selectedIndex * DOT_FULL;
        realDots.forEach(dot => {
          dot.style.left = `${offset}px`;
        });
      }
      // Controls visibility
      const controls = wrapper.querySelector(".lh-slider-controls");
      setTimeout(() => {
        if (controls) {
          controls.removeAttribute("show-desktop");
          controls.removeAttribute("show-tablet");
          controls.removeAttribute("show-mobile");
          if (width >= 1024 && totalItems > getItemsPerView(1024, emblaNode)) {
            controls.setAttribute("show-desktop", "true");
          } else if (width >= 640 && width <= 1023 && totalItems > getItemsPerView(640, emblaNode)) {
            controls.setAttribute("show-tablet", "true");
          } else if (width <= 767 && totalItems > getItemsPerView(375, emblaNode)) {
            controls.setAttribute("show-mobile", "true");
          }
          if (controls) {
            controls.style.setProperty("--height-controls", `${controls.offsetHeight}px`);
          }
        }
      }, 100);
      const btnPrev = wrapper.querySelector(".lh-slider-nav-left");
      const btnNext = wrapper.querySelector(".lh-slider-nav-right");
      if (btnPrev) {
        btnPrev.disabled = !embla.canScrollPrev();
        btnPrev.classList.toggle("disabled", !embla.canScrollPrev());
      }
      if (btnNext) {
        btnNext.disabled = !embla.canScrollNext();
        btnNext.classList.toggle("disabled", !embla.canScrollNext());
      }
      updateSlideActive(itemsPerView, isFade);
    }
    wrapper.querySelector(".lh-slider-nav-left")?.addEventListener("click", embla.scrollPrev);
    wrapper.querySelector(".lh-slider-nav-right")?.addEventListener("click", embla.scrollNext);
    embla.on("select", updateUI);
    embla.on("reInit", () => {
      setupAutoplay(
        embla.containerNode(),
        embla.containerNode().getAttribute("data-play") === "true",
        parseTransition(embla.containerNode().getAttribute("data-transition"))
      );
      resetProgress();
      dots.forEach(dot => dot.removeEventListener("click", () => { }));
      dots = [];
      const result = createPagination(wrapper, emblaNode, paginationType, getTotalPages());
      dots = result.dotsArr;
      paginationWrapperInner = result.paginationWrapperInner;
      updateUI();
    });
    setupAutoplay(emblaNode, autoplay, transition);
    resetProgress();
    updateUI();

    if (wrapper.emblaThumb) {
      wrapper.emblaThumb.destroy();
      wrapper.emblaThumb = null;
    }

    // Thumbnails
    function initEmblaThumbs(wrapper) {
      const mediaProduct = wrapper.querySelector('.lh-carousel');
      const emblaThumbNode = wrapper.querySelector('.lh-product-thumb-slide');
      const emblaNode = mediaProduct?.querySelector('.lh-slider-wrapper');
      const viewportWidth = window.innerWidth;

      if (!emblaThumbNode || !emblaNode || !isSliderLayout(viewportWidth, emblaNode)) return;

      const isVertical =
        (viewportWidth > 1023 && mediaProduct?.dataset.positionThumbs !== 'bottom') ||
        ((viewportWidth > 639 && mediaProduct?.dataset.positionThumbsTablet !== 'bottom'));

      const OPTIONS_THUMBS = {
        dragFree: true,
        containScroll: 'keepSnaps',
        selectedClass: 'is-active',
        axis: isVertical ? 'y' : 'x',
      };

      if (wrapper.emblaThumb) {
        wrapper.emblaThumb.destroy();
        wrapper.emblaThumb = null;
      }

      const emblaThumb = EmblaCarousel(emblaThumbNode, OPTIONS_THUMBS);
      wrapper.emblaThumb = emblaThumb;

      if (!wrapper.embla) {
        setTimeout(() => initEmblaThumbs(wrapper), 100);
        return;
      }

      const syncThumbs = () => {
        const index = wrapper.embla.selectedScrollSnap?.();
        if (index == null) return; // tránh lỗi khi embla chưa snap

        emblaThumb.slideNodes().forEach((thumb, i) => {
          thumb.classList.toggle('is-active', i === index);
        });

        emblaThumb.scrollTo(index);
      };

      wrapper.embla.on('select', syncThumbs);
      wrapper.embla.on('init', syncThumbs);
      wrapper.embla.on('reInit', syncThumbs);

      requestAnimationFrame(syncThumbs);
      setTimeout(syncThumbs, 100);

      emblaThumb.slideNodes().forEach((thumb, index) => {
        thumb.addEventListener('click', () => wrapper.embla.scrollTo(index));
      });
    }



    // --- Init
    initEmblaThumbs(wrapper);
    setTimeout(() => {
      setupThumbClickHandlers();
    }, 50);


    // --- Resize observer
    let resizeTimer;
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        if (isSliderLayout(width, emblaNode)) {
          initEmblaThumbs(wrapper);
        }
      }, 300);
    });

    // --- Mutation observer
    const mediaProductEl = wrapper.querySelector('.lh-media-product');
    if (mediaProductEl) {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-position-thumbs'
          ) {
            initEmblaThumbs(wrapper);
          }
        }
      });
      observer.observe(mediaProductEl, {
        attributes: true,
        attributeFilter: ['data-position-thumbs'],
      });
    }
    // Editor support
    function attachActivatedObserver(embla) {
      const items = embla.slideNodes();
      if (!items.length) return;
      const activatedObserver = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-lh-block-activated"
          ) {
            const activatedItem = mutation.target;
            if (activatedItem.getAttribute("data-lh-block-activated") === "true") {
              const index = Array.from(items).indexOf(activatedItem);
              if (index !== -1) {
                embla.scrollTo(index, true)
              }
            }
          }
        }
      });
      items.forEach(item => {
        activatedObserver.observe(item, {
          attributes: true,
          attributeFilter: ["data-lh-block-activated"],
        });
      });
    }
    function observeItemReorder(embla, wrapper) {
      let debounceTimer = null;
      const reorderObserver = new MutationObserver(() => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          attachActivatedObserver(embla);
        }, 1000);
      });
      reorderObserver.observe(wrapper, {
        childList: true,
        subtree: true,
      });
    }
    attachActivatedObserver(embla);
    observeItemReorder(embla, embla.containerNode());
  }


  // =====================
  // Resize debounce
  // =====================
  let resizeTimeout;
  let lastWidth = window.innerWidth;
  window.addEventListener("resize", () => {

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentWidth = window.innerWidth;
      if (Math.abs(currentWidth - lastWidth) >= 100) {
        let hasActivated = emblaNodeObserver.querySelector('[data-lh-block-activated]');
        if (hasActivated) {
          setTimeout(() => {
            let activeItem = emblaNodeObserver.querySelector(".lh-slide-item.active");
            if (activeItem) {
              activeItem.click();
            }
          }, 50);
        }
        initSlider();
        lastWidth = currentWidth;
      }
    }, 100);
  });


  // =====================
  // Mutation observer for attrs
  // =====================
  const emblaNodeObserver = wrapper.querySelector(".lh-carousel");
  if (emblaNodeObserver) {
    const observer = new MutationObserver((mutations) => {
      if (
        mutations.some((m) =>
          [
            "data-loop", "data-effect", "data-align", "data-scroll",
            "data-pagination-width", "data-pagination",
            "data-item", "data-item-table", "data-item-mobile",
            "data-play", "data-transition",
            "data-desktop-layout", "data-mobile-layout",
            "data-position-thumbs", "data-position-thumbs-tablet"
          ].includes(m.attributeName)
        )
      ) {
        initSlider();
      }
    });
    observer.observe(emblaNodeObserver, { attributes: true, subtree: true });
  }
  initSlider();


};

const productMediaWrapper = wrapper.querySelector('.lh-product-media-wrapper');
window.LayoutHubSlider(productMediaWrapper);

const sliderWrapperrEl = wrapper.querySelector('.lh-product-media');
const slideItemsEl = sliderWrapperrEl.querySelectorAll('.lh-slide-item');

let isSliderLayout = null

function setupThumbClickHandlers() {
  const thumbs = wrapper.querySelectorAll('.lh-product-thumb-slide .lh-slide-item');


  if (window.innerWidth > 1024) {
    isSliderLayout = sliderWrapperrEl.getAttribute('data-desktop-layout') === 'slider';
  }
  else if (window.innerWidth > 640 && window.innerWidth < 1023) {
    isSliderLayout = sliderWrapperrEl.getAttribute('data-tablet-layout') === 'slider';
  }
  else {
    isSliderLayout = sliderWrapperrEl.getAttribute('data-mobile-layout') === 'slider';
  }

  if (!thumbs || thumbs.length === 0) return;

  thumbs.forEach((thumb, index) => {

    if (!thumb._onThumbClick) {
      thumb._onThumbClick = () => handleActiveThumb(index);
    }

    if (!isSliderLayout) {
      if (!thumb._isBound) {
        thumb.addEventListener('click', thumb._onThumbClick);
        thumb._isBound = true;

      }
    } else {
      if (thumb._isBound) {
        thumb.removeEventListener('click', thumb._onThumbClick);
        thumb._isBound = false;

      }
    }
  });

  if (!isSliderLayout) {
    thumbs[0].classList.add('is-active'); 
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

function handleActiveThumb(index) {
  if (isSliderLayout) return;
  const thumbs = wrapper.querySelectorAll('.lh-product-thumb-slide .lh-slide-item');

  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('is-active', index === i);
  });

  const item = wrapper.querySelector(`.lh-slide-item[data-index="${index}"]`);
  if (!item) return;

  requestAnimationFrame(() => {
    if (!isInViewport(wrapper)) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  });
}

setupThumbClickHandlers();

if (sliderWrapperrEl) {
  const observer = new MutationObserver((mutations) => {
    for (mutation of mutations) {
      if (mutation.attributeName === 'data-desktop-layout') {
        setupThumbClickHandlers();
      }
    }
  });
  observer.observe(sliderWrapperrEl, { attributes: true, subtree: false });
}

window.addEventListener('resize', () => {
  setupThumbClickHandlers();
})



function updateThumbHeight() {
  const productMedia = wrapper.querySelector('.lh-product-media');
  const thumbSlide = wrapper.querySelector('.lh-product-thumb-slide');

  if (productMedia && thumbSlide) {
    const height = productMedia.offsetHeight;

    thumbSlide.style.setProperty('--thumb-height', `${height}px`);
  }
}

updateThumbHeight();

const resizeObserver = new ResizeObserver(updateThumbHeight);
resizeObserver.observe(wrapper.querySelector('.lh-product-media'));

window.addEventListener('resize', updateThumbHeight);


if (mode != 'dev') {
  wrapper.querySelectorAll('.lh-btn-options[data-url]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const url = this.dataset.url;
      if (url) {
        window.location.href = url;
      }
    });
  });
  wrapper.querySelectorAll(".lh-rating-preview").forEach(function (el) {
    el.remove();
  });
} else {
  wrapper.querySelectorAll(".lh-rating-live").forEach(function (el) {
    el.remove();
  });
}

const iconsWrapper = wrapper.querySelector('.lh-icons');
if (iconsWrapper) {
  window.LayoutHubSlider(iconsWrapper);
}

})(document.querySelector('section.lh-ews9yf'), 'live');
}catch(ex){console.error(ex)}

try {
((wrapper, mode) => {/* LayoutHub assets/script.js */
const appBlock = wrapper.querySelector(".lh-app-block");
if (appBlock && !appBlock.classList.contains("lh-panel")) {
  appBlock.classList.add("lh-panel");
}

const tabs = wrapper.querySelectorAll(".lh-tab");
const panels = wrapper.querySelectorAll(".lh-panel");

tabs.forEach((tab, i) => (tab.dataset.tab = i));
panels.forEach((panel, i) => (panel.dataset.content = i));

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    const tabId = tab.dataset.tab;

    tabs.forEach(t => t.classList.toggle("active", t === tab));

    panels.forEach(panel =>
      panel.classList.toggle("active", panel.dataset.content === tabId)
    );
  });
});

if (tabs.length && panels.length) {
  tabs[0].classList.add("active");
  panels[0].classList.add("active");
}

const content = wrapper.querySelector("#details-content");
const fade = wrapper.querySelector("#fade-overlay");
const btnMore = wrapper.querySelector("#read-more-btn");
const btnLess = wrapper.querySelector("#read-less-btn");

if (content && btnMore && btnLess) {
  content.style.transition = "max-height 0.5s ease-in-out";

  function getCollapsedHeight() {
    const width = window.innerWidth;
    if (width >= 1024) return 831;
    if (width >= 640) return 987;
    return 1242;
  }

  function setCollapsedState() {
    const collapsedHeight = getCollapsedHeight();
    const fullHeight = content.scrollHeight;

    if (fullHeight <= collapsedHeight) {
      content.style.maxHeight = fullHeight + "px";
      fade.style.display = "none";
      btnMore.style.display = "none";
      btnLess.style.display = "none";
      return false;
    }

    content.style.maxHeight = collapsedHeight + "px";
    fade.style.display = "block";
    btnMore.style.display = "flex";
    btnLess.style.display = "none";
    return true;
  }

  let isExpandable = setCollapsedState();
  let isExpanded = false;

  btnMore.addEventListener("click", () => {
    if (!isExpandable) return;

    content.style.maxHeight = content.scrollHeight + "px";
    fade.style.display = "none";
    btnMore.style.display = "none";
    btnLess.style.display = "flex";
    isExpanded = true;
  });

  btnLess.addEventListener("click", () => {
    const collapsedHeight = getCollapsedHeight();
    content.style.maxHeight = collapsedHeight + "px";
    fade.style.display = "block";
    btnMore.style.display = "flex";
    btnLess.style.display = "none";
    isExpanded = false;
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      isExpandable = setCollapsedState();
      isExpanded = false;
    }, 200);
  });
}





})(document.querySelector('section.lh-8yrekx'), 'live');
}catch(ex){console.error(ex)}

try {
((wrapper, mode) => {/* LayoutHub assets/script.js */
window.LayoutHubSlider(wrapper);

if (mode != 'dev') {
  wrapper.querySelectorAll('.lh-btn-options[data-url]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const url = this.dataset.url;
    if (url) {
      window.location.href = url;
    }
  });
});
  wrapper.querySelectorAll(".lh-rating-preview").forEach(function (el) {
    el.remove();
  });
} else {
  wrapper.querySelectorAll(".lh-rating-live").forEach(function (el) {
    el.remove();
  });
}


/* LayoutHub assets/lh-swatch.js */
const settingsEl = wrapper.querySelector('#money-settings');

let rawFormat = settingsEl?.dataset.format || '{{amount}}';
rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, '');
const moneyFormat = rawFormat;
const currency = settingsEl?.dataset.currency || 'USD';

function formatMoney(cents, format = moneyFormat) {
  if (typeof cents === 'string') cents = cents.replace('.', '');
  cents = isNaN(cents) ? 0 : parseInt(cents, 10);

  function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
    number = (Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
    const parts = number.split('.');
    const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    return dollars + (parts[1] ? decimal + parts[1] : '');
  }

  return format.replace(/{{\s*(\w+)\s*}}/g, (match, token) => {
    switch (token) {
      case 'amount': return formatWithDelimiters(cents / 100, 2);
      case 'amount_no_decimals': return formatWithDelimiters(cents / 100, 0);
      case 'amount_with_comma_separator': return formatWithDelimiters(cents / 100, 2, '.', ',');
      case 'amount_no_decimals_with_comma_separator': return formatWithDelimiters(cents / 100, 0, '.', ',');
      case 'currency': return currency;
      default: return formatWithDelimiters(cents / 100, 2);
    }
  });
}

function updateSwatchThumbnail(productBox, dataSrc) {
  const thumbnail = productBox.querySelector('.lh-product-thumbnail .img-with-variant');
  if (dataSrc && thumbnail) {
    thumbnail.src = dataSrc;
    thumbnail.srcset = dataSrc;
  }
}

wrapper.querySelectorAll('.lh-product-box[data-product-id]').forEach(productBox => {
  const select = productBox.querySelector('.lh-single-option-selector');
  const idInput = productBox.querySelector('[name="id"]');
  const priceEl = productBox.querySelector('.lh-special-price .lh-price');
  const compareEl = productBox.querySelector('.lh-old-price .lh-price');
  const button = productBox.querySelector('.lh-add-to-cart');
  const scriptEl = productBox.querySelector('.lh-product-json');
  if (!scriptEl) return;
  const data = JSON.parse(scriptEl.textContent);
  const variants = data.variants || [];
  const swatches = productBox.querySelectorAll('.lh-swatch');

  // ======= Set Default Variant =======
  swatches.forEach(swatch => {
    const radios = swatch.querySelectorAll('input[type="radio"]');
    for (const radio of radios) {
      const swatchEl = radio.closest('.lh-swatch-element');
      if (!radio.disabled && !swatchEl?.classList.contains('lh-sold-out')) {
        radio.checked = true;
        updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
        break;
      }
    }
  });

  updateSelectedVariant();

  productBox.addEventListener('change', e => {
    if (e.target.matches('.lh-swatch-element input[type="radio"]')) {
      updateSelectedVariant();
    }
  });

  productBox.addEventListener('click', e => {
    const swatchEl = e.target.closest('.lh-swatch-element');
    if (swatchEl) {
      updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
    }
  });
  function updateSelectedVariant() {
    const selectedOptions = Array.from(swatches).map(swatch =>
      swatch.querySelector('input[type="radio"]:checked')?.value.trim() || ''
    );

    const matchedVariant = variants.find(v =>
      Array.isArray(v.options) &&
      v.options.every((opt, i) => opt === selectedOptions[i])
    );
    if (!matchedVariant) return;

    const contactText = document.querySelector('.data-tex-locales')?.dataset.textContact || 'Contact';

    // Update Inputs
    if (idInput) idInput.value = matchedVariant.id;
    if (select) {
      select.value = matchedVariant.id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Update Price
    if (priceEl) {
      priceEl.innerHTML = matchedVariant.price === 0
        ? contactText
        : formatMoney(matchedVariant.price, moneyFormat);
    }

    if (compareEl) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        compareEl.innerHTML = formatMoney(matchedVariant.compare_at_price, moneyFormat);
        compareEl.closest('.lh-old-price')?.classList.remove('hidden');
      } else {
        compareEl.innerHTML = '';
        compareEl.closest('.lh-old-price')?.classList.add('hidden');
      }
    }
    // === Update Sale / Sold Out Badge ===
    const saleBadge = productBox.querySelector('.lh-sale-badge[data-percent="true"]');
    if (saleBadge) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        const discount = Math.round((matchedVariant.compare_at_price - matchedVariant.price) / matchedVariant.compare_at_price * 100);
        saleBadge.innerHTML = `<span class="sale-percent">-${discount}%</span>`;
        saleBadge.classList.remove('hidden');
      } else {
        saleBadge.classList.add('hidden');
      }
    }

    // === Update Sale State ===
    const priceBox = productBox.querySelector('.lh-price-box');
    if (priceBox) {
      const isOnSale = matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0;
      priceBox.classList.toggle('lh-on-sale', isOnSale);
    }



    // Update Button

    if (button && idInput) {
      let productLabels = {};
      const labelScript = wrapper.querySelector('#lh-button-labels');

      try {
        productLabels = JSON.parse(labelScript?.textContent || '{}');
      } catch (e) {
        console.warn('Failed to parse product labels:', e);
      }

      const isContact = matchedVariant.price === 0;
      const isAvailable = matchedVariant.available;
      const shouldDisable = isContact || !isAvailable;
      button.disabled = shouldDisable;
      button.style.pointerEvents = shouldDisable ? 'none' : 'auto';
      const span = button.querySelector('span');
      if (span) {
        if (!isAvailable) {
          span.textContent = productLabels.inventoryOutOfStock || 'Out of stock';
        } else if (isContact) {
          span.textContent = productLabels.chooseOptions || 'Choose options';
        } else {
          span.textContent = productLabels.addToCart || 'Add to cart';
        }
      }

      button.addEventListener('click', (e) => {
        const variantId = parseInt(idInput.value, 10);
        const variant = variants.find(v => v.id === variantId);
        if (!variant || variant.price === 0 || !variant.available) {
          e.preventDefault();
        }
      });
    }



    // Disable unavailable swatches
    swatches.forEach((swatch, index) => {
      const radios = swatch.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        const value = radio.value.trim();
        const testOptions = [...selectedOptions];
        testOptions[index] = value;

        const available = variants.some(v =>
          v.available && v.options.every((opt, i) => opt === testOptions[i])
        );

        const swatchEl = radio.closest('.lh-swatch-element');
        swatchEl?.classList.toggle('lh-sold-out', !available);
      });
    });
  }

});


})(document.querySelector('section.lh-1arktk'), 'live');
}catch(ex){console.error(ex)}

try {
((wrapper, mode) => {/* LayoutHub assets/script.js */
  const titles = wrapper.querySelectorAll('.lh-item-question');
titles.forEach(title => {
  title.addEventListener('click', () => {
    const parent = title.closest('.lh-item');
    if (parent.classList.contains('open-checkbox')) {
      parent.classList.remove('open-checkbox');
    }
    parent.classList.toggle('active');
  });
});


})(document.querySelector('section.lh-txu5sr'), 'live');
}catch(ex){console.error(ex)}

try {
((wrapper, mode) => {/* LayoutHub assets/script.js */
window.LayoutHubSlider(wrapper);

if (mode != 'dev') {
  wrapper.querySelectorAll('.lh-btn-options[data-url]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const url = this.dataset.url;
    if (url) {
      window.location.href = url;
    }
  });
});
  wrapper.querySelectorAll(".lh-rating-preview").forEach(function (el) {
    el.remove();
  });
} else {
  wrapper.querySelectorAll(".lh-rating-live").forEach(function (el) {
    el.remove();
  });
}


/* LayoutHub assets/lh-swatch.js */
const settingsEl = wrapper.querySelector('#money-settings');

let rawFormat = settingsEl?.dataset.format || '{{amount}}';
rawFormat = rawFormat.replace(/&quot;/g, '"').replace(/^"|"$/g, '');
const moneyFormat = rawFormat;
const currency = settingsEl?.dataset.currency || 'USD';

function formatMoney(cents, format = moneyFormat) {
  if (typeof cents === 'string') cents = cents.replace('.', '');
  cents = isNaN(cents) ? 0 : parseInt(cents, 10);

  function formatWithDelimiters(number, precision = 2, thousands = ',', decimal = '.') {
    number = (Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
    const parts = number.split('.');
    const dollars = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    return dollars + (parts[1] ? decimal + parts[1] : '');
  }

  return format.replace(/{{\s*(\w+)\s*}}/g, (match, token) => {
    switch (token) {
      case 'amount': return formatWithDelimiters(cents / 100, 2);
      case 'amount_no_decimals': return formatWithDelimiters(cents / 100, 0);
      case 'amount_with_comma_separator': return formatWithDelimiters(cents / 100, 2, '.', ',');
      case 'amount_no_decimals_with_comma_separator': return formatWithDelimiters(cents / 100, 0, '.', ',');
      case 'currency': return currency;
      default: return formatWithDelimiters(cents / 100, 2);
    }
  });
}

function updateSwatchThumbnail(productBox, dataSrc) {
  const thumbnail = productBox.querySelector('.lh-product-thumbnail .img-with-variant');
  if (dataSrc && thumbnail) {
    thumbnail.src = dataSrc;
    thumbnail.srcset = dataSrc;
  }
}

wrapper.querySelectorAll('.lh-product-box[data-product-id]').forEach(productBox => {
  const select = productBox.querySelector('.lh-single-option-selector');
  const idInput = productBox.querySelector('[name="id"]');
  const priceEl = productBox.querySelector('.lh-special-price .lh-price');
  const compareEl = productBox.querySelector('.lh-old-price .lh-price');
  const button = productBox.querySelector('.lh-add-to-cart');
  const scriptEl = productBox.querySelector('.lh-product-json');
  if (!scriptEl) return;
  const data = JSON.parse(scriptEl.textContent);
  const variants = data.variants || [];
  const swatches = productBox.querySelectorAll('.lh-swatch');

  // ======= Set Default Variant =======
  swatches.forEach(swatch => {
    const radios = swatch.querySelectorAll('input[type="radio"]');
    for (const radio of radios) {
      const swatchEl = radio.closest('.lh-swatch-element');
      if (!radio.disabled && !swatchEl?.classList.contains('lh-sold-out')) {
        radio.checked = true;
        updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
        break;
      }
    }
  });

  updateSelectedVariant();

  productBox.addEventListener('change', e => {
    if (e.target.matches('.lh-swatch-element input[type="radio"]')) {
      updateSelectedVariant();
    }
  });

  productBox.addEventListener('click', e => {
    const swatchEl = e.target.closest('.lh-swatch-element');
    if (swatchEl) {
      updateSwatchThumbnail(productBox, swatchEl.getAttribute('data-src'));
    }
  });
  function updateSelectedVariant() {
    const selectedOptions = Array.from(swatches).map(swatch =>
      swatch.querySelector('input[type="radio"]:checked')?.value.trim() || ''
    );

    const matchedVariant = variants.find(v =>
      Array.isArray(v.options) &&
      v.options.every((opt, i) => opt === selectedOptions[i])
    );
    if (!matchedVariant) return;

    const contactText = document.querySelector('.data-tex-locales')?.dataset.textContact || 'Contact';

    // Update Inputs
    if (idInput) idInput.value = matchedVariant.id;
    if (select) {
      select.value = matchedVariant.id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Update Price
    if (priceEl) {
      priceEl.innerHTML = matchedVariant.price === 0
        ? contactText
        : formatMoney(matchedVariant.price, moneyFormat);
    }

    if (compareEl) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        compareEl.innerHTML = formatMoney(matchedVariant.compare_at_price, moneyFormat);
        compareEl.closest('.lh-old-price')?.classList.remove('hidden');
      } else {
        compareEl.innerHTML = '';
        compareEl.closest('.lh-old-price')?.classList.add('hidden');
      }
    }
    // === Update Sale / Sold Out Badge ===
    const saleBadge = productBox.querySelector('.lh-sale-badge[data-percent="true"]');
    if (saleBadge) {
      if (matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0) {
        const discount = Math.round((matchedVariant.compare_at_price - matchedVariant.price) / matchedVariant.compare_at_price * 100);
        saleBadge.innerHTML = `<span class="sale-percent">-${discount}%</span>`;
        saleBadge.classList.remove('hidden');
      } else {
        saleBadge.classList.add('hidden');
      }
    }

    // === Update Sale State ===
    const priceBox = productBox.querySelector('.lh-price-box');
    if (priceBox) {
      const isOnSale = matchedVariant.compare_at_price > matchedVariant.price && matchedVariant.price > 0;
      priceBox.classList.toggle('lh-on-sale', isOnSale);
    }



    // Update Button

    if (button && idInput) {
      let productLabels = {};
      const labelScript = wrapper.querySelector('#lh-button-labels');

      try {
        productLabels = JSON.parse(labelScript?.textContent || '{}');
      } catch (e) {
        console.warn('Failed to parse product labels:', e);
      }

      const isContact = matchedVariant.price === 0;
      const isAvailable = matchedVariant.available;
      const shouldDisable = isContact || !isAvailable;
      button.disabled = shouldDisable;
      button.style.pointerEvents = shouldDisable ? 'none' : 'auto';
      const span = button.querySelector('span');
      if (span) {
        if (!isAvailable) {
          span.textContent = productLabels.inventoryOutOfStock || 'Out of stock';
        } else if (isContact) {
          span.textContent = productLabels.chooseOptions || 'Choose options';
        } else {
          span.textContent = productLabels.addToCart || 'Add to cart';
        }
      }

      button.addEventListener('click', (e) => {
        const variantId = parseInt(idInput.value, 10);
        const variant = variants.find(v => v.id === variantId);
        if (!variant || variant.price === 0 || !variant.available) {
          e.preventDefault();
        }
      });
    }



    // Disable unavailable swatches
    swatches.forEach((swatch, index) => {
      const radios = swatch.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        const value = radio.value.trim();
        const testOptions = [...selectedOptions];
        testOptions[index] = value;

        const available = variants.some(v =>
          v.available && v.options.every((opt, i) => opt === testOptions[i])
        );

        const swatchEl = radio.closest('.lh-swatch-element');
        swatchEl?.classList.toggle('lh-sold-out', !available);
      });
    });
  }

});


})(document.querySelector('section.lh-asdexk'), 'live');
}catch(ex){console.error(ex)}

try {
((wrapper, mode) => {/* LayoutHub assets/script.js */
setTimeout(() => {
  window.LayoutHubSlider(wrapper);
}, 50);








})(document.querySelector('section.lh-lwhdia'), 'live');
}catch(ex){console.error(ex)}
