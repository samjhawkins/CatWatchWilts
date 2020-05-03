const getSessionStorageItem = (item) =>
  JSON.parse(sessionStorage.getItem(item) || '{}');

const setSessionStorageItem = (item, data) =>
  sessionStorage.setItem(item, JSON.stringify(data || {}));

export { getSessionStorageItem, setSessionStorageItem };
