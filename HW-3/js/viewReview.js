document.addEventListener("DOMContentLoaded", () => {
  window.onload = function () {
    showReviews();
  };

  let nextPageButton = document.querySelector(".view__btn-next");
  nextPageButton.addEventListener("click", nextPage);

  // Функция для отображения отзывов
  function showReviews() {
    let content = document.getElementById("content");
    let reviews = getDataFromLocalStorage("reviews");
    console.log(reviews);
    let listContainer = document.createElement("ul");
    listContainer.classList.add("view__list", "list-reset");
    content.appendChild(listContainer);
    // Проверка, есть ли отзывы для данного продукта
    if (reviews.length === 0) {
      listContainer.textContent = "Нет отзывов для данного продукта";
    } else {
      reviews.forEach(function (feedback) {
        let itemContainer = document.createElement("li");
        itemContainer.classList.add("view__item");

        let productTitle = document.createElement("h2");
        productTitle.classList.add("view__product-name");
        productTitle.textContent = feedback.product;

        let btnShowHide = document.createElement("button");
        btnShowHide.classList.add("view__btn-show-hide", "btn-reset");
        btnShowHide.textContent = "Показать отзывы";
        btnShowHide.addEventListener("click", () => {
          reviewList.classList.toggle("hidden");
          btnShowHide.classList.toggle("close");
          if (btnShowHide.textContent === "Показать отзывы") {
            btnShowHide.textContent = "Скрыть отзывы";
          } else {
            btnShowHide.textContent = "Показать отзывы";
          }
        });

        let reviewList = document.createElement("ul");
        reviewList.classList.add("view__product-review-list", "list-reset", "hidden");

        feedback.review.forEach((review) => {
          let reviewItem = document.createElement("li");
          let btnReviewDelete = document.createElement("button");
          reviewItem.classList.add("view__product-review-item");
          btnReviewDelete.classList.add("view__btn-delete-review", "btn-reset");
          reviewItem.textContent = review;
          btnReviewDelete.textContent = "Х";
          btnReviewDelete.setAttribute("data-review", review);
          reviewItem.appendChild(btnReviewDelete);
          reviewList.appendChild(reviewItem);
          btnReviewDelete.addEventListener("click", () => {
            let reviewText = event.target.getAttribute("data-review");
            removeReview(feedback.product, reviewText, listContainer, itemContainer);
            reviewList.removeChild(reviewItem);
          });
        });

        itemContainer.appendChild(productTitle);
        itemContainer.appendChild(btnShowHide);
        itemContainer.appendChild(reviewList);
        listContainer.appendChild(itemContainer);
      });
    }
  }

  //   Функция для удаления отзыва
  function removeReview(product, review, listContainer, itemContainer) {
    let reviews = getDataFromLocalStorage("reviews");
    let updatedReviews = reviews.map(function (feedback) {
      if (feedback.product === product) {
        let reviewIndex = feedback.review.indexOf(review);
        if (reviewIndex > -1) {
          feedback.review.splice(reviewIndex, 1);
          saveDataToLocalStorage("reviews", reviews);
        }
        // Проверяем, остались ли еще отзывы для данного товара
        if (feedback.review.length === 0) {
          let productIndex = reviews.indexOf(feedback);
          if (productIndex > -1) {
            reviews.splice(productIndex, 1);
            listContainer.removeChild(itemContainer);
            saveDataToLocalStorage("reviews", reviews);
            if (reviews.length === 0) {
              listContainer.textContent = "Отзывы удалены";
            }
          }
        }
      }
      return feedback;
    });
  }

  // Функция для перехода на страницу добавления отзывов
  function nextPage() {
    location.href = "../html/addReview.html";
  }
});
