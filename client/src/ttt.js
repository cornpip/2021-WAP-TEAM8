import { Locate } from "./export.js";

const locates = document.querySelector(".locates"),
  go = document.querySelector(".locates-go");

function init() {
  const ar = location.search.replace("?area=", "");
  ar ? console.log(decodeURI(ar)) : console.log("no");
  const result = hi2();
  result
    .then((res) => res.json())
    .then((res) => insertLocate(res, true))
    .catch((err) => console.log(err));

  const result2 = hi(decodeURI(ar));
  console.log(result2);
  result2
    .then(
      (res) => res.json(),
      (rej) => console.log(rej)
    )
    .then(
      (datas) => insertLocate(datas),
      (rej) => console.log(rej)
    )
    .catch((err) => console.log(err));
}

function insertLocate(datas, isArea = false) {
  datas.map((data) => {
    const locate = new Locate(isArea ? data.area : data);
    locate.insertToHTML;
    locate.attachTo(isArea ? locates : go, locate.insertToHTML());
  });
}

async function hi2() {
  const info = await fetch("/slocate", {
    method: "post",
  });
  return info;
}

async function hi(where) {
  const information = await fetch("/olocate", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first: where,
      second: "",
    }),
  });
  return information;
}

init();
