import { attr, checkBreakpoints, runSplit } from '../utilities';
/* CSS in PAGE Head

html:not(.w-editor) [data-ix-load] {
	opacity: 0;
}
 html:not(.w-editor) [data-ix-load="stagger"] > * {
	opacity: 0;
}
*/

export const load = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'load';
  // hero animation attribute
  const ATTRIBUTE = 'data-ix-load';
  // hero animation selectors
  const HEADING = 'heading';
  const TEXT = 'text';
  const ITEM = 'item';
  const IMAGE = 'image';
  const LINE = 'line';
  const STAGGER = 'stagger';
  const STAGGER_SPANS = 'stagger-spans';
  //tween options
  const POSITION = 'data-ix-load-position'; // sequential by default, use "<" to start tweens together
  const DEFAULT_STAGGER = '<0.2';

  //get itema
  const items = gsap.utils.toArray(`[${ATTRIBUTE}]`);
  if (items.length === 0) return;

  let tl = gsap.timeline({
    paused: true,
    defaults: {
      ease: 'power1.out',
      duration: 0.6,
    },
    onComplete: (self) => {
      setTimeout(() => {
        tl.kill();
        tl = null;
      }, 100);
    },
  });
  //anything that needs to be set to start the interaction happens here

  //h1 load tween
  const loadHeading = function (item) {
    //split the text
    const splitText = runSplit(item);
    if (!splitText) return;
    // get the position attribute
    const position = attr('<', item.getAttribute(POSITION));
    tl.set(item, { opacity: 1 });
    tl.fromTo(
      splitText.lines,
      { opacity: 0, y: '50%', rotateX: 45, skewY: -3, skewX: -3 },
      { opacity: 1, y: '0%', rotateX: 0, skewY: 0, skewX: 0, stagger: { each: 0.1, from: 'left' } },
      position
    );
  };

  //add item tween to each element in this parent
  const loadStaggerSpans = function (item) {
    if (!item) return;
    //set opacity to 1
    // get the children of the item
    const children = gsap.utils.toArray(item.children);
    const position = attr('<', item.getAttribute(POSITION));
    if (children.length === 0) return;
    tl.set(item, { opacity: 1 });
    tl.fromTo(
      children,
      { opacity: 0, y: '50%', rotateX: 45, skewY: -3, skewX: -3 },
      { opacity: 1, y: '0%', rotateX: 0, skewY: 0, skewX: 0, stagger: { each: 0.1, from: 'left' } },
      position
    );
  };

  //images load tween
  const loadImage = function (item) {
    // get the position attribute or set defautl position
    const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
    tl.fromTo(item, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1 }, position);
  };
  //default load tween
  const loadItem = function (item) {
    // get the position attribute
    const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
    tl.fromTo(item, { opacity: 0, y: '2rem' }, { opacity: 1, y: '0rem' }, position);
  };
  //default load tween
  const loadText = function (item) {
    // get the position attribute
    const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
    tl.fromTo(
      item,
      { opacity: 0, y: '2rem', skewY: -3, skewX: -3 },
      { opacity: 1, y: '0rem', skewY: 0, skewX: 0 },
      position
    );
  };
  //default load tween
  const loadLine = function (item) {
    // get the position attribute
    const position = attr(DEFAULT_STAGGER, item.getAttribute(POSITION));
    tl.fromTo(item, { opacity: 1, width: '0%' }, { opacity: 1, width: '100%' }, position);
  };

  //add item tween to each element in this parent
  const loadStagger = function (item) {
    if (!item) return;
    //set opacity to 1
    // get the children of the item
    const children = gsap.utils.toArray(item.children);
    if (children.length === 0) return;
    children.forEach((child, index) => {
      //first item set parent opacity to 1
      if (index === 0) {
        item.style.opacity = 1;
      }
      loadItem(child);
    });
  };

  //get all elements and apply animations
  items.forEach((item) => {
    if (!item) return;
    //check breakpoints and quit function if set on specific breakpoints
    // let runOnBreakpoint = checkBreakpoints(item, ANIMATION_ID, gsapContext);
    // if (runOnBreakpoint === false) return;
    //find the type of the scrolling animation
    const loadType = item.getAttribute(ATTRIBUTE);
    if (loadType === HEADING) {
      loadHeading(item);
    }
    if (loadType === TEXT) {
      loadText(item);
    }
    if (loadType === STAGGER_SPANS) {
      loadStaggerSpans(item);
    }
    if (loadType === IMAGE) {
      loadImage(item);
    }
    if (loadType === LINE) {
      loadLine(item);
    }
    if (loadType === ITEM) {
      loadItem(item);
    }
    if (loadType === STAGGER) {
      loadStagger(item);
    }
  });

  //Play interaction on page load
  tl.play(0);

  // Alternatively use the returned tl to trigger the interaction after transition or image load
  return tl;
};
