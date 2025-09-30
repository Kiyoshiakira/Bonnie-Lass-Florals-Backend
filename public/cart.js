<<<<<<< HEAD
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const cart = getCart();
  const countElem = document.getElementById('cart-count');
  if (countElem) countElem.textContent = cart.length;
}
=======
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}
function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  const cart = getCart();
  const countElem = document.getElementById('cart-count');
  if (countElem) countElem.textContent = cart.length;
}
>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
document.addEventListener('DOMContentLoaded', updateCartCount);