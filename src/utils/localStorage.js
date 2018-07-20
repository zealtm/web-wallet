const nameToken = "auth.token";

export const setAuthToken = (token) => localStorage.setItem(nameToken, token);

export const getAuthToken = () => localStorage.getItem(nameToken);

export const clearAuthToken = () => localStorage.removeItem(nameToken);