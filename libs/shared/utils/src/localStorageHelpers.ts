import _ from "lodash";

export enum LocalStorageKey {
  JWT = "jwt",
  CART = "cart",
}

export function getLocalStorageValue<T>(key: LocalStorageKey): T | null {
  const value = localStorage.getItem(key);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function setLocalStorageValue<T>(key: LocalStorageKey, value: T) {
  const prepareValue = _.isString(value) ? value : JSON.stringify(value);
  localStorage.setItem(key, prepareValue);
}

export function clearLocalStorageValue(key: LocalStorageKey) {
  localStorage.removeItem(key);
}
