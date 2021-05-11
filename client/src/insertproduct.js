const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const number = form.querySelector(".number");

let jsonArray = [];

insertProduct.addEventListener("click", handleClick);

function handleClick() {
  if (title.value === "") alert("Value is empty");
  else {
    const information = {
      title: title.value,
      detail: detail.value,
      number: number.value,
      participant: 1,
      date: new Date(),
    };
    jsonArray.push(information);
    localStorage.setItem("product", JSON.stringify(jsonArray));
  }
  title.value = "";
  detail.value = "";
  number.value = "";
}

function init() {
  const json = Array(JSON.parse(localStorage.getItem("product")));
  jsonArray = json === null ? json : [];
  console.log(jsonArray);
}
init();
