banner = document.querySelector(".banner");
Buttons = document.getElementsByClassName("lower__button");
wantToSee = document.getElementById("see");
imgModeBtn = document.getElementById("image");
colorModeBtn = document.getElementById("color");

bannerStyle = banner.style;

BANNER_COLORS = ["#2E86C1", "#1E8449", "#F7DC6F", "#F1948A", "#76448A"];
CURRENT_BUTTON = Buttons[0];
CURRENT_BUTTON.style.backgroundColor = "black";

wantToSee.addEventListener("click", () => {
  window.scroll({
    top: 1009,
    behavior: "smooth",
  });
});

imgModeBtn.addEventListener("click", (e) => {
  localStorage.setItem("banner_mode", "image");
  offBtn();
  setCurrentBtn(1);
  onBtn();
  bannerStyle.backgroundColor = BANNER_COLORS[0];
  bannerStyle.backgroundImage = "url(../assets/1.jpg)";
  BANNER_STATE = "image";
});

colorModeBtn.addEventListener("click", (e) => {
  localStorage.setItem("banner_mode", "color");
  offBtn();
  setCurrentBtn(1);
  onBtn();
  bannerStyle.backgroundImage = "none";
  bannerStyle.backgroundColor = BANNER_COLORS[0];
  BANNER_STATE = "color";
});

function handleClick(e) {
  if (BANNER_STATE === "image") changeImage(e);
  else changeColor(e);
}

function addEventListenerButtons() {
  for (let i = 0; i <= Buttons.length; i++) {
    Buttons[i].addEventListener("click", handleClick);
  }
}

function changeImage(e) {
  imgCount = e.target.id;
  offBtn();
  setCurrentBtn(imgCount);
  bannerStyle.backgroundImage = `url(../assets/${e.target.id}.jpg)`;
  onBtn();
}

function changeColor(e) {
  colorCount = e.target.id;
  offBtn();
  setCurrentBtn(colorCount);
  bannerStyle.backgroundColor = BANNER_COLORS[colorCount - 1];
  onBtn();
}

function setCurrentBtn(Count) {
  CURRENT_BUTTON = Buttons[Count - 1];
}

function offBtn() {
  CURRENT_BUTTON.style.backgroundColor = " rgb(194, 190, 190)";
}

function onBtn() {
  CURRENT_BUTTON.style.backgroundColor = "black";
}

function init() {
  BANNER_STATE = localStorage.getItem("banner_mode");
  if (BANNER_STATE === "image")
    bannerStyle.backgroundImage = `url(../assets/1.jpg)`;
  else bannerStyle.backgroundColor = BANNER_COLORS[0];
  addEventListenerButtons();
}

init();

// mainpage.js:18 Uncaught TypeError: Cannot read property 'addEventListener' of undefined 이거 해결해야 됩니당...
