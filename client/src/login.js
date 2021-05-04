const userId = document.querySelector(".user__id");
const userPwd = document.querySelector(".user__pwd");
const login = document.querySelector(".login");
const navbar = document.querySelector(".navbar");

navbar.innerHTML =
  '<div class="fixnav"><div class="left"><a href="mainpage.html"><h1 class="title__banner">Togetor</h1></a></div><div class="center"><span id="see">상품 보기</span></a><a href="productpage.html"><span>상품 등록</span></a><a href="mainpage.html"><span>마이 페이지</span></a></div><div class="right"><a href="login.html"><span>Sign up</span></a></div></div>';

console.log(login);

login.addEventListener("mouseover", loginG);

function loginG(e) {
  console.log(userId.value, userPwd.value);
}
