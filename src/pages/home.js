import { attr, checkBreakpoints } from '../utilities';

export const homePitchMarquee = function () {
  // pitch scroll animation
  function pitchScroll() {
    //get elements
    const triggerElement = document.querySelector('[data-ix-pitchslider="row"]');
    const targetElement = document.querySelector('[data-ix-pitchslider="slider"]');
    if (!triggerElement || !targetElement) return;
    let tl = gsap.timeline({
      scrollTrigger: {
        start: 'top bottom',
        trigger: triggerElement,
        end: 'bottom top',
        scrub: 1.2,
      },
    });
    tl.to(targetElement, {
      xPercent: -150,
      duration: 1,
    });
  }
  pitchScroll();

  // pitch slider scrolls into view
  function pitchSliderIn() {
    const triggerElement = document.querySelector('[data-ix-pitchslider="wrap"]');
    if (!triggerElement) return;
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        // trigger element - viewport
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    });
    tl.from(triggerElement, {
      width: '0%',
      ease: 'power2.In',
      duration: 1,
    });
  }
  pitchSliderIn();
};

export const homeWorkHover = function () {
  const ITEM = '.home_work_item-link';
  const LEFT = '.home_work_left';
  const RIGHT = '.home_work_right';
  const BG = '.home_work_background';
  const VISUAL = '.home_work_visual_wrap';
  const NUMBER_FIRST = '.home_work_number_span.is-one';
  const NUMBER_SECOND = '.home_work_number_span.is-two';
  const items = gsap.utils.toArray(ITEM);
  if (items.length === 0) return;
  items.forEach((item) => {
    const left = item.querySelector(LEFT);
    const right = item.querySelector(RIGHT);
    const bg = item.querySelector(BG);
    const visual = item.querySelector(VISUAL);
    const numberFirst = item.querySelectorAll(NUMBER_FIRST);
    const numberSecond = item.querySelectorAll(NUMBER_SECOND);
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power2.out',
        duration: 0.8,
      },
    });
    tl.fromTo(visual, { yPercent: 50, scaleY: 1.2 }, { yPercent: 0, scaleY: 1 });
    tl.fromTo(bg, { height: '0%' }, { height: '100%', duration: 0.6, ease: 'power1.out' }, '<');
    tl.fromTo(left, { x: '0rem' }, { x: '3rem' }, '<');
    tl.fromTo(right, { x: '0rem' }, { x: '-3rem' }, '<');
    tl.fromTo(numberFirst, { yPercent: 0 }, { yPercent: -110, stagger: 0.1, duration: 0.4 }, '<.1');
    tl.fromTo(visual, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, '<');
    tl.fromTo(numberSecond, { yPercent: 110 }, { yPercent: 0, stagger: 0.1, duration: 0.4 }, '<.2');

    // tl.progress(0);
    item.addEventListener('mouseenter', function (e) {
      tl.play();
    });
    item.addEventListener('mouseleave', function (e) {
      tl.reverse();
    });
  });
};
