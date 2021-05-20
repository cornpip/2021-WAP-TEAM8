import { ProductInformation } from "./productinfo.js";

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
                    <a href="${rightUrl}" id="left"><span>${rightInnerText}</span></a>
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

export function insertInfo(informationJson, products) {
  informationJson.map((information, index) => {
    const product = new ProductInformation(information);
    product.attachTo(products, product.insertToHTMl());
    product.element
      .querySelector(".participateBtn")
      .addEventListener("click", function () {
        console.log(information);
        product.participateTo(product.element.querySelector(".participant"));
        information.participant++;
      });
  });
}
