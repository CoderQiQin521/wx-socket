const setStorage = (key, val) => {
  if (!val) return;
  localStorage.setItem(key, JSON.stringify(val))
}

const getStorage = (key) => {
  if (!key) return;
  return JSON.parse(localStorage.getItem(key))
}


export default {
  setStorage,
  getStorage
}