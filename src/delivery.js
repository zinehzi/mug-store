import { cartIcon } from "./index.js";

let listAddress = [];
const form = document.getElementById("address-form");
const formBtn = document.getElementById("address-form-btn");
const addressList = document.getElementById("address-list");
const addressBtn = document.getElementById("address-btn");

function submitAddressInfo() {
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

  localStorage.setItem("address", JSON.stringify(listAddress));
  addressList.innerHTML = "";
  displayAddedAddress();

  form.reset();
  form.classList.remove("active");
}

formBtn.addEventListener("click", submitAddressInfo);
addressBtn.addEventListener("click", displayAddressForm);

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

      addressDiv.append(
        addressTitleDiv,
        addressGetterDiv,
        addressStateDiv,
        defaultAddress
      );

      addressList.appendChild(addressDiv);
    }
  }
}

function render() {
  displayAddedAddress();
}

render();
