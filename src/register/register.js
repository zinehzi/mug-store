const user = JSON.parse(localStorage.getItem("user"));
const registerBtn = document.getElementById("register-btn");
const msgBtn = document.getElementById("msg-btn");
const rememberBtn = document.getElementById("remember-btn");
const userName = document.getElementById("username");
const passWord = document.getElementById("password");
const msgContainer = document.getElementById("message-container");
const textMsg = document.getElementById("text-message");
let account;

function getRegisterInfo() {
  const usernameValue = userName.value;
  const passwordValue = passWord.value;

  if (!user || user.length === 0) {
    account = [];
    if (usernameValue !== "" && passwordValue !== "") {
      account.push({
        username: usernameValue,
        password: passwordValue,
      });
      localStorage.setItem("user", JSON.stringify(account));
      textMsg.textContent = "کاربر گرامی، حساب کاربری شما ایجاد شد.";
      const msgIcon = document.createElement("i");
      msgIcon.classList.add("fa", "fa-check-circle");
      textMsg.appendChild(msgIcon);
      msgContainer.classList.add("active");
    }
  } else {
    account = user;
    if (usernameValue !== "" && passwordValue !== "") {
      if (!account.find((item) => item.username === usernameValue)) {
        account.push({
          username: usernameValue,
          password: passwordValue,
        });
        localStorage.setItem("user", JSON.stringify(account));
        textMsg.textContent = "کاربر گرامی، حساب کاربری شما ایجاد شد.";
        const msgIcon = document.createElement("i");
        msgIcon.classList.add("fa", "fa-check-circle");
        textMsg.appendChild(msgIcon);
        msgContainer.classList.add("active");
      } else {
        textMsg.textContent = "شما قبلا با این حساب کاربری ثبت نام کرده اید.";
        const msgIcon = document.createElement("i");
        msgIcon.classList.add("fa", "fa-warning");
        msgIcon.style.color = "red";
        textMsg.appendChild(msgIcon);
        msgContainer.classList.add("active");
      }
    }
  }

  localStorage.setItem("user", JSON.stringify(account));

  msgBtn.onclick = () => {
    window.location.href = "/src/login/index.html";
  };
}

if (registerBtn) {
  registerBtn.addEventListener("click", getRegisterInfo);
}
