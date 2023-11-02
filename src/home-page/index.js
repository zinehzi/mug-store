import { fetchProducts } from "../api/products.js";
import { replaceNumWithComma } from "../utils/global.js";

let products = [];
let productItem = [];
let cart;
let count = 0;
let searchedProducts = [];
const filters = {
  name: null,
  price: null,
  style: null,
};

const productList = document.getElementById("product-list");
const cartIcon = document.getElementById("cart-icon-container");
const cartIconCount = document.getElementById("cart-icon-count");
const searchInput = document.getElementById("search-input");
const rangeInput = document.getElementById("range-input");
const showRange = document.getElementById("show-range");
const radioInputs = document.querySelectorAll("input[name='option']");
const userMenu = document.getElementById("user-menu");
const userPhoto = document.getElementById("user-photo");

/*Display Product List*/

const displayProducts = (products, filters) => {
  for (let x in filters) {
    if (typeof filters[x] === "string") {
      searchedProducts = products.filter((product) =>
        product[x].includes(filters[x])
      );
      products = searchedProducts;
    } else if (typeof filters[x] === "number") {
      searchedProducts = products.filter(
        (product) => product.price <= filters[x]
      );
      products = searchedProducts;
    }
  }

  if (productList) {
    productList.innerHTML = "";
  }
  for (let product of products) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    const productImg = document.createElement("Img");
    productImg.src = `../../images/${product.image}`;
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
    if (productList) {
      productList.appendChild(productDiv);
    }
  }
};

/*Display Product Detail*/

function clickToProductDetail(product) {
  productItem = [];
  window.location.href = "/src/product-detail/product-detail.html";
  productItem.push({
    id: product._id,
  });
  localStorage.setItem("productItem", JSON.stringify(productItem));
}

/*Add Products to Cart*/

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

/*Display Shopping Cart Count*/

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

/*Go To Shopping Cart Page*/

cartIcon.addEventListener("click", () => {
  window.location.href = "/src/shopping-cart/shopping-cart.html";
});

/*Search and Filter Section*/

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchInputValue = searchInput.value;
    filters.name = searchInputValue;
    displayProducts(products, filters);
  });
}

if (rangeInput) {
  rangeInput.addEventListener("input", () => {
    const rangeInputValue = Number(rangeInput.value);
    filters.price = rangeInputValue;
    updateFilterRange(rangeInputValue);
    displayProducts(products, filters);
  });
}

function updateFilterRange(value) {
  const showValue = document.createElement("span");
  const rangeWidth = rangeInput.clientWidth;
  const thumbWidth = 530;
  const position =
    ((filters.price - rangeInput.min) / (rangeInput.max - rangeInput.min)) *
    (rangeWidth - thumbWidth);
  showRange.style.left = position + "px";
  showValue.textContent = replaceNumWithComma(value);
  showRange.innerHTML = "";
  showRange.appendChild(showValue);
}

for (let item of radioInputs) {
  item.addEventListener("input", () => {
    if (item.checked) {
      filters.style = item.value;
      displayProducts(products, filters);
    }
  });
}

/*Display User Menu*/

userPhoto.addEventListener("click", displayMenu);

function displayMenu() {
  userMenu.classList.toggle("active");
}

function displayUserName() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = JSON.parse(localStorage.getItem("username"));
  const userName = document.getElementById("user-name");

  if (!user || user.length === 0) {
    userName.textContent = "وارد شوید";
    userName.onclick = () => {
      window.location.href = "/src/login/login.html";
    };
    userName.style.cursor = "pointer";
    userPhoto.removeEventListener("click", displayMenu);
  } else {
    const userItem = user.find((item) => item.username === username);
    userName.textContent = userItem.name + " " + userItem.family;
  }
}

async function render() {
  products = await fetchProducts();
  displayUserName();
  displayCartCount();
  displayProducts(products, null);
}

render();

export { addToCart, clickToProductDetail, displayCartCount, cartIcon };
