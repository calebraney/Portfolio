import Lenis from 'lenis';
import { mouseOver } from './interactions/mouseOver';
import { hoverActive } from './interactions/hoverActive';
import { scrolling } from './interactions/scrolling';
import { scrollIn } from './interactions/scrollIn';
import { sectionEdge } from './interactions/sectionEdge';
import { cursor } from './interactions/cursor';
import { load } from './interactions/load';
import { homePitchMarquee } from './pages/home';
import { contact } from './pages/contact';
import { blogHeaderBoxes, blogHeaderScroll } from './pages/blog';
import { toggleClass, checkBreakpoints, scrollReset } from './utilities';

document.addEventListener('DOMContentLoaded', function () {
  //document loaded

  // GSAP ANIMATIONS
  // register gsap plugins if available
  if (gsap.ScrollTrigger !== undefined) {
    gsap.registerPlugin(ScrollTrigger);
  }
  if (gsap.Flip !== undefined) {
    gsap.registerPlugin(Flip);
  }

  //LENIS Smoothscroll
  const lenis = new Lenis({
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

  // allow scrolling on overflow elements
  //document.querySelector('.over--scroll').setAttribute("onwheel", "event.stopPropagation()");

  const navScroll = function () {
    // Click Event Listener for Nav Button
    let secondClick = false;
    const navButton = document.querySelector('.nav-button_component');
    if (!navButton) return;
    navButton.addEventListener('click', () => {
      secondClick = !secondClick;
      if (secondClick) stopScroll();
      else startScroll();
    });
  };
  navScroll();

  // On first click of nav stop scrolling
  function stopScroll() {
    lenis.stop();
  }
  // On second click of nav start scrolling
  function startScroll() {
    lenis.start();
  }
  // PRE-LOADER CODE
  const pageTransition = function () {
    // Load Animation
    const component = document.querySelector('.transition');
    const transitionTrigger = document.querySelector('.transition-trigger');
    let introDurationMS = 1600;
    let exitDurationMS = 1800;
    let excludedClass = 'no-transition';

    // On Page Load
    if (transitionTrigger) {
      transitionTrigger.click();
      document.body.classList.add('no-scroll-transition');
      lenis.stop();
      setTimeout(() => {
        document.body.classList.remove('no-scroll-transition');
        lenis.start();
      }, introDurationMS);
    }

    // On Link Click
    document.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (
          this.hostname == window.location.hostname &&
          this.getAttribute('href').indexOf('#') === -1 &&
          !this.classList.contains(excludedClass) &&
          this.getAttribute('target') !== '_blank' &&
          transitionTrigger
        ) {
          e.preventDefault();
          document.body.classList.add('no-scroll-transition');
          let transitionURL = this.getAttribute('href');
          transitionTrigger.click();
          setTimeout(() => {
            window.location.href = transitionURL;
          }, exitDurationMS);
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
          component.style.display = 'none';
        }, 50);
      });
    }, introDurationMS);
  };

  // Allow Zooming for Accessibility
  let zoomLevel = Math.round((window.devicePixelRatio * 100) / 2);
  function checkZoomLevel() {
    if (zoomLevel > 100) {
      $('body').addClass('user-font-size');
    } else {
      $('body').removeClass('user-font-size');
    }
  }
  checkZoomLevel();
  $(window).resize(function () {
    zoomLevel = Math.round((window.devicePixelRatio * 100) / 2);
    checkZoomLevel();
  });

  //NAV CODE
  //Adds overflow hidden to the body on menu open
  // $('.nav-button_component').on('click', function () {
  //   $('body').toggleClass('overflow-hidden');
  // });

  //RANDOM INTERACTIONS CODE
  // Function to handle mouse enter and leave events for button link
  const buttonHover = function () {
    const BUTTON_LINK = '.button_link';
    const BUTTON_CIRCLE = '.button_circle';
    const activeClass = 'is-hovered';

    const buttonLinks = document.querySelectorAll(BUTTON_LINK);
    if (buttonLinks.length === 0) return;
    buttonLinks.forEach((item) => {
      if (!item) return;
      const buttonCircle = item.querySelector(BUTTON_CIRCLE);
      item.addEventListener('mouseenter', function (e) {
        toggleClass(item, activeClass);
        toggleClass(buttonCircle, activeClass);
      });
      item.addEventListener('mouseleave', function (e) {
        toggleClass(item, activeClass);
        toggleClass(buttonCircle, activeClass);
      });
    });
  };

  // Function to toggle 'is-clicked' class on cta block item
  const toggleCTABlocks = function (event) {
    const ctaBlocks = document.querySelectorAll('.cta_block-item');
    const activeClass = 'is-clicked';
    if (ctaBlocks.length === 0) return;
    ctaBlocks.forEach((item) => {
      if (!item) return;
      item.addEventListener('click', function (e) {
        toggleClass(item, activeClass);
      });
    });
  };

  // Function to make cta block item and is-draggable elements draggable
  function makeDraggable() {
    const selector = '.cta_block-item, .is-draggable';
    const items = document.querySelectorAll(selector);
    if (items.length === 0) return;
    $(selector).draggable();
  }

  const caseMobile = function (gsapContext) {
    //animation ID
    const ANIMATION_ID = 'data-ix-casemobile';
    const WRAP = '[data-ix-casemobile="wrap"]';
    const MOBILE_1 = '[data-ix-casemobile="mobile-1"]';
    const MOBILE_2 = '[data-ix-casemobile="mobile-2"]';
    const MOBILE_3 = '[data-ix-casemobile="mobile-3"]';
    const wraps = gsap.utils.toArray(WRAP);
    if (wraps.length === 0) return;
    wraps.forEach((section) => {
      //check breakpoints and quit function if set on specific breakpoints
      // let runOnBreakpoint = checkBreakpoints(section, ANIMATION_ID, gsapContext);
      // if (runOnBreakpoint === false) return;
      //get items
      const mobile1 = section.querySelector(MOBILE_1);
      const mobile2 = section.querySelector(MOBILE_2);
      const mobile3 = section.querySelector(MOBILE_3);
      if (!mobile1 || !mobile2 || !mobile3) return;
      // create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          markers: true,
        },
        defaults: {
          duration: 1,
          ease: 'power1.out',
        },
      });
      tl.fromTo(mobile1, { yPercent: 60 }, { yPercent: 0, delay: 1 }, '<');
      tl.fromTo(mobile2, { yPercent: 40 }, { yPercent: 0 }, '<');
      tl.fromTo(mobile3, { yPercent: 20 }, { yPercent: 0 }, '<');
      tl.to(mobile1, { yPercent: -20, delay: 2 }, '<');
      tl.to(mobile2, { yPercent: -40 }, '<');
      tl.to(mobile3, { yPercent: -60 }, '<');
    });
  };

  const nextCase = function (gsapContext) {
    //animation ID
    const ANIMATION_ID = 'data-ix-nextcase';
    const WRAP = '[data-ix-nextcase="wrap"]';
    const LINE_1 = '[data-ix-nextcase="line-1"]';
    const LINE_2 = '[data-ix-nextcase="line-2"]';
    const OVERLAY = '[data-ix-nextcase="overlay"]';
    const wraps = gsap.utils.toArray(WRAP);
    if (wraps.length === 0) return;
    wraps.forEach((section) => {
      // check breakpoints and quit function if set on specific breakpoints
      let runOnBreakpoint = checkBreakpoints(section, ANIMATION_ID, gsapContext);
      if (runOnBreakpoint === false) return;
      //get items
      const line1 = section.querySelector(LINE_1);
      const line2 = section.querySelector(LINE_2);
      const overlay = section.querySelector(OVERLAY);
      if (!line1 || !line2 || !overlay) return;
      // create timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.6,
          ease: 'power1.out',
        },
      });
      tl.fromTo(overlay, { opacity: 0.5 }, { opacity: 1, duration: 0.8 });
      tl.fromTo(line1, { xPercent: 0 }, { xPercent: 110 }, '<');
      tl.fromTo(line2, { xPercent: -110 }, { xPercent: 0 }, '<.1');
      //play interaction on hover
      section.addEventListener('mouseenter', function (e) {
        tl.play();
      });
      section.addEventListener('mouseleave', function (e) {
        tl.reverse();
      });
    });
  };

  //////////////////////////////
  //Control Functions on page load
  pageTransition();

  //refresh scrolltrigger after page load
  window.addEventListener('load', (event) => {
    ScrollTrigger.refresh(true);
    // setTimeout(() => {
    //   console.log('load');
    // }, 2000);
  });

  const gsapInit = function () {
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
        // library interactions
        load(gsapContext);
        if (!reduceMotion) {
          mouseOver(gsapContext);
          scrolling(gsapContext);
          scrollIn(gsapContext);
        }
        hoverActive(gsapContext);
        //custom interactions
        if (!isMobile || !reduceMotion) {
          caseMobile(gsapContext);
          nextCase(gsapContext);
        }
        buttonHover();
        toggleCTABlocks();
        makeDraggable();
        sectionEdge();
        //homepage
        homePitchMarquee();
        //blog
        blogHeaderScroll();
        blogHeaderBoxes();
        //contact
        contact();

        //globaally run animations on specific breakpoints
        if (isDesktop || isTablet) {
          cursor(gsapContext);
        }
      }
    );
  };
  gsapInit();
  scrollReset();
});
