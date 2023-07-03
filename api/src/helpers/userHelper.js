const typeUser = [
  "userName",
  "email",
  "age",
  "password",
  "admin",
  "location",
  "genres",
  "phone",
  "active",
  "banned",
  "googleUser",
  "profilePic",

  //google firebase
  "email",
  "displayName",
  "uid",
];

const cleanData = (arr, obj) => {
  let newObj = {};

  for (const key in obj) {
    if (arr.some((a) => a === key)) {
      newObj = { ...newObj, [key]: obj[key] };
    }
  }

  return newObj;
};

const someOrder = (possibleOrder) =>
  possibleOrder === "asc" || possibleOrder === "desc" || false;

const defineOrder = (orderString) => {
  const separateOrder = orderString.split(",");
  const sizeSeparateOrder = separateOrder.length - 1;
  const endOrder = someOrder(separateOrder[sizeSeparateOrder])
    ? separateOrder[sizeSeparateOrder]
    : "asc";

  const order = separateOrder.reduce((acc, cur, i) => {
    if (someOrder(cur)) return acc;

    const order = someOrder(separateOrder[i + 1])
      ? separateOrder[i + 1]
      : endOrder;

    return [...acc, [cur, order]];
  }, []);

  return order;
};

const hasRepeatingValues = (arr) => new Set(arr).size < arr.length;

module.exports = {
  typeUser,
  cleanData,
  someOrder,
  defineOrder,
  hasRepeatingValues,
};
