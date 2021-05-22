import { insertInfo, showNavbar } from "./export.js";

const products = document.querySelector(".products"),
  body = document.querySelector("body");

function init() {
  console.log("네 저에요");
  showNavbar(body);
  fetch("/oproduct", { method: "post" })
    .then((res) => res.json())
    .then((res) => insertInfo(res, products))
    .catch((err) => {
      console.log(err);
    });
}

init();
