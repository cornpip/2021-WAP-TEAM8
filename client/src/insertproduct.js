import { showNavbar, Locate, Auth } from "./export.js";

const form = document.querySelector(".insert__product");
const insertProduct = form.querySelector(".insert-button");
const detail = form.querySelector(".detail");
const title = form.querySelector(".title");
const image = form.querySelector(".image");
const number = form.querySelector(".number");
const body = document.querySelector("body");

const first = document.querySelector(".locates-first"),
  second = document.querySelector(".locates-second"),
  third = document.querySelector(".locates-third"),
  btn = document.querySelector(".btn");

let SELECTED_AREA = [
  { num: first, area: "", use: false, currentUse: null },
  { num: second, area: "", use: false, currentUse: null },
  { num: third, area: "", use: false, currrenUse: null },
];

function handleInsert() {
  if (title.value === "") alert("Value is empty");
  if (
    !(SELECTED_AREA[0].area && SELECTED_AREA[1].area && SELECTED_AREA[2].area)
  )
    alert("지역을 선택해 주세요");
  if (number.value === "") alert("사람 수를 선택해 주세요.");
  else {
    var formData = new FormData();
    formData.append("title", title.value);
    formData.append("detail", detail.value);
    formData.append("inguser", number.value);
    formData.append("image", image.files[0]);
    formData.append(
      "place",
      `${SELECTED_AREA[0].area} ${SELECTED_AREA[1].area} ${SELECTED_AREA[2].area}`
    );
    fetch("/iproduct_process", {
      method: "post",
      body: formData,
    })
      .then(() => ((location.href = "/product"), (location.href = "/product")))
      .catch((err) => console.log(err));
  }
  title.value = "";
  detail.value = "";
  image.value = "";
  number.value = "";
}

function checkUser() {
  Auth()
    .then(
      (res) => console.log("회원입니다."),
      (rej) => {
        location.href = "/login";
      }
    )
    .catch((err) => console.log("err"));
}

function init() {
  checkUser();
  showNavbar(body);
  insertProduct.addEventListener("click", handleInsert);
  const result = fetchInit();
  result
    .then((res) => res.json())
    .then((res) => insertLocate(res, true))
    .catch((err) => console.log(err));
}
init();

async function fetchInit() {
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

// function showButton(isThird) {
//   const remove = isThird ? "blind" : "submit_button";
//   const add = isThird ? "submit_button" : "blind";
//   btn.classList.remove(remove);
//   btn.classList.add(add);
// }

function handleClick(areaNum, locate, element) {
  const data = {
    areaNum,
    locate,
    element,
  };

  removeChild(data);
  const isEqual = compareCurrentLocate(data);
  setArea(data, isEqual);
  areaNum < 2 && !isEqual ? fetchArea(data) : console.log("yes");
}

function compareCurrentLocate(data) {
  const locate = data.locate;
  const areaNum = data.areaNum;
  if (locate == SELECTED_AREA[areaNum].area) return true;
  else return false;
}

function setArea(data, isEqual) {
  const areaNum = data.areaNum;
  const locate = data.locate;
  const element = data.element;
  const nowArea = SELECTED_AREA[areaNum];

  // 이전에 선택한 lcoate랑 같다면 색 없애고, 빈칸으로 만들기
  if (isEqual) {
    nowArea.area = "";
    nowArea.use = false;
    changeColorOff(element);
    nowArea.currentUse = null;
  }
  // 이전에 선택한거랑 다르다면 원래꺼는 색 없애고, 현재 선택한거 색 주기
  else {
    nowArea.area = locate;
    nowArea.use = true;
    changeColorOn(element);
    if (nowArea.currentUse) {
      changeColorOff(nowArea.currentUse);
    }
    nowArea.currentUse = element;
  }
  //현재 선택한거 하위 lcoate는 다 없애기
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
}

function changeColorOff(element) {
  element.style.background = "none";
  element.style.backgroundColor = "white";
  element.style.color = "black";
}

function changeColorOn(element) {
  element.style.background = "linear-gradient(45deg, blueviolet, aquamarine)";
  element.style.color = "white";
}

function fetchArea(data) {
  const areaNum = data.areaNum;
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

function removeChild(data) {
  const areaNum = data.areaNum;
  let childNum = 2 - data.areaNum;
  for (let i = 0; i < childNum; i++) {
    while (SELECTED_AREA[areaNum + i + 1].num.hasChildNodes())
      SELECTED_AREA[areaNum + i + 1].num.removeChild(
        SELECTED_AREA[areaNum + i + 1].num.firstChild
      );
  }
}
