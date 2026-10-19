function addToCart(cart, product, quantity) {
  const availableStock = product.stock;
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля.");
  }
  if (quantity > availableStock) {
    throw new RangeError("Недостаточно товара на складе.");
  }
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  return cart;
}

function changeQuantity(cart, productId, newQuantity) {
  const product = cart.find((item) => item.id === productId);

  if (!product) {
    return cart;
  }

  if (newQuantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля.");
  }
  if (newQuantity > product.stock) {
    throw new RangeError("Недостаточно товара на складе.");
  }

  cart.map((item) => {
    if (item.id === productId) {
      item.quantity = newQuantity;
    }
  });

  return cart;
}

function removeFromCart(cart, productId) {
  const newCartcart = cart.filter((item) => item.id !== productId);
  cart = newCartcart;
  return cart;
}

function calculateCartSubtotal(cart) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const freeSheepingSum = 50000;
  const discountSum = 20000;
  const discountCode = "SAVE10";

  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promoCode === discountCode && subtotal >= discountSum ? subtotal * 0.1 : 0;
  const delivery = subtotal >= freeSheepingSum ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
