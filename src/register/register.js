const user = JSON.parse(localStorage.getItem("user"));
const registerBtn = document.getElementById("register-btn");
const msgBtn = document.querySelector(".msg-btn");
const userName = document.getElementById("username");
const passWord = document.getElementById("password");
const msgContainer = document.querySelector(".message-container");
const textMsg = document.querySelector(".text-message");
let account;

function getRegisterInfo() {
  const usernameValue = userName.value;
  const passwordValue = passWord.value;
  let txt = "";
  let icon = "";

  if (!user || user.length === 0) {
    account = [];
    if (usernameValue !== "" && passwordValue !== "") {
      account.push({
        username: usernameValue,
        password: passwordValue,
      });
      txt = "کاربر گرامی، حساب کاربری شما ایجاد شد.";
      icon = "fa-check-circle";
      showMessage(txt, icon);
    }
  } else {
    account = user;
    if (usernameValue !== "" && passwordValue !== "") {
      if (!account.find((item) => item.username === usernameValue)) {
        account.push({
          username: usernameValue,
          password: passwordValue,
        });
        txt = "کاربر گرامی، حساب کاربری شما ایجاد شد.";
        icon = "fa-check-circle";
        showMessage(txt, icon);
      } else {
        txt = "شما قبلا با این حساب کاربری ثبت نام کرده اید.";
        icon = "fa-warning";
        showMessage(txt, icon);
      }
    }
  }

  localStorage.setItem("user", JSON.stringify(account));

  msgBtn.onclick = () => {
    window.location.href = "/src/login/index.html";
  };
}

function showMessage(txt, icon) {
  textMsg.textContent = txt;
  const msgIcon = document.createElement("i");
  msgIcon.classList.add("fa", icon);
  textMsg.appendChild(msgIcon);
  msgContainer.classList.add("active");
}

if (registerBtn) {
  registerBtn.addEventListener("click", getRegisterInfo);
}

export { showMessage, msgBtn };
