import { attr, checkBreakpoints } from '../utilities';

export const caseMobile = function () {
  //animation ID
  const ANIMATION_ID = 'data-ix-casemobile';
  const WRAP = '[data-ix-casemobile="wrap"]';
  const MOBILE_1 = '[data-ix-casemobile="mobile-1"]';
  const MOBILE_2 = '[data-ix-casemobile="mobile-2"]';
  const MOBILE_3 = '[data-ix-casemobile="mobile-3"]';
  const wraps = gsap.utils.toArray(WRAP);
  if (wraps.length === 0) return;
  wraps.forEach((section) => {
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
        scrub: true,
        markers: false,
      },
      defaults: {
        duration: 1,
        ease: 'power1.out',
      },
    });
    tl.fromTo(mobile1, { yPercent: 60 }, { yPercent: 0, delay: 0.5 }, '<');
    tl.fromTo(mobile2, { yPercent: 40 }, { yPercent: 0 }, '<');
    tl.fromTo(mobile3, { yPercent: 20 }, { yPercent: 0 }, '<');
    tl.to(mobile1, { yPercent: -20, delay: 1.5 }, '<');
    tl.to(mobile2, { yPercent: -40 }, '<');
    tl.to(mobile3, { yPercent: -60 }, '<');
  });
};

export const nextCase = function () {
  //animation ID
  const ANIMATION_ID = 'data-ix-nextcase';
  const WRAP = '[data-ix-nextcase="wrap"]';
  const LINE_1 = '[data-ix-nextcase="line-1"]';
  const LINE_2 = '[data-ix-nextcase="line-2"]';
  const OVERLAY = '[data-ix-nextcase="overlay"]';
  const wraps = gsap.utils.toArray(WRAP);
  if (wraps.length === 0) return;
  wraps.forEach((section) => {
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
