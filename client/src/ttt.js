import { Locate } from "./export.js";

let SELECTED_FIRST;
let SELECTED_SECOND;
let SELECTED_THIRD = [];
let CLILKED = false;

const first = document.querySelector(".locates-first"),
  second = document.querySelector(".locates-second"),
  third = document.querySelector(".locates-third"),
  btn = document.querySelector(".btn");

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
      isFirst
        ? handleClickFirst(locate.locate)
        : isSecond
        ? handleClickSecond(locate.locate)
        : handleClickThird(locate.locate);
      // locate.isClick
      //   ? (locate.lhtml.classList.remove("clicked"),
      //     (locate.isClick = false),
      //     (CLILKED = false))
      //   : (locate.lhtml.classList.add("clicked"),
      //     (locate.isClick = true),
      //     (CLILKED = true));
    });
  });
}

// first 선택했을때
function handleClickFirst(locate) {
  btn.classList.remove("submit_button");
  btn.classList.add("blind");
  // 이미 선택된게 있다면
  if (SELECTED_FIRST) {
    if (SELECTED_SECOND) {
      removeChild(third);
    }
    //하위자식 => 시군구 삭제
    removeChild(second);
    // 이전에 선택된거랑 방금 선택한거랑 같으면 삭제하고 종료
    if (SELECTED_FIRST == locate) {
      SELECTED_FIRST = null;
      return;
    }
  }

  SELECTED_FIRST = locate;
  // first에 맞는 data 불러옴
  hi(SELECTED_FIRST)
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (datas) => insertLocate(datas, false, true),
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

// second 선택했을때
function handleClickSecond(locate) {
  btn.classList.remove("submit_button");
  btn.classList.add("blind");
  // 이미 선택된게 있다면
  if (SELECTED_SECOND) {
    // 하위자식 => 동 삭제
    removeChild(third);
    // 이전에 선택된거랑 방금 선택한거랑 같으면 삭제하고 종료
    if (SELECTED_SECOND == locate) {
      SELECTED_SECOND = null;
      return;
    }
  }

  SELECTED_SECOND = locate;
  // first, second 다 전달하고 data 불러옴
  hi(SELECTED_FIRST, SELECTED_SECOND)
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (datas) => insertLocate(datas, false, false),
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

function removeChild(parent) {
  while (parent.hasChildNodes()) parent.removeChild(parent.firstChild);
}

function handleClickThird(locate) {
  btn.classList.remove("blind");
  btn.classList.add("submit_button");
}

async function hi(first, second = "") {
  const information = await fetch("/olocate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first: first,
      second: second,
    }),
  });
  return information;
}

init();
