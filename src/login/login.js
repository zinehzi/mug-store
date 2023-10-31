const user = JSON.parse(localStorage.getItem("user"));
const loginBtn = document.getElementById("login-btn");
const loginUserName = document.getElementById("login-username");
const loginPass = document.getElementById("login-pass");

function checkUserAccount() {
  for (let item of user) {
    if (loginUserName.value !== "" && loginPass.value !== "") {
      if (
        loginUserName.value === item.username &&
        loginPass.value === item.password
      ) {
        window.location.href = "/src/home-page/home-page.html";
      }
    }
  }
}

if (loginBtn) {
  loginBtn.addEventListener("click", checkUserAccount);
}
