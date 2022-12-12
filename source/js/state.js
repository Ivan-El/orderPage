import initForm from "./form.js";
import { myMap } from "./map.js";
import { replaceTextContentNumber, calculate } from "./utils.js";

const FAVORITES_NUMBER = 8;
const PROMOTION = "- 4 000";
const RIGHT_PROMOCODE = "5uglov";
const PROMOCODE_SALE = "- 500";
const form = document.querySelector(".order-form");
const wareCards = form.getElementsByClassName("ware-card");
const favoritesLabel = document.querySelector(".js-favorites-count");
const cartLabel = document.querySelector(".js-cart-count");
const totalBillSum = form.querySelector(".js-bill-total");
const totalWaresCount = form.querySelector(".js-total-ware-count");
const totalWaresSums = form.querySelectorAll(".js-total-ware-sum");
const billSaleSum = form.querySelector(".js-bill-sale-sum");
const promocodeValue = form.querySelector(".js-promocode-value");
const allWaresCountInput = form.querySelector(
  "input[data-input=all-wares-count]"
);
const allWaresSumInput = form.querySelector("input[data-input=all-wares-sum]");
const promotionInput = form.querySelector("input[data-input=promotion]");
const promocodeInput = form.querySelector("input[data-input=promocode]");
const allPromotionSumInput = form.querySelector(
  "input[data-input=all-promotion]"
);
const totalBillSumInput = form.querySelector("input[data-input=total-bill]");

const updateState = () => {
  totalWaresCount.textContent = calculate(
    "count",
    form,
    "count-selection__count"
  );

  totalWaresSums.forEach(
    (el) => (el.textContent = calculate("sum", form, "js-ware-total-price"))
  );

  totalBillSum.textContent = calculate("sum", form, "js-bill-sum");
  favoritesLabel.dataset.count = FAVORITES_NUMBER;
  cartLabel.dataset.count = parseInt(totalWaresCount.textContent);

  for (const wareCard of wareCards) {
    // if (wareCard.querySelector(".js-ware-price")) {

    // }
    const priceInput = wareCard.querySelector("input[data-input=price]");
    priceInput.value = wareCard.querySelector(".js-ware-price")?.textContent;
    const countInput = wareCard.querySelector("input[data-input=count]");
    countInput.value = wareCard.querySelector(
      ".count-selection__count"
    )?.textContent;
    const sumInput = wareCard.querySelector("input[data-input=sum]");
    sumInput.value = wareCard.querySelector(
      ".js-ware-total-price"
    )?.textContent;
  }

  allWaresCountInput.value = parseInt(totalWaresCount.textContent);
  allWaresSumInput.value = totalWaresSums[0].textContent;
  promotionInput.value = PROMOTION;
  promocodeInput.value = form.querySelector(".js-promocode-value").textContent;
  allPromotionSumInput.value =
    form.querySelector(".js-bill-sale-sum").textContent;
  totalBillSumInput.value = totalBillSum.textContent;
};

const activateInput = (input) => {
  const parent = input.parentElement;

  input.addEventListener("focus", () => {
    parent.classList.contains("js-active-input")
      ? null
      : parent.classList.add("js-active-input");
  });

  input.addEventListener("blur", () => {
    input.value ? null : parent.classList.remove("js-active-input");
  });
};

const deactivateInput = (input) => {
  input.parentElement.classList.remove("js-active-input");
};

const changeQuantity = (evt) => {
  const { target } = evt;
  const buttonsWrapper = target.parentElement;
  const counter = evt.currentTarget.parentElement;

  const oldPrice = counter.querySelector(".js-ware-old-price")
    ? replaceTextContentNumber(counter.querySelector(".js-ware-old-price"))
    : null;

  const oldSum = counter.querySelector(".js-ware-total-old-price");
  const price = replaceTextContentNumber(
    counter.querySelector(".js-ware-price")
  );
  const sum = counter.querySelector(".js-ware-total-price");
  const [minusButton, count, plusButton] = Array.from(buttonsWrapper.children);

  if (target === plusButton) {
    count.textContent = +count.textContent + 1;
  } else if (target === minusButton && +count.textContent > 1) {
    count.textContent = +count.textContent - 1;
  }

  sum.textContent = (+count.textContent * price).toLocaleString();

  updateState();

  oldPrice
    ? (oldSum.textContent = (+count.textContent * oldPrice).toLocaleString())
    : null;

  +count.textContent === 1
    ? (minusButton.disabled = true)
    : (minusButton.disabled = false);
};

const removeWare = (evt) => {
  const deleteButton = evt.target;
  const parentElement = deleteButton.parentElement;
  const parentContent = parentElement.innerHTML;
  const wareName = parentElement.querySelector(".js-ware-name").textContent;
  const wareArticle = parentElement.querySelector(".js-ware-article").textContent;
  const deleteTemplate = `
          <div class="ware-card__delete-item-template">
            <h3 class="visually-hidden">Удаленный товар</h3>
            <span class="ware-card__delete-item-annotation">Товар <span
                class="ware-card__delete-item-name js-delete-item-name">${wareName}</span> был удален из
              корзины.</span>
            <a class="ware-card__delete-item-recover-link js-ware-recover-link" href="#">Восстановить</a>
            <button class="ware-card__delete-button js-delete-button" type="button">
              <span class="visually-hidden">Убрать товар</span>
            </button>
          </div>
          <input data-input="price" type="hidden" name="${wareArticle}-price" value="">
          <input data-input="count" type="hidden" name="${wareArticle}-count" value="">
          <input data-input="sum" type="hidden" name="${wareArticle}-sum" value="">`;
  parentElement.classList.add("js-delete-ware");
  parentElement.innerHTML = deleteTemplate;
  updateState();

  parentElement
    .querySelector(".js-delete-button")
    .addEventListener("click", () => {
      parentElement.parentElement.remove();
    });

  parentElement
    .querySelector(".js-ware-recover-link")
    .addEventListener("click", (evt) => {
      evt.preventDefault();
      parentElement.classList.remove("js-delete-ware");
      parentElement.innerHTML = parentContent;
      initForm();
    });
};

const applyPromocode = (evt) => {
  const { target } = evt;
  const message = document.createElement("span");
  const promocodeInput = evt.currentTarget.firstChild;
  const promocodeButton = promocodeInput.nextElementSibling;
  const messageSpan = evt.currentTarget.lastChild;

  if (target === promocodeButton) evt.preventDefault();

  if (target === promocodeButton && promocodeInput.value) {
    if (promocodeInput.value.toLowerCase() === RIGHT_PROMOCODE) {
      message.className = "promocode__result-message--success";
      message.textContent = `${promocodeInput.value} - купон применен`;
      messageSpan.replaceWith(message);
      promocodeValue.textContent = PROMOCODE_SALE;
      billSaleSum.textContent = calculate("sum", form, "js-bill-sale");
      totalBillSum.textContent = calculate("sum", form, "js-bill-sum");
    } else {
      message.className = "promocode__result-message--error";
      message.textContent = `${promocodeInput.value} - купон не найден`;
      messageSpan.replaceWith(message);
    }
    promocodeInput.value = "";
    deactivateInput(promocodeInput);
  }

  updateState();
};

const activateAdressSearchButton = () => {
  const adressSearchButton = form.querySelector(".form-contacts__sarch-button");

  adressSearchButton.addEventListener("click", (evt) => {
    const textarea = evt.target.previousElementSibling;

    myMap.setCenter([textarea.dataset.x, textarea.dataset.y], 15, {
      duration: 300,
      timingFunction: "ease-in",
    });

    myMap.geoObjects
      .get(0)
      .geometry.setCoordinates([textarea.dataset.x, textarea.dataset.y]);
  });
};

export {
  activateInput,
  deactivateInput,
  removeWare,
  changeQuantity,
  updateState,
  applyPromocode,
  activateAdressSearchButton,
};
