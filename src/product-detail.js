import { fetchProduct } from "./api/products.js";
import { addToCart, cartIconCount } from "./index.js";

const displayProductDetail = (product) => {
  const proDetailCont = document.getElementById("product-detail-container");
  const proDetailImg = document.createElement("img");
  proDetailImg.src = `../images/${product.image}`;
  const proDetailCaption = document.createElement("div");
  const proDetailTitle = document.createElement("div");
  proDetailTitle.textContent = `عنوان محصول : ${product.name}`;
  proDetailCaption.appendChild(proDetailTitle);
  proDetailCaption.className = "products-detail-caption";
  const proDetailPrice = document.createElement("span");
  proDetailPrice.textContent = `قیمت محصول : ${product.price} تومان `;
  proDetailCaption.appendChild(proDetailPrice);
  const productDetailBtn = document.createElement("button");
  productDetailBtn.type = "button";
  productDetailBtn.id = "btn";
  productDetailBtn.textContent = "افزودن به سبد خرید";
  const buttonIcon = document.createElement("i");
  buttonIcon.classList.add("fa", "fa-shopping-cart");
  productDetailBtn.appendChild(buttonIcon);
  proDetailCaption.appendChild(productDetailBtn);
  productDetailBtn.onclick = () => addToCart(product);
  const proDetailDesc = document.createElement("div");
  proDetailDesc.textContent = `توضیحات تکمیلی : ${product.desc}`;
  proDetailDesc.className = "product-detail-desc";

  proDetailCont.appendChild(proDetailImg);
  proDetailCont.appendChild(proDetailCaption);
  proDetailCont.appendChild(proDetailDesc);
};

function displayCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    const len = cart.length;
    cartIconCount.classList.add("cart-icon-count");
    cartIconCount.textContent = cart[len - 1].cartCount;
  }
}

async function render() {
  displayCartCount();
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const product = await fetchProduct(productItem[0].id);
  displayProductDetail(product);
}

render();

export { displayCartCount };
