import { Navbar, Auth } from "./export.js";

const body = document.querySelector("body");

function init() {
  Auth().then((res) => Navbar(body, res));
}

init();
