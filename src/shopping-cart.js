import { displayCartCount } from "./product-detail.js";
import { clickToProductDetail } from "./index.js";

const cartList = document.getElementById("cart-list");

const displayCartList = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  for (let item of cart) {
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
    const cartCount = document.createElement("span");
    cartCount.textContent = `${item.quantity}`;
    const cartPlus = document.createElement("i");
    cartPlus.classList.add("fa", "fa-plus");

    cartCountDiv.appendChild(cartMinus);
    cartCountDiv.appendChild(cartCount);
    cartCountDiv.appendChild(cartPlus);
    cartTdCount.appendChild(cartCountDiv);

    const cartTdPrice = document.createElement("td");
    const cartPrice = document.createElement("span");
    cartPrice.textContent = `${item.price} تومان `;
    cartTdPrice.appendChild(cartPrice);

    const cartTdTotalPrice = document.createElement("td");
    const cartTotalPrice = document.createElement("span");
    cartTotalPrice.textContent = `${item.price} تومان `;
    cartTdTotalPrice.appendChild(cartTotalPrice);

    const cartTdTrash = document.createElement("td");
    const cartTrash = document.createElement("i");
    cartTrash.classList.add("fa", "fa-trash");
    cartTdTrash.appendChild(cartTrash);

    cartTr.appendChild(cartTdImg);
    cartTr.appendChild(cartTdTitle);
    cartTr.appendChild(cartTdCount);
    cartTr.appendChild(cartTdPrice);
    cartTr.appendChild(cartTdTotalPrice);
    cartTr.appendChild(cartTdTrash);

    cartList.appendChild(cartTr);
  }
};

function render() {
  displayCartCount();
  displayCartList();
}

render();
