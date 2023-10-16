const cart = JSON.parse(localStorage.getItem("cart"));
const cartCont = document.getElementById("cart-container");
const cartList = document.getElementById("cart-list");


const displayCartList = (cart) => {
  for (let Item of cart) {
    const cartLink = document.createElement("a");
    cartLink.target = "_blank";
    cartLink.onclick = () => {
      cartLink.href = "/src/product-detail.html";
    };
    const cartItem = document.createElement("li");
    cartLink.appendChild(cartItem);
    const cartImg = document.createElement("img");
    cartImg.src = `../images/${Item.image}`;
    const cartTitle = document.createElement("span");
    cartTitle.textContent = `${Item.name}`;
    const cartPrice = document.createElement("span");
    cartPrice.textContent = `${Item.price} تومان `;

    cartItem.appendChild(cartImg);
    cartItem.appendChild(cartTitle);
    cartItem.appendChild(cartPrice);

    const cartAction = document.createElement("div");
    cartAction.className = "cart-action";
    const cartCount = document.createElement("span");
    cartCount.textContent = `${Item.quantity}`;
    const cartDel = document.createElement("i");
    cartDel.classList.add("fa", "fa-trash");
    cartAction.appendChild(cartCount);
    cartAction.appendChild(cartDel);

    cartList.appendChild(cartLink);
    cartList.appendChild(cartAction);
    cartCont.appendChild(cartList);
  }
};

function render() {
  displayCartList(cart);
}

render();
