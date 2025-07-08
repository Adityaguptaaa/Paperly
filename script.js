// Paperly Cart + Filter + Theme Toggle (for hardcoded products)

const searchInput = document.getElementById("searchInput");
let cart = [];

// 🧃 Add to cart using product name and price
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart[index].qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart.`);
}


// 🧾 Show cart contents
function updateCartUI() {
  let total = 0;
  const output = cart.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `${item.name} x${item.qty} = ₹${subtotal}`;
  }).join("\n");
  document.getElementById("cartCount").textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  alert("🛒 Cart Contents:\n\n" + output + `\n\nTotal: ₹${total}`);
}

// 🧹 Filter by category
function filterItems(category) {
  const allCards = document.querySelectorAll(".product-card");
  allCards.forEach(card => {
    const productCategory = card.getAttribute("data-category");
    if (category === "all" || productCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// 🔍 Live search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const allCards = document.querySelectorAll(".product-card");

  allCards.forEach(card => {
    const name = card.querySelector("h3").textContent.toLowerCase();
    if (name.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// 🌗 Theme toggle (dark/light)
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
});
