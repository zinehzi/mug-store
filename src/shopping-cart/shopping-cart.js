import { clickToProductDetail, displayCartCount } from "../home-page/index.js";
import { replaceNumWithComma } from "../utils/global.js";

const cartList = document.getElementById("cart-list");
const cartCalcBox = document.getElementById("cart-calc");
const cartBtn = document.getElementById("cart-btn");

const displayCartList = () => {
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  if (!cartStorage || cartStorage.length === 0) {
    showEmptyMessage();
  } else {
    let cartFinalPrice = 0;
    for (let item of cartStorage) {
      const cartTr = document.createElement("tr");

      const cartTdImg = document.createElement("td");
      const cartImg = document.createElement("img");
      cartImg.src = `../../images/${item.image}`;
      cartTdImg.appendChild(cartImg);
      cartImg.onclick = () => clickToProductDetail(item);

      const cartTdTitle = document.createElement("td");
      const cartTitle = document.createElement("span");
      cartTitle.textContent = `${item.name}`;
      cartTdTitle.appendChild(cartTitle);

      const cartTdCount = document.createElement("td");
      const cartCountDiv = document.createElement("div");
      cartCountDiv.classList = "cart-count-div";
      const cartMinus = document.createElement("i");
      cartMinus.classList.add("fa", "fa-minus");
      cartMinus.onclick = () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
          setToLocalStorage(cartStorage);
        } else {
          removeFromCart(cartStorage, item);
        }
      };

      const cartCount = document.createElement("span");
      cartCount.textContent = `${item.quantity}`;
      const cartPlus = document.createElement("i");
      cartPlus.classList.add("fa", "fa-plus");
      cartPlus.onclick = () => {
        item.quantity += 1;
        setToLocalStorage(cartStorage);
      };

      cartCountDiv.append(cartMinus, cartCount, cartPlus);
      cartTdCount.appendChild(cartCountDiv);

      const cartTdPrice = document.createElement("td");
      const cartPrice = document.createElement("span");
      cartPrice.textContent = replaceNumWithComma(item.price);
      cartTdPrice.appendChild(cartPrice);

      const cartTdTotalPrice = document.createElement("td");
      const cartTotalPrice = document.createElement("span");
      const totalPrice = item.price * item.quantity;
      cartTotalPrice.textContent = replaceNumWithComma(totalPrice);
      cartTdTotalPrice.appendChild(cartTotalPrice);

      const cartTdTrash = document.createElement("td");
      const cartTrash = document.createElement("i");
      cartTrash.classList.add("fa", "fa-trash");
      cartTrash.onclick = () => removeFromCart(cartStorage, item);

      cartTdTrash.appendChild(cartTrash);

      cartTr.append(
        cartTdImg,
        cartTdTitle,
        cartTdCount,
        cartTdPrice,
        cartTdTotalPrice,
        cartTdTrash
      );
      cartList.appendChild(cartTr);

      cartCalcBox.classList.add("active");
      cartBtn.classList.add("active");
      cartBtn.onclick = () => {
        window.location.href = "/src/delivery/delivery.html";
      };

      cartFinalPrice += totalPrice;
      const firstElem = cartCalcBox.firstElementChild.lastElementChild;
      firstElem.textContent = replaceNumWithComma(cartFinalPrice);
      const lastElem = cartCalcBox.lastElementChild.lastElementChild;
      const cartPaidPrice = Math.round((cartFinalPrice + 30000) * 1.09);
      lastElem.textContent = replaceNumWithComma(cartPaidPrice);
      localStorage.setItem("final-price",JSON.stringify(cartPaidPrice));
    }
  }
};

function removeFromCart(cartStorage, item) {
  const itemId = item._id;
  let newCart = cartStorage.filter((item) => item._id !== itemId);
  cartStorage = newCart;
  setToLocalStorage(cartStorage);
  if (!cartStorage || cartStorage.length === 0) {
    cartCalcBox.classList.remove("active");
    cartBtn.classList.remove("active");
  }
}

function setToLocalStorage(cartStorage) {
  localStorage.setItem("cart", JSON.stringify(cartStorage));
  cartList.innerHTML = "";
  render();
}

function showEmptyMessage() {
  const cartTr = document.createElement("tr");
  cartTr.classList.add("empty-cart");
  const cartTd = document.createElement("td");
  cartTd.colSpan = "10";
  cartTd.textContent = "سبد خرید شما خالی است.";
  cartTr.appendChild(cartTd);
  cartList.appendChild(cartTr);
}

function render() {
  displayCartCount();
  displayCartList();
}

render();
