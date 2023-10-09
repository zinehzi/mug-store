// import { connectToCluster, URI } from "./mongo.js";

// async function loadProducts() {
//   let mongoClient;

//   try {
//     mongoClient = await connectToCluster(URI);
//     const db = mongoClient.db("store");
//     const collection = db.collection("products");
//     const products = await collection.find({}).toArray();
//     displayProducts(products);
//   } catch (error) {
//     console.error("error", error);
//   }
// }

function displayProducts(products) {
    console.log(products);
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
    productCaption.appendChild(productTitle);
    productCaption.appendChild(productPrice);
    productDiv.appendChild(productImg);
    productDiv.appendChild(productCaption);
    productList.appendChild(productDiv);
  }
}

async function render() {
  loadProducts();
}

render();
