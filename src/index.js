import { fetchProducts } from "./api/products.js";

async function displayProducts(products) {
  const productList = document.getElementById("product-list");
  for (let product of products) {
    const productDiv = document.createElement("Div");
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
    productBtn.textContent = "افزودن به سبد خرید";
    productCaption.appendChild(productTitle);
    productCaption.appendChild(productPrice);
    productDiv.appendChild(productImg);
    productDiv.appendChild(productCaption);
    productDiv.appendChild(productBtn);
    productList.appendChild(productDiv);
  }
}

async function render() {
  const products = await fetchProducts();
  displayProducts(products);
}

render();
