export const convertCoin = (value, decimal) => {
  let number = "1";
  for (let i = 0; i < decimal; i++) {
    number = number + "0";
  }
  return value / parseInt(number);
};

export const percentCalc = (first, last) => {
  let result = (last * 100) / first - 100;

  return result.toFixed(2);
};
