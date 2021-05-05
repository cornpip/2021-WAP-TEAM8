import { ProductComponent } from "./productcomponent.js";
import { Navbar } from "./navbar.js";

const body = document.querySelector("body");

Navbar(body);

const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const number = form.querySelector(".number");

class App {
  page;
  constructor(appRoot, information) {
    this.page = new ProductComponent(information);
    this.page.attachTo(appRoot);
  }
}

insertProduct.addEventListener("click", function handleClick() {
  if (title.value === "") alert("Value is empty");
  else {
    const information = {
      title: title.value,
      detail: detail.value,
      number: number.value,
      date: new Date(),
    };
    new App(document.querySelector(".products"), information);
  }
  title.value = "";
  detail.value = "";
  number.value = "";
});
