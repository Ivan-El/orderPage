import { activateAdressSearchButton } from "./state.js";
import { isLengthValid } from "./utils.js";

const MAX_COMMENT_LENGTH = 142;

const commentValidation = (evt) => {
  const commentInput = evt.target;
  const comment = commentInput.value;
  comentCountOutput.textContent = comment.length;
  const commentInputContainer = commentInput.parentElement;
  const comentCountOutput =
    commentInputContainer.querySelector(".js-comment-count");

  if (!isLengthValid(comment, MAX_COMMENT_LENGTH)) {
    commentInputContainer.classList.add("js-comment-error");
    commentInput.setCustomValidity(
      `Лимит длины комментария превышен на
          ${comment.length - MAX_COMMENT_LENGTH} симв.`
    );
  } else {
    commentInputContainer.classList.contains("js-comment-error")
      ? commentInputContainer.classList.remove("js-comment-error")
      : null;
    commentInput.setCustomValidity("");
  }

  commentInput.reportValidity();
};

const reportAdressValidationError = (element, str) => {
  element.parentElement.classList.contains("js-adress-invalid")
    ? null
    : element.parentElement.classList.add("js-adress-invalid");
  element.parentElement.classList.contains("js-adress-valid")
    ? element.parentElement.classList.remove("js-adress-valid")
    : null;
  element.setCustomValidity(str);
  element.reportValidity();
};

const reportAdressValidationSuccess = (element) => {
  element.parentElement.classList.contains("js-adress-invalid")
    ? element.parentElement.classList.remove("js-adress-invalid")
    : null;
  element.parentElement.classList.contains("js-adress-valid")
    ? null
    : element.parentElement.classList.add("js-adress-valid");
  element.setCustomValidity("");

  activateAdressSearchButton();
};

const verifyAdress = (el) => {
  el.focus();
  let result;

  if (el.dataset.city === "null" || el.dataset.city === "0") {
    result = reportAdressValidationError.bind(
      null,
      el,
      `Пожалуйста добавьте город, улицу, дом и номер квартиры для доставки.`
    );
    return result();
  }

  if (el.dataset.street === "null" || el.dataset.street === "0") {
    result = reportAdressValidationError.bind(
      null,
      el,
      `Пожалуйста добавьте улицу, дом и номер квартиры для доставки.`
    );

    return result();
  }

  if (el.dataset.house === "null" || el.dataset.house === "0") {
    result = reportAdressValidationError.bind(
      null,
      el,
      `Пожалуйста добавьте дом и номер квартиры для доставки.`
    );
    return result();
  }

  if (el.dataset.flat === "null" || el.dataset.flat === "0") {
    result = reportAdressValidationError.bind(
      null,
      el,
      `Пожалуйста добавьте номер квартиры для доставки.`
    );
    return result();
  }

  result = reportAdressValidationSuccess.bind(null, el);
  return result();
};

export { commentValidation, verifyAdress };
