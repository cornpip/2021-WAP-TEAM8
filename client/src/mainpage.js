banner = document.querySelector(".banner");
imgButtons = document.getElementsByClassName("lower__button");
wantToSee = document.getElementById("see");

bannerStyle = banner.style;
CURRENT_BUTTON = imgButtons[0];
CURRENT_BUTTON.style.backgroundColor = "black";
console.log(CURRENT_BUTTON);

function handleClick(e) {
  imgCount = e.target.id;
  CURRENT_BUTTON.style.backgroundColor = " rgb(194, 190, 190)";
  CURRENT_BUTTON = imgButtons[imgCount - 1];
  bannerStyle.backgroundImage = `url(../assets/${e.target.id}.jpg)`;
  CURRENT_BUTTON.style.backgroundColor = "black";
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
    top: 1000,
    behavior: "smooth",
  });
});
init();

// mainpage.js:18 Uncaught TypeError: Cannot read property 'addEventListener' of undefined 이거 해결해야 됩니당...
