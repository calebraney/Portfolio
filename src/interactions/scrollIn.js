import { attr, checkBreakpoints, runSplit } from '../utilities';

//resuable timeline creation with option attributes for individual customization per element
const scrollInTL = function (item) {
  //setting attributes
  const SCROLLIN_TOGGLE_ACTIONS = 'data-ix-scrollin-toggle-actions';
  const SCROLLIN_SCRUB = 'data-ix-scrollin-scrub';
  const SCROLLIN_START = 'data-ix-scrollin-start';
  const SCROLLIN_END = 'data-ix-scrollin-end';
  // default GSAP options
  const settings = {
    scrub: false,
    toggleActions: 'play none none none',
    start: 'top 90%',
    end: 'top 75%',
  };
  //override settings if an attribute is present and a valid type.
  settings.toggleActions = attr(settings.toggleActions, item.getAttribute(SCROLLIN_TOGGLE_ACTIONS));
  settings.scrub = attr(settings.scrub, item.getAttribute(SCROLLIN_SCRUB));
  settings.start = attr(settings.start, item.getAttribute(SCROLLIN_START));
  settings.end = attr(settings.end, item.getAttribute(SCROLLIN_END));
  const tl = gsap.timeline({
    defaults: {
      duration: 0.6,
      ease: 'power1.out',
    },
    scrollTrigger: {
      trigger: item,
      start: settings.start,
      end: settings.end,
      toggleActions: settings.toggleActions,
      scrub: settings.scrub,
    },
  });
  return tl;
};

export const scrollInHeading = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  //elements
  const SCROLLIN_HEADING = '[data-ix-scrollin="heading"]';
  const items = gsap.utils.toArray(SCROLLIN_HEADING);
  items.forEach((item) => {
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    const splitText = runSplit(item);
    if (!splitText) return;
    item.style.opacity = 1;
    const tl = scrollInTL(item);
    tl.from(splitText.lines, {
      opacity: 0,
      ease: 'power2.In',
      duration: 0.4,
    });
    tl.from(
      splitText.lines,
      {
        skewY: -12,
        skewX: -12,
        y: '70%',
        z: '-.5em',
        ease: 'power3.Out',
        stagger: { from: 'start', each: 0.2 },
        duration: 0.8,
        onComplete: () => {
          splitText.revert();
        },
      },
      '<'
    );
  });
};

export const scrollInItem = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  // elements
  const SCROLLIN_ITEM = '[data-ix-scrollin="item"]';
  const items = gsap.utils.toArray(SCROLLIN_ITEM);
  items.forEach((item) => {
    if (!item) return;
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    item.style.opacity = 1;
    const tl = scrollInTL(item);
    tl.fromTo(
      item,
      {
        opacity: 0,
        y: '2rem',
      },
      {
        opacity: 1,
        y: '0rem',
      }
    );
  });
};

export const scrollInImage = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  // elements
  const SCROLLIN_IMAGE_WRAP = '[data-ix-scrollin="image-wrap"]';
  const SCROLLIN_IMAGE = '[data-ix-scrollin="image"]';
  //options
  const SCROLLIN_TYPE = 'data-ix-scrollin-type';

  const items = gsap.utils.toArray(SCROLLIN_IMAGE_WRAP);
  items.forEach((wrap) => {
    if (!wrap) return;
    const image = wrap.querySelector(SCROLLIN_IMAGE);
    if (!image) return;
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    //create timeline
    const tl = scrollInTL(wrap);
    tl.fromTo(
      wrap,
      {
        opacity: 0,
        y: '2rem',
      },
      {
        opacity: 1,
        y: '0rem',
      }
    );
  });
};

export const scrollInContainer = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  // elements
  const SCROLLIN_CONTAINER = '[data-ix-scrollin="container"]';
  const items = gsap.utils.toArray(SCROLLIN_CONTAINER);
  items.forEach((item) => {
    if (!item) return;
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    //get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    children.forEach((child) => {
      const tl = scrollInTL(child);
      tl.fromTo(
        child,
        {
          opacity: 0,
          y: '2rem',
        },
        {
          opacity: 1,
          y: '0rem',
        }
      );
    });
  });
};

export const scrollInStagger = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrollin';
  // elements
  const SCROLLIN_STAGGER = '[data-ix-scrollin="stagger"]';
  const items = gsap.utils.toArray(SCROLLIN_STAGGER);
  items.forEach((item) => {
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    // get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    const tl = scrollInTL(item);
    tl.fromTo(
      children,
      {
        opacity: 0,
        y: '2rem',
      },
      {
        opacity: 1,
        y: '0rem',
        stagger: { each: 0.1, from: 'start' },
      }
    );
  });
};
