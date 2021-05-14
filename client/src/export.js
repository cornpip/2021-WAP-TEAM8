import { ProductInformation } from "./productinfo.js";

export function Navbar(parent, isSuccess) {
  let url = "/login";
  let innerText = "Sing in";
  console.log(parent, isSuccess);
  if (isSuccess) {
    url = "/mypage";
    innerText = "My page";
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
                        <a href="${url}"><span>${innerText}</span></a>
                    </div>
                </div>`;

  const element = document.createElement("nav");
  element.setAttribute("class", "navbar");
  element.innerHTML = navbar;
  parent.insertAdjacentElement("afterbegin", element);
}

export async function Auth() {
  console.log("auth에요..");
  let res = await fetch("/auth", { method: "post" })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  if (res) return true;
  else return false;
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
