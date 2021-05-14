export function Navbar(parent, isSuccess) {
  let url = "/login";
  let innerText = "Sing in";
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

export function Auth(parent) {
  fetch("/auth", {
    method: "post",
  })
    .then((res) => res.json())
    .then((res) => Navbar(parent, true))
    .catch((err) => Navbar(parent, false));
}
