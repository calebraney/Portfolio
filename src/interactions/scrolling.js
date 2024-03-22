import { attr, checkBreakpoints } from '../utilities';

export const scrolling = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'scrolling';
  //elements
  const SCROLLING_WRAP = `[data-ix-scrolling="wrap"]`;
  const SCROLLING_TRIGGER = `[data-ix-scrolling="trigger"]`;
  const SCROLLING_LAYER = '[data-ix-scrolling="layer"]';
  //timeline options
  const SCROLLING_START = 'data-ix-scrolling-start';
  const SCROLLING_END = 'data-ix-scrolling-end';
  const SCROLLING_SCRUB = 'data-ix-scrolling-scrub';
  //tween options
  const SCROLLING_POSITION = 'data-ix-scrolling-position'; // sequential by default, use "<" to start tweens together
  const SCROLLING_X_START = 'data-ix-scrolling-x-start';
  const SCROLLING_X_END = 'data-ix-scrolling-x-end';
  const SCROLLING_Y_START = 'data-ix-scrolling-y-start';
  const SCROLLING_Y_END = 'data-ix-scrolling-y-end';
  const SCROLLING_WIDTH_START = 'data-ix-scrolling-width-start';
  const SCROLLING_WIDTH_END = 'data-ix-scrolling-width-end';
  const SCROLLING_HEIGHT_START = 'data-ix-scrolling-height-start';
  const SCROLLING_HEIGHT_END = 'data-ix-scrolling-height-end';
  const SCROLLING_ROTATE_Z_START = 'data-ix-scrolling-rotate-z-start';
  const SCROLLING_ROTATE_Z_END = 'data-ix-scrolling-rotate-z-end';
  const SCROLLING_OPACITY_START = 'data-ix-scrolling-opacity-start';
  const SCROLLING_OPACITY_END = 'data-ix-scrolling-opacity-end';
  const SCROLLING_CLIP_START = 'data-ix-scrolling-clip-start';
  const SCROLLING_CLIP_END = 'data-ix-scrolling-clip-end';
  const SCROLLING_CLIP_TYPE = 'data-ix-scrolling-clip-end';

  const scrollingItems = gsap.utils.toArray(SCROLLING_WRAP);
  scrollingItems.forEach((scrollingItem) => {
    const layers = scrollingItem.querySelectorAll(SCROLLING_LAYER);
    // return if items are null
    if (!scrollingItem || layers.length === 0) return;
    // find the target element if one exists, otherwise the parent is the target
    let trigger = scrollingItem.querySelector(SCROLLING_TRIGGER);
    if (!trigger) {
      trigger = scrollingItem;
    }
    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(scrollingItem, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;
    // default GSAP options for animation
    const tlSettings = {
      scrub: 0.5,
      start: 'top bottom',
      end: 'bottom top',
    };
    // get custom timeline settings or set them at the default
    tlSettings.start = attr(tlSettings.start, scrollingItem.getAttribute(SCROLLING_START));
    tlSettings.end = attr(tlSettings.end, scrollingItem.getAttribute(SCROLLING_END));
    tlSettings.scrub = attr(tlSettings.scrub, scrollingItem.getAttribute(SCROLLING_SCRUB));
    // create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: tlSettings.start,
        end: tlSettings.end,
        scrub: tlSettings.scrub,
        markers: false,
      },
      defaults: {
        duration: 1,
        ease: 'none',
      },
    });
    //////////////////////
    // Adding tweens
    layers.forEach((layer) => {
      if (!layer) return;
      //objects for tween
      const varsFrom = {};
      const varsTo = {};

      //function to process data attributes and return the correct value if set.
      const processAttribute = function (attributeName, defaultValue) {
        const hasAttribute = layer.hasAttribute(attributeName);
        const attributeValue = attr(defaultValue, layer.getAttribute(attributeName));
        // if the attribute has the default value return the attribute value
        // (alternatively, could just include the default value)
        if (hasAttribute) {
          return attributeValue;
        } else {
          return;
        }
      };
      //add properties to vars objects
      varsFrom.x = processAttribute(SCROLLING_X_START, '0%');
      varsTo.x = processAttribute(SCROLLING_X_END, '0%');
      varsFrom.y = processAttribute(SCROLLING_Y_START, '0%');
      varsTo.y = processAttribute(SCROLLING_Y_END, '0%');
      varsFrom.width = processAttribute(SCROLLING_WIDTH_START, '0%');
      varsTo.width = processAttribute(SCROLLING_WIDTH_END, '0%');
      varsFrom.height = processAttribute(SCROLLING_HEIGHT_START, '0%');
      varsTo.height = processAttribute(SCROLLING_HEIGHT_END, '0%');
      varsFrom.rotateZ = processAttribute(SCROLLING_ROTATE_Z_START, 0);
      varsTo.rotateZ = processAttribute(SCROLLING_ROTATE_Z_END, 0);
      varsFrom.opacity = processAttribute(SCROLLING_OPACITY_START, 0);
      varsTo.opacity = processAttribute(SCROLLING_OPACITY_END, 0);
      varsFrom.clipPath = processAttribute(SCROLLING_CLIP_START, 'string');
      varsTo.clipPath = processAttribute(SCROLLING_CLIP_END, 'string');

      // get the position attribute
      const position = attr('<', layer.getAttribute(SCROLLING_POSITION));

      //add tween
      let fromTween = tl.fromTo(layer, varsFrom, varsTo, position);
    });
  });
};
