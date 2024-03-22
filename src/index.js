import Lenis from '@studio-freight/lenis';
import { attr } from './utilities';
import { mouseOver } from './interactions/mouseOver';
import { hoverActive } from './interactions/hoverActive';
import { scrolling } from './interactions/scrolling';

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

  //PRE-LOADER CODE
  //Load Animation
  let transitionTrigger = document.querySelector('.transition-trigger');
  let introDurationMS = 1600;
  let exitDurationMS = 1800;
  let excludedClass = 'no-transition';

  // On Page Load
  if (transitionTrigger.length > 0) {
    transitionTrigger.click();
    $('body').addClass('no-scroll-transition');
    lenis.stop();
    setTimeout(() => {
      $('body').removeClass('no-scroll-transition');
      lenis.start();
    }, introDurationMS);
  }
  // On Link Click
  $('a').on('click', function (e) {
    if (
      $(this).prop('hostname') == window.location.host &&
      $(this).attr('href').indexOf('#') === -1 &&
      !$(this).hasClass(excludedClass) &&
      $(this).attr('target') !== '_blank' &&
      transitionTrigger.length > 0
    ) {
      e.preventDefault();
      $('body').addClass('no-scroll-transition');
      let transitionURL = $(this).attr('href');
      transitionTrigger.click();
      setTimeout(function () {
        window.location = transitionURL;
      }, exitDurationMS);
    }
  });
  // On Back Button Tap
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
  // Hide Transition on Window Width Resize
  setTimeout(() => {
    $(window).on('resize', function () {
      setTimeout(() => {
        $('.transition').css('display', 'none');
      }, 50);
    });
  }, introDurationMS);

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

  //CURSOR CODE
  //Cursor .is-cursor-minor global

  $(
    '.is-cursor-minor, .text-style-link, .menu_small-text-link, .menu_link-medium, .nav-logo_component, .footer_primary-link, .footer_text-link, .footer_icon, .nav-button_component, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link'
  ).on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-cursor-minor');
    $('.cursor_outer').toggleClass('is-cursor-minor');
  });

  //Cursor .is-cursor-minor attribute

  $('[cursor=minor]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-cursor-minor');
    $('.cursor_outer').toggleClass('is-cursor-minor');
  });

  //Cursor scrolls over item with view-page attribute

  $('[cursor=view-page]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-view-page');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-black

  $('.home-work_item').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-black');
    $('.cursor_outer').toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-vanished

  $('.work_button-circle').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-next-case global

  $('').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-next-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-prev-case global

  $('').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-prev-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with lets-go attribute

  $('[cursor=lets-go]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-lets-go');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-black attribute

  $('[cursor=image-black]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-image-black');
    $('.cursor_outer').toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-white attribute

  $('[cursor=image-white]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-image-white');
    $('.cursor_outer').toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor is next case white on case study pages

  $('.cs-next_component').on('mouseenter mouseleave', function () {
    $('.cursor_outer').toggleClass('is-next-case-w');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //RANDOM INTERACTIONS CODE
  //Button .is-hovered added to button circle
  $('.button_link').on('mouseenter mouseleave', function () {
    $(this).find('.button_circle').toggleClass('is-hovered');
    $(this).toggleClass('is-hovered');
  });

  // Adds is clicked class to cta block
  $('.cta_block-item').on('click', function () {
    $(this).toggleClass('is-clicked');
  });

  // Section Edge Shrink Animation
  $("[gsap-el='edge-shrink']").each(function (index) {
    let targetElement = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: targetElement,
        // trigger element - viewport
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
    tl.fromTo(
      targetElement,
      {
        height: '100%',
        duration: 1,
      },
      {
        height: '15%',
        duration: 1,
      }
    );
  });

  // Section Edge Grow Animation
  $("[gsap-el='edge-grow']").each(function (index) {
    let targetElement = $(this);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: targetElement,
        // trigger element - viewport
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
    tl.fromTo(
      targetElement,
      {
        height: '15%',
        duration: 1,
      },
      {
        height: '100%',
        duration: 1,
      }
    );
  });

  //////////////////////
  // Blog Interactions
  const blogHeaderScroll = function () {
    const section = document.querySelector('.secton-blog-list');
    const title = document.querySelector('.blog-hero_h1-wrapper');
    const squares = document.querySelectorAll('.blog-hero_square');
    if (!section || !title || squares.length === 0) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'top top',
        scrub: 0.5,
      },
      defaults: {
        ease: 'none',
        duration: 1,
      },
    });
    tl.to(title, {
      color: '#ffffff',
      ease: 'power2.Out',
    });
    tl.fromTo(
      squares,
      {
        rotateZ: 45,
      },
      {
        rotateZ: 275,
        // stagger: { each: 0.2, from: 'left' },
      },
      '<'
    );
  };

  //animate boxes
  const blogHeaderBoxes = function () {
    const squares = document.querySelectorAll('.blog-hero_square');
    if (squares.length === 0) return;
    const tl = gsap.timeline({
      //   yoyo: true,
    });
    tl.fromTo(
      squares,
      {
        borderRadius: '100%',
      },
      {
        borderRadius: '0%',
        ease: 'power1.Out',
        duration: 1.5,
        stagger: { each: 0.25, from: 'start', repeat: -1, yoyo: true },
      },
      '<'
    );
  };

  //////////////////////////////
  //Control Functions on page load
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
        // let individual instances decide if they are run
        mouseOver(gsapContext);
        scrolling(gsapContext);
        hoverActive(gsapContext);
        // cursor();
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
