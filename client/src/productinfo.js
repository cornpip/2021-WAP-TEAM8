import { showNavbar, insertInfo, showInfo } from "./export.js";
import { ProductInformation } from "./productinfomation.js";

const body = document.querySelector("body"),
  products = body.querySelector(".products");

function init() {
  showNavbar(body);
  const key = location.search.replace("?key=", "");
  fetch("/oproduct_key", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key,
    }),
  })
    .then((res) => res.json())
    .then(function (res) {
      insertInfo(res, products, true);
    })
    .catch((err) => console.log(err));
}

function removeEvent() {
  const participateBtn = products.querySelector(".participateBtn");
  participateBtn.removeEventListener("click", showInfo);
}
init();
