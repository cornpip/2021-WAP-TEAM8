import { showNavbar } from "./export.js";

const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const image = form.querySelector(".image");
const number = form.querySelector(".number");
const body = document.querySelector("body");

function handleClick() {
  if (title.value === "") alert("Value is empty");
  else {
    var formData = new FormData();
    formData.append("title", title.value);
    formData.append("detail", detail.value);
    formData.append("inguser", number.value);
    formData.append("image", image.files[0]);
    formData.append("place", "부산광역시 남구 대연동");
    fetch("/iproduct_process", {
      method: "post",
      body: formData,
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
  showNavbar(body);
  insertProduct.addEventListener("click", handleClick);
}
init();

// import { showNavbar } from "./export.js";

// const form = document.querySelector(".insert__product"),
//   insertProduct = form.querySelector(".button"),
//   detail = form.querySelector(".detail"),
//   title = form.querySelector(".title"),
//   image = form.querySelector(".image"),
//   number = form.querySelector(".number"),
//   body = document.querySelector("body");

// function handleClick() {
//   if (title.value === "") alert("Value is empty");
//   else {
//     console.log(image.files[0].name);
//     fetch("/iproduct_process", {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title: title.value,
//         detail: detail.value,
//         inguser: number.value,
//         image: image.files[0].name,
//       }),
//     })
//       .then((res) => console.log(res))
//       // .then(() => (location.href = "/product"))
//       .catch((err) => console.log(err));
//   }
//   title.value = "";
//   detail.value = "";
//   image.value = "";
//   number.value = "";
// }

// function init() {
//   showNavbar(body);
//   insertProduct.addEventListener("click", handleClick);
// }
// init();
