import { encryptHmacSha512 } from "./cryptography";
const authToken = "auth.token";
const userObj = "user.object";

export const setAuthToken = token =>
  localStorage.setItem(authToken, JSON.stringify(token));

export const getAuthToken = () => JSON.parse(localStorage.getItem(authToken));

export const setUserSeedWords = (seed, password) =>{
  setUserData({ secretWord: encryptHmacSha512(seed, password) });
}

export const clearAuthToken = () => localStorage.removeItem(authToken);

export const clear = value => localStorage.removeItem(value);

export const clearAll = () => localStorage.clear();

export const getUserData = () => JSON.parse(localStorage.getItem(userObj));

export const setUserData = user => {
  let userStorage = getUserData();
  localStorage.setItem(userObj, JSON.stringify({ ...userStorage, ...user }));
};
