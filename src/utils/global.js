function replaceNumWithComma(number) {
  let priceWithComma =
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " " + "تومان";
  return priceWithComma;
}

export { replaceNumWithComma };
