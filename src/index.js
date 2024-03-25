import Lenis from '@studio-freight/lenis';
import { mouseOver } from './interactions/mouseOver';
import { hoverActive } from './interactions/hoverActive';
import { scrolling } from './interactions/scrolling';
import { scrollInHeading } from './interactions/scrollIn';
import { sectionEdge } from './interactions/sectionEdge';
import { cursor } from './interactions/cursor';
import { homePitchMarquee } from './pages/home';
import { blogHeaderBoxes, blogHeaderScroll } from './pages/blog';
import { toggleClass } from './utilities';

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

  // allow scrolling on overflow elements
  //document.querySelector('.over--scroll').setAttribute("onwheel", "event.stopPropagation()");

  // Click Event Listener for Nav Button
  let secondClick = false;
  document.querySelector('.nav-button_component').addEventListener('click', () => {
    secondClick = !secondClick;
    if (secondClick) stopScroll();
    else startScroll();
  });
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
    $(selector).draggable();
  }

  //////////////////////////////
  //Control Functions on page load
  pageTransition();
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
        mouseOver(gsapContext);
        scrolling(gsapContext);
        hoverActive(gsapContext);
        scrollInHeading(gsapContext);
        //custom interactions
        cursor();
        buttonHover();
        toggleCTABlocks();
        makeDraggable();
        sectionEdge();
        //homepage
        homePitchMarquee();
        //blog
        blogHeaderScroll();
        blogHeaderBoxes();

        //globaally run animations on specific breakpoints
        if (isDesktop || isTablet) {
        }
      }
    );
  };
  gsapInit();
});
