import { attr, toggleClass } from '../utilities';

export const contact = function () {
  // Function to animate radio buttons
  function animateRadioButtons(event) {
    const SELECTED_CLASS = 'is-selected-item';
    const input = event.currentTarget;
    const formGroup = input.closest('.form_group');
    if (!formGroup) return;

    const selectedItem = formGroup.querySelector('.is-selected-item');
    if (!selectedItem) return;

    selectedItem.classList.remove(SELECTED_CLASS);
    input.nextElementSibling.classList.toggle(SELECTED_CLASS);
    input.closest('.form_link').classList.toggle(SELECTED_CLASS);
  }
  // Add event listener for radio button inputs
  document.querySelectorAll('.is-options .form_link input').forEach(function (input) {
    input.addEventListener('change', animateRadioButtons);
  });

  // Function to animate checkboxes
  function animateCheckboxes(event) {
    const SELECTED_CLASS = 'is-selected-item';
    const input = event.currentTarget;
    const formLink = input.closest('.form_link');
    if (!input || !formLink) return;
    const formLinkCircle = formLink.querySelector('.form_link-circle');
    if (!formLinkCircle) return;
    if (input.checked === true) {
      formLink.classList.add(SELECTED_CLASS);
      formLinkCircle.classList.add(SELECTED_CLASS);
    } else {
      formLink.classList.remove(SELECTED_CLASS);
      formLinkCircle.classList.remove(SELECTED_CLASS);
    }
  }
  // Add event listener for checkbox inputs
  document.querySelectorAll('.is-checkbox .form_link input').forEach(function (input) {
    input.addEventListener('change', animateCheckboxes);
  });

  // Function to animate lottie line animation on focus of form field
  function handleFormFieldFocus(event) {
    const formFieldParent = event.currentTarget.closest('.form_field-parent');
    if (!formFieldParent) return;
    formFieldParent.querySelector('.form_field-line').click();
  }

  // Add event listener for focusing on form fields
  document.querySelectorAll('.form_field').forEach(function (formField) {
    formField.addEventListener('focus', handleFormFieldFocus);
  });

  // Function to handle changing opacity of form field
  function handleFormFieldChange(event) {
    const formField = event.currentTarget;
    const formFieldParent = formField.closest('.form_field-parent');
    if (!formFieldParent) return;

    const formFieldLine = formFieldParent.querySelector('.form_field-line');
    if (!formFieldLine) return;

    if (formField.value.length > 0) {
      formFieldLine.classList.add('is-full-opacity');
    } else {
      formFieldLine.classList.remove('is-full-opacity');
    }
  }

  // Add event listener for changing content of form fields
  document.querySelectorAll('.form_field').forEach(function (formField) {
    formField.addEventListener('change', handleFormFieldChange);
  });

  // Function to enable submit button when inputs have content
  function enableSubmitButton() {
    const yourNameInput = document.querySelector('.is-your-name');
    const yourEmailInput = document.querySelector('.is-your-email');
    const submitButtonContainer = document.querySelector('.form_link_container.is-submit');
    if (!yourNameInput || !yourEmailInput || !submitButtonContainer) return;

    if (yourNameInput.value.length && yourEmailInput.value.length) {
      submitButtonContainer.classList.remove('is-disable');
    } else {
      submitButtonContainer.classList.add('is-disable');
    }
  }

  // Add event listener for keyup events on input fields
  document.querySelectorAll('.is-your-name, .is-your-email').forEach(function (input) {
    input.addEventListener('keyup', enableSubmitButton);
  });

  // Function to handle cursor hover events
  function handleCursorHover(event) {
    const cursorInner = document.querySelector('.cursor_inner');
    const cursorOuter = document.querySelector('.cursor_outer');
    if (!cursorInner || !cursorOuter) return;

    cursorInner.classList.toggle('is-cursor-minor');
    cursorOuter.classList.toggle('is-cursor-minor');
  }

  // Add event listeners for cursor hover events
  document
    .querySelectorAll('.form_field, .form_link, .text-style-link')
    .forEach(function (element) {
      element.addEventListener('mouseenter', handleCursorHover);
      element.addEventListener('mouseleave', handleCursorHover);
    });
};
/*

//This bit adds is-link-hover to the cursor
$('.form_link').hover(function () {
  $('.cursor_component').toggleClass('is-link-hover');
  //adds in the text from the first form link to the second one
  let textOne = $(this).find('.form_link-text').eq(0).text();
  $(this).find('.form_link-text.is-2').text(textOne);
});

//animates radio buttons
$('.is-options .form_link input').change(function () {
  $(this).closest('.form_group').find('.is-selected-item').removeClass('is-selected-item');
  $(this).siblings('.form_link-circle').toggleClass('is-selected-item');
  $(this).closest('.form_link').toggleClass('is-selected-item');
});

//animates checkboxes
$('.is-checkbox .form_link input').change(function () {
  $(this).siblings('.form_link-circle').toggleClass('is-selected-item');
  $(this).closest('.form_link').toggleClass('is-selected-item');
});

//animates lottie line animation on focus of form field
$('.form_field').focus(function () {
  $(this).closest('.form_field-parent').find('.form_field-line').click();
});
$('.form_field').focusout(function () {
  $(this).closest('.form_field-parent').find('.form_field-line').click();
});

//changes opacity of form field
$('.form_field').change(function () {
  if ($(this).val().length > 0) {
    $(this).closest('.form_field-parent').find('.form_field-line').addClass('is-full-opacity');
  } else {
    $(this).closest('.form_field-parent').find('.form_field-line').removeClass('is-full-opacity');
  }
});
//makes submit button available
$('.is-your-name, .is-your-email').keyup(function () {
  if ($('.is-your-name').val().length && $('.is-your-email').val().length > 0) {
    $('.form_link_container.is-submit').removeClass('is-disable');
  } else {
    $('.form_link_container.is-submit').addClass('is-disable');
  }
});

//Cursor .is-cursor-minor page specific
$('.form_field, .form_link, .text-style-link').on('mouseenter mouseleave', function () {
  $('.cursor_inner').toggleClass('is-cursor-minor');
  $('.cursor_outer').toggleClass('is-cursor-minor');
});


*/
