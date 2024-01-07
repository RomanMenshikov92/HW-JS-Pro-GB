document.addEventListener("DOMContentLoaded", () => {
  let addReviewButton = document.querySelector(".add__btn");
  addReviewButton.addEventListener("click", addReview);

  let nextPageButton = document.querySelector(".add__btn-next");
  nextPageButton.addEventListener("click", nextPage);

  // Функция для добавления отзыва
  function addReview() {
    let productInput = document.getElementById("product");
    let reviewInput = document.getElementById("reviewText");

    let product = productInput.value.trim();
    let review = reviewInput.value.trim();

    if (product === "" || review === "") {
      alert("Пожалуйста, заполните все поля");
      return;
    } else {
      alert("Отзыв успешно добавлен");
    }

    let reviews = getDataFromLocalStorage("reviews");

    let existingReview = reviews.find((item) => item.product === product);

    existingReview ? existingReview.review.push(review) : reviews.push({ product: product, review: [review] });

    saveDataToLocalStorage("reviews", reviews);

    productInput.value = "";
    reviewInput.value = "";
  }

  // Функция для перехода на страницу просмотра отзывов
  function nextPage() {
    location.href = "../html/viewReview.html";
  }
});
