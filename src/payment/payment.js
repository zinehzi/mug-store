import { showMessage, msgBtn } from "../register/register.js";
import { replaceNumWithComma } from "../utils/global.js";

let cartStorage = JSON.parse(localStorage.getItem("cart"));
const confirmBtn = document.getElementById("confirm");
const cancelBtn = document.getElementById("cancel");
const finalPrice = document.getElementById("payment-price");
const reciever = document.getElementById("reciever");
let txt = "";
let icon = "";

/* Confirm Payment Process*/

confirmBtn.onclick = () => {
  txt = "عملیات پرداخت با موفقیت انجام شد.";
  icon = "fa-check-circle";
  showMessage(txt, icon);
  msgBtn.onclick = () => {
    window.location.href = "/src/home-page/index.html";
  };
  localStorage.removeItem("cart");
};

/*Reject Payment Process*/

cancelBtn.onclick = () => {
  txt = "عملیات پرداخت ناموفق بود.";
  icon = "fa-warning";
  showMessage(txt, icon);
  msgBtn.onclick = () => {
    window.location.href = "/src/home-page/index.html";
  };
};

/*Get Reciever Info*/

function showRecieverName() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = JSON.parse(localStorage.getItem("username"));
  const userItem = user.find((item) => item.username === username);
  reciever.textContent = userItem.name + " " + userItem.family;
}

/*Get Final Price To Pay*/

function showFinalPrice() {
  const finalPriceStorage = JSON.parse(localStorage.getItem("final-price"));
  finalPrice.textContent = replaceNumWithComma(finalPriceStorage);
}

function render() {
  showRecieverName();
  showFinalPrice();
}

render();
