const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const number = form.querySelector(".number");

let jsonArray = new Array();

insertProduct.addEventListener("click", function handleClick() {
  if (title.value === "") alert("Value is empty");
  else {
    const information = {
      title: title.value,
      detail: detail.value,
      number: number.value,
      date: new Date(),
    };
    jsonArray.push(information);
    localStorage.setItem("product", JSON.stringify(jsonArray));
  }
  title.value = "";
  detail.value = "";
  number.value = "";
});

function init() {
  const body = document.querySelector("body");
  const h1 = document.createElement("h1");
  h1.innerText = "hello";
  form.append(h1);
  jsonArray = JSON.parse(localStorage.getItem("product"));
}
init();
