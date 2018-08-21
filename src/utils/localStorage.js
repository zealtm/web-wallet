import { encryptAes } from "./cryptography";
const authToken = "auth.token";
const userObj = "user.object";

export const setAuthToken = token =>
  localStorage.setItem(authToken, JSON.stringify(token));

export const getAuthToken = () => JSON.parse(localStorage.getItem(authToken));

export const setUserSeedWords = (seed, password) => {
  setUserData({ secretWord: encryptAes(seed, password) });
};

export const getUserSeedWords = () => {
  let userData = getUserData();
  return userData.secretWord;
};

export const compareUserSeedWords = seed => {
  let userData = getUserData();
  if (userData.secretWord === seed) {
    return true;
  }

  return false;
};

export const getUsername = () => {
  let userData = getUserData();
  return userData ? userData.username : undefined;
};

export const clearAuthToken = () => localStorage.removeItem(authToken);

export const clear = value => localStorage.removeItem(value);

export const clearAll = () => localStorage.clear();

export const getUserData = () => JSON.parse(localStorage.getItem(userObj));

export const setUserData = user => {
  let userStorage = getUserData();
  localStorage.setItem(userObj, JSON.stringify({ ...userStorage, ...user }));
};

export const setDefaultFiat = (fiat) => {
  let userStorage = getUserData();
  fiat = fiat.toUpperCase();
  localStorage.setItem(userObj, JSON.stringify({ ...userStorage, defaultFiat: fiat }));
};

export const getDefaultFiat = () => {
  let userStorage = getUserData();
  return userStorage.defaultFiat ? userStorage.defaultFiat : 'USD'
};

export const setDefaultCrypto = (coin) => {
  let userStorage = getUserData();
  localStorage.setItem(userObj, JSON.stringify({ ...userStorage, defaultCoin: coin }));
};

export const getDefaultCrypto = () => {
  let userStorage = getUserData();
  return userStorage.defaultCoin ? userStorage.defaultCoin : 'lunes'
};

