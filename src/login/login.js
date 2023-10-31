import { showMessage, msgBtn } from "../register/register.js";
const user = JSON.parse(localStorage.getItem("user"));
const loginBtn = document.getElementById("login-btn");
const loginUserName = document.getElementById("login-username");
const loginPass = document.getElementById("login-pass");

function checkUserAccount() {
  let txt = "";
  let icon = "";

  for (let item of user) {
    if (loginUserName.value !== "" && loginPass.value !== "") {
      if (
        loginUserName.value === item.username &&
        loginPass.value === item.password
      ) {
        window.location.href = "/src/home-page/home-page.html";
      } else {
        txt = "کاربری با مشخصات وارد شده وجود ندارد.";
        icon = "fa-warning";
        showMessage(txt, icon);
      }
    }
  }
  msgBtn.onclick = () => {
    window.location.href = "/src/register/register.html";
  };
}

if (loginBtn) {
  loginBtn.addEventListener("click", checkUserAccount);
}
