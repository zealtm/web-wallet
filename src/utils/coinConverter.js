export const convertCoin = (value, decimal) => {
  let number = "1";
  for (let i = 0; i < decimal; i++) {
    number = number + "0";
  }
  return value / parseInt(number);
};
