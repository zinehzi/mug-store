import { fetchProduct } from "./api/products.js";
import { addToCart } from "./index.js";

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
  productDetailBtn.className = "btn";
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

async function render() {
  const productItem = JSON.parse(localStorage.getItem("productItem"));
  const product = await fetchProduct(productItem[0].id);
  displayProductDetail(product);
}

render();
