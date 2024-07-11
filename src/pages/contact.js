import { attr, toggleClass } from '../utilities';

export const contact = function () {
  // deal with dynamic form labels
  const dynamicFormInputs = function () {
    const inputWraps = gsap.utils.toArray('.form_dynamic_field_wrap');
    const FIELD = '.form_dynamic_field';
    const LABEL = '.form_dynamic_label';
    const PLACEHOLDER_CLASS = 'is-placeholder';
    //guard clause
    if (inputWraps.length === 0) return;
    //for each input field
    inputWraps.forEach(function (item) {
      const field = item.querySelector(FIELD);
      const label = item.querySelector(LABEL);

      // if field and label aren't found exit the function
      if (!field || !label) return;

      // if the label is not dynamic exit the function
      field.addEventListener('focusin', function () {
        label.classList.remove(PLACEHOLDER_CLASS);
      });

      field.addEventListener('focusout', function () {
        if (field.value.length === 0) {
          label.classList.add(PLACEHOLDER_CLASS);
        }
      });

      field.addEventListener('change', function () {
        if (field.value.length !== 0) {
          label.classList.remove(PLACEHOLDER_CLASS);
        } else {
          label.classList.add(PLACEHOLDER_CLASS);
        }
      });
    });
  };
  dynamicFormInputs();

  // Function to animate lottie line animation on focus of form field
  function optionFieldFocus(event) {
    const ACTIVE_CLASS = 'is-active';
    const OPTION_FIELD = '.form_option_input';
    const OPTION_WRAP = '.form_option_wrap';
    const GROUP_WRAP = '.form_option_list';
    const optionFields = document.querySelectorAll(OPTION_FIELD);
    if (optionFields.length === 0) return;
    // Add event listener for focusing on form fields
    optionFields.forEach(function (formField) {
      //get parent and group
      const fieldParent = formField.closest(OPTION_WRAP);
      const fieldGroup = formField.closest(GROUP_WRAP);

      formField.addEventListener('change', function (event) {
        const radioGroup = fieldGroup.querySelectorAll(OPTION_FIELD);
        //if checkbox is checked
        if (formField.type === 'checkbox' && formField.checked === true) {
          fieldParent.classList.add(ACTIVE_CLASS);
        }
        //if checkbox is not checked checked
        if (formField.type === 'checkbox' && formField.checked === false) {
          fieldParent.classList.remove(ACTIVE_CLASS);
        }
        //if radio is checked
        if (formField.type === 'radio' && formField.checked === true) {
          //if group contains an active class
          radioGroup.forEach(function (field) {
            const fieldParent = field.closest(OPTION_WRAP);
            if (field !== formField) {
              fieldParent.classList.remove(ACTIVE_CLASS);
            } else {
              fieldParent.classList.add(ACTIVE_CLASS);
            }
          });
        }
      });
    });
  }
  optionFieldFocus();

  // Function to animate lottie line animation on focus of form field
  function dynamicFieldFocus(event) {
    const dyamicFields = document.querySelectorAll('.form_dynamic_field');
    if (dyamicFields.length === 0) return;
    // Add event listener for focusing on form fields
    dyamicFields.forEach(function (formField) {
      formField.addEventListener('focus', function (event) {
        const formFieldParent = event.currentTarget.closest('.form_dynamic_field_wrap');
        if (!formFieldParent) return;
        formFieldParent.querySelector('.form_dynamic_field_line').click();
      });
    });
  }
  dynamicFieldFocus();
};
