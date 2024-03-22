export const cursor = function () {
  const cursorInner = document.querySelector('[cursor="inner"]');
  const cursorOuter = document.querySelector('[cursor="outer"]');

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

  // Function to toggle class
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }

  // Function to handle mouseenter and mouseleave events
  function handleMouseEvents(selector, classNames) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.addEventListener('mouseenter', () => {
        classNames.forEach((className) => toggleClass(element, className));
      });
      element.addEventListener('mouseleave', () => {
        classNames.forEach((className) => toggleClass(element, className));
      });
    });
  }

  // Cursor .is-cursor-minor global
  handleMouseEvents(
    '.is-cursor-minor, .text-style-link, .menu_small-text-link, .menu_link-medium, .nav-logo_component, .footer_primary-link, .footer_text-link, .footer_icon, .nav-button_component, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link',
    [minorClass]
  );

  // Cursor .is-cursor-minor attribute
  handleMouseEvents('[cursor=minor]', [minorClass]);

  // Cursor scrolls over item with view-page attribute
  handleMouseEvents('[cursor=view-page]', [vanishedClass, viewPageClass, notBlendedClass]);

  // Cursor .is-view-case and .is-black
  handleMouseEvents('.home-work_item', ['is-black', viewCaseClass, notBlendedClass]);

  // Cursor .is-view-case and .is-vanished
  handleMouseEvents('.work_button-circle', [vanishedClass, viewCaseClass, notBlendedClass]);

  // Cursor .is-next-case global
  handleMouseEvents('.is-next-case', [vanishedClass, nextCaseClass, notBlendedClass]);

  // Cursor .is-prev-case global
  handleMouseEvents('.is-prev-case', [vanishedClass, prevCaseClass, notBlendedClass]);

  // Cursor scrolls over item with lets-go attribute
  handleMouseEvents('[cursor=lets-go]', [vanishedClass, letsGoClass, notBlendedClass]);

  // Cursor scrolls over item with image-black attribute
  handleMouseEvents('[cursor=image-black]', [imageBlackClass, minorClass, notBlendedClass]);

  // Cursor scrolls over item with image-white attribute
  handleMouseEvents('[cursor=image-white]', [imageWhiteClass, minorClass, notBlendedClass]);

  // Cursor is next case white on case study pages
  handleMouseEvents('.cs-next_component', [nextCaseWhiteClass, notBlendedClass]);
};
