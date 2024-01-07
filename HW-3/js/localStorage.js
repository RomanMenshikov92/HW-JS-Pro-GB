// Функция для получения данных из localstorage
function getDataFromLocalStorage(key) {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

// Функция для сохранения данных в localstorage
function saveDataToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

