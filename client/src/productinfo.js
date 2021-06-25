import { showNavbar, insertInfo, showInfo } from "./export.js";

const body = document.querySelector("body"),
  products = body.querySelector(".products");

// console.log(button);

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
    const json = JSON.parse(e.data);

    if (json.type === "newPeople") {
      // 새로운 사람 입장시
      if (!json.newChater) return;
      const data = `${json.newChater}님이 입장했습니다.`;
      const text = makeElement("p", "enter", data);
      log.append(text);
      return;
    }

    if (json.type === "beforechat") {
      let a = json.data.length;
      for (let i = 0; i < a; i++) {
        console.log(json.data);
        const msg = json.data[i].chatting;
        let className = "msg";
        let data = `익명${json.data[i].participant[5]}: ${json.data[i].chatting}`;
        if (msg == "님이 입장했습니다") {
          className = "enter";
          data = `익명${json.data[i].participant[5]}${json.data[i].chatting}.`;
        }
        const text = makeElement("p", className, data);
        log.append(text);
      }
      return;
    }
    const data = `${json.name}: ${json.data}`;
    const text = makeElement("p", "msg", data);
    log.append(text);
  };
}

function makeElement(tagName, className, data) {
  const element = document.createElement(tagName);
  element.setAttribute("class", className);
  element.innerText = data;
  return element;
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
  getUserInfo();
}

init();
