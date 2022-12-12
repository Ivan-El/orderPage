const declinationVariants = ["товар", "товара", "товаров"];

const chooseDeclination = (num) => {
  return declinationVariants[
    num % 100 > 4 && num % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
  ];
};

const replaceTextContentNumber = (element) =>
  +element.textContent?.replace(/\s/g, "");

const calculate = (
  desired,
  searchPlace = document,
  searchElementsClassName
) => {
  const collection = searchPlace.getElementsByClassName(
    searchElementsClassName
  );
  let result = 0;

  for (const collectionItem of collection) {
    result += replaceTextContentNumber(collectionItem);
  }

  if (desired === "count") {
    return `${result} ${chooseDeclination(result)}`;
  }

  if (desired === "sum") {
    return result.toLocaleString();
  }
};

const isLengthValid = (string, maxLength) => {
  if (typeof string === "string") {
    return string.length <= maxLength;
  }
};

const showSuccessMessage = () => {
  const message  = document.createElement("div");
  message.className = "js-form-success-submit-message";
  message.innerHTML =`<span class="js-form-success-submit-span">Заказ успешно оформлен!</span>`;
  document.body.append(message);
  setTimeout(() => message.remove(), 2000);
};

export {
  chooseDeclination,
  replaceTextContentNumber,
  calculate,
  isLengthValid,
  showSuccessMessage
};
