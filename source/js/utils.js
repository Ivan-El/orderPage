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

export { chooseDeclination, replaceTextContentNumber, calculate };
