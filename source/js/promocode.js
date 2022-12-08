import { form, totalBillSum } from "./form.js";
import { calculate } from "./utils.js";

const RIGHT_PROMOCODE = "5uglov";
const PROMOCODE_SALE = "- 500";

const promocode = form.querySelector(".promocode");
const billSaleSum = form.querySelector(".js-bill-sale-sum");
const promocodeValue = form.querySelector(".js-promocode-value");
const promocodeInput = promocode.querySelector(".promocode__input");

const initPromocode = () => {
  promocode.addEventListener("click", (evt) => {
    const { target } = evt;
    const message = document.createElement("span");
    const messageSpan = promocode.lastChild;

    if (target === promocode && promocodeInput.value) {
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
    }
  });
};

export {initPromocode}
