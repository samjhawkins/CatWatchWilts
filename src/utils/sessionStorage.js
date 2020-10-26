const getSessionStorageItem = (item) => {
  const returnVar = JSON.parse(sessionStorage.getItem(item) || '{}');
  return Object.keys(returnVar).length ? returnVar : undefined;
};
const setSessionStorageItem = (item, data) =>
  sessionStorage.setItem(item, JSON.stringify(data || {}));

const removeSessionStorage = (item) => sessionStorage.removeItem(item);

export { getSessionStorageItem, setSessionStorageItem, removeSessionStorage };
