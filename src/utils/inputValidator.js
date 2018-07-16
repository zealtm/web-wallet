import trim from "validator/lib/trim";
import isEmpty from "validator/lib/isEmpty";
import isLength from "validator/lib/isLength";
import isEmail from "validator/lib/isEmail";
import isAlphanumeric from "validator/lib/isAlphanumeric";
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
      if (!isLength(trim(value.toString()), { min: 4, max: 128 })) errors.push(type);

      /* CUSTOM VALIDATIONS */
      
      // Check if is a valid email
      if (type === "email") {
        if (!isEmail(trim(value.toString()))) errors.push(type);
      }

      // Check if is a valid password
      if (type === "password") {
        if (!isAlphanumeric(trim(value.toString())) || !isLength(trim(value.toString()), { min: 8, max: 64 })) errors.push(type);
      }
    }
  });

  errors = errors.filter( function( item, index, input ) {
    return input.indexOf(item) == index;
  }); 

  if(errors.length > 0) {
    messageError =  i18n.t("MESSAGE_ERROR_FILEDS") + errors.join(", ");
  }
  
  return {messageError, errors};
};
