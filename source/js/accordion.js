const initAccordion = () => {
  const accordionButtons = document.querySelectorAll(".js-accordion-button");
  const accordionSections = document.querySelectorAll(".js-accordion-section");

  function onButtonClick(evt) {
    const section = evt.target.closest(".js-accordion-section");
    section.classList.toggle("js-accordion-section--opened");
  }

  if (accordionButtons) {
    accordionButtons.forEach((accordionButton) => {
      accordionButton.addEventListener("click", onButtonClick);
    });
  }
};

export default initAccordion;
