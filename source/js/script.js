import initAccordion from "./accordion.js";
import initForm from "./form.js";
import initMobileMenu from "./hamburger.js";
import { initMap } from "./map.js";
import initSiteSearch from "./search.js";
import initSubscribe from "./subscribe.js";

document.body.classList.remove("js-no");

initMobileMenu();
initSiteSearch();
initForm();
ymaps.ready(initMap);
initSubscribe();
initAccordion();
