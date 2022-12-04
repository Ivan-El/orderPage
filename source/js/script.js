//Mobile menu

document.body.classList.remove("js-no");

const menuButton = document.querySelector(".hamburger-button");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("js-menu-open");
    menuButton.classList.toggle("hamburger-button--open");
  });
}

// Accordion

const accordionButtons = document.querySelectorAll(".js-accordion-button");
const accordionSections = document.querySelectorAll(".js-accordion-section");

function onButtonClick(evt) {
  const section = evt.target.closest(".js-accordion-section");
  section.classList.toggle("js-accordion-section--opened");
}

accordionButtons.forEach((accordionButton) => {
  accordionButton.addEventListener("click", onButtonClick);
});
