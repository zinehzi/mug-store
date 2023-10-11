import { fetchProducts } from "./api/products.js";

let cart = [];
let count = 0;

const productList = document.getElementById("product-list");
const cartIconCount = document.getElementById("cart-icon-count");

const displayProducts = (products) => {
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    const productImg = document.createElement("Img");
    productImg.src = `../images/${product.image}`;
    const productCaption = document.createElement("div");
    const productTitle = document.createElement("span");
    productTitle.textContent = `${product.name}`;
    const productPrice = document.createElement("span");
    productPrice.textContent = `${product.price} تومان`;
    const productBtn = document.createElement("button");
    productBtn.type = "button";
    productBtn.id = "btn";
    productBtn.textContent = "افزودن به سبد خرید";
    const buttonIcon = document.createElement("i");
    buttonIcon.classList.add("fa", "fa-shopping-cart");
    productBtn.appendChild(buttonIcon);
    productBtn.onclick = () => addToCart(product);
    productCaption.appendChild(productTitle);
    productCaption.appendChild(productPrice);
    productDiv.appendChild(productImg);
    productDiv.appendChild(productCaption);
    productDiv.appendChild(productBtn);
    productList.appendChild(productDiv);
  }
};

let cartCount = 0;

function addToCart(product) {
  if (!cart.find((cartId) => cartId.id === product._id)) {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: count + 1,
    });
    cartIconCount.classList.add("cart-icon-count");
    cartCount += 1;
    cartIconCount.textContent = cartCount;
  } else {
    const cartItem = cart.find((cartItem) => cartItem.id === product._id);
    cartItem.quantity += 1;
    cartIconCount.classList.add("cart-icon-count");
    cartCount += 1;

    cartIconCount.textContent = cartCount;
  }
}

async function render() {
  const products = await fetchProducts();
  displayProducts(products);
}

render();

export {cart};