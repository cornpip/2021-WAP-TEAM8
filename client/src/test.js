import { showNavbar, insertInfo, Auth } from "./export.js";

const app = document.querySelector(".app");
const body = document.querySelector("body");
const products = document.querySelector(".products");

const circles = document.createElement("div");
circles.setAttribute("class", "circles");

const set = ["100px", "150px", "50px"];

const purple = makeCircle(
  0,
  "100px",
  "150px",
  "rgb(152, 0, 199)",
  "rgb(32, 60, 138)"
);

const purple2 = makeCircle(
  2,
  "140px",
  "230px",
  "rgb(152,0,199)",
  "rgb(32,60,138)"
);

const green = makeCircle(
  2,
  "800px",
  "1300px",
  "rgb(255,249,69)",
  "rgb(0,255,26)"
);

const red = makeCircle(
  1,
  "300px",
  "1500px",
  "rgb(255, 101, 194)",
  "rgb(255, 41, 48)"
);

circles.append(purple, purple2, green, red);
app.appendChild(circles);

function makeCircle(number, top, left, color1, color2) {
  const circle = document.createElement("div");
  circle.setAttribute("class", "circle-no");
  circle.style.opacity = "0.8";
  circle.style.width = set[number];
  circle.style.height = set[number];
  circle.style.borderRadius = "50%";
  circle.style.position = "fixed";
  circle.style.top = top;
  circle.style.left = left;
  circle.style.background = `linear-gradient(140deg, ${color1}, ${color2})`;
  circle.style.boxShadow = `0px 0px 30px 1px ${color2}`;
  return circle;
}

function getProductInformation() {
  fetch("/oproduct", { method: "post" })
    .then((res) => res.json())
    .then((res) => insertInfo(res.slice(0, 6), products))
    .catch((err) => {
      console.log(err);
    });
}

function checkUser() {
  const user = body.querySelector(".app");
  const noUser = body.querySelector(".no_user");
  Auth()
    .then(
      (res) => {
        noUser.classList.add("hidden"), user.classList.remove("hidden");
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
  getProductInformation();
}
init();
// function handleScroll() {
//   let scrollLocation = document.documentElement.scrollTop;
//   console.log(`${scrollLocation}`);
//   if (scrollLocation > "500") {
//     window.scrollTo({ top: 1009, left: 0, behavior: "smooth" });
//   }
// }

let USER_DATA;
