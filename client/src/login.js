import { Navbar } from "./navbar.js";

const body = document.querySelector("body");

Navbar(body);

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => (BODY = response))
  .then((data) => console.log("data is", data))
  .then(() => console.log("body is", BODY))
  .catch((err) => console.log(err));
