import { attr, checkBreakpoints, runSplit } from '../utilities';

export const work = function () {
  //selectors
  const WRAP = '[data-ix-work="wrap"]';
  const LEFT = '[data-ix-work="left"]';
  const RIGHT = '[data-ix-work="right"]';
  const ARROW_TOP = '[data-ix-work="link-top"]';
  const ARROW_BOTTOM = '[data-ix-work="link-bottom"]';
  const HEADING = '[data-ix-work="heading"]';
  const SERVICES = '[data-ix-work="services"]';
  const PARAGRAPH = '[data-ix-work="paragraph"]';
  const BUTTON = '[data-ix-work="button"]';
  const ACTIVE_CLASS = 'is-active';
  const TRANSITION_CLASS = 'is-transition';
  const NEXT_CLASS = 'is-next';
  const PREV_CLASS = 'is-previous';
  const PREVENT_TRANSITION = 'is-prevent-transition';

  //items
  let activeItem;
  const wraps = gsap.utils.toArray(WRAP);
  if (wraps.length === 0) return;
  wraps.forEach((currentWrap, activeIndex) => {
    const left = currentWrap.querySelector(LEFT);
    const right = currentWrap.querySelector(RIGHT);
    const arrowTop = currentWrap.querySelector(ARROW_TOP);
    const arrowBot = currentWrap.querySelector(ARROW_BOTTOM);
    const heading = currentWrap.querySelector(HEADING);
    const services = currentWrap.querySelector(SERVICES);
    const button = currentWrap.querySelector(BUTTON);
    const paragraph = currentWrap.querySelector(PARAGRAPH);
    const paragraphSplit = runSplit(paragraph, 'lines');
    //get all the lines
    paragraphSplit.lines.forEach((line, index) => {
      //create an empty div after each line
      line.insertAdjacentHTML('afterend', `<div class="work_para_line_wrap"></div>`);
      const lineWrap = line.nextElementSibling;
      //append the line to the div
      lineWrap.appendChild(line);
    });
    //get next and previous items
    const nextItem = wraps[activeIndex + 1];
    const prevItem = wraps[activeIndex - 1];

    //utility function to active items in view
    const activateItem = function () {
      if (activeItem === currentWrap) {
        //get all wraps and modify them
        wraps.forEach((wrap, index) => {
          //remove all classes
          wrap.classList.remove(ACTIVE_CLASS, NEXT_CLASS, PREV_CLASS);
          if (wrap !== activateItem && wrap !== nextItem && wrap !== prevItem) {
            wrap.classList.remove(TRANSITION_CLASS);
          }
          //all previous items
          if (index < activeIndex) {
            wrap.classList.add(PREV_CLASS);
          }
          //all next items
          if (index > activeIndex) {
            wrap.classList.add(NEXT_CLASS);
          }
        });
        currentWrap.classList.add(ACTIVE_CLASS, TRANSITION_CLASS);

        //wait a tiny bit to prevent glitches
        setTimeout(() => {
          //get next item and add transition class
          if (nextItem) {
            nextItem.classList.add(TRANSITION_CLASS);
          }
          //get previous item and add transitionclass
          if (prevItem) {
            prevItem.classList.add(TRANSITION_CLASS);
          }
        }, 20);
      }
    };
    //gsap timeline
    ScrollTrigger.create({
      trigger: currentWrap,
      start: 'top 50%',
      end: 'bottom 50%',
      markers: false,
      onEnter: () => {
        activeItem = currentWrap;
        setTimeout(() => {
          activateItem();
        }, 150);
      },
      // onLeave: () => {
      //   currentWrap.classList.add(PREV_CLASS);
      // },
      onEnterBack: () => {
        activeItem = currentWrap;
        setTimeout(() => {
          activateItem();
        }, 150);
      },
      // onLeaveBack: () => {
      //   currentWrap.classList.add(NEXT_CLASS);
      // },
    });
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
/*
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
    

    /// Old prevent transition attempt

     const preventTransitions = function (currentWrap) {
      const otherWraps = [];
      //set other wraps to prevent transition
      wraps.forEach((wrap, index) => {
        if (wrap !== currentWrap && wrap !== nextItem && wrap !== prevItem) {
          //add to array
          otherWraps.push(wrap);
          wrap.classList.add(PREVENT_TRANSITION);
        }
      });
      //remove prevent transition after minimum time
      setTimeout(() => {
        if (currentWrap === activeItem) {
          console.log('clear', otherWraps);
          otherWraps.forEach((wrap, index) => {
            wrap.classList.remove(PREVENT_TRANSITION);
          });
        }
      }, 300);
    };

*/
