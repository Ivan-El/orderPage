const initSiteSearch = () => {
  const searchForm = document.querySelector(".search-form");
  const searchInput = searchForm.querySelector(".search-form__search-input");
  const searchButton = searchForm.querySelector(".search-form__button");

  searchForm.addEventListener("click", (evt) => {
    const onNotFormElementClick = (evt) => {
      if (evt.target.parentElement !== searchForm) {
        searchForm.classList.remove("js-search-form-active");
        searchInput.value = "";
      }
    };

    if (evt.target === searchButton && !searchInput.value) {
      if (searchForm.classList.contains("js-search-form-active")) {
        searchForm.classList.remove("js-search-form-active");
        document.removeEventListener("click", onNotFormElementClick);
      } else {
        searchForm.classList.add("js-search-form-active");
        searchInput.focus();
        document.addEventListener("click", onNotFormElementClick);
      }
    } else if (evt.target === searchButton && searchInput.value) {
      searchForm.classList.remove("js-search-form-active");
      console.log(`Поисковый запрос: ${searchInput.value}`);
      searchInput.value = "";
      document.removeEventListener("click", onNotFormElementClick);
    }
  });
};

export default initSiteSearch;
