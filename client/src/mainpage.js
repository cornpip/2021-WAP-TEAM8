banner = document.querySelector(".banner");
imgButtons = document.getElementsByClassName("lower__button");
wantToSee = document.getElementById("see");

bannerStyle = banner.style;

FAID_IN = "@keyframes fadein {from { opacity: 0;} to {opacity: 1;}}";

function handleClick(e) {
  bannerImgCount = e.target.id;
  bannerStyle.backgroundImage = `url(../assets/${bannerImgCount}.jpg)`;
}

function init() {
  bannerStyle.backgroundImage = "url(../assets/1.jpg)";
  addEventListenerButtons();
}

function addEventListenerButtons() {
  for (let i = 0; i <= imgButtons.length; i++) {
    imgButtons[i].addEventListener("click", handleClick);
  }
}

wantToSee.addEventListener("click", () => {
  window.scroll({
    top: 780,
    behavior: "smooth",
  });
});
init();

// mainpage.js:18 Uncaught TypeError: Cannot read property 'addEventListener' of undefined 이거 해결해야 됩니당...
