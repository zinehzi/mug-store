const url = "http://localhost:3000/";

const fetchProducts = async () => {
  const products = await fetch(url);
  console.log(products);
};
