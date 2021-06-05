import { showNavbar, Auth } from "./export.js";

const body = document.querySelector("body");

function checkUser() {
  const user = body.querySelector(".user");
  const noUser = body.querySelector(".no_user");
  Auth()
    .then(
      (res) => {
        noUser.classList.add("hidden"), user.classList.remove("hidden");
      },
      (rej) => {
        noUser.classList.remove("hidden"), user.classList.add("hidden");
      }
    )
    .catch((err) => console.log(err));
}

function init() {
  showNavbar(body);
  checkUser();
}
init();
