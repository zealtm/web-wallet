import cryptoJs from "crypto-js";

export const encryptHmacSha512 = (value, key) => cryptoJs.HmacSHA512(value, key).toString();

export const encryptSha512 = (value) => cryptoJs.SHA512(value).toString();

export const encryptMd5 = value => cryptoJs.MD5(value).toString();