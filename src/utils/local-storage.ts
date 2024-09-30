export const localGetItem = (key: string) => {
  return localStorage.getItem(key);
};

export const localSetItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const localRemoveItem = (key: string) => {
  localStorage.removeItem(key);
};
