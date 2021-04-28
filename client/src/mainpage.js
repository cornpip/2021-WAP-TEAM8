const banner = document.querySelector(".banner");
const buttons = document.getElementsByClassName("lower__button");
const wantToSee = document.getElementById("see");
const imgModeBtn = document.getElementById("image");
const colorModeBtn = document.getElementById("color");

const bannerStyle = banner.style;

const BANNER_COLORS = ["#2E86C1", "#1E8449", "#F7DC6F", "#F1948A", "#76448A"];
CURRENT_BUTTON = buttons[0];

wantToSee.addEventListener("click", () => {
  window.scroll({
    top: 1009,
    behavior: "smooth",
  });
});

imgModeBtn.addEventListener("click", (e) => {
  localStorage.setItem("banner_mode", "image");
  setBtn(1);
  initImage();
  BANNER_STATE = "image";
});

colorModeBtn.addEventListener("click", (e) => {
  localStorage.setItem("banner_mode", "color");
  setBtn(1);
  initColor();
  BANNER_STATE = "color";
});

function addEventListenerButtons() {
  for (let i = 0; i <= buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
  }
}

// document.addEventListener("scroll", handleScroll);

function handleClick(e) {
  if (BANNER_STATE === "image") changeImage(e);
  else changeColor(e);
}

function changeImage(e) {
  imgCount = e.target.id;
  setBtn(imgCount);
  bannerStyle.backgroundImage = `url(../assets/${e.target.id}.jpg)`;
}

function changeColor(e) {
  colorCount = e.target.id;
  setBtn(colorCount);
  bannerStyle.backgroundColor = BANNER_COLORS[colorCount - 1];
}

function setBtn(Count) {
  CURRENT_BUTTON.style.backgroundColor = " rgb(194, 190, 190)";
  CURRENT_BUTTON = buttons[Count - 1];
  CURRENT_BUTTON.style.backgroundColor = "black";
}

function initImage() {
  bannerStyle.backgroundColor = BANNER_COLORS[0];
  bannerStyle.backgroundImage = `url(../assets/1.jpg)`;
}

function initColor() {
  bannerStyle.backgroundImage = "none";
  bannerStyle.backgroundColor = BANNER_COLORS[0];
}

// function handleScroll() {
//   const minibanner = banner.querySelector(".hidden");
//   const buttonsPr = banner.querySelector(".lower__buttons");
//   console.log(buttonsPr);
//   if (pageYOffset >= 1009 - 100) {
//     buttonsPr.style.display = "none";
//     minibanner.classList.add("fixnav");
//   } else {
//     buttonsPr.style.display = "inline";
//     minibanner.classList.remove("fixnav");
//   }
// }

function init() {
  BANNER_STATE = localStorage.getItem("banner_mode");
  CURRENT_BUTTON.style.backgroundColor = "black";
  if (BANNER_STATE === "image") initImage();
  else initColor();
  addEventListenerButtons();
}

init();

// mainpage.js:18 Uncaught TypeError: Cannot read property 'addEventListener' of undefined 이거 해결해야 됩니당...
