// ===== Dark Mode =====
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme');
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  }
});

// ===== Cart System =====
let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    updateCart();
  });
});

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');

  cartItems.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    cartItems.innerHTML += `
      <div style="display:flex; justify-content:space-between; margin:0.5rem 0;">
        <span>${item.name} × ${item.quantity}</span>
        <span>\[ {(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  });

  const shipping = cart.length > 0 ? 5 : 0;
  const total = subtotal + shipping;

  subtotalEl.textContent = ` \]{subtotal.toFixed(2)}`;
  document.getElementById('shipping').textContent = `\[ {shipping.toFixed(2)}`;
  totalEl.textContent = ` \]{total.toFixed(2)}`;
}

// ===== Stripe (Demo) =====
const stripe = Stripe('pk_test_51DummyKeyReplaceWithYourOwn'); // Replace later with real key
const elements = stripe.elements();
const card = elements.create('card');
card.mount('#card-element');

card.on('change', event => {
  const displayError = document.getElementById('card-errors');
  displayError.textContent = event.error ? event.error.message : '';
});

document.getElementById('order-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  alert('This is a demo. In a real store you would process the payment here.\n\nCard details are securely handled by Stripe.');
});