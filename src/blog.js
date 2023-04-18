import { doc } from 'prettier';

// Webflow is initialized
window.Webflow ||= [];
window.Webflow.push(() => {
  // Run code once webflow is initialized
  const blogHeaderScroll = function () {
    const section = document.querySelector('.secton-blog-list');
    const title = document.querySelector('.blog-hero_h1-wrapper');
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
      '.blog-hero_square',
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
  blogHeaderScroll();

  //animate boxes
  const blogHeaderBoxes = function () {
    const tl = gsap.timeline({
      //   yoyo: true,
    });
    tl.fromTo(
      '.blog-hero_square',
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
  blogHeaderBoxes();
});
