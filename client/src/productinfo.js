import { showNavbar, insertInfo, showInfo } from "./export.js";

const body = document.querySelector("body"),
  products = body.querySelector(".products");

// console.log(button);

const key = location.search.replace("?key=", "");
let IS_PARTICIPATE = false;

function showProductInfo() {
  fetch("/oproduct_key", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      key,
    }),
  })
    .then((res) => res.json())
    .then(function (res) {
      insertInfo(res, products, true);
    })
    .catch((err) => console.log(err));
}

function getUserInfo() {
  fetch("/mypageinfo")
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (res) => {
        checkParticipate(res), changeButton();
      },
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

/* 참가 여부에 따라 버튼 바뀜 */
function changeButton() {
  const button = products.querySelector(".participateBtn");
  if (IS_PARTICIPATE) {
    button.value = "참가중@";
    button.addEventListener("click", () => alert("이미 참가하셨습니다."));
  } else {
    button.addEventListener("click", () => handlerParticipate());
  }
}

/* 현재 참가중인 상품인지 확인*/
function checkParticipate(res) {
  const len = res.length;
  // 참여중인 목록이 null이 아니고, key값이 있다면
  if (res[0].inglist && res[0].inglist.includes(key)) {
    IS_PARTICIPATE = true;
    return;
  }
  // 만든 목록 중에 있으면
  for (let i = 1; i < len; i++) {
    if (res[i].id == key) {
      IS_PARTICIPATE = true;
      return;
    }
  }
}

function handlerParticipate() {
  fetch("/participate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: key,
    }),
  })
    .then(
      (res) => window.location.reload(),
      (rej) => console.log(rej)
    )
    .catch((err) => console.log);
}

function init() {
  showNavbar(body);
  showProductInfo();
  console.log(IS_PARTICIPATE);
  getUserInfo();
}

function removeEvent() {
  const participateBtn = products.querySelector(".participateBtn");
  participateBtn.removeEventListener("click", showInfo);
}
init();
