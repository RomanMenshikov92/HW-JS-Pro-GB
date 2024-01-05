"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50
символов в длину и не более 500. В случае неверной длины, необходимо выводить
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру.
На странице должны отображаться товары, под каждым товаром должен быть список
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальное id, для упрощения, используем
`Date.now()`.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не
делать, пока рано.
*/

const initialData = [
  {
    id: Date.now(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: Date.now(),
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: Date.now(),
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: Date.now(),
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: Date.now(),
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: Date.now(),
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: Date.now(),
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

// функция перебора отзывов и создает HTML-разметку для элементов списка <li>
function renderReviews(reviews) {
  return reviews.map((review) => `<li class="review-item">${review.text}</li>`).join("");
}

// функция принимает идентификатор продукта, название продукта и массив отзывов, затем генерирует HTML-разметку для отображения отзывов для указанного продукта. Она создает список отзывов <ul>, форму для добавления нового отзыва и контейнер для размещения списка отзывов и формы
function renderProductReview(productId, product, reviews) {
  const reviewList = document.createElement("ul");
  reviewList.classList.add("review-list");
  reviewList.innerHTML = renderReviews(reviews);

  const form = document.createElement("form");
  form.classList.add("review-form");
  form.innerHTML = `
  <input class="review-input" type="text" id="review-${productId}" placeholder="Добавить отзыв" />
  <button class="review-btn" onclick="addReview(${productId})">Отправить</button>`;

  const container = document.createElement("div");
  container.classList.add("product");
  container.id = `product-${productId}`;
  container.innerHTML = `<h3 class="mini-title">${product}</h3>`;
  container.appendChild(reviewList);
  container.appendChild(form);

  document.getElementById("product-reviews").appendChild(container);
}

// функция перебирает массив товаров и для каждого товара вызывает функцию renderProductReview для создания отзывов и формы для добавления нового отзыва.
function renderAllProductReviews(data) {
  data.forEach(({ id, product, reviews }) => {
    renderProductReview(id, product, reviews);
  });
}

// Функция вызывается при добавлении нового отзыва. Она получает текст нового отзыва, проверяет его длину (от 50 до 500 символов), создает новый элемент списка отзывов с помощью введенного текста и добавляет его к соответствующему списку отзывов для указанного продукта.
function addReview(productId) {
  const input = document.getElementById(`review-${productId}`);
  const text = input.value.trim();
  if (text.length < 5 || text.length > 500) {
    alert("Отзыв должен быть от 50 до 500 символов");
    return;
  }

  const newReview = { id: Date.now(), text };
  const reviewList = document.getElementById(`product-${productId}`).querySelector(".review-list");
  reviewList.insertAdjacentHTML("beforeend", `<li class="review-item">${newReview.text}</li>`);

  input.value = "";

  event.preventDefault();

  return false;
}

renderAllProductReviews(initialData);
