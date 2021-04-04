banner = document.querySelector(".banner");
let BANNER_COUNT = 0;

function bannerSlide() {
  const imageCount = (BANNER_COUNT % 4) + 1;
  banner.style.backgrounImage = `url(../assets/${imageCount}.jpg)`;
}

function init() {
  console.log(banner.style.backgrounImage);
}
init();
