export const sectionEdge = function () {
  //grow animation
  const sectionEdgeShrink = function () {
    const elements = document.querySelectorAll("[data-ix-edge='shrink']");
    if (elements.length === 0) return;
    // Section Edge Shrink Animation
    elements.forEach((item) => {
      let targetElement = item;

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetElement,
          // trigger element - viewport
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
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
  sectionEdgeShrink();
  //shrink animation
  const sectionEdgeGrow = function () {
    const elements = document.querySelectorAll("[data-ix-edge='grow']");
    if (elements.length === 0) return;
    // Section Edge Shrink Animation
    elements.forEach((item) => {
      let targetElement = item;
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetElement,
          // trigger element - viewport
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
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
  sectionEdgeGrow();
};
