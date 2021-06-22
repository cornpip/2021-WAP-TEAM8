import { showNavbar, Auth, insertInfo } from "./export.js";

const body = document.querySelector("body"),
  category1 = document.querySelector(".c1"),
  category2 = document.querySelector(".c2"),
  products = document.querySelector(".products");

let CURRENT_CONTENT = "write";
let USER_DATA;

function removeContent() {
  while (products.hasChildNodes()) {
    products.removeChild(products.firstChild);
  }
}

function changeButton() {
  const buttons = document.querySelectorAll(".participateBtn");
  const len = buttons.length;
  for (let i = 0; i < len; i++) {
    buttons[i].value = "상세 정보 보러가기";
  }
}

function showContent(data, mode = "write") {
  if (mode == "write" && data.length > 0) {
    const userId = data[0].id;
    const len = data.length;
    for (let i = 1; i < len; i++) {
      if (userId == data[i].makeuser) {
        fetchProduct(data[i].id);
      }
    }
  }

  if (mode == "participate") {
    const inglist = data[0].inglist.split(",");
    const len = inglist.length;
    for (let i = 1; i < len; i++) {
      fetchProduct(inglist[i].id);
    }
  }
}

function fetchProduct(key) {
  fetch("/oproduct_key", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key: key,
    }),
  })
    .then((res) => res.json())
    .then(function (res) {
      insertInfo(res, products), changeButton();
    })
    .catch((err) => console.log(err));
}

function getUserInfo() {
  fetch("/mypageinfo")
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (data) => {
        (USER_DATA = data), showContent(data);
      },
      (res) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

function checkUser() {
  const user = body.querySelector(".user");
  const noUser = body.querySelector(".no_user");
  Auth()
    .then(
      (res) => {
        noUser.classList.add("hidden"),
          user.classList.remove("hidden"),
          getUserInfo();
      },
      (rej) => {
        noUser.classList.remove("hidden"), user.classList.add("hidden");
      }
    )
    .catch((err) => console.log(err));
}

function init() {
  showNavbar(body);
  checkUser();
  showContent();
}

category1.addEventListener("click", function () {
  if (CURRENT_CONTENT == "participate") {
    CURRENT_CONTENT = "write";
    removeContent();
    showContent(USER_DATA);
  }
});

category2.addEventListener("click", function () {
  if (CURRENT_CONTENT == "write") {
    CURRENT_CONTENT = "participate";
    removeContent();
    showContent(USER_DATA, "participate");
  }
});

init();
