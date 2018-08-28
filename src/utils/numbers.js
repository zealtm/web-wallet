import i18n from "./i18n";

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

export const formatDate = (date, type = "DMY") => {
  // TYPES -----------
  // D - day,
  // DM - day and month,
  // DMY - day, month and year
  // H - hour
  // HM - hour and minute
  // HMS - hour, minute and second

  let monthNames = [
    i18n.t("JANUARY"),
    i18n.t("FEBRUARY"),
    i18n.t("MARCH"),
    i18n.t("APRIL"),
    i18n.t("MAY"),
    i18n.t("JUNE"),
    i18n.t("JULY"),
    i18n.t("AUGUST"),
    i18n.t("SEPTEMBER"),
    i18n.t("OCTOBER"),
    i18n.t("NOVEMBER"),
    i18n.t("DECEMBER")
  ];

  date = new Date(date);

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  if (type === "D") {
    return day;
  } else if (type === "DM") {
    return day + "/" + monthNames[monthIndex];
  } else if (type === "H") {
    return hours;
  } else if (type === "HM") {
    return hours + ":" + minutes;
  } else if (type === "HMS") {
    return hours + ":" + minutes + ":" + seconds;
  } else {
    return day + "/" + monthNames[monthIndex] + "/" + year;
  }
};
