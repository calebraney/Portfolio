export const sectionEdge = function () {
  //grow animation
  const sectionEdgeGrow = function () {
    const growElements = document.querySelectorAll("[gsap-el='edge-shrink']");
    if (growElements.length === 0) return;
    // Section Edge Shrink Animation
    growElements.forEach((item) => {
      let targetElement = item;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetElement,
          // trigger element - viewport
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
      tl.fromTo(
        targetElement,
        {
          height: '100%',
          duration: 1,
        },
        {
          height: '15%',
          duration: 1,
        }
      );
    });
  };
  sectionEdgeGrow();
  //shrink animation
  const sectionEdgeShrink = function () {
    const shrinkElements = document.querySelectorAll("[gsap-el='edge-grow']");
    if (shrinkElements.length === 0) return;
    // Section Edge Shrink Animation
    shrinkElements.forEach((item) => {
      let targetElement = item;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetElement,
          // trigger element - viewport
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      });
      tl.fromTo(
        targetElement,
        {
          height: '15%',
          duration: 1,
        },
        {
          height: '100%',
          duration: 1,
        }
      );
    });
  };
  sectionEdgeShrink();
};
