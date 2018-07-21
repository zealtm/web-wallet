import trim from "validator/lib/trim";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import i18n from "./i18n";

/*
DOCUMENTATION:

Field: Name

E-mail: email
Alias:  alias
Username: username
E-mail or Username: emailUsername
Password: password

*/

export const inputValidator = inputs => {
  let errors = [];
  let messageError = undefined;

  Object.keys(inputs).map(input => {
    // Check if is undefined
    if (!inputs[input]) {
      errors.push(input);
    } else if (input === "checkbox") {
      let { checkbox } = inputs;

      Object.keys(checkbox).map(value => {
        let { checked, required } = checkbox[value];
        if (required === true && checked === false) {
          errors.push(value);
        }
      });
    } else {
      let { type, value } = inputs[input];


      // Check if is empty
      if (isEmpty(trim(value.toString()))) errors.push(type);

      // Check length
      if (!isLength(trim(value.toString()), { min: 1, max: 128 }))
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

      // Check if is a valid alias
      if (type === "alias" || type === "username") {
        let regex = new RegExp("^[a-z0-9-.@_]+$");

        if (
          !isLength(trim(value.toString()), { min: 4, max: 30 }) ||
          !regex.test(trim(value.toString()))
        ) {
          errors.push(type);
        }
      }

      // Check if is username or e-mail
      if (type === "usernameEmail") {
        let regex = new RegExp("^[a-z0-9-.@_]+$");
        let error = 0;

        if (!isEmail(trim(value.toString()))) error += 1;

        if (
          !isLength(trim(value.toString()), { min: 4, max: 30 }) ||
          !regex.test(trim(value.toString()))
        ) {
          error += 1;
        }

        if (error === 2) errors.push(type);
      }

      if (type === "passwordRepeat") {
        let regex = new RegExp('a-zA-Z0-9!@#$&()\\-`.+,/"');

        if (
          !isLength(trim(value.toString()), { min: 8, max: 64 }) ||
          !regex.test(trim(value.toString()))
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

      if (type === "PIN" || type === "pin") {
        let regex = new RegExp("^[0-9]+$");

        if (
          !isLength(trim(value.toString()), { min: 4, max: 4 }) ||
          !regex.test(trim(value.toString()))
        ){
          errors.push(type);
        }
      }
    }
  });

  // REMOVE DUPLICATE ITENS
  errors = errors.filter((item, index, input) => {
    return input.indexOf(item) == index;
  });

  if (errors.length > 0 && messageError === undefined) {
    messageError = i18n.t("MESSAGE_ERROR_FILEDS") + errors.join(", ");
  }

  return { messageError, errors };
};
