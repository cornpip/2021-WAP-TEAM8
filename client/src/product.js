import { Navbar, Auth, insertInfo } from "./export.js";

const body = document.querySelector("body");
const products = document.querySelector(".products");

let informationJson;

function init() {
  console.log("네 저에요");
  Auth().then((res) => Navbar(body, res));
  fetch("/oproduct", { method: "post" })
    .then((res) => res.json())
    .then((res) => insertInfo(res, products))
    .catch((err) => {
      console.log(err);
    });
}

init();
