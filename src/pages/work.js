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
    const paragraphSplit = runSplit(paragraph, 'lines, words');
    let isTop = false;
    if (index === 0) {
      isTop = true;
    }
    //gsap timeline
    let direction = 1;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: isTop ? 'center 25%' : 'top center',
        end: 'bottom center',
        ease: 'none',
        scrub: true,
        markers: true,
      },
    });
    //item in interaction
    console.log(paragraphSplit);
    if (!isTop) {
      tl.set(right, { display: 'flex' });
      if (arrowTop !== null) {
        tl.fromTo(arrowTop, { yPercent: 110 * direction }, { yPercent: 0 });
      }
      tl.fromTo(heading, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
      tl.fromTo(services, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
      tl.fromTo(
        paragraphSplit.lines,
        { yPercent: 110 * direction, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: { each: 0.2, from: 'start' } },
        '<.2'
      );
      tl.fromTo(button, { yPercent: 110 * direction }, { yPercent: 0 }, '<.2');
      if (arrowBot !== null) {
        tl.fromTo(arrowBot, { yPercent: 110 * direction }, { yPercent: 0 });
      }
      tl.to(heading, { duration: 5 });
    }
    if (isTop) {
      right.style.display = 'flex';
    }

    if (arrowTop !== null) {
      tl.to(arrowTop, { yPercent: -110 });
    }
    tl.to(heading, { yPercent: -110 }, '<.2');
    tl.to(services, { yPercent: -110 }, '<.2');
    tl.to(
      paragraphSplit.lines,
      { yPercent: -110, opacity: 0, stagger: { each: 0.2, from: 'start' } },
      '<.2'
    );
    tl.to(button, { yPercent: -110 }, '<.2');
    if (arrowBot !== null) {
      tl.to(arrowBot, { yPercent: -110 });
    }
    // scrollInTL.set(right, { display: 'none' });
    // //play first one on load
    // if (index === 0) {
    //   scrollInTL.restart();
    // }
  });
};

/*

Try something like this:


const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  const anim = gsap.to(box, { x: 300, paused: true });
  
  ScrollTrigger.create({
    trigger: box,
    start: "center 70%",
    onEnter: () => anim.play()
  });
  
  ScrollTrigger.create({
    trigger: box,
    start: "top bottom",
    onLeaveBack: () => anim.pause(0)
  });
});


*/
