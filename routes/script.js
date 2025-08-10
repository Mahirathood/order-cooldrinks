// ---------- Load drinks from backend ----------
async function loadDrinks(limit = null) {
  const container = document.getElementById("dynamic-drinks");
  if (!container) return; // Stop if no container
  try {
    // Correct API URL
    const res = await fetch("http://localhost:4001/api/v1/drinks");
    if (!res.ok) throw new Error("Network error: " + res.statusText);
    let data = await res.json();
    if (limit) data = data.slice(0, limit);
    container.innerHTML = "";
    data.forEach(item => {
      const product = document.createElement("div");
      product.className = "pro";
      product.innerHTML = `
        <img src="${item.url || 'default.jpg'}" alt="${item.title}">
        <div class="des">
          <span>${item.title}</span>
          <h5>${item.details}</h5>
          <p>Location: ${item.location}</p>
          <p>Price: ₹${item.price}</p>
        </div>
        <a href="#" class="add-to-cart"
           data-id="${item._id}"
           data-title="${item.title}"
           data-price="${item.price}"
           data-url="${item.url}">
           <i class="fa-solid fa-cart-plus cart"></i>
        </a>`;
      container.appendChild(product);
    });
    // ---------- Add to cart ----------
    document.querySelectorAll(".add-to-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const item = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: parseFloat(btn.dataset.price),
          url: btn.dataset.url,
          quantity: 1
        };
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = cart.findIndex(d => d.id === item.id);
        if (index > -1) {
          cart[index].quantity += 1;
        } else {
          cart.push(item);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${item.title} added to cart!`);
      });
    });
  } catch (error) {
    console.error("Error loading drinks:", error);
  }
}
// ---------- Cart Page Logic ----------
function setupCartPage() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");
  function renderCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.url}" width="50" height="50" alt="${item.title}" />
        <span>${item.title}</span>
        <span>₹${item.price} x ${item.quantity}</span>
        <span>₹${item.price * item.quantity}</span>
        <button class="remove" data-id="${item.id}"></button>`;
      cartItemsContainer.appendChild(itemEl);
      total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: ₹${total}`;
    // Remove item
    document.querySelectorAll(".remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }
  // Checkout button
  checkoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to checkout?")) {
      localStorage.removeItem("cart");
      renderCart();
      alert("Order placed successfully!");
    }
  });
  renderCart();
}
// ---------- Page Detection ----------
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  if (path.includes("shop.html")) {
    loadDrinks(); // All drinks
  } else if (path.includes("cart.html")) {
    setupCartPage();
  }
});