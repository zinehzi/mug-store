import { cartIcon } from "../home-page/index.js";

let listAddress;
const form = document.getElementById("address-form");
const formBtn = document.getElementById("address-form-btn");
const formBtnClose = document.getElementById("address-form-btn-container");
const addressList = document.getElementById("address-list");
const addressBtn = document.getElementById("address-btn");
const deliveryBtn = document.getElementById("delivery-btn");

function submitAddressInfo() {
  let addressStorage = JSON.parse(localStorage.getItem("address"));

  if (!addressStorage || addressStorage.length === 0) {
    listAddress = [];
  } else {
    listAddress = addressStorage;
  }

  let myuuid = Math.floor(Math.random() * 100);
  const addressTitleValue = document.getElementById("address-title").value;
  const addressGetterValue = document.getElementById("address-getter").value;
  const mobileGetterValue = document.getElementById("mobile-getter").value;
  const addressStateValue = document.getElementById("address-state").value;
  const addressCityValue = document.getElementById("address-city").value;
  const fullAddressValue = document.getElementById("full-address").value;
  const addressPostalValue = document.getElementById("address-postal").value;
  const defaultAddressValue = document.getElementById("default-address");

  function defaultAddress() {
    if (defaultAddressValue.checked) {
      return true;
    }
    return false;
  }

  listAddress.push({
    id: myuuid,
    title: addressTitleValue,
    getter: addressGetterValue,
    state: addressStateValue,
    default: defaultAddress(),
  });

  setToLocalStorage(listAddress);
  form.classList.remove("active");
  form.reset();

  if (listAddress) {
    deliveryBtn.classList.add("active");
  }
}

formBtn.addEventListener("click", submitAddressInfo);
addressBtn.addEventListener("click", displayAddressForm);
formBtnClose.addEventListener("click", () => {
  form.classList.remove("active");
  form.reset();
});

function displayAddressForm() {
  form.classList.add("active");
}

function displayAddedAddress() {
  let addressStorage = JSON.parse(localStorage.getItem("address"));

  if (!addressStorage || addressStorage.length === 0) {
    displayAddressForm();
  } else {
    listAddress = addressStorage;
    for (let address of listAddress) {
      const addressDiv = document.createElement("div");
      addressDiv.className = "address-item";

      const addressTitleDiv = document.createElement("div");
      const addressTitleLabel = document.createElement("label");
      addressTitleLabel.textContent = "عنوان آدرس :";
      const addressTitleSpan = document.createElement("span");
      addressTitleSpan.textContent = `${address.title}`;
      addressTitleDiv.append(addressTitleLabel, addressTitleSpan);

      const addressGetterDiv = document.createElement("div");
      const addressGetterLabel = document.createElement("label");
      addressGetterLabel.textContent = "تحویل گیرنده :";
      const addressGetterSpan = document.createElement("span");
      addressGetterSpan.textContent = `${address.getter}`;
      addressGetterDiv.append(addressGetterLabel, addressGetterSpan);

      const addressStateDiv = document.createElement("div");
      const addressStateLabel = document.createElement("label");
      addressStateLabel.textContent = "استان :";
      const addressStateSpan = document.createElement("span");
      addressStateSpan.textContent = `${address.state}`;
      addressStateDiv.append(addressStateLabel, addressStateSpan);

      const defaultAddress = document.createElement("i");
      if (address.default) {
        defaultAddress.classList.add("fa", "fa-check-circle");
      }

      const addressTrash = document.createElement("i");
      addressTrash.classList.add("fa", "fa-trash");
      addressTrash.onclick = () => removeFromAddressList(listAddress, address);

      addressDiv.append(
        addressTitleDiv,
        addressGetterDiv,
        addressStateDiv,
        defaultAddress,
        addressTrash
      );

      addressList.appendChild(addressDiv);
    }
    deliveryBtn.classList.add("active");
  }
}

const productContainer = document.getElementById("check-product-container");

function displayAddedProduct() {
  let cartStorage = JSON.parse(localStorage.getItem("cart"));
  for (let item of cartStorage) {
    const productDiv = document.createElement("div");

    const productImg = document.createElement("img");
    productImg.src = `../../images/${item.image}`;

    const productTitle = document.createElement("span");
    productTitle.textContent = `${item.name}`;

    const productCount = document.createElement("span");
    productCount.textContent = `(${item.quantity} عدد)`;

    productDiv.append(productImg, productTitle, productCount);
    productContainer.appendChild(productDiv);
  }
}

function removeFromAddressList(listAddress, address) {
  const addressId = address.id;
  let newListAddress = listAddress.filter((item) => item.id !== addressId);
  listAddress = newListAddress;
  setToLocalStorage(listAddress);
  if (!listAddress || listAddress.length === 0) {
    deliveryBtn.classList.remove("active");
  }
}

function setToLocalStorage(listAddress) {
  localStorage.setItem("address", JSON.stringify(listAddress));
  addressList.innerHTML = "";
  displayAddedAddress();
}

deliveryBtn.addEventListener("click", () => {
  window.location.href = "../../src/payment/payment.html";
});

function render() {
  displayAddedAddress();
  displayAddedProduct();
}

render();
