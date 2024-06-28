import { toggleClass } from '../utilities';

export const cursor = function (gsapContext) {
  //animation ID
  const ANIMATION_ID = 'cursor';
  //elements
  const WRAP = '[data-ix-cursor="wrap"]';
  const INNER = '[data-ix-cursor="inner"]';
  const OUTER = '[data-ix-cursor="outer"]';
  const HOVER = '[data-ix-cursor="hover"]';
  const NO_HOVER = '[data-ix-cursor="no-hover"]';
  //classes
  const HOVER_CLASS = 'is-hover';
  // select the items
  const cursorWrap = document.querySelector(WRAP);
  const cursorInner = document.querySelector(INNER);
  const cursorOuter = document.querySelector(OUTER);

  // return if items are null
  if (!cursorInner || !cursorOuter || !cursorWrap) return;
  //check if the device has a touch screen
  if ('ontouchstart' in window || navigator.maxTouchPoints) return;

  //check breakpoints and quit function if set on specific breakpoints
  let runOnBreakpoint = checkBreakpoints(cursorWrap, ANIMATION_ID, gsapContext);
  if (runOnBreakpoint === false) return;

  const cursorHover = function () {
    const cursorInner = document.querySelector('[cursor="inner"]');
    const cursorOuter = document.querySelector('[cursor="outer"]');
    const cursorWrap = document.querySelector('[cursor="component"]');
    //guard clause for cursor elements
    if (!cursorInner || !cursorOuter || !cursorWrap) return;
    const cursorElements = [cursorInner, cursorOuter, cursorWrap];
    // Option classes
    const minorClass = 'is-cursor-minor';
    const vanishedClass = 'is-vanished';
    const viewPageClass = 'is-view-page';
    const viewCaseClass = 'is-view-case';
    const nextCaseClass = 'is-next-case';
    const prevCaseClass = 'is-prev-case';
    const letsGoClass = 'is-lets-go';
    const imageBlackClass = 'is-image-black';
    const imageWhiteClass = 'is-image-white';
    const nextCaseWhiteClass = 'is-next-case-w';
    const notBlendedClass = 'is-not-blended';
    const blackClass = 'is-black';

    // Function to handle mouseenter and mouseleave events
    function handleMouseEvents(selector, cursorClasses) {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;
      elements.forEach((element) => {
        if (!element) return;
        element.addEventListener('mouseover', () => {
          cursorElements.forEach((element, index) => {
            if (cursorClasses[index] !== undefined) {
              toggleClass(element, cursorClasses[index]);
            }
          });
        });
        element.addEventListener('mouseout', () => {
          cursorElements.forEach((element, index) => {
            if (cursorClasses[index] !== undefined) {
              toggleClass(element, cursorClasses[index]);
            }
          });
        });
      });
    }

    // Cursor .is-cursor-minor global
    handleMouseEvents(
      '.text-style-link, .menu_small-text-link, .cta_block-item, .pitch_image-wrap, .work_arrow-link',
      [minorClass, minorClass]
    );

    // Cursor .is-cursor-minor attribute
    handleMouseEvents('[cursor="minor"]', [minorClass, minorClass]);
    // Cursor scrolls over item with view-page attribute
    handleMouseEvents('[cursor="view-page"]', [vanishedClass, viewPageClass, notBlendedClass]);
    // Cursor scrolls over item with view-page attribute
    handleMouseEvents('[cursor="view-case"]', [vanishedClass, viewCaseClass, notBlendedClass]);
    // Cursor scrolls over item with lets-go attribute
    handleMouseEvents('[cursor="lets-go"]', [vanishedClass, letsGoClass, notBlendedClass]);
    // Cursor scrolls over item with image-black attribute
    handleMouseEvents('[cursor="image-black"]', [imageBlackClass, minorClass, notBlendedClass]);
    // Cursor scrolls over item with image-white attribute
    handleMouseEvents('[cursor="image-white"]', [imageWhiteClass, minorClass, notBlendedClass]);
    // Cursor .is-view-case and .is-black
    handleMouseEvents('.home-work_item', [blackClass, viewCaseClass, notBlendedClass]);
    // Cursor .is-next-case global
    handleMouseEvents('.is-next-case', [vanishedClass, nextCaseClass, notBlendedClass]);
    // Cursor .is-prev-case global
    handleMouseEvents('.is-prev-case', [vanishedClass, prevCaseClass, notBlendedClass]);
    // Cursor is next case white on case study pages
    handleMouseEvents('.cs-next_component', [null, nextCaseWhiteClass, , notBlendedClass]);
  };
  cursorHover();

  // const cursorClick = function () {
  //   if (!cursorInner) return;
  //   document.addEventListener('click', function (e) {
  //     let tl = gsap.timeline({});
  //     tl.fromTo(cursorInner, { rotateZ: -45 }, { rotateZ: 45, ease: 'power1.out', duration: 0.3 });
  //   });
  // };
  // cursorClick();

  //handle cursor movement
  const cursorMove = function (element, delay = false) {
    // object that stores the value of the progress so it can be animated
    let progressObject = { x: 0, y: 0 };

    // Create X timeline
    let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    cursorXTimeline.fromTo(element, { x: '-50vw' }, { x: '50vw' });
    // Create Y Timeline
    let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
    cursorYTimeline.fromTo(element, { y: '-50vh' }, { y: '50vh' });

    // Function to update timeline progress based on an inputted value
    function setTimelineProgress(xValue, yValue) {
      // animate the timeline progress value and keep the timeline in sync onUpdate
      gsap.to(progressObject, {
        x: xValue,
        y: yValue,
        ease: 'none',
        duration: delay ? 0.5 : 0,
        onUpdate: () => {
          cursorXTimeline.progress(progressObject.x);
          cursorYTimeline.progress(progressObject.y);
        },
      });
    }
    // Mouse events
    document.addEventListener('mousemove', function (e) {
      // getting the horizontal and vertical positions of the mouse and dividing it by the total screen width
      let mousePercentX = e.clientX / window.innerWidth;
      let mousePercentY = e.clientY / window.innerHeight;
      // call function to animate the timeline progress
      setTimelineProgress(mousePercentX, mousePercentY);
    });
  };
  cursorMove(cursorInner);
  cursorMove(cursorOuter);
};
