const declinationVariants=["товар","товара","товаров"],chooseDeclination=e=>declinationVariants[e%100>4&&e%100<20?2:[2,0,1,1,1,2][e%10<5?e%10:5]],replaceTextContentNumber=e=>+e.textContent?.replace(/\s/g,""),calculate=(e,t=document,s)=>{const n=t.getElementsByClassName(s);let o=0;for(const e of n)o+=replaceTextContentNumber(e);return"count"===e?`${o} ${chooseDeclination(o)}`:"sum"===e?o.toLocaleString():void 0},isLengthValid=(e,t)=>{if("string"==typeof e)return e.length<=t},showSuccessMessage=()=>{const e=document.createElement("div");e.className="js-form-success-submit-message",e.innerHTML='<span class="js-form-success-submit-span">Заказ успешно оформлен!</span>',document.body.append(e),setTimeout((()=>e.remove()),2e3)};export{chooseDeclination,replaceTextContentNumber,calculate,isLengthValid,showSuccessMessage};