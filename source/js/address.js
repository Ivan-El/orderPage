import { getSuggestions } from "./api.js";
import { verifyAdress } from "./validation.js";

const SUGGESTIONS_TO_SHOW = 4;
const textarea = document.querySelector(".form-contacts__input--textarea");

const сhooseAdressOption = (evt) => {
  const adressInput = evt.currentTarget.parentElement.firstChild;
  const adressSuggestionsContainer = evt.currentTarget;

  adressInput.value = evt.target.textContent;
  adressInput.dataset.city = evt.target.dataset.city;
  adressInput.dataset.street = evt.target.dataset.street;
  adressInput.dataset.house = evt.target.dataset.house;
  adressInput.dataset.flat = evt.target.dataset.flat;
  adressInput.dataset.x = evt.target.dataset.x;
  adressInput.dataset.y = evt.target.dataset.y;
  adressSuggestionsContainer.innerHTML = "";
  verifyAdress(adressInput);
};

const showAdressSuggestions = (array, container) => {
  container.innerHTML = "";
  container.addEventListener("click", сhooseAdressOption);

  array.forEach((el) => {
    const value = el.value;
    const { city, street, house, geo_lat, geo_lon, flat } = el.data;
    const option = `<div class="js-address-option" data-city="${city}" data-street="${street}" data-house="${house}"
      data-flat="${flat}" data-x="${geo_lat}" data-y="${geo_lon}">${value}</div>`;
    container.insertAdjacentHTML("beforeend", option);
  });
};

const handleAddressInput = (evt) => {
  const commentInput = evt.target;
  verifyAdress(commentInput);
  const suggestionsContainer = evt.target.parentElement.lastChild;
  const promise = getSuggestions(commentInput.value, SUGGESTIONS_TO_SHOW);

  promise
    .then((response) => response.json())
    .then((result) =>
      showAdressSuggestions(result.suggestions, suggestionsContainer)
    )
    .catch((error) => console.log("error", error));
};

const setAddressInputValue = (suggestion) => {
  textarea.value = suggestion.value;
  textarea.dataset.city = suggestion.data.city;
  textarea.dataset.street = suggestion.data.street;
  textarea.dataset.house = suggestion.data.house;
  textarea.dataset.flat = "null";
  textarea.dataset.x = suggestion.data.geo_lat;
  textarea.dataset.y = suggestion.data.geo_lon;
  verifyAdress(textarea);
};

export { handleAddressInput, setAddressInputValue };
