import { Locate } from "./export.js";

let SELECTED_FIRST;
let SELECTED_SECOND;
let SELECTED_THIRD = [];
let CLILKED = false;

const first = document.querySelector(".locates-first"),
  second = document.querySelector(".locates-second"),
  third = document.querySelector(".locates-third"),
  btn = document.querySelector(".btn");

let SELECTED_AREA = [
  { num: first, area: "", use: false },
  { num: second, area: "", use: false },
  { num: third, area: "", use: false },
];

function init() {
  const result = hi2();
  result
    .then((res) => res.json())
    .then((res) => insertLocate(res, true))
    .catch((err) => console.log(err));
}

async function hi2() {
  const info = await fetch("/slocate", {
    method: "post",
  });
  return info;
}

function insertLocate(datas, isFirst = false, isSecond = false) {
  datas.map((data) => {
    const locate = new Locate(isFirst ? data.area : data);
    locate.attachTo(isFirst ? first : isSecond ? second : third, locate.lhtml);
    locate.lhtml.addEventListener("click", () => {
      let areaNum;
      isFirst ? (areaNum = 0) : isSecond ? (areaNum = 1) : (areaNum = 2);
      handleClick(areaNum, locate.locate, locate.lhtml);
    });
  });
}

function setArea(areaNum, locate, element) {
  if (locate == SELECTED_AREA[areaNum].area) {
    SELECTED_AREA[areaNum].area = "";
    SELECTED_AREA[areaNum].use = false;
    element.style.backgroundColor = "white";
    element.style.color = "black";
    switch (areaNum) {
      case 0:
        SELECTED_AREA[areaNum + 1].area = "";
        SELECTED_AREA[areaNum + 2].area = "";
        break;
      case 1:
        SELECTED_AREA[areaNum + 1].area = "";
        break;
      default:
        break;
    }
  } else {
    SELECTED_AREA[areaNum].area = locate;
    SELECTED_AREA[areaNum].use = true;
    element.style.backgroundColor = "rgb(68, 109, 184)";
    element.style.color = "white";
  }
}

function handleClick(areaNum, locate, element) {
  console.log(areaNum);
  btn.classList.remove("submit_button");
  btn.classList.add("blind");

  removeChild(areaNum);
  setArea(areaNum, locate, element);
  areaNum < 2 ? fetchArea(areaNum, locate) : console.log("yes");
}

function fetchArea(areaNum) {
  const first = SELECTED_AREA[0].area;
  const second = SELECTED_AREA[1].area;
  fetch("/olocate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first: first,
      second: second,
    }),
  })
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (data) => {
        insertLocate(data, false, areaNum == 0);
      },
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

function removeChild(areaNum) {
  let childNum = 2 - areaNum;
  for (let i = 0; i < childNum; i++) {
    while (SELECTED_AREA[areaNum + i + 1].num.hasChildNodes())
      SELECTED_AREA[areaNum + i + 1].num.removeChild(
        SELECTED_AREA[areaNum + i + 1].num.firstChild
      );
  }
}

init();
