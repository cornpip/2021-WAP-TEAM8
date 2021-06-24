import { Auth, insertInfo } from "./export.js";

const banner = document.querySelector(".banner"),
  buttons = document.getElementsByClassName("lower__button"),
  wantToSee = document.getElementById("see"),
  imgModeBtn = document.getElementById("image"),
  colorModeBtn = document.getElementById("color"),
  products = document.querySelector(".products"),
  howTo = document.querySelector("#howto");

const bannerStyle = banner.style;

const BANNER_COLORS = ["#2E86C1", "#1E8449", "#F7DC6F", "#F1948A", "#76448A"];

let CURRENT_BUTTON = buttons[0];
let BANNER_STATE;

wantToSee.addEventListener("click", () => {
  window.scroll({
    top: 2500,
    behavior: "smooth",
  });
});

howTo.addEventListener("click", () => {
  window.scroll({
    top: 1001,
    behavior: "smooth",
  });
});

imgModeBtn.addEventListener("click", () => {
  localStorage.setItem("banner_mode", "image");
  setBtn(1);
  setImage();
  BANNER_STATE = "image";
});

colorModeBtn.addEventListener("click", () => {
  localStorage.setItem("banner_mode", "color");
  setBtn(1);
  setColor();
  BANNER_STATE = "color";
});

function addEventListenerButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
  }
}

const setImage = (count = 1) => {
  bannerStyle.backgroundImage = `url(../assets/${count}.jpg)`;
};

const setColor = (count = 1) => {
  bannerStyle.backgroundImage = "none";
  bannerStyle.backgroundColor = BANNER_COLORS[count - 1];
};

function handleClick(e) {
  const count = e.target.id;
  setBtn(count);
  if (BANNER_STATE === "image") setImage(count);
  else setColor(count);
}

function setBtn(count) {
  CURRENT_BUTTON.style.backgroundColor = "rgb(194, 190, 190)";
  CURRENT_BUTTON = buttons[count - 1];
  CURRENT_BUTTON.style.backgroundColor = "black";
}

function checkAuth() {
  const bannerLeft = banner.querySelector("#left");
  const bannerRight = banner.querySelector("#right");
  Auth()
    .then(
      (res) => {
        bannerLeft.setAttribute("href", "/Mypage");
        bannerLeft.innerHTML = "Mypage";
        bannerRight.setAttribute("href", "/logout");
        bannerRight.innerHTML = "Logout";
      },
      (rej) => {
        bannerLeft.classList.add("hidden");
        bannerRight.setAttribute("href", "/login");
        bannerRight.innerHTML = "Sign in";
      }
    )
    .catch((err) => alert(err));
}

function getProductInformation() {
  fetch("/oproduct", { method: "post" })
    .then((res) => res.json())
    .then((res) => insertInfo(res.slice(0, 6), products))
    .catch((err) => {
      console.log(err);
    });
}

function init() {
  checkAuth();
  getProductInformation();
  BANNER_STATE = localStorage.getItem("banner_mode") || "image";
  setColor();
  if (BANNER_STATE === "image") setImage();
  else setColor();
  CURRENT_BUTTON.style.backgroundColor = "black";
  addEventListenerButtons();
}

const tt1 = document.querySelector(".tt1"),
  tt2 = document.querySelector(".tt2"),
  tt3 = document.querySelector(".tt3"),
  tt1H1 = document.querySelector(".tt1 h1"),
  tt1Img = document.querySelector(".tt1 img"),
  tt1A = document.querySelector(".tt1 a");

const tts = [tt1, tt2, tt3];
console.log(tts);

function setStyle(num) {
  for (let i = 0; i < 3; i++) {
    if (i != num) {
      tts[i].style.opacity = "0";
      tts[i].style.animation = "none";
    } else {
      tts[i].style.opacity = "1";
      tts[i].style.animation = "fade 1s";
    }
  }
}

window.addEventListener("scroll", function () {
  var currentScrollValue = document.documentElement.scrollTop;
  if (currentScrollValue < 1000) {
    setStyle(-1);
  } else if (currentScrollValue > 1000 && currentScrollValue < 2000) {
    setStyle(0);
  } else if (currentScrollValue > 2000 && currentScrollValue < 3000) {
    setStyle(1);
  } else if (currentScrollValue > 3000 && currentScrollValue < 3800) {
    setStyle(2);
  }
});

init();
