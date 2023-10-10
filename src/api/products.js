const url = "http://localhost:3000";

const fetchProducts = async () => {
  const res = await fetch(`${url}/products`);
  const data = await res.json();
  return data;
};

export {fetchProducts};