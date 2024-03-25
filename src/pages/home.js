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
