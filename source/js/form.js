import { handleAddressInput } from "./address.js";
import {
  activateInput,
  applyPromocode,
  changeQuantity,
  removeWare,
  updateState,
} from "./state.js";
import { showSuccessMessage } from "./utils.js";
import { commentValidation } from "./validation.js";

const form = document.querySelector(".order-form");
const buttonsWrappers = form.getElementsByClassName(
  "count-selection__count-wrapper"
);
const deleteButtons = form.getElementsByClassName("js-delete-button");
const formContactImputs = form.querySelectorAll(".form-contacts__input");
const formCommentInput = form.querySelector(".form-comment__input");
const textarea = form.querySelector(".form-contacts__input--textarea");
const promocode = form.querySelector(".promocode");
const promocodeInput = promocode.querySelector(".promocode__input");

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const data = new FormData(evt.target);
  showSuccessMessage();
};

const showFormDataValues = (evt) => {
  const data = evt.formData;
  for (const [key, value] of data.entries()) {
    console.log(`${key} : ${value}`);
  }
};

const initForm = () => {
  for (const buttonsWrapper of buttonsWrappers) {
    buttonsWrapper.addEventListener("click", changeQuantity);
  }

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", removeWare);
  }

  formContactImputs.forEach(activateInput);
  formCommentInput.addEventListener("input", commentValidation);
  activateInput(promocodeInput);
  promocode.addEventListener("click", applyPromocode);
  textarea.addEventListener("input", handleAddressInput);
  form.addEventListener("submit", onFormSubmit);

  form.addEventListener("formdata", showFormDataValues);
  updateState();
};

export default initForm;
