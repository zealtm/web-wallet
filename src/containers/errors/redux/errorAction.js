export const clearMessage = () => ({
  type: "CLEAR_MESSAGE"
});

export const errorInput = value => ({
  type: "ERROR_INPUT",
  message: value
});

export const errorRequest = () => ({
  type: "REQUEST_FAILED",
});
