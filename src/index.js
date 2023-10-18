import { fetchProducts } from "./api/products.js";

let cart;
let cartCount = 0;
let productItem = [];
let count = 0;

const productList = document.getElementById("product-list");
const cartIcon = document.getElementById("cart-icon-container");
const cartIconCount = document.getElementById("cart-icon-count");

const displayProducts = (products) => {
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    const productImg = document.createElement("Img");
    productImg.src = `../images/${product.image}`;
    productImg.onclick = () => clickToProductDetail(product);

    const productCaption = document.createElement("div");
    productCaption.className = "product-caption";
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

function clickToProductDetail(product) {
  productItem = [];
  window.location.href = "/src/product-detail.html";
  productItem.push({
    id: product._id,
  });
  localStorage.setItem("productItem", JSON.stringify(productItem));
}

function addToCart(product) {
  if (!cart.find((cartId) => cartId._id === product._id)) {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: count + 1,
    });
    cartCount += 1;
  } else {
    const cartItem = cart.find((cartItem) => cartItem._id === product._id);
    cartItem.quantity += 1;
    cartCount += 1;
  }
  const len = cart.length;
  const lastItem = cart[len - 1];
  lastItem.cartCount = cartCount;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartCount();
}

cartIcon.addEventListener("click", () => {
  window.location.href = "/src/shopping-cart.html";
});

function displayCartCount() {
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  if (!cartStorage) {
    cart = [];
  } else {
    cart = cartStorage;
    const len = cart.length;
    const lastItemCount = cart[len - 1].cartCount;
    cartIconCount.classList.add("cart-icon-count");
    cartIconCount.textContent = lastItemCount;
    cartCount = lastItemCount;
  }
}

async function render() {
  displayCartCount();
  const products = await fetchProducts();
  displayProducts(products);
}

render();

export { addToCart, clickToProductDetail, displayCartCount };
