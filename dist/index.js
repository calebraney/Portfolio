(()=>{function N(r,t,e){return Math.max(r,Math.min(t,e))}var G=class{advance(t){var e;if(!this.isRunning)return;let i=!1;if(this.lerp)this.value=(1-(n=this.lerp))*this.value+n*this.to,Math.round(this.value)===this.to&&(this.value=this.to,i=!0);else{this.currentTime+=t;let o=N(0,this.currentTime/this.duration,1);i=o>=1;let l=i?1:this.easing(o);this.value=this.from+(this.to-this.from)*l}var n;(e=this.onUpdate)==null||e.call(this,this.value,{completed:i}),i&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:i=.1,duration:n=1,easing:o=a=>a,onUpdate:l}){this.from=this.value=t,this.to=e,this.lerp=i,this.duration=n,this.easing=o,this.currentTime=0,this.isRunning=!0,this.onUpdate=l}};function H(r,t){let e;return function(){let i=arguments,n=this;clearTimeout(e),e=setTimeout(function(){r.apply(n,i)},t)}}var P=class{constructor(t,e){this.onWindowResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight},this.onWrapperResize=()=>{this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight},this.onContentResize=()=>{let i=this.wrapper===window?document.documentElement:this.wrapper;this.scrollHeight=i.scrollHeight,this.scrollWidth=i.scrollWidth},this.wrapper=t,this.content=e,this.wrapper===window?(window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize()):(this.wrapperResizeObserver=new ResizeObserver(H(this.onWrapperResize,100)),this.wrapperResizeObserver.observe(this.wrapper),this.onWrapperResize()),this.contentResizeObserver=new ResizeObserver(H(this.onContentResize,100)),this.contentResizeObserver.observe(this.content),this.onContentResize()}destroy(){var t,e;window.removeEventListener("resize",this.onWindowResize,!1),(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},B=()=>({events:{},emit(r,...t){let e=this.events[r]||[];for(let i=0,n=e.length;i<n;i++)e[i](...t)},on(r,t){var e;return(e=this.events[r])!=null&&e.push(t)||(this.events[r]=[t]),()=>{var i;this.events[r]=(i=this.events[r])==null?void 0:i.filter(n=>t!==n)}}}),D=class{constructor(t,{wheelMultiplier:e=1,touchMultiplier:i=2,normalizeWheel:n=!1}){this.onTouchStart=o=>{let{clientX:l,clientY:a}=o.targetTouches?o.targetTouches[0]:o;this.touchStart.x=l,this.touchStart.y=a},this.onTouchMove=o=>{let{clientX:l,clientY:a}=o.targetTouches?o.targetTouches[0]:o,u=l-this.touchStart.x,v=Math.abs(u),w=Math.max(0*v,1),p=a-this.touchStart.y,m=Math.abs(p),T=Math.max(0*m,1);u*=-w*this.touchMultiplier,p*=-T*this.touchMultiplier,this.touchStart.x=l,this.touchStart.y=a,this.emitter.emit("scroll",{type:"touch",deltaX:u,deltaY:p,event:o})},this.onWheel=o=>{let{deltaX:l,deltaY:a}=o;this.normalizeWheel&&(l=N(-100,l,100),a=N(-100,a,100)),l*=this.wheelMultiplier,a*=this.wheelMultiplier,this.emitter.emit("scroll",{type:"wheel",deltaX:l,deltaY:a,event:o})},this.element=t,this.wheelMultiplier=e,this.touchMultiplier=i,this.normalizeWheel=n,this.touchStart={x:null,y:null},this.emitter=B(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.events={},this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1})}},I=class{constructor({direction:t,gestureDirection:e,mouseMultiplier:i,smooth:n,wrapper:o=window,content:l=document.documentElement,wheelEventsTarget:a=o,smoothWheel:u=n==null||n,smoothTouch:v=!1,duration:w,easing:p=g=>Math.min(1,1.001-Math.pow(2,-10*g)),lerp:m=w?null:.1,infinite:T=!1,orientation:s=t??"vertical",gestureOrientation:h=e??"vertical",touchMultiplier:f=1,wheelMultiplier:c=i??1,normalizeWheel:_=!1}={}){this.onVirtualScroll=({type:g,deltaX:O,deltaY:L,event:b})=>{if(b.ctrlKey||this.options.gestureOrientation==="vertical"&&L===0||this.options.gestureOrientation==="horizontal"&&O===0||g==="touch"&&this.options.gestureOrientation==="vertical"&&this.scroll===0&&!this.options.infinite&&L<=0||b.composedPath().find(E=>E==null||E.hasAttribute==null?void 0:E.hasAttribute("data-lenis-prevent")))return;if(this.isStopped||this.isLocked)return void b.preventDefault();if(this.isSmooth=this.options.smoothTouch&&g==="touch"||this.options.smoothWheel&&g==="wheel",!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();b.preventDefault();let d=L;this.options.gestureOrientation==="both"?d=Math.abs(L)>Math.abs(O)?L:O:this.options.gestureOrientation==="horizontal"&&(d=O),this.scrollTo(this.targetScroll+d,{programmatic:!1})},this.onScroll=()=>{if(!this.isScrolling){let g=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-g),this.emit()}},t&&console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"),e&&console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"),i&&console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"),n&&console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"),window.lenisVersion="1.0.6",o!==document.documentElement&&o!==document.body||(o=window),this.options={wrapper:o,content:l,wheelEventsTarget:a,smoothWheel:u,smoothTouch:v,duration:w,easing:p,lerp:m,infinite:T,gestureOrientation:h,orientation:s,touchMultiplier:f,wheelMultiplier:c,normalizeWheel:_},this.dimensions=new P(o,l),this.rootElement.classList.add("lenis"),this.velocity=0,this.isStopped=!1,this.isSmooth=u||v,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.animate=new G,this.emitter=B(),this.options.wrapper.addEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll=new D(a,{touchMultiplier:f,wheelMultiplier:c,normalizeWheel:_}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.events={},this.options.wrapper.removeEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll.destroy()}on(t,e){return this.emitter.on(t,e)}off(t,e){var i;this.emitter.events[t]=(i=this.emitter.events[t])==null?void 0:i.filter(n=>e!==n)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(t){let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:i=!1,lock:n=!1,duration:o=this.options.duration,easing:l=this.options.easing,lerp:a=!o&&this.options.lerp,onComplete:u=null,force:v=!1,programmatic:w=!0}={}){if(!this.isStopped||v){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var p;let m;if(typeof t=="string"?m=document.querySelector(t):(p=t)!=null&&p.nodeType&&(m=t),m){if(this.options.wrapper!==window){let s=this.options.wrapper.getBoundingClientRect();e-=this.isHorizontal?s.left:s.top}let T=m.getBoundingClientRect();t=(this.isHorizontal?T.left:T.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?w&&(this.targetScroll=this.animatedScroll=this.scroll):t=N(0,t,this.limit),i)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.emit(),void(u==null||u());if(!w){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:o,easing:l,lerp:a,onUpdate:(m,{completed:T})=>{n&&(this.isLocked=!0),this.isScrolling=!0,this.velocity=m-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=m,this.setScroll(this.scroll),w&&(this.targetScroll=m),T&&(n&&(this.isLocked=!1),requestAnimationFrame(()=>{this.isScrolling=!1}),this.velocity=0,u?.()),this.emit()}})}}}get rootElement(){return this.options.wrapper===window?this.options.content:this.options.wrapper}get limit(){return this.isHorizontal?this.dimensions.limit.x:this.dimensions.limit.y}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(t,e){let i=t%e;return(e>0&&i<0||e<0&&i>0)&&(i+=e),i}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.rootElement.classList.toggle("lenis-smooth",t),this.__isSmooth=t)}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.rootElement.classList.toggle("lenis-scrolling",t),this.__isScrolling=t)}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.rootElement.classList.toggle("lenis-stopped",t),this.__isStopped=t)}};var S=function(r,t){let e=typeof r;return typeof t!="string"||t.trim()===""?r:t==="true"&&e==="boolean"?!0:t==="false"&&e==="boolean"?!1:isNaN(t)&&e==="string"?t:!isNaN(t)&&e==="number"?+t:r};var k=function(r,t,e){if(!r||!t||!e){console.error(`GSAP checkBreakpoints Error in ${t}`);return}let{isMobile:i,isTablet:n,isDesktop:o,reduceMotion:l}=e.conditions;if(i===void 0||n===void 0||o===void 0){console.error("GSAP Match Media Conditions Not Defined");return}let a=`data-ix-${t}-desktop`,u=`data-ix-${t}-tablet`,v=`data-ix-${t}-mobile`;return runMobile=S(!0,r.getAttribute(v)),runTablet=S(!0,r.getAttribute(u)),runDesktop=S(!0,r.getAttribute(a)),!(runMobile===!1&&i||runTablet===!1&&n||runDesktop===!1&&o)};var U=function(r){let t="mouseover",e='[data-ix-mouseover="wrap"]',i='[data-ix-mouseover="layer"]',n='[data-ix-mouseover="target"]',o="data-ix-mouseover-duration",l="data-ix-mouseover-ease",a="data-ix-mouseover-move-x",u="data-ix-mouseover-move-y",v="data-ix-mouseover-rotate-z";document.querySelectorAll(e).forEach(p=>{let m=p.querySelectorAll(i);if(m.length===0||k(p,t,r)===!1)return;let s=p.querySelector(n);s||(s=p),function(){let f={x:.5,y:.5},c={x:f.x,y:f.y},_=S(.5,p.getAttribute(o)),g=S("power1.out",p.getAttribute(l)),O=gsap.timeline({paused:!0,defaults:{ease:"none"}}),L=gsap.timeline({paused:!0,defaults:{ease:"none"}});m.forEach(d=>{let E=S(10,d.getAttribute(a)),x=S(10,d.getAttribute(u)),C=S(0,d.getAttribute(v));O.fromTo(d,{xPercent:E*-1,rotateZ:C*-1},{xPercent:E,rotateZ:C},0),L.fromTo(d,{yPercent:x*-1},{yPercent:x},0)});function b(d,E){gsap.to(c,{x:d,y:E,ease:g,duration:_,onUpdate:()=>{O.progress(c.x),L.progress(c.y)}})}b(f.x,f.y),s.addEventListener("mousemove",function(d){let E=s.getBoundingClientRect(),x=gsap.utils.clamp(0,1,gsap.utils.normalize(0,E.width,d.clientX-E.left)),C=gsap.utils.clamp(0,1,gsap.utils.normalize(0,E.height,d.clientY-E.top));b(x,C)}),s.addEventListener("mouseleave",function(d){b(f.x,f.y)})}()})};var Y=function(r){let t="hoveractive",e='[data-ix-hoveractive="wrap"]',i="data-ix-hoveractive-class",n="is-active";gsap.utils.toArray(e).forEach(l=>{if(!l)return;let a=S(n,l.getAttribute(i));k(l,t,r)!==!1&&(l.addEventListener("mouseover",function(v){l.classList.add(a)}),l.addEventListener("mouseleave",function(v){l.classList.remove(a)}))})};var X=function(r){let t="scrolling",e='[data-ix-scrolling="wrap"]',i='[data-ix-scrolling="trigger"]',n='[data-ix-scrolling="layer"]',o="data-ix-scrolling-start",l="data-ix-scrolling-end",a="data-ix-scrolling-scrub",u="data-ix-scrolling-position",v="data-ix-scrolling-x-start",w="data-ix-scrolling-x-end",p="data-ix-scrolling-y-start",m="data-ix-scrolling-y-end",T="data-ix-scrolling-width-start",s="data-ix-scrolling-width-end",h="data-ix-scrolling-height-start",f="data-ix-scrolling-height-end",c="data-ix-scrolling-rotate-z-start",_="data-ix-scrolling-rotate-z-end",g="data-ix-scrolling-opacity-start",O="data-ix-scrolling-opacity-end",L="data-ix-scrolling-clip-start",b="data-ix-scrolling-clip-end",d="data-ix-scrolling-clip-end";gsap.utils.toArray(e).forEach(x=>{let C=x.querySelectorAll(n);if(!x||C.length===0)return;let W=x.querySelector(i);if(W||(W=x),k(x,t,r)===!1)return;let y={scrub:.5,start:"top bottom",end:"bottom top"};y.start=S(y.start,x.getAttribute(o)),y.end=S(y.end,x.getAttribute(l)),y.scrub=S(y.scrub,x.getAttribute(a));let V=gsap.timeline({scrollTrigger:{trigger:W,start:y.start,end:y.end,scrub:y.scrub,markers:!1},defaults:{duration:1,ease:"none"}});C.forEach(z=>{if(!z)return;let M={},A={},R=function(q,K){let j=z.hasAttribute(q),J=S(K,z.getAttribute(q));if(j)return J};M.x=R(v,"0%"),A.x=R(w,"0%"),M.y=R(p,"0%"),A.y=R(m,"0%"),M.width=R(T,"0%"),A.width=R(s,"0%"),M.height=R(h,"0%"),A.height=R(f,"0%"),M.rotateZ=R(c,0),A.rotateZ=R(_,0),M.opacity=R(g,0),A.opacity=R(O,0),M.clipPath=R(L,"string"),A.clipPath=R(b,"string");let F=S("<",z.getAttribute(u)),tt=V.fromTo(z,M,A,F)})})};var Z=function(){let r=document.querySelector('[cursor="inner"]'),t=document.querySelector('[cursor="outer"]'),e=document.querySelector('[cursor="component"]');if(!r||!t||!e)return;let i=[r,t,e],n="is-cursor-minor",o="is-vanished",l="is-view-page",a="is-view-case",u="is-next-case",v="is-prev-case",w="is-lets-go",p="is-image-black",m="is-image-white",T="is-next-case-w",s="is-not-blended",h="is-black";function f(_,g){_.classList.contains(g)?_.classList.remove(g):_.classList.add(g)}function c(_,g){let O=document.querySelectorAll(_);O.length!==0&&O.forEach(L=>{!L||(L.addEventListener("mouseover",()=>{i.forEach((b,d)=>{g[d]!==void 0&&f(b,g[d])})}),L.addEventListener("mouseout",()=>{i.forEach((b,d)=>{g[d]!==void 0&&f(b,g[d])})}))})}c(".is-cursor-minor, .text-style-link, .menu_small-text-link, .footer_primary-link, .footer_text-link, .footer_icon, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link",[n,n]),c('[cursor="minor"]',[n,n]),c('[cursor="view-page"]',[o,l,s]),c('[cursor="view-case"]',[o,a,s]),c(".home-work_item",[h,a,s]),c(".work_button-circle",[o,a,s]),c(".is-next-case",[o,u,s]),c(".is-prev-case",[o,v,s]),c('[cursor="lets-go"]',[o,w,s]),c('[cursor="image-black"]',[p,n,s]),c('[cursor="image-white"]',[m,n,s]),c(".cs-next_component",[null,T,,s])};document.addEventListener("DOMContentLoaded",function(){gsap.ScrollTrigger!==void 0&&gsap.registerPlugin(ScrollTrigger),gsap.Flip!==void 0&&gsap.registerPlugin(Flip);let r=new I({duration:.8,easing:s=>s===1?1:1-Math.pow(2,-10*s),touchMultiplier:1.5});function t(s){r.raf(s),requestAnimationFrame(t)}requestAnimationFrame(t),r.on("scroll",()=>{!ScrollTrigger||ScrollTrigger.update()});let e=!1;document.querySelector(".nav-button_component").addEventListener("click",()=>{e=!e,e?i():n()});function i(){r.stop()}function n(){r.start()}let o=document.querySelector(".transition-trigger"),l=1600,a=1800,u="no-transition";o&&(o.click(),$("body").addClass("no-scroll-transition"),r.stop(),setTimeout(()=>{$("body").removeClass("no-scroll-transition"),r.start()},l)),$("a").on("click",function(s){if($(this).prop("hostname")==window.location.host&&$(this).attr("href").indexOf("#")===-1&&!$(this).hasClass(u)&&$(this).attr("target")!=="_blank"&&o.length>0){s.preventDefault(),$("body").addClass("no-scroll-transition");let h=$(this).attr("href");o.click(),setTimeout(function(){window.location=h},a)}}),window.onpageshow=function(s){s.persisted&&window.location.reload()},setTimeout(()=>{$(window).on("resize",function(){setTimeout(()=>{$(".transition").css("display","none")},50)})},l);let v=Math.round(window.devicePixelRatio*100/2);function w(){v>100?$("body").addClass("user-font-size"):$("body").removeClass("user-font-size")}w(),$(window).resize(function(){v=Math.round(window.devicePixelRatio*100/2),w()}),$(".button_link").on("mouseenter mouseleave",function(){$(this).find(".button_circle").toggleClass("is-hovered"),$(this).toggleClass("is-hovered")}),$(".cta_block-item").on("click",function(){$(this).toggleClass("is-clicked")}),$("[gsap-el='edge-shrink']").each(function(s){let h=$(this);gsap.timeline({scrollTrigger:{trigger:h,start:"top bottom",end:"bottom top",scrub:.8}}).fromTo(h,{height:"100%",duration:1},{height:"15%",duration:1})}),$("[gsap-el='edge-grow']").each(function(s){let h=$(this);gsap.timeline({scrollTrigger:{trigger:h,start:"top bottom",end:"bottom top",scrub:.8}}).fromTo(h,{height:"15%",duration:1},{height:"100%",duration:1})});let p=function(){let s=document.querySelector(".secton-blog-list"),h=document.querySelector(".blog-hero_h1-wrapper"),f=document.querySelectorAll(".blog-hero_square");if(!s||!h||f.length===0)return;let c=gsap.timeline({scrollTrigger:{trigger:s,start:"top bottom",end:"top top",scrub:.5},defaults:{ease:"none",duration:1}});c.to(h,{color:"#ffffff",ease:"power2.Out"}),c.fromTo(f,{rotateZ:45},{rotateZ:275},"<")},m=function(){let s=document.querySelectorAll(".blog-hero_square");if(s.length===0)return;gsap.timeline({}).fromTo(s,{borderRadius:"100%"},{borderRadius:"0%",ease:"power1.Out",duration:1.5,stagger:{each:.25,from:"start",repeat:-1,yoyo:!0}},"<")};(function(){gsap.matchMedia().add({isMobile:"(max-width: 767px)",isTablet:"(min-width: 768px)  and (max-width: 991px)",isDesktop:"(min-width: 992px)",reduceMotion:"(prefers-reduced-motion: reduce)"},h=>{let{isMobile:f,isTablet:c,isDesktop:_,reduceMotion:g}=h.conditions;U(h),X(h),Y(h),Z(),p(),m()})})()});})();
