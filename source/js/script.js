//Mobile menu

document.body.classList.remove("js-no");

const menuButton = document.querySelector(".hamburger-button");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    document.body.classList.toggle("js-menu-open");
    menuButton.classList.toggle("hamburger-button--open");
  });
}
