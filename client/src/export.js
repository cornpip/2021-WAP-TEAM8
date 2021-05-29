import { ProductInformation } from "./productinfomation.js";

export function Navbar(parent, isSuccess) {
  let leftUrl = "";
  let leftInnerText = "";

  let rightUrl = "/login";
  let rightInnerText = "Sing in";

  if (isSuccess) {
    leftUrl = "/mypage";
    leftInnerText = "Mypage";

    rightUrl = "/logout";
    rightInnerText = "Logout";
  }

  const navbar = `<div class="fixnav">
                    <div class="left">
                        <a href="/">
                            <h1 class="title__banner">Togetor</h1>
                        </a>
                    </div>
                    <div class="center">
                        <div class="search">검색</div>
                    </div>
                    <div class="right">
                    <a href="${leftUrl}" id="left"><span>${leftInnerText}</span></a>
                    <a href="${rightUrl}" id="right"><span>${rightInnerText}</span></a>
                    </div>
                </div>`;

  const element = document.createElement("nav");
  element.setAttribute("class", "navbar");
  element.innerHTML = navbar;
  parent.insertAdjacentElement("afterbegin", element);
}

export async function Auth() {
  return await (await fetch("/auth", { method: "post" })).json();
}

export function showNavbar(body) {
  Auth()
    .then(
      (res) => {
        Navbar(body, true);
      },
      (rej) => Navbar(body, false)
    )
    .catch((err) => console.log(err));
}

export function insertInfo(informationJson, products, needToPt = false) {
  informationJson.map((information) => {
    console.log(information);
    const product = new ProductInformation(information);

    product.attachTo(products, product.insertToHTMl());

    product.element
      .querySelector(".participateBtn")
      .addEventListener(
        "click",
        needToPt
          ? () =>
              product.participateTo(
                product.element.querySelector(".participant")
              )
          : showInfo
      );
  });
}

export function showInfo(e) {
  let key = e.target.id;
  location.href = "/productinfo?key=" + key;
}

export class Locate {
  constructor(locate) {
    this.locate = locate;
    this.isClick = false;
    this.lhtml = this.makeHTMLElement("div", this.locate);
    this.lhtml.addEventListener;
  }

  get lhtml() {
    return this._lhtml;
  }

  set lhtml(value) {
    this._lhtml = value;
  }

  get isClick() {
    return this._isClick;
  }

  set isClick(value) {
    this._isClick = value;
  }

  makeHTMLElement(tagname, innertext) {
    const html = document.createElement(tagname);
    html.setAttribute("class", "locate");
    if (innertext) html.textContent = innertext;
    return html;
  }

  attachTo(parentNode, locate) {
    parentNode.appendChild(locate);
  }
}
