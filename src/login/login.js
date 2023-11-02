import { showMessage, msgBtn } from "../register/register.js";
let user = JSON.parse(localStorage.getItem("user"));
const loginBtn = document.getElementById("login-btn");
const loginUserName = document.getElementById("login-username");
const loginPass = document.getElementById("login-pass");

/*Check User Account For Login*/

function checkUserAccount() {
  let txt = "";
  let icon = "";
  const loginUserNameValue = loginUserName.value;
  const loginPassValue = loginPass.value;

  if (!user || user.length === 0) {
    user = [];
    txt = "کاربری با مشخصات وارد شده وجود ندارد.";
    icon = "fa-warning";
    showMessage(txt, icon);
  } else {
    for (let item of user) {
      if (loginUserNameValue !== "" && loginPassValue !== "") {
        if (
          loginUserNameValue === item.username &&
          loginPassValue === item.password
        ) {
          localStorage.setItem("username", JSON.stringify(loginUserNameValue));
          window.location.href = "/src/home-page/index.html";
        } else {
          txt = "کاربری با مشخصات وارد شده وجود ندارد.";
          icon = "fa-warning";
          showMessage(txt, icon);
        }
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
