import { ProductInformation } from "./productinfo.js";
import { Navbar } from "./navbar.js";

const body = document.querySelector("body");
const products = document.querySelector(".products");

Navbar(body);

let informationJson = JSON.parse(localStorage.getItem("product"));
informationJson.map((information) => {
  const product = new ProductInformation(information);
  product.attachTo(products, product.insertToHTMl());
  product.element
    .querySelector(".participateBtn")
    .addEventListener("click", function () {
      const p = product.element.querySelector(".participant");
      product.participateTo(p);
    });
});
