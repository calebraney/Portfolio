//////////////////////
// Blog Interactions
export const blogHeaderScroll = function () {
  const section = document.querySelector('.secton-blog-list');
  const title = document.querySelector('.blog-hero_h1-wrapper');
  const squares = document.querySelectorAll('.blog-hero_square');
  if (!section || !title || squares.length === 0) return;
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'top top',
      scrub: 0.5,
    },
    defaults: {
      ease: 'none',
      duration: 1,
    },
  });
  tl.to(title, {
    color: '#ffffff',
    ease: 'power2.Out',
  });
  tl.fromTo(
    squares,
    {
      rotateZ: 45,
    },
    {
      rotateZ: 275,
      // stagger: { each: 0.2, from: 'left' },
    },
    '<'
  );
};

//animate boxes
export const blogHeaderBoxes = function () {
  const squares = document.querySelectorAll('.blog-hero_square');
  if (squares.length === 0) return;
  const tl = gsap.timeline({
    //   yoyo: true,
  });
  tl.fromTo(
    squares,
    {
      borderRadius: '100%',
    },
    {
      borderRadius: '0%',
      ease: 'power1.Out',
      duration: 1.5,
      stagger: { each: 0.25, from: 'start', repeat: -1, yoyo: true },
    },
    '<'
  );
};
