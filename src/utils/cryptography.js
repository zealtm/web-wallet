import cryptoJs from "crypto-js";

export const encryptHmacSha512 = (value, key) => cryptoJs.HmacSHA512(value, key);

export const encryptSha512 = (value) => cryptoJs.SHA512(value);

export const encryptMd5 = value => cryptoJs.MD5(value);