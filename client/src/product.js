import { insertInfo, showNavbar } from "./export.js";

const products = document.querySelector(".products"),
  body = document.querySelector("body");

const insertBtn = document.querySelector(".insert");
insertBtn.addEventListener("click", () => {
  location.href = "/insertproduct";
});

function init() {
  showNavbar(body);
  fetch("/oproduct", { method: "post" })
    .then((res) => res.json())
    .then((res) => {
      insertInfo(res, products);
    })
    .catch((err) => {
      console.log(err);
    });
}

init();
