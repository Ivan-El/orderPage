import {
  replaceTextContentNumber,
  calculate,
} from "./utils.js";

const form = document.querySelector(".order-form");
const totalWaresCount = form.querySelector(".js-total-ware-count");
const totalWaresSums = form.querySelectorAll(".js-total-ware-sum");
const totalBillSum = form.querySelector(".js-bill-total");

const refreshValue = () => {
  totalWaresCount.textContent = calculate(
    "count",
    form,
    "count-selection__count"
  );

  totalWaresSums.forEach(
    (el) => (el.textContent = calculate("sum", form, "js-ware-total-price"))
  );

  totalBillSum.textContent = calculate("sum", form, "js-bill-sum");
}

const initForm = () => {
  // totalWaresCount.textContent = calculate(
  //   "count",
  //   form,
  //   "count-selection__count"
  // );

  // totalWaresSums.forEach(
  //   (el) => (el.textContent = calculate("sum", form, "js-ware-total-price"))
  // );

  // totalBillSum.textContent = calculate("sum", form, "js-bill-sum");

  const buttonsWrappers = form.getElementsByClassName(
    "count-selection__count-wrapper"
  );

  for (const buttonsWrapper of buttonsWrappers) {
    buttonsWrapper.addEventListener("click", (evt) => {
      const { target } = evt;
      const counter = buttonsWrapper.parentElement;
      const oldPrice = counter.querySelector(".js-ware-old-price")
        ? replaceTextContentNumber(counter.querySelector(".js-ware-old-price"))
        : null;
      const oldSum = counter.querySelector(".js-ware-total-old-price");
      const price = replaceTextContentNumber(
        counter.querySelector(".js-ware-price")
      );
      const sum = counter.querySelector(".js-ware-total-price");
      const childrenArray = Array.from(buttonsWrapper.children);
      const [minusButton, count, plusButton] = childrenArray;

      if (target === plusButton) {
        count.textContent = +count.textContent + 1;
      } else if (target === minusButton && +count.textContent > 1) {
        count.textContent = +count.textContent - 1;
      }

      totalWaresCount.textContent = calculate(
        "count",
        form,
        "count-selection__count"
      );

      sum.textContent = (+count.textContent * price).toLocaleString();

      totalWaresSums.forEach(
        (el) => (el.textContent = calculate("sum", form, "js-ware-total-price"))
      );

      totalBillSum.textContent = calculate("sum", form, "js-bill-sum");

      oldPrice
        ? (oldSum.textContent = (
            +count.textContent * oldPrice
          ).toLocaleString())
        : null;

      +count.textContent === 1
        ? (minusButton.disabled = true)
        : (minusButton.disabled = false);
    });
  }

  const deleteButtons = form.getElementsByClassName("ware-card__delete-button");

for (const deleteButton of deleteButtons) {
  deleteButton.addEventListener("click", () => {
    const parentElement = deleteButton.parentElement;
    const parentContent = parentElement.innerHTML;
    const wareName = parentElement.querySelector(".js-ware-name").textContent;
    const deleteTemplate = `
            <div class="ware-card__delete-item-template">
              <h3 class="visually-hidden">Удаленный товар</h3>
              <span class="ware-card__delete-item-annotation">Товар <span
                  class="ware-card__delete-item-name js-delete-item-name">${wareName}</span> был удален из
                корзины.</span>
              <a class="ware-card__delete-item-recover-link" href="#">Восстановить</a>
              <button class="ware-card__delete-button" type="button">
                <span class="visually-hidden">Убрать товар</span>
              </button>
            </div>`;
    parentElement.classList.add("js-delete-ware");
    parentElement.innerHTML = deleteTemplate;
    refreshValue();

    parentElement
      .querySelector(".ware-card__delete-button")
      .addEventListener("click", () => {
        parentElement.parentElement.remove();
      });

    parentElement
      .querySelector(".ware-card__delete-item-recover-link")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        parentElement.classList.remove("js-delete-ware");
        parentElement.innerHTML = parentContent;
        initForm();
        refreshValue();
      });
  });
}
};

export { form, totalBillSum, initForm, refreshValue };
