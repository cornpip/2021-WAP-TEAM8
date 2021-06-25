import { showNavbar, insertInfo, showInfo } from "./export.js";

const body = document.querySelector("body"),
  products = body.querySelector(".products");

// console.log(button);

const image = Array(products.getElementsByTagName("img"));
console.log(image.style);

const key = location.search.replace("?key=", "");
let IS_PARTICIPATE = false;
let USER_ID;

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
        checkParticipate(res), changeButton(), changeChatMode();
      },
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

function changeChatMode() {
  const chatYes = document.querySelector(".chat-yes");
  const chatNo = document.querySelector(".chat-no");
  console.log(USER_ID);
  if (IS_PARTICIPATE) {
    chatNo.style.display = "none";
    chatYes.style.display = "inline";
    chatOn();
  }
}

/* 참가 여부에 따라 버튼 바뀜 */
function changeButton() {
  const button = products.querySelector(".participateBtn");
  if (IS_PARTICIPATE) {
    button.value = "참가중";
  } else {
    button.addEventListener("click", () => handlerParticipate());
  }
}

function chatOn() {
  const portNum = 8000 + parseInt(key); //포트번호: 8000 + product.id
  const sock = new WebSocket(`ws://localhost:${portNum}`); // 여기 포트번호 상품id + 8000으로
  const log = document.getElementById("log");
  const productid = parseInt(key);
  // 최초접근
  sock.onopen = () => {
    sock.send(
      JSON.stringify({
        type: "firstinfo",
        userid: USER_ID,
        productid,
      })
    );
  };
  // 1.보내면
  document.querySelector("button").onclick = () => {
    const text = document.getElementById("text").value;
    // sock.send(text);
    sock.send(
      JSON.stringify({
        type: "message",
        userid: USER_ID,
        productid,
        data: text,
      })
    );
  };
  // 서버에서 보낸거 받기
  sock.onmessage = (e) => {
    console.log(e);
    const json = JSON.parse(e.data);

    if (json.type === "newPeople") {
      // 새로운 사람 입장시
      if (!json.newChater) return;
      log.innerHTML += "<p>" + json.newChater + "님이 입장했습니다.</p>";
      return;
    }

    if (json.type === "beforechat") {
      console.log(json.data);
      let a = json.data.length;
      for (let i = 0; i < a; i++) {
        log.innerHTML +=
          "<p>" +
          "익명" +
          json.data[i].participant[5] +
          ":" +
          json.data[i].chatting; //json.data[i].chattime;
      }
      return;
    }
    log.innerHTML += "<p>" + json.name + ":" + json.data;
  };
}

/* 현재 참가중인 상품인지 확인*/
function checkParticipate(res) {
  const len = res.length;
  const inglist = res[0].inglist ? res[0].inglist.split(",") : false;
  USER_ID = res[0].id;
  // 참여중인 목록이 null이 아니고, key값이 있다면
  if (inglist && inglist.includes(`${key}`)) {
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

init();
