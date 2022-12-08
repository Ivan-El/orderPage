import initAccordion from "./accordion.js";
import { initForm, refreshValue } from "./form.js";
import initMobileMenu from "./hamburger.js";
import { initPromocode } from "./promocode.js";
import initSiteSearch from "./search.js";

document.body.classList.remove("js-no");

initMobileMenu();
initSiteSearch();
initAccordion();
refreshValue();
initForm();
initPromocode();
