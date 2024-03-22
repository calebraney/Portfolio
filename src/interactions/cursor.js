export const cursor = function () {
  const cursorInner = document.querySelector('cursor="inner"');
  const cursorOuter = document.querySelector('cursor="outer"');

  //CURSOR CODE
  //Cursor .is-cursor-minor global
  $(
    '.is-cursor-minor, .text-style-link, .menu_small-text-link, .menu_link-medium, .nav-logo_component, .footer_primary-link, .footer_text-link, .footer_icon, .nav-button_component, .cta_block-item, .pitch_image-wrap, .home-work_text-link, .work_arrow-link'
  ).on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-cursor-minor');
    cursorOuter.toggleClass('is-cursor-minor');
  });

  //Cursor .is-cursor-minor attribute
  $('[cursor=minor]').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-cursor-minor');
    cursorOuter.toggleClass('is-cursor-minor');
  });

  //Cursor scrolls over item with view-page attribute
  $('[cursor=view-page]').on('mouseenter mouseleave', function () {
    console.log('view page');
    cursorInner.toggleClass('is-vanished');
    cursorOuter.toggleClass('is-view-page');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-black
  $('.home-work_item').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-black');
    cursorOuter.toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-view-case and .is-vanished
  $('.work_button-circle').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-vanished');
    cursorOuter.toggleClass('is-view-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-next-case global
  $('.is-next-case').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-vanished');
    cursorOuter.toggleClass('is-next-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor .is-prev-case global
  $('.is-prev-case').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-vanished');
    cursorOuter.toggleClass('is-prev-case');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with lets-go attribute
  $('[cursor=lets-go]').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-vanished');
    cursorOuter.toggleClass('is-lets-go');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-black attribute
  $('[cursor=image-black]').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-image-black');
    cursorOuter.toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor scrolls over item with image-white attribute
  $('[cursor=image-white]').on('mouseenter mouseleave', function () {
    cursorInner.toggleClass('is-image-white');
    cursorOuter.toggleClass('is-cursor-minor');
    $('.cursor_component').toggleClass('is-not-blended');
  });

  //Cursor is next case white on case study pages
  $('.cs-next_component').on('mouseenter mouseleave', function () {
    cursorOuter.toggleClass('is-next-case-w');
    $('.cursor_component').toggleClass('is-not-blended');
  });
};
