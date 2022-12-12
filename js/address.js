import{getSuggestions}from"./api.js";import{verifyAdress}from"./validation.js";const SUGGESTIONS_TO_SHOW=4,textarea=document.querySelector(".form-contacts__input--textarea"),сhooseAdressOption=t=>{const e=t.currentTarget.parentElement.firstChild,a=t.currentTarget;e.value=t.target.textContent,e.dataset.city=t.target.dataset.city,e.dataset.street=t.target.dataset.street,e.dataset.house=t.target.dataset.house,e.dataset.flat=t.target.dataset.flat,e.dataset.x=t.target.dataset.x,e.dataset.y=t.target.dataset.y,a.innerHTML="",verifyAdress(e)},showAdressSuggestions=(t,e)=>{e.innerHTML="",e.addEventListener("click",сhooseAdressOption),t.forEach((t=>{const a=t.value,{city:s,street:r,house:d,geo_lat:o,geo_lon:n,flat:i}=t.data,l=`<div class="js-address-option" data-city="${s}" data-street="${r}" data-house="${d}"\n      data-flat="${i}" data-x="${o}" data-y="${n}">${a}</div>`;e.insertAdjacentHTML("beforeend",l)}))},handleAddressInput=t=>{const e=t.target;verifyAdress(e);const a=t.target.parentElement.lastChild;getSuggestions(e.value,4).then((t=>t.json())).then((t=>{return e=t.suggestions,(s=a).innerHTML="",s.addEventListener("click",сhooseAdressOption),void e.forEach((t=>{const e=t.value,{city:a,street:r,house:d,geo_lat:o,geo_lon:n,flat:i}=t.data,l=`<div class="js-address-option" data-city="${a}" data-street="${r}" data-house="${d}"\n      data-flat="${i}" data-x="${o}" data-y="${n}">${e}</div>`;s.insertAdjacentHTML("beforeend",l)}));var e,s})).catch((t=>console.log("error",t)))},setAddressInputValue=t=>{textarea.value=t.value,textarea.dataset.city=t.data.city,textarea.dataset.street=t.data.street,textarea.dataset.house=t.data.house,textarea.dataset.flat="null",textarea.dataset.x=t.data.geo_lat,textarea.dataset.y=t.data.geo_lon,verifyAdress(textarea)};export{handleAddressInput,setAddressInputValue};