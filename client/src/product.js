import { ProductInformation } from "./productinfo.js";
import { Navbar } from "./navbar.js";

const body = document.querySelector("body");
const products = document.querySelector(".products");

Navbar(body);

let informationJson = JSON.parse(localStorage.getItem("product"));

console.log(informationJson);

informationJson.map((information, index) => {
  const product = new ProductInformation(information);
  product.attachTo(products, product.insertToHTMl());
  product.element
    .querySelector(".participateBtn")
    .addEventListener("click", function () {
      console.log(information);
      product.participateTo(product.element.querySelector(".participant"));
      information.participant++;
    });
});
