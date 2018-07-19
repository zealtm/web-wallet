import trim from "validator/lib/trim";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import i18n from "./i18n";

export const inputValidator = inputs => {
  let errors = [];
  let messageError = undefined;

  Object.keys(inputs).map(input => {
    // Check if is undefined
    if (!inputs[input]) {
      errors.push(input);
    } else {
      let { type, value } = inputs[input];

      // Check if is empty
      if (isEmpty(trim(value.toString()))) errors.push(type);

      // Check length
      if (!isLength(trim(value.toString()), { min: 4, max: 128 }))
        errors.push(type);

      /* CUSTOM VALIDATIONS */

      // Check field of text
      if (type === "text") {
        if (isEmpty(trim(value.toString()))) errors.push(type);        
      }

      // Check if is a valid email
      if (type === "email") {
        if (!isEmail(trim(value.toString()))) errors.push(type);
      }

      // Check if is a valid password
      // if (type === "password") {
      //   if (!isLength(trim(value.toString()), { min: 8, max: 64 }))
      //     errors.push(type);
      // }

      if (type === "passwordRepeat") {
        if (
          !isLength(trim(value.toString()), { min: 8, max: 64 }) ||
          trim(value.toString()).match(/^[a-zA-Z0-9!@#$&()\\-`.+,/"]*$/g)
        ) {
          errors.push(type);
          messageError = i18n.t("RESET_NEW_PASSWORD_ERROR_1");
        }
        if (
          inputs["password"] &&
          value.toString() !== inputs["password"].value
        ) {
          errors.push(type);
          messageError = i18n.t("RESET_NEW_PASSWORD_ERROR_2");
        }
      }
    }
  });

  errors = errors.filter(function(item, index, input) {
    return input.indexOf(item) == index;
  });

  if (errors.length > 0 && messageError === undefined) {
    messageError = i18n.t("MESSAGE_ERROR_FILEDS") + errors.join(", ");
  }

  return { messageError, errors };
};
