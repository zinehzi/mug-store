import { fetchProducts } from "./api/products.js";
import { replaceNumWithComma } from "./global.js";

let cart;
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
    productPrice.textContent = replaceNumWithComma(product.price);
    const productBtn = document.createElement("button");
    productBtn.type = "button";
    productBtn.className = "btn";
    productBtn.textContent = "افزودن به سبد خرید";
    const buttonIcon = document.createElement("i");
    buttonIcon.classList.add("fa", "fa-shopping-cart");
    productBtn.appendChild(buttonIcon);
    productBtn.onclick = () => addToCart(product);

    productCaption.append(productTitle, productPrice);
    productDiv.append(productImg, productCaption, productBtn);
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
  } else {
    const cartItem = cart.find((cartItem) => cartItem._id === product._id);
    cartItem.quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartCount();
}

cartIcon.addEventListener("click", () => {
  window.location.href = "/src/shopping-cart.html";
});

function displayCartCount() {
  const cartStorage = JSON.parse(localStorage.getItem("cart"));
  if (!cartStorage || cartStorage.length === 0) {
    cart = [];
    cartIconCount.textContent = "";
    cartIconCount.classList.remove("cart-icon-count");
  } else {
    cart = cartStorage;
    let cartCount = 0;
    for (let item of cart) {
      cartCount += item.quantity;
    }
    cartIconCount.textContent = cartCount;
    cartIconCount.classList.add("cart-icon-count");
  }
}

async function render() {
  displayCartCount();
  const products = await fetchProducts();
  displayProducts(products);
}

render();
export { addToCart, clickToProductDetail, displayCartCount, cartIcon };
