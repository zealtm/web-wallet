const nameToken = "auth.token";
const seedToken = "auth.seed";

export const setAuthToken = (token) => localStorage.setItem(nameToken, JSON.stringify(token));

export const getAuthToken = () => JSON.parse(localStorage.getItem(nameToken));

export const setUserSeed = (seed) => localStorage.setItem(seedToken, JSON.stringify(seed));

export const getUserSeed= () => JSON.parse(localStorage.getItem(seedToken));

export const clearAuthToken = () => localStorage.removeItem(nameToken);

export const clear = (value) => localStorage.removeItem(value);

export const clearAll = () => localStorage.clear();