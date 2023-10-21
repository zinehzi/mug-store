import { clickToProductDetail, displayCartCount } from "./index.js";
import { replaceNumWithComma } from "./global.js";

const cartList = document.getElementById("cart-list");
const emptyCartText = document.getElementById("empty-cart");
const cartCalcBox = document.getElementById("cart-calc");

const displayCartList = () => {
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  if (!cartStorage || cartStorage.length === 0) {
    emptyCartText.classList.add("active");
  } else {
    for (let item of cartStorage) {
      const cartTr = document.createElement("tr");

      const cartTdImg = document.createElement("td");
      const cartImg = document.createElement("img");
      cartImg.src = `../images/${item.image}`;
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
          localStorage.setItem("cart", JSON.stringify(cartStorage));
          cartList.innerHTML = "";
          render();
        } else {
          removeFromCart(item, cartStorage);
        }
      };

      const cartCount = document.createElement("span");
      cartCount.textContent = `${item.quantity}`;
      const cartPlus = document.createElement("i");
      cartPlus.classList.add("fa", "fa-plus");
      cartPlus.onclick = () => {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cartStorage));
        cartList.innerHTML = "";
        render();
      };

      cartCountDiv.appendChild(cartMinus);
      cartCountDiv.appendChild(cartCount);
      cartCountDiv.appendChild(cartPlus);
      cartTdCount.appendChild(cartCountDiv);

      const cartTdPrice = document.createElement("td");
      const cartPrice = document.createElement("span");
      cartPrice.textContent = replaceNumWithComma(item.price);
      cartTdPrice.appendChild(cartPrice);

      const cartTdTotalPrice = document.createElement("td");
      const cartTotalPrice = document.createElement("span");
      cartTotalPrice.textContent = replaceNumWithComma(
        item.price * item.quantity
      );
      cartTdTotalPrice.appendChild(cartTotalPrice);

      const cartTdTrash = document.createElement("td");
      const cartTrash = document.createElement("i");
      cartTrash.classList.add("fa", "fa-trash");
      cartTrash.onclick = () => removeFromCart(cartStorage, item);

      cartTdTrash.appendChild(cartTrash);

      cartTr.appendChild(cartTdImg);
      cartTr.appendChild(cartTdTitle);
      cartTr.appendChild(cartTdCount);
      cartTr.appendChild(cartTdPrice);
      cartTr.appendChild(cartTdTotalPrice);
      cartTr.appendChild(cartTdTrash);

      cartList.appendChild(cartTr);

      cartCalcBox.classList.add("active");
    }
  }
};

function removeFromCart(cartStorage, item) {
  const itemId = item._id;
  let newCart = cartStorage.filter((item) => item._id !== itemId);
  cartStorage = newCart;
  localStorage.setItem("cart", JSON.stringify(cartStorage));
  cartList.innerHTML = "";
  render();
}

function render() {
  displayCartCount();
  displayCartList();
}

render();
