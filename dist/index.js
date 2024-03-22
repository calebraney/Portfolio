(()=>{function z(i,t,e){return Math.max(i,Math.min(t,e))}var G=class{advance(t){var e;if(!this.isRunning)return;let o=!1;if(this.lerp)this.value=(1-(r=this.lerp))*this.value+r*this.to,Math.round(this.value)===this.to&&(this.value=this.to,o=!0);else{this.currentTime+=t;let s=z(0,this.currentTime/this.duration,1);o=s>=1;let n=o?1:this.easing(s);this.value=this.from+(this.to-this.from)*n}var r;(e=this.onUpdate)==null||e.call(this,this.value,{completed:o}),o&&this.stop()}stop(){this.isRunning=!1}fromTo(t,e,{lerp:o=.1,duration:r=1,easing:s=a=>a,onUpdate:n}){this.from=this.value=t,this.to=e,this.lerp=o,this.duration=r,this.easing=s,this.currentTime=0,this.isRunning=!0,this.onUpdate=n}};function H(i,t){let e;return function(){let o=arguments,r=this;clearTimeout(e),e=setTimeout(function(){i.apply(r,o)},t)}}var P=class{constructor(t,e){this.onWindowResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight},this.onWrapperResize=()=>{this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight},this.onContentResize=()=>{let o=this.wrapper===window?document.documentElement:this.wrapper;this.scrollHeight=o.scrollHeight,this.scrollWidth=o.scrollWidth},this.wrapper=t,this.content=e,this.wrapper===window?(window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize()):(this.wrapperResizeObserver=new ResizeObserver(H(this.onWrapperResize,100)),this.wrapperResizeObserver.observe(this.wrapper),this.onWrapperResize()),this.contentResizeObserver=new ResizeObserver(H(this.onContentResize,100)),this.contentResizeObserver.observe(this.content),this.onContentResize()}destroy(){var t,e;window.removeEventListener("resize",this.onWindowResize,!1),(t=this.wrapperResizeObserver)==null||t.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect()}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},U=()=>({events:{},emit(i,...t){let e=this.events[i]||[];for(let o=0,r=e.length;o<r;o++)e[o](...t)},on(i,t){var e;return(e=this.events[i])!=null&&e.push(t)||(this.events[i]=[t]),()=>{var o;this.events[i]=(o=this.events[i])==null?void 0:o.filter(r=>t!==r)}}}),D=class{constructor(t,{wheelMultiplier:e=1,touchMultiplier:o=2,normalizeWheel:r=!1}){this.onTouchStart=s=>{let{clientX:n,clientY:a}=s.targetTouches?s.targetTouches[0]:s;this.touchStart.x=n,this.touchStart.y=a},this.onTouchMove=s=>{let{clientX:n,clientY:a}=s.targetTouches?s.targetTouches[0]:s,h=n-this.touchStart.x,p=Math.abs(h),v=Math.max(0*p,1),u=a-this.touchStart.y,d=Math.abs(u),T=Math.max(0*d,1);h*=-v*this.touchMultiplier,u*=-T*this.touchMultiplier,this.touchStart.x=n,this.touchStart.y=a,this.emitter.emit("scroll",{type:"touch",deltaX:h,deltaY:u,event:s})},this.onWheel=s=>{let{deltaX:n,deltaY:a}=s;this.normalizeWheel&&(n=z(-100,n,100),a=z(-100,a,100)),n*=this.wheelMultiplier,a*=this.wheelMultiplier,this.emitter.emit("scroll",{type:"wheel",deltaX:n,deltaY:a,event:s})},this.element=t,this.wheelMultiplier=e,this.touchMultiplier=o,this.normalizeWheel=r,this.touchStart={x:null,y:null},this.emitter=U(),this.element.addEventListener("wheel",this.onWheel,{passive:!1}),this.element.addEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.addEventListener("touchmove",this.onTouchMove,{passive:!1})}on(t,e){return this.emitter.on(t,e)}destroy(){this.emitter.events={},this.element.removeEventListener("wheel",this.onWheel,{passive:!1}),this.element.removeEventListener("touchstart",this.onTouchStart,{passive:!1}),this.element.removeEventListener("touchmove",this.onTouchMove,{passive:!1})}},I=class{constructor({direction:t,gestureDirection:e,mouseMultiplier:o,smooth:r,wrapper:s=window,content:n=document.documentElement,wheelEventsTarget:a=s,smoothWheel:h=r==null||r,smoothTouch:p=!1,duration:v,easing:u=L=>Math.min(1,1.001-Math.pow(2,-10*L)),lerp:d=v?null:.1,infinite:T=!1,orientation:l=t??"vertical",gestureOrientation:c=e??"vertical",touchMultiplier:g=1,wheelMultiplier:_=o??1,normalizeWheel:C=!1}={}){this.onVirtualScroll=({type:L,deltaX:x,deltaY:E,event:R})=>{if(R.ctrlKey||this.options.gestureOrientation==="vertical"&&E===0||this.options.gestureOrientation==="horizontal"&&x===0||L==="touch"&&this.options.gestureOrientation==="vertical"&&this.scroll===0&&!this.options.infinite&&E<=0||R.composedPath().find(S=>S==null||S.hasAttribute==null?void 0:S.hasAttribute("data-lenis-prevent")))return;if(this.isStopped||this.isLocked)return void R.preventDefault();if(this.isSmooth=this.options.smoothTouch&&L==="touch"||this.options.smoothWheel&&L==="wheel",!this.isSmooth)return this.isScrolling=!1,void this.animate.stop();R.preventDefault();let f=E;this.options.gestureOrientation==="both"?f=Math.abs(E)>Math.abs(x)?E:x:this.options.gestureOrientation==="horizontal"&&(f=x),this.scrollTo(this.targetScroll+f,{programmatic:!1})},this.onScroll=()=>{if(!this.isScrolling){let L=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.velocity=0,this.direction=Math.sign(this.animatedScroll-L),this.emit()}},t&&console.warn("Lenis: `direction` option is deprecated, use `orientation` instead"),e&&console.warn("Lenis: `gestureDirection` option is deprecated, use `gestureOrientation` instead"),o&&console.warn("Lenis: `mouseMultiplier` option is deprecated, use `wheelMultiplier` instead"),r&&console.warn("Lenis: `smooth` option is deprecated, use `smoothWheel` instead"),window.lenisVersion="1.0.6",s!==document.documentElement&&s!==document.body||(s=window),this.options={wrapper:s,content:n,wheelEventsTarget:a,smoothWheel:h,smoothTouch:p,duration:v,easing:u,lerp:d,infinite:T,gestureOrientation:c,orientation:l,touchMultiplier:g,wheelMultiplier:_,normalizeWheel:C},this.dimensions=new P(s,n),this.rootElement.classList.add("lenis"),this.velocity=0,this.isStopped=!1,this.isSmooth=h||p,this.isScrolling=!1,this.targetScroll=this.animatedScroll=this.actualScroll,this.animate=new G,this.emitter=U(),this.options.wrapper.addEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll=new D(a,{touchMultiplier:g,wheelMultiplier:_,normalizeWheel:C}),this.virtualScroll.on("scroll",this.onVirtualScroll)}destroy(){this.emitter.events={},this.options.wrapper.removeEventListener("scroll",this.onScroll,{passive:!1}),this.virtualScroll.destroy()}on(t,e){return this.emitter.on(t,e)}off(t,e){var o;this.emitter.events[t]=(o=this.emitter.events[t])==null?void 0:o.filter(r=>e!==r)}setScroll(t){this.isHorizontal?this.rootElement.scrollLeft=t:this.rootElement.scrollTop=t}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.velocity=0,this.animate.stop()}start(){this.isStopped=!1,this.reset()}stop(){this.isStopped=!0,this.animate.stop(),this.reset()}raf(t){let e=t-(this.time||t);this.time=t,this.animate.advance(.001*e)}scrollTo(t,{offset:e=0,immediate:o=!1,lock:r=!1,duration:s=this.options.duration,easing:n=this.options.easing,lerp:a=!s&&this.options.lerp,onComplete:h=null,force:p=!1,programmatic:v=!0}={}){if(!this.isStopped||p){if(["top","left","start"].includes(t))t=0;else if(["bottom","right","end"].includes(t))t=this.limit;else{var u;let d;if(typeof t=="string"?d=document.querySelector(t):(u=t)!=null&&u.nodeType&&(d=t),d){if(this.options.wrapper!==window){let l=this.options.wrapper.getBoundingClientRect();e-=this.isHorizontal?l.left:l.top}let T=d.getBoundingClientRect();t=(this.isHorizontal?T.left:T.top)+this.animatedScroll}}if(typeof t=="number"){if(t+=e,t=Math.round(t),this.options.infinite?v&&(this.targetScroll=this.animatedScroll=this.scroll):t=z(0,t,this.limit),o)return this.animatedScroll=this.targetScroll=t,this.setScroll(this.scroll),this.reset(),this.emit(),void(h==null||h());if(!v){if(t===this.targetScroll)return;this.targetScroll=t}this.animate.fromTo(this.animatedScroll,t,{duration:s,easing:n,lerp:a,onUpdate:(d,{completed:T})=>{r&&(this.isLocked=!0),this.isScrolling=!0,this.velocity=d-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=d,this.setScroll(this.scroll),v&&(this.targetScroll=d),T&&(r&&(this.isLocked=!1),requestAnimationFrame(()=>{this.isScrolling=!1}),this.velocity=0,h?.()),this.emit()}})}}}get rootElement(){return this.options.wrapper===window?this.options.content:this.options.wrapper}get limit(){return this.isHorizontal?this.dimensions.limit.x:this.dimensions.limit.y}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?function(t,e){let o=t%e;return(e>0&&o<0||e<0&&o>0)&&(o+=e),o}(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isSmooth(){return this.__isSmooth}set isSmooth(t){this.__isSmooth!==t&&(this.rootElement.classList.toggle("lenis-smooth",t),this.__isSmooth=t)}get isScrolling(){return this.__isScrolling}set isScrolling(t){this.__isScrolling!==t&&(this.rootElement.classList.toggle("lenis-scrolling",t),this.__isScrolling=t)}get isStopped(){return this.__isStopped}set isStopped(t){this.__isStopped!==t&&(this.rootElement.classList.toggle("lenis-stopped",t),this.__isStopped=t)}};var m=function(i,t){let e=typeof i;return typeof t!="string"||t.trim()===""?i:t==="true"&&e==="boolean"?!0:t==="false"&&e==="boolean"?!1:isNaN(t)&&e==="string"?t:!isNaN(t)&&e==="number"?+t:i};var k=function(i,t,e){if(!i||!t||!e){console.error(`GSAP checkBreakpoints Error in ${t}`);return}let{isMobile:o,isTablet:r,isDesktop:s,reduceMotion:n}=e.conditions;if(o===void 0||r===void 0||s===void 0){console.error("GSAP Match Media Conditions Not Defined");return}let a=`data-ix-${t}-desktop`,h=`data-ix-${t}-tablet`,p=`data-ix-${t}-mobile`;return runMobile=m(!0,i.getAttribute(p)),runTablet=m(!0,i.getAttribute(h)),runDesktop=m(!0,i.getAttribute(a)),!(runMobile===!1&&o||runTablet===!1&&r||runDesktop===!1&&s)};var B=function(i){let t="mouseover",e='[data-ix-mouseover="wrap"]',o='[data-ix-mouseover="layer"]',r='[data-ix-mouseover="target"]',s="data-ix-mouseover-duration",n="data-ix-mouseover-ease",a="data-ix-mouseover-move-x",h="data-ix-mouseover-move-y",p="data-ix-mouseover-rotate-z";document.querySelectorAll(e).forEach(u=>{let d=u.querySelectorAll(o);if(d.length===0||k(u,t,i)===!1)return;let l=u.querySelector(r);l||(l=u),function(){let g={x:.5,y:.5},_={x:g.x,y:g.y},C=m(.5,u.getAttribute(s)),L=m("power1.out",u.getAttribute(n)),x=gsap.timeline({paused:!0,defaults:{ease:"none"}}),E=gsap.timeline({paused:!0,defaults:{ease:"none"}});d.forEach(f=>{let S=m(10,f.getAttribute(a)),b=m(10,f.getAttribute(h)),A=m(0,f.getAttribute(p));x.fromTo(f,{xPercent:S*-1,rotateZ:A*-1},{xPercent:S,rotateZ:A},0),E.fromTo(f,{yPercent:b*-1},{yPercent:b},0)});function R(f,S){gsap.to(_,{x:f,y:S,ease:L,duration:C,onUpdate:()=>{x.progress(_.x),E.progress(_.y)}})}R(g.x,g.y),l.addEventListener("mousemove",function(f){let S=l.getBoundingClientRect(),b=gsap.utils.clamp(0,1,gsap.utils.normalize(0,S.width,f.clientX-S.left)),A=gsap.utils.clamp(0,1,gsap.utils.normalize(0,S.height,f.clientY-S.top));R(b,A)}),l.addEventListener("mouseleave",function(f){R(g.x,g.y)})}()})};var Y=function(i){let t="hoveractive",e='[data-ix-hoveractive="wrap"]',o="data-ix-hoveractive-class",r="is-active";gsap.utils.toArray(e).forEach(n=>{if(!n)return;let a=m(r,n.getAttribute(o));k(n,t,i)!==!1&&(n.addEventListener("mouseover",function(p){n.classList.add(a)}),n.addEventListener("mouseleave",function(p){n.classList.remove(a)}))})};var X=function(i){let t="scrolling",e='[data-ix-scrolling="wrap"]',o='[data-ix-scrolling="trigger"]',r='[data-ix-scrolling="layer"]',s="data-ix-scrolling-start",n="data-ix-scrolling-end",a="data-ix-scrolling-scrub",h="data-ix-scrolling-position",p="data-ix-scrolling-x-start",v="data-ix-scrolling-x-end",u="data-ix-scrolling-y-start",d="data-ix-scrolling-y-end",T="data-ix-scrolling-width-start",l="data-ix-scrolling-width-end",c="data-ix-scrolling-height-start",g="data-ix-scrolling-height-end",_="data-ix-scrolling-rotate-z-start",C="data-ix-scrolling-rotate-z-end",L="data-ix-scrolling-opacity-start",x="data-ix-scrolling-opacity-end",E="data-ix-scrolling-clip-start",R="data-ix-scrolling-clip-end",f="data-ix-scrolling-clip-end";gsap.utils.toArray(e).forEach(b=>{let A=b.querySelectorAll(r);if(!b||A.length===0)return;let W=b.querySelector(o);if(W||(W=b),k(b,t,i)===!1)return;let O={scrub:.5,start:"top bottom",end:"bottom top"};O.start=m(O.start,b.getAttribute(s)),O.end=m(O.end,b.getAttribute(n)),O.scrub=m(O.scrub,b.getAttribute(a));let V=gsap.timeline({scrollTrigger:{trigger:W,start:O.start,end:O.end,scrub:O.scrub,markers:!1},defaults:{duration:1,ease:"none"}});A.forEach(N=>{if(!N)return;let y={},M={},w=function(q,K){let j=N.hasAttribute(q),J=m(K,N.getAttribute(q));if(j)return J};y.x=w(p,"0%"),M.x=w(v,"0%"),y.y=w(u,"0%"),M.y=w(d,"0%"),y.width=w(T,"0%"),M.width=w(l,"0%"),y.height=w(c,"0%"),M.height=w(g,"0%"),y.rotateZ=w(_,0),M.rotateZ=w(C,0),y.opacity=w(L,0),M.opacity=w(x,0),y.clipPath=w(E,"string"),M.clipPath=w(R,"string");let F=m("<",N.getAttribute(h)),tt=V.fromTo(N,y,M,F)})})};var Z=function(){let i=document.querySelector('cursor="inner"'),t=document.querySelector('cursor="outer"');$(".is-cursor-minor, .text-style-link, .menu_small-text-link, .menu_link-medium, .nav-logo_component, .footer_primary-link, .footer_text-link, .footer_icon, .nav-button_component, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link").on("mouseenter mouseleave",function(){i.toggleClass("is-cursor-minor"),t.toggleClass("is-cursor-minor")}),$("[cursor=minor]").on("mouseenter mouseleave",function(){i.toggleClass("is-cursor-minor"),t.toggleClass("is-cursor-minor")}),$("[cursor=view-page]").on("mouseenter mouseleave",function(){console.log("view page"),i.toggleClass("is-vanished"),t.toggleClass("is-view-page"),$(".cursor_component").toggleClass("is-not-blended")}),$(".home-work_item").on("mouseenter mouseleave",function(){i.toggleClass("is-black"),t.toggleClass("is-view-case"),$(".cursor_component").toggleClass("is-not-blended")}),$(".work_button-circle").on("mouseenter mouseleave",function(){i.toggleClass("is-vanished"),t.toggleClass("is-view-case"),$(".cursor_component").toggleClass("is-not-blended")}),$(".is-next-case").on("mouseenter mouseleave",function(){i.toggleClass("is-vanished"),t.toggleClass("is-next-case"),$(".cursor_component").toggleClass("is-not-blended")}),$(".is-prev-case").on("mouseenter mouseleave",function(){i.toggleClass("is-vanished"),t.toggleClass("is-prev-case"),$(".cursor_component").toggleClass("is-not-blended")}),$("[cursor=lets-go]").on("mouseenter mouseleave",function(){i.toggleClass("is-vanished"),t.toggleClass("is-lets-go"),$(".cursor_component").toggleClass("is-not-blended")}),$("[cursor=image-black]").on("mouseenter mouseleave",function(){i.toggleClass("is-image-black"),t.toggleClass("is-cursor-minor"),$(".cursor_component").toggleClass("is-not-blended")}),$("[cursor=image-white]").on("mouseenter mouseleave",function(){i.toggleClass("is-image-white"),t.toggleClass("is-cursor-minor"),$(".cursor_component").toggleClass("is-not-blended")}),$(".cs-next_component").on("mouseenter mouseleave",function(){t.toggleClass("is-next-case-w"),$(".cursor_component").toggleClass("is-not-blended")})};document.addEventListener("DOMContentLoaded",function(){gsap.ScrollTrigger!==void 0&&gsap.registerPlugin(ScrollTrigger),gsap.Flip!==void 0&&gsap.registerPlugin(Flip);let i=new I({duration:.8,easing:l=>l===1?1:1-Math.pow(2,-10*l),touchMultiplier:1.5});function t(l){i.raf(l),requestAnimationFrame(t)}requestAnimationFrame(t),i.on("scroll",()=>{!ScrollTrigger||ScrollTrigger.update()});let e=!1;document.querySelector(".nav-button_component").addEventListener("click",()=>{e=!e,e?o():r()});function o(){i.stop()}function r(){i.start()}let s=document.querySelector(".transition-trigger"),n=1600,a=1800,h="no-transition";s.length>0&&(s.click(),$("body").addClass("no-scroll-transition"),i.stop(),setTimeout(()=>{$("body").removeClass("no-scroll-transition"),i.start()},n)),$("a").on("click",function(l){if($(this).prop("hostname")==window.location.host&&$(this).attr("href").indexOf("#")===-1&&!$(this).hasClass(h)&&$(this).attr("target")!=="_blank"&&s.length>0){l.preventDefault(),$("body").addClass("no-scroll-transition");let c=$(this).attr("href");s.click(),setTimeout(function(){window.location=c},a)}}),window.onpageshow=function(l){l.persisted&&window.location.reload()},setTimeout(()=>{$(window).on("resize",function(){setTimeout(()=>{$(".transition").css("display","none")},50)})},n);let p=Math.round(window.devicePixelRatio*100/2);function v(){p>100?$("body").addClass("user-font-size"):$("body").removeClass("user-font-size")}v(),$(window).resize(function(){p=Math.round(window.devicePixelRatio*100/2),v()}),$(".button_link").on("mouseenter mouseleave",function(){$(this).find(".button_circle").toggleClass("is-hovered"),$(this).toggleClass("is-hovered")}),$(".cta_block-item").on("click",function(){$(this).toggleClass("is-clicked")}),$("[gsap-el='edge-shrink']").each(function(l){let c=$(this);gsap.timeline({scrollTrigger:{trigger:c,start:"top bottom",end:"bottom top",scrub:.8}}).fromTo(c,{height:"100%",duration:1},{height:"15%",duration:1})}),$("[gsap-el='edge-grow']").each(function(l){let c=$(this);gsap.timeline({scrollTrigger:{trigger:c,start:"top bottom",end:"bottom top",scrub:.8}}).fromTo(c,{height:"15%",duration:1},{height:"100%",duration:1})});let u=function(){let l=document.querySelector(".secton-blog-list"),c=document.querySelector(".blog-hero_h1-wrapper"),g=document.querySelectorAll(".blog-hero_square");if(!l||!c||g.length===0)return;let _=gsap.timeline({scrollTrigger:{trigger:l,start:"top bottom",end:"top top",scrub:.5},defaults:{ease:"none",duration:1}});_.to(c,{color:"#ffffff",ease:"power2.Out"}),_.fromTo(g,{rotateZ:45},{rotateZ:275},"<")},d=function(){let l=document.querySelectorAll(".blog-hero_square");if(l.length===0)return;gsap.timeline({}).fromTo(l,{borderRadius:"100%"},{borderRadius:"0%",ease:"power1.Out",duration:1.5,stagger:{each:.25,from:"start",repeat:-1,yoyo:!0}},"<")};(function(){gsap.matchMedia().add({isMobile:"(max-width: 767px)",isTablet:"(min-width: 768px)  and (max-width: 991px)",isDesktop:"(min-width: 992px)",reduceMotion:"(prefers-reduced-motion: reduce)"},c=>{let{isMobile:g,isTablet:_,isDesktop:C,reduceMotion:L}=c.conditions;B(c),X(c),Y(c),Z(),u(),d()})})()});})();