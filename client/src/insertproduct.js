const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const image = form.querySelector(".image");
const number = form.querySelector(".number");

let jsonArray = [];
let testjson;

insertProduct.addEventListener("click", handleClick);

function handleClick() {
  if (title.value === "") alert("Value is empty");
  else {
    fetch("/iproduct_process", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        detail: detail.value,
        inguser: number.value,
      }),
    })
      .then(() => (location.href = "/product"))
      .catch((err) => console.log(err));
  }
  title.value = "";
  detail.value = "";
  image.value = "";
  number.value = "";
}

function init() {
  // const json = Array(JSON.parse(localStorage.getItem("product")));
  // jsonArray = json === null ? json : [];
}
init();
