import { encryptAes } from "./cryptography";
const authToken = "auth.token";
const userObj = "user.object";

export const setAuthToken = token => {
  if (!token) return;
  return localStorage.setItem(authToken, JSON.stringify(token));
};

export const getAuthToken = () => JSON.parse(localStorage.getItem(authToken));

export const setUserSeedWords = (seed, password) => {
  setUserData({ secretWord: encryptAes(seed, password) });
  return;
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
  if (!userData) return;
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

export const setDefaultFiat = fiat => {
  let userStorage = getUserData();
  fiat = fiat.toUpperCase();
  localStorage.setItem(
    userObj,
    JSON.stringify({ ...userStorage, defaultFiat: fiat })
  );
};

export const getDefaultFiat = () => {
  let userStorage = getUserData();
  return userStorage.defaultFiat ? userStorage.defaultFiat : "USD";
};

export const setDefaultCrypto = coin => {
  let userStorage = getUserData();

  localStorage.setItem(
    userObj,
    JSON.stringify({ ...userStorage, defaultCoin: coin })
  );
};
export const getFavoritesAssets = () => {
  return {
    //_lunesfullnode
    "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
    //_odyx.me
    "3NjPCAdGhPPWs8bJjauAjuRHRuzsgicA58J1fAF3q89J": "OPN Token",
    "FaX52248YNpHY1WUyCipamX51177P2Y3NmJ3imZw7fzG": "Teste Token",
    //_thelordofnodes
    "": "Not found",
    //_lunes.in
    // "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
    //legion.cash
    "": "Not Found",
    //_spartan node
    "": "Not Found",
    //_lunesrealnode.com
    "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk": "NEO Token",
    // "9rwhz45pXYRdbHTek28HK87RHCEG1BKP4Eu2FnpAVsC8": "ZEN Token",
    "Gf5ko4JJ2jRrtEnRdZXJ15cF3cuFVHRZti9sBXcspba8": "NEO Token",
    //_masternodebrasil
    "":"Not Found",
    "Bome8qGJtJucpHdE8mSMBDWMJ5TCiopRPVb6cJG3Ueym": "Unknown"
  }
}
export const setFavoritesCrypto = coin => {
  let favoritesCrypto = getFavoritesCrypto();
  if (!favoritesCrypto) favoritesCrypto = [];
  favoritesCrypto.push(coin);
  favoritesCrypto = favoritesCrypto.filter((item, index, input) => {
    return input.indexOf(item) == index;
  });

  return localStorage.setItem("favorites.crypto", favoritesCrypto);
};

export const removeFavoritesCrypto = coin => {
  let favoritesCrypto = getFavoritesCrypto();
  if (!favoritesCrypto) favoritesCrypto = [];
  favoritesCrypto = favoritesCrypto.filter(item => item !== coin);

  return localStorage.setItem("favorites.crypto", favoritesCrypto);
};

export const getFavoritesCrypto = () => {
  let favoritesCrypto = localStorage.getItem("favorites.crypto");
  if (!favoritesCrypto) return;

  favoritesCrypto = favoritesCrypto.split(",");

  return favoritesCrypto;
};

export const getDefaultCrypto = () => {
  let userStorage = getUserData();
  let favoritesCrypto = getFavoritesCrypto();
  if (!favoritesCrypto) favoritesCrypto = ["lunes"];

  return !userStorage || !userStorage.defaultCoin
    ? favoritesCrypto.includes("lunes")
      ? "lunes"
      : favoritesCrypto[0]
    : favoritesCrypto.includes(userStorage.defaultCoin)
      ? userStorage.defaultCoin
      : "lunes";
};

export const setDefinitionMetadata = value => {
  if (value === null) {
    value = true;
  }
  localStorage.setItem("definition.delete", value);
};

export const getDefinitionMetadata = () => {
  let isDelete = JSON.parse(localStorage.getItem("definition.delete"));

  if (isDelete == null) return true;

  return isDelete;
};
