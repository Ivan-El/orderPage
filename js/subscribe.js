import{activateInput,deactivateInput}from"./state.js";const subscribeForm=document.querySelector(".subscribe__form"),subscribeInput=subscribeForm.querySelector(".subscribe__input"),initSubscribe=()=>{activateInput(subscribeInput),subscribeForm.addEventListener("submit",(e=>{e.preventDefault();const{target:t}=e,s=document.createElement("span"),u=t.nextElementSibling;s.className="js-subscribe-success",s.textContent=`${subscribeInput.value} - подписка успешно оформлена`,console.log(`Оформлена почтовая подписка на следующую эл. почту: ${subscribeInput.value}`),u.replaceWith(s),subscribeInput.value="",deactivateInput(subscribeInput)}))};export default initSubscribe;