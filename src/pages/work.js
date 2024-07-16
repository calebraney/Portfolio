import { attr, checkBreakpoints, runSplit } from '../utilities';

export const work = function () {
  //selectors
  const WRAP = '[data-ix-work="wrap"]';
  const LEFT = '[data-ix-work="left"]';
  const RIGHT = '[data-ix-work="right"]';
  const ARROW_TOP = '[data-ix-work="arrow-top"]';
  const ARROW_BOTTOM = '[data-ix-work="arrow-bottom"]';
  const HEADING = '[data-ix-work="heading"]';
  const SERVICES = '[data-ix-work="services"]';
  const PARAGRAPH = '[data-ix-work="paragraph"]';
  const BUTTON = '[data-ix-work="button"]';
  //items
  const wraps = gsap.utils.toArray(WRAP);
  if (wraps.length === 0) return;
  wraps.forEach((wrap, index) => {
    const left = wrap.querySelector(LEFT);
    const right = wrap.querySelector(RIGHT);
    const arrowTop = wrap.querySelector(ARROW_TOP);
    const arrowBot = wrap.querySelector(ARROW_BOTTOM);
    const heading = wrap.querySelector(HEADING);
    const services = wrap.querySelector(SERVICES);
    const paragraph = wrap.querySelector(PARAGRAPH);
    const button = wrap.querySelector(BUTTON);
    const paragraphSplit = runSplit(paragraph);
    //gsap timeline
    let direction = 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: 'top center',
        end: 'bottom center',
        ease: 'none',
        scrub: false,
        markers: true,
        onEnter: (self) => {
          console.log(index, self.isActive, 'Enter');

          setTimeout(() => {
            scrollInTL.restart();
          }, 1000);
        },
        onEnterBack: (self) => {
          console.log(index, self.isActive, 'EnterBack');

          setTimeout(() => {
            scrollInTL.restart();
          }, 1000);
        },
        onLeave: (self) => {
          console.log(index, self.isActive, 'Leave');

          scrollInTL.reverse();
        },
        onLeaveBack: (self) => {
          console.log(index, self.isActive, 'LeaveBack');

          scrollInTL.reverse();
        },
      },
    });

    const scrollInTL = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'power1.out',
        duration: 0.4,
      },
    });
    scrollInTL.set(right, { display: 'flex' });
    if (arrowTop !== null) {
      scrollInTL.fromTo(arrowTop, { yPercent: 110 * direction }, { yPercent: 0 });
    }
    scrollInTL.fromTo(heading, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
    scrollInTL.fromTo(services, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
    scrollInTL.fromTo(
      paragraphSplit.lines,
      { yPercent: 110 * direction },
      { yPercent: 0 },
      { yPercent: 0, stagger: { each: 0.2, from: 'start' } },
      '<.2'
    );
    scrollInTL.fromTo(button, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
    if (arrowBot !== null) {
      scrollInTL.fromTo(arrowBot, { yPercent: 110 * direction }, { yPercent: 0 });
    }

    // const scrollOutTL = gsap.timeline({
    //   paused: true,
    //   delay: 1,
    //   defaults: {
    //     ease: 'power2.out',
    //     duration: 0.6,
    //   },
    // });
    // if (arrowTop !== null) {
    //   scrollOutTL.to(arrowTop, { yPercent: -110 });
    // }
    // scrollOutTL.to(heading, { yPercent: -110 }, '<.2');
    // scrollOutTL.to(services, { yPercent: -110 }, '<.2');
    // scrollOutTL.to(paragraphSplit.lines, { yPercent: 0, stagger: 0.1 }, '<.2');
    // scrollOutTL.to(button, { yPercent: -110 }, '<.2');
    // if (arrowBot !== null) {
    //   scrollOutTL.to(arrowBot, { yPercent: -110 });
    // }
    // // scrollInTL.set(right, { display: 'none' });
    // //play first one on load
    if (index === 0) {
      scrollInTL.restart();
    }
  });
};
