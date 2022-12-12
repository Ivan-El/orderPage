import { activateInput, deactivateInput } from "./state.js";

const subscribeForm = document.querySelector(".subscribe__form");
const subscribeInput = subscribeForm.querySelector(".subscribe__input");

const initSubscribe = () => {
  activateInput(subscribeInput);
  subscribeForm.addEventListener("submit", (evt) => {

    evt.preventDefault();
    const { target } = evt;

    const message = document.createElement("span");
    const messageSpan = target.nextElementSibling;
    message.className = "js-subscribe-success";
    message.textContent = `${subscribeInput.value} - подписка успешно оформлена`;
    console.log(`Оформлена почтовая подписка на следующую эл. почту: ${subscribeInput.value}`)
    messageSpan.replaceWith(message);
    subscribeInput.value ="";
    deactivateInput(subscribeInput);
  });
};

export default initSubscribe;
