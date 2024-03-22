import { attr, checkBreakpoints } from '../utilities';

export const mouseOver = function (gsapContext) {
  // animation ID
  const ANIMATION_ID = 'mouseover';
  //elements
  const MOUSEOVER_WRAP = '[data-ix-mouseover="wrap"]';
  const MOUSEOVER_LAYER = '[data-ix-mouseover="layer"]';
  const MOUSEOVER_TARGET = '[data-ix-mouseover="target"]';
  //options
  const MOUSEOVER_DURATION = 'data-ix-mouseover-duration';
  const MOUSEOVER_EASE = 'data-ix-mouseover-ease';
  const MOUSEOVER_MOVE_X = 'data-ix-mouseover-move-x';
  const MOUSEOVER_MOVE_Y = 'data-ix-mouseover-move-y';
  const MOUSEOVER_ROTATE_Z = 'data-ix-mouseover-rotate-z';

  // select the items
  const mouseOverItems = document.querySelectorAll(MOUSEOVER_WRAP);
  mouseOverItems.forEach((mouseOverItem) => {
    const layers = mouseOverItem.querySelectorAll(MOUSEOVER_LAYER);
    // return if items are null
    if (layers.length === 0) return;

    //check breakpoints and quit function if set on specific breakpoints
    let runOnBreakpoint = checkBreakpoints(mouseOverItem, ANIMATION_ID, gsapContext);
    if (runOnBreakpoint === false) return;

    // find the target element if one exists, otherwise tge parent is the target
    let target = mouseOverItem.querySelector(MOUSEOVER_TARGET);
    if (!target) {
      target = mouseOverItem;
    }

    //handle mouse movement
    const mouseMove = function () {
      /////////////////////////
      // Setting up Timeline

      // object that stores the value of the progress so it can be animated
      let initialProgress = { x: 0.5, y: 0.5 };
      let progressObject = { x: initialProgress.x, y: initialProgress.y };
      //create default duration and ease
      let duration = attr(0.5, mouseOverItem.getAttribute(MOUSEOVER_DURATION));
      let ease = attr('power1.out', mouseOverItem.getAttribute(MOUSEOVER_EASE));
      // Create X timeline
      let cursorXTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      // Create Y Timeline
      let cursorYTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      // For each image add a tween on the timeline

      //////////////////////
      // Adding tweens
      layers.forEach((layer) => {
        // get custom move amounts or set them at the default of 10%
        let moveX = attr(10, layer.getAttribute(MOUSEOVER_MOVE_X));
        let moveY = attr(10, layer.getAttribute(MOUSEOVER_MOVE_Y));
        let rotateZ = attr(0, layer.getAttribute(MOUSEOVER_ROTATE_Z));
        // horizontal timeline
        cursorXTimeline.fromTo(
          layer,
          { xPercent: moveX * -1, rotateZ: rotateZ * -1 },
          { xPercent: moveX, rotateZ: rotateZ },
          0
        );
        //vertical timeline
        cursorYTimeline.fromTo(layer, { yPercent: moveY * -1 }, { yPercent: moveY }, 0);
      });

      //////////////////////
      // Function to update timeline progress based on an inputted value
      function setTimelineProgress(xValue, yValue) {
        // animate the timeline progress value and keep the timeline in sync onUpdate
        gsap.to(progressObject, {
          x: xValue,
          y: yValue,
          ease: ease,
          duration: duration,
          onUpdate: () => {
            cursorXTimeline.progress(progressObject.x);
            cursorYTimeline.progress(progressObject.y);
          },
        });
      }
      //Set the initial progress of the timeline
      setTimelineProgress(initialProgress.x, initialProgress.y);

      //////////////////////
      // Mouse events
      target.addEventListener('mousemove', function (e) {
        // get bounding rect of target
        const rect = target.getBoundingClientRect();
        // current mouse position - left offset of target: normalized with the targets width
        let mousePercentX = gsap.utils.clamp(
          0,
          1,
          gsap.utils.normalize(0, rect.width, e.clientX - rect.left)
        );
        // current mouse position - top offset of target: normalized with the targets height
        let mousePercentY = gsap.utils.clamp(
          0,
          1,
          gsap.utils.normalize(0, rect.height, e.clientY - rect.top)
        );
        // set the timeline progress
        setTimelineProgress(mousePercentX, mousePercentY);
      });
      target.addEventListener('mouseleave', function (e) {
        // on mouse leave set back to default state
        setTimelineProgress(initialProgress.x, initialProgress.y);
      });
    };
    mouseMove();
  });
};
