const products = [
    { id: 1, name: "Redmi 10", price: 20, image: "redmi10.jpeg", category: "Mobiles" },
    { id: 2, name: "iPhone 16", price: 30, image: "iphone16.jpeg", category: "Mobiles" },
    { id: 3, name: "OnePlus 11", price: 15, image: "oneplus11.jpeg", category: "Mobiles" },
    { id: 4, name: "Samsung S23", price: 35, image: "samsungS23.jpeg", category: "Mobiles" },
    { id: 5, name: "Google Pixel 8", price: 40, image: "pixel8.jpeg", category: "Mobiles" },
    { id: 6, name: "Vivo X100", price: 25, image: "vivoX100.jpeg", category: "Mobiles" },
    { id: 7, name: "MacBook Air M2", price: 999, image: "macbook_air.jpeg", category: "Laptops" },
    { id: 8, name: "Dell XPS 15", price: 1200, image: "dell_xps.jpeg", category: "Laptops" },
    { id: 9, name: "HP Spectre x360", price: 1100, image: "hp_spectre.jpeg", category: "Laptops" },
    { id: 10, name: "Sony Headphones", price: 80, image: "sony_headphones.jpeg", category: "Accessories" },
    { id: 11, name: "Logitech Mouse", price: 40, image: "logitech_mouse.jpeg", category: "Accessories" }
];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const productList = document.getElementById("product-list");
products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}">
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(productDiv);
});
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item) => {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.className = "cart-item";
      cartItemDiv.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartItems.appendChild(cartItemDiv);
      total += item.price * item.quantity;
    });
    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
  }
  document.getElementById("empty-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
  });
  document.getElementById("cart-icon").addEventListener("click", () => {
    const cart = document.getElementById("cart");
    cart.classList.toggle("visible");
  });
  updateCart();