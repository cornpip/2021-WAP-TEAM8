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
  setImage();
  BANNER_STATE = "image";
});

colorModeBtn.addEventListener("click", (e) => {
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

function init() {
  BANNER_STATE = localStorage.getItem("banner_mode") || "image";
  setColor();
  if (BANNER_STATE === "image") setImage();
  else setColor();
  CURRENT_BUTTON.style.backgroundColor = "black";
  addEventListenerButtons();
}

init();

// mainpage.js:18 Uncaught TypeError: Cannot read property 'addEventListener' of undefined 이거 해결해야 됩니당...

// document.addEventListener("scroll", handleScroll);
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
