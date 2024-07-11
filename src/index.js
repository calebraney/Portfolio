import Lenis from 'lenis';
import { mouseOver } from './interactions/mouseOver';
import { hoverActive } from './interactions/hoverActive';
import { scrolling } from './interactions/scrolling';
import { scrollIn } from './interactions/scrollIn';
import { sectionEdge } from './interactions/sectionEdge';
import { cursor } from './interactions/cursor';
import { load } from './interactions/load';
import { homePitchMarquee } from './pages/home';
import { caseMobile, nextCase } from './pages/case';
import { contact } from './pages/contact';
import { blogHeaderBoxes, blogHeaderScroll } from './pages/blog';
import { toggleClass, checkBreakpoints, scrollReset } from './utilities';

document.addEventListener('DOMContentLoaded', function () {
  //Global Scope Variables
  let lenis, clickAnimation;

  // GSAP ANIMATIONS
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (gsap.Flip !== undefined) {
    gsap.registerPlugin(Flip);
  }

  const initLenis = function () {
    //LENIS Smoothscroll
    lenis = new Lenis({
      duration: 0.8,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
      touchMultiplier: 1.5,
    });

    // lenis request animation from
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep lenis and scrolltrigger in sync
    lenis.on('scroll', () => {
      if (!ScrollTrigger) return;
      ScrollTrigger.update();
    });
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // stop page scrolling
    function stopScroll() {
      const stopScrollLinks = document.querySelectorAll('[data-scroll="stop"]');
      if (stopScrollLinks == null) {
        return;
      }
      stopScrollLinks.forEach((item) => {
        item.addEventListener('click', (event) => {
          lenis.stop();
        });
      });
    }
    stopScroll();

    // start page scrolling
    function startScroll() {
      const startScrollLinks = document.querySelectorAll('[data-scroll="start"]');
      if (startScrollLinks == null) {
        return;
      }
      startScrollLinks.forEach((item) => {
        item.addEventListener('click', (event) => {
          lenis.start();
        });
      });
    }
    startScroll();

    // toggle page scrolling
    function toggleScroll() {
      const toggleScrollLinks = document.querySelectorAll('[data-scroll="toggle"]');
      if (toggleScrollLinks == null) {
        return;
      }
      toggleScrollLinks.forEach((item) => {
        let stopScroll = false;
        item.addEventListener('click', (event) => {
          stopScroll = !stopScroll;
          if (stopScroll) lenis.stop();
          else lenis.start();
        });
      });
    }
    toggleScroll();
  };
  initLenis();

  // PRE-LOADER CODE
  const pageTransition = function (gsapContext) {
    //Elements
    const wrap = document.querySelector('.transition_wrap');
    const edgeTop = document.querySelector('.transition_edge_top_image');
    const edgeBot = document.querySelector('.transition_edge_bot_image');
    const imageTop = document.querySelector('.transition_image_top');
    const imageBot = document.querySelector('.transition_image_bot');

    // const transitionTrigger = document.querySelector('.transition_trigger');

    // Settings
    let excludedClass = 'no-transition';

    if (!wrap) return;
    //Load Animation
    const tlLoad = gsap.timeline({
      // paused: true,
      defaults: {
        ease: 'power1,out',
        duration: 0.6,
      },
    });
    tlLoad.set(wrap, { display: 'block' });
    tlLoad.fromTo(imageTop, { opacity: 1 }, { opacity: 0, delay: 0.5, duration: 0.3 });
    tlLoad.fromTo(imageBot, { opacity: 1 }, { opacity: 0, duration: 0.3 }, '<');
    tlLoad.fromTo(
      imageTop,
      { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
      { yPercent: -110, rotateX: 90, skewX: -12, skewY: -15 },
      '<'
    );
    tlLoad.fromTo(
      imageBot,
      { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
      { yPercent: -110, rotateX: 90, skewX: -12, skewY: -15 },
      '<.1'
    );
    tlLoad.fromTo(wrap, { yPercent: 0 }, { yPercent: -110, duration: 0.8 }, '<.2');
    tlLoad.fromTo(edgeBot, { height: '100%' }, { height: '0%', duration: 0.6 }, '<.2');
    tlLoad.set(wrap, { display: 'none' });
    const introDuration = tlLoad.duration() * 1000;

    //Click Animation
    const clickTimeline = function () {
      const tlClick = gsap.timeline({
        paused: true,
        defaults: {
          ease: 'power1,out',
          duration: 0.6,
        },
      });
      tlClick.set(wrap, { display: 'flex' });
      tlClick.fromTo(wrap, { yPercent: 110, duration: 0.8 }, { yPercent: 0, duration: 0.8 });
      tlClick.fromTo(edgeTop, { height: '100%' }, { height: '0%', duration: 0.6 }, '<.2');
      tlClick.fromTo(imageTop, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<.4');
      tlClick.fromTo(
        imageTop,
        { yPercent: 110, rotateX: -90, skewX: 6, skewY: 10 },
        { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
        '<'
      );
      tlClick.fromTo(imageBot, { opacity: 0 }, { opacity: 1, duration: 0.3 }, '<.1');
      tlClick.fromTo(
        imageBot,
        { yPercent: 110, rotateX: -90, skewX: 6, skewY: 10 },
        { yPercent: 0, rotateX: 0, skewX: 0, skewY: 0 },
        '<'
      );

      return tlClick;
    };

    // On Page Load
    if (wrap) {
      tlLoad.play();
      document.body.classList.add('no-scroll-transition');
      lenis.stop();
      setTimeout(() => {
        document.body.classList.remove('no-scroll-transition');
        lenis.start();
        load(gsapContext);
        tlLoad.kill();
        clickAnimation = clickTimeline();
      }, introDuration);
    }

    // On Link Click
    document.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (
          this.hostname == window.location.hostname &&
          this.getAttribute('href').indexOf('#') === -1 &&
          !this.classList.contains(excludedClass) &&
          this.getAttribute('target') !== '_blank' &&
          wrap
        ) {
          e.preventDefault();
          document.body.classList.add('no-scroll-transition');
          let transitionURL = this.getAttribute('href');
          clickAnimation.play();
          const exitDuration = clickAnimation.duration() * 1000 + 100;

          setTimeout(() => {
            window.location.href = transitionURL;
          }, exitDuration);
        }
      });
    });

    // On Back Button Tap
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };

    // Hide Transition on Window Width Resize
    setTimeout(() => {
      window.addEventListener('resize', function () {
        setTimeout(() => {
          wrap.style.display = 'none';
        }, 50);
      });
    }, introDuration);
  };

  //NAV CODE
  //Adds overflow hidden to the body on menu open
  // $('.nav-button_component').on('click', function () {
  //   $('body').toggleClass('overflow-hidden');
  // });

  //RANDOM INTERACTIONS CODE
  // Function to handle mouse enter and leave events for button link

  // Function to toggle 'is-clicked' class on cta block item
  const toggleCTABlocks = function (event) {
    const ctaBlocks = document.querySelectorAll('.cta_block_item');
    const activeClass = 'is-clicked';
    if (ctaBlocks.length === 0) return;
    ctaBlocks.forEach((item) => {
      if (!item) return;
      item.addEventListener('click', function (e) {
        toggleClass(item, activeClass);
      });
    });
  };

  //BROKEN

  // Function to make cta block item and is-draggable elements draggable
  // function makeDraggable() {
  //   const selector = '.cta_block_item, .is-draggable';
  //   const items = document.querySelectorAll(selector);
  //   if (items.length === 0) return;
  //   const itemsJQ = $(selector);
  //   itemsJQ.draggable();
  // }

  //////////////////////////////
  //Control Functions on page load
  pageTransition();

  //refresh scrolltrigger after page load
  // window.addEventListener('load', (event) => {
  //   ScrollTrigger.refresh(true);
  //   // setTimeout(() => {
  //   //   console.log('load');
  //   // }, 2000);
  // });

  let mm = gsap.matchMedia();
  mm.add(
    {
      //This is the conditions object
      isMobile: '(max-width: 767px)',
      isTablet: '(min-width: 768px)  and (max-width: 991px)',
      isDesktop: '(min-width: 992px)',
      reduceMotion: '(prefers-reduced-motion: reduce)',
    },
    (gsapContext) => {
      let { isMobile, isTablet, isDesktop, reduceMotion } = gsapContext.conditions;
      //Control Functions on page load
      pageTransition(gsapContext);
      //remove for accessibility
      if (!reduceMotion) {
        mouseOver(gsapContext);
        scrolling(gsapContext);
        scrollIn(gsapContext);
        //homepage
        homePitchMarquee();
        //blog
        blogHeaderScroll();
        blogHeaderBoxes();
      }
      hoverActive(gsapContext);
      sectionEdge();
      contact();
      //custom interactions
      if (!isMobile || !reduceMotion) {
        caseMobile();
        nextCase();
        toggleCTABlocks();
      }

      //globaally run animations on specific breakpoints
      if (isDesktop || isTablet) {
        cursor();
      }
    }
  );

  scrollReset();
});
