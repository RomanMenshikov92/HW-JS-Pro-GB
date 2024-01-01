"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать.
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

// Создание объекта "Музыкальная коллекция"
let musicCollection = {
  albums: [
    {
      title: "2Pacalypse Now",
      artist: "2Pac",
      year: "1992",
    },
    {
      title: "Thug Life",
      artist: "2Pac",
      year: "1994",
    },
    {
      title: "All Eyez on Me",
      artist: "2Pac",
      year: "1996",
    },
  ],
  // Итератор для перебора альбомов
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.albums.length) {
          let album = this.albums[index];
          index++;
          return { value: `${album.title} - ${album.artist} (${album.year})`, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

// Использование цикла for...of для перебора и вывода альбомов в консоль
for (let album of musicCollection) {
  console.log(album);
}
