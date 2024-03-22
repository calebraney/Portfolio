export const cursor = function () {
  const cursorInner = document.querySelector('[cursor="inner"]');
  const cursorOuter = document.querySelector('[cursor="outer"]');
  const cursorComponent = document.querySelector('[cursor="component"]');
  //guard clause for cursor elements
  if (!cursorInner || !cursorOuter || !cursorComponent) return;
  const cursorElements = [cursorInner, cursorOuter, cursorComponent];
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

  // Function to toggle class
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  // Function to handle mouseenter and mouseleave events
  function handleMouseEvents(selector, cursorClasses) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;
    elements.forEach((element) => {
      if (!element) return;
      element.addEventListener('mouseover', () => {
        console.log('enter');

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
    '.is-cursor-minor, .text-style-link, .menu_small-text-link, .footer_primary-link, .footer_text-link, .footer_icon, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link',
    [minorClass, minorClass]
  );

  // Cursor .is-cursor-minor attribute
  handleMouseEvents('[cursor="minor"]', [minorClass, minorClass]);

  // Cursor scrolls over item with view-page attribute
  handleMouseEvents('[cursor="view-page"]', [vanishedClass, viewPageClass, notBlendedClass]);

  // Cursor scrolls over item with view-page attribute
  handleMouseEvents('[cursor="view-case"]', [vanishedClass, viewCaseClass, notBlendedClass]);

  // Cursor .is-view-case and .is-black
  handleMouseEvents('.home-work_item', [blackClass, viewCaseClass, notBlendedClass]);

  // Cursor .is-view-case and .is-vanished
  handleMouseEvents('.work_button-circle', [vanishedClass, viewCaseClass, notBlendedClass]);

  // Cursor .is-next-case global
  handleMouseEvents('.is-next-case', [vanishedClass, nextCaseClass, notBlendedClass]);

  // Cursor .is-prev-case global
  handleMouseEvents('.is-prev-case', [vanishedClass, prevCaseClass, notBlendedClass]);

  // Cursor scrolls over item with lets-go attribute
  handleMouseEvents('[cursor="lets-go"]', [vanishedClass, letsGoClass, notBlendedClass]);

  // Cursor scrolls over item with image-black attribute
  handleMouseEvents('[cursor="image-black"]', [imageBlackClass, minorClass, notBlendedClass]);

  // Cursor scrolls over item with image-white attribute
  handleMouseEvents('[cursor="image-white"]', [imageWhiteClass, minorClass, notBlendedClass]);

  // Cursor is next case white on case study pages
  handleMouseEvents('.cs-next_component', [nextCaseWhiteClass, notBlendedClass]);
};

/*


export const cursor = function () {
  //CURSOR CODE
  //Cursor .is-cursor-minor global

  $(
    '.is-cursor-minor, .text-style-link, .menu_small-text-link, .menu_link-medium, .nav-logo_component, .footer_primary-link, .footer_text-link, .footer_icon, .nav-button_component, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link'
  ).on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-cursor-minor');
    $('.cursor_outer').toggleClass('is-cursor-minor');
  });

  //Cursor .is-cursor-minor attribute

  $('[cursor=minor]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-cursor-minor');
    $('.cursor_outer').toggleClass('is-cursor-minor');
  });

  //Cursor scrolls over item with view-page attribute

  $('[cursor=view-page]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-view-page');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-black

  $('.home-work_item').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-black');
    $('.cursor_outer').toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-vanished

  $('.work_button-circle').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-next-case global

  $('').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-next-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-prev-case global

  $('').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-prev-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with lets-go attribute

  $('[cursor=lets-go]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-vanished');
    $('.cursor_outer').toggleClass('is-lets-go');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-black attribute

  $('[cursor=image-black]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-image-black');
    $('.cursor_outer').toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-white attribute

  $('[cursor=image-white]').on('mouseenter mouseleave', function () {
    $('.cursor_inner').toggleClass('is-image-white');
    $('.cursor_outer').toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor is next case white on case study pages

  $('.cs-next_component').on('mouseenter mouseleave', function () {
    $('.cursor_outer').toggleClass('is-next-case-w');
    $('.cursor_component').toggleClass('is-not-blended');
  });

*/
