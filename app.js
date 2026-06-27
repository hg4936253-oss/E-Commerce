// ===== SHOPZONE APP.JS =====

// ===== PRODUCT DATA =====
const PRODUCTS = [
  { id: 1, name: "iPhone 15 Pro", category: "Electronics", price: 134900, oldPrice: 149900, emoji: "📱", rating: "4.8 ★", reviews: 1284, badge: "Hot" },
  { id: 2, name: "Samsung Galaxy S24", category: "Electronics", price: 89999, oldPrice: 109999, emoji: "📱", rating: "4.7 ★", reviews: 876 },
  { id: 3, name: "Sony WH-1000XM5 Headphones", category: "Electronics", price: 24990, oldPrice: 34990, emoji: "🎧", rating: "4.9 ★", reviews: 2310, badge: "Best Seller" },
  { id: 4, name: "Apple MacBook Air M2", category: "Electronics", price: 114900, oldPrice: 129900, emoji: "💻", rating: "4.8 ★", reviews: 645 },
  { id: 5, name: "Nike Air Max 2024", category: "Footwear", price: 9999, oldPrice: 14999, emoji: "👟", rating: "4.6 ★", reviews: 432, badge: "Sale" },
  { id: 6, name: "Adidas Ultraboost", category: "Footwear", price: 12990, oldPrice: 17990, emoji: "👟", rating: "4.7 ★", reviews: 321 },
  { id: 7, name: "Leather Formal Shoes", category: "Footwear", price: 3499, oldPrice: 5999, emoji: "👞", rating: "4.4 ★", reviews: 189 },
  { id: 8, name: "Men's Casual T-Shirt Set", category: "Fashion", price: 1299, oldPrice: 2499, emoji: "👕", rating: "4.3 ★", reviews: 567, badge: "New" },
  { id: 9, name: "Women's Kurti Collection", category: "Fashion", price: 899, oldPrice: 1899, emoji: "👗", rating: "4.5 ★", reviews: 789 },
  { id: 10, name: "Leather Handbag", category: "Fashion", price: 2499, oldPrice: 4999, emoji: "👜", rating: "4.6 ★", reviews: 234, badge: "Sale" },
  { id: 11, name: "Smart Watch Pro", category: "Electronics", price: 8999, oldPrice: 14999, emoji: "⌚", rating: "4.5 ★", reviews: 943 },
  { id: 12, name: "Espresso Coffee Maker", category: "Home", price: 6499, oldPrice: 9999, emoji: "☕", rating: "4.7 ★", reviews: 312 },
  { id: 13, name: "LED Desk Lamp", category: "Home", price: 1299, oldPrice: 2499, emoji: "💡", rating: "4.4 ★", reviews: 178 },
  { id: 14, name: "Yoga Mat Premium", category: "Sports", price: 999, oldPrice: 1999, emoji: "🧘", rating: "4.6 ★", reviews: 456 },
  { id: 15, name: "Cricket Bat (Kashmir Willow)", category: "Sports", price: 1799, oldPrice: 3499, emoji: "🏏", rating: "4.5 ★", reviews: 234 },
  { id: 16, name: "Face Serum Vitamin C", category: "Beauty", price: 699, oldPrice: 1299, emoji: "✨", rating: "4.8 ★", reviews: 1023, badge: "Hot" },
  { id: 17, name: "Perfume Set Luxury", category: "Beauty", price: 1999, oldPrice: 3999, emoji: "🌸", rating: "4.7 ★", reviews: 567 },
  { id: 18, name: "Bluetooth Speaker", category: "Electronics", price: 3499, oldPrice: 5999, emoji: "🔊", rating: "4.5 ★", reviews: 789 },
  { id: 19, name: "Decorative Wall Clock", category: "Home", price: 1499, oldPrice: 2999, emoji: "🕐", rating: "4.3 ★", reviews: 123 },
  { id: 20, name: "Football Nike Strike", category: "Sports", price: 1499, oldPrice: 2499, emoji: "⚽", rating: "4.6 ★", reviews: 345 },
];

// ===== UTILITY FUNCTIONS =====
function getCart() {
  return JSON.parse(localStorage.getItem('sz_cart') || '[]');
}
function saveCart(cart) {
  localStorage.setItem('sz_cart', JSON.stringify(cart));
  updateCartCount();
}
function getWishlist() {
  return JSON.parse(localStorage.getItem('sz_wishlist') || '[]');
}
function saveWishlist(wl) {
  localStorage.setItem('sz_wishlist', JSON.stringify(wl));
}
function getUser() {
  return JSON.parse(localStorage.getItem('sz_user') || 'null');
}
function saveUser(user) {
  localStorage.setItem('sz_user', JSON.stringify(user));
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cart-count').forEach(el => el.textContent = total);
}

function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function calcDiscount(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function authGuard() {
  const user = getUser();
  const isLoginPage = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
  if (!user && !isLoginPage) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('sz_user');
    window.location.href = 'index.html';
  }
}

// ===== LOGIN PAGE =====
function handleLogin() {
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value.trim();
  const errEl = document.getElementById('login-error');
  const sucEl = document.getElementById('login-success');

  if (!email || !password) {
    errEl.textContent = '❌ Please enter email and password.';
    errEl.style.display = 'block';
    sucEl.style.display = 'none';
    return;
  }

  if (!email.includes('@') || password.length < 4) {
    errEl.textContent = '❌ Invalid email or password (min 4 chars).';
    errEl.style.display = 'block';
    sucEl.style.display = 'none';
    return;
  }

  errEl.style.display = 'none';
  sucEl.style.display = 'block';
  saveUser({ email, name: email.split('@')[0] });
  setTimeout(() => window.location.href = 'home.html', 1200);
}

function guestLogin() {
  saveUser({ email: 'guest@shopzone.in', name: 'Guest User' });
  window.location.href = 'home.html';
}

function togglePass() {
  const inp = document.getElementById('password');
  if (inp) inp.type = inp.type === 'password' ? 'text' : 'password';
}

function showSignup() {
  document.getElementById('signup-modal').style.display = 'flex';
}
function closeSignup() {
  document.getElementById('signup-modal').style.display = 'none';
}

function handleSignup() {
  const name = document.getElementById('su-name')?.value.trim();
  const email = document.getElementById('su-email')?.value.trim();
  const pass = document.getElementById('su-pass')?.value.trim();
  if (!name || !email || !pass || pass.length < 6) {
    showToast('❌ Please fill all fields correctly (password min 6 chars)');
    return;
  }
  saveUser({ email, name });
  closeSignup();
  document.getElementById('login-success').textContent = '✅ Account created! Redirecting...';
  document.getElementById('login-success').style.display = 'block';
  setTimeout(() => window.location.href = 'home.html', 1200);
}

// ===== PRODUCT CARD BUILDER =====
function buildProductCard(p) {
  const wl = getWishlist();
  const inWl = wl.includes(p.id);
  const discount = calcDiscount(p.price, p.oldPrice);
  return `
    <div class="product-card" onclick="openProductModal(${p.id})">
      <div class="product-card-img">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="wishlist-btn ${inWl ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id}, this)">
          ${inWl ? '❤️' : '🤍'}
        </button>
        ${p.emoji}
      </div>
      <div class="product-card-body">
        <div class="product-cat">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">${p.rating} (${p.reviews})</div>
        <div class="product-price-row">
          <span class="product-price">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="product-discount">${discount}% off</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${p.id})">🛒 Add to Cart</button>
      </div>
    </div>
  `;
}

// ===== ADD TO CART =====
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`✅ ${product.name} added to cart!`);
}

// ===== WISHLIST =====
function toggleWishlist(productId, btn) {
  let wl = getWishlist();
  if (wl.includes(productId)) {
    wl = wl.filter(id => id !== productId);
    if (btn) { btn.textContent = '🤍'; btn.classList.remove('active'); }
    showToast('Removed from wishlist');
  } else {
    wl.push(productId);
    if (btn) { btn.textContent = '❤️'; btn.classList.add('active'); }
    showToast('❤️ Added to wishlist!');
  }
  saveWishlist(wl);
}

// ===== HOME PAGE =====
function initHome() {
  if (!authGuard()) return;
  updateCartCount();
  const featured = PRODUCTS.slice(0, 8);
  const grid = document.getElementById('featured-grid');
  if (grid) grid.innerHTML = featured.map(buildProductCard).join('');
}

function filterCat(cat) {
  localStorage.setItem('sz_filter_cat', cat);
  window.location.href = 'products.html';
}

function liveSearch() {
  const q = document.getElementById('nav-search')?.value.toLowerCase();
  if (!q) return;
  localStorage.setItem('sz_search', q);
  if (!window.location.href.includes('products.html')) {
    window.location.href = 'products.html';
  } else {
    applyFilters();
  }
}

// ===== PRODUCTS PAGE =====
let currentProducts = [...PRODUCTS];

function initProducts() {
  if (!authGuard()) return;
  updateCartCount();

  // Check for filter from home
  const filterCat = localStorage.getItem('sz_filter_cat');
  if (filterCat) {
    const allCheckbox = document.querySelector('.cat-filter[value="All"]');
    const catCheckbox = document.querySelector(`.cat-filter[value="${filterCat}"]`);
    if (allCheckbox) allCheckbox.checked = false;
    if (catCheckbox) catCheckbox.checked = true;
    localStorage.removeItem('sz_filter_cat');
  }

  applyFilters();
}

function applyFilters() {
  const checkedCats = [...document.querySelectorAll('.cat-filter:checked')].map(el => el.value);
  const priceMax = parseInt(document.getElementById('price-range')?.value || 50000);
  const sort = document.getElementById('sort-select')?.value || 'default';
  const searchQ = (document.getElementById('nav-search')?.value || localStorage.getItem('sz_search') || '').toLowerCase();

  let filtered = PRODUCTS.filter(p => {
    const catMatch = checkedCats.includes('All') || checkedCats.includes(p.category) || checkedCats.length === 0;
    const priceMatch = p.price <= priceMax;
    const searchMatch = !searchQ || p.name.toLowerCase().includes(searchQ) || p.category.toLowerCase().includes(searchQ);
    return catMatch && priceMatch && searchMatch;
  });

  if (sort === 'low') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'high') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

  const grid = document.getElementById('all-products-grid');
  const countEl = document.getElementById('product-count');
  if (grid) grid.innerHTML = filtered.length ? filtered.map(buildProductCard).join('') : '<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:40px">No products found.</p>';
  if (countEl) countEl.textContent = `${filtered.length} products found`;

  currentProducts = filtered;
}

function resetFilters() {
  document.querySelectorAll('.cat-filter').forEach(el => {
    el.checked = el.value === 'All';
  });
  const pr = document.getElementById('price-range');
  if (pr) { pr.value = 50000; document.getElementById('price-val').textContent = '₹50000'; }
  const ss = document.getElementById('sort-select');
  if (ss) ss.value = 'default';
  localStorage.removeItem('sz_search');
  applyFilters();
}

// ===== PRODUCT MODAL =====
function openProductModal(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;
  const discount = calcDiscount(p.price, p.oldPrice);
  document.getElementById('modal-content').innerHTML = `
    <div class="product-modal-inner">
      <div class="product-modal-emoji">${p.emoji}</div>
      <div class="product-modal-info">
        <div class="product-cat">${p.category}</div>
        <h2>${p.name}</h2>
        <div class="product-rating">${p.rating} (${p.reviews} reviews)</div>
        <div class="product-price-row">
          <span class="product-price" style="font-size:1.8rem">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
          ${discount > 0 ? `<span class="product-discount">${discount}% off</span>` : ''}
        </div>
        <p style="color:var(--text2);font-size:0.88rem;margin-bottom:20px;">Free delivery on orders above ₹499. Easy 30-day returns.</p>
        <div style="display:flex;gap:10px;">
          <button class="btn-primary" onclick="addToCart(${p.id}); closeProductModal()">🛒 Add to Cart</button>
          <button class="btn-outline" onclick="toggleWishlist(${p.id})">❤️ Wishlist</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById('product-modal').style.display = 'flex';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.style.display = 'none';
}

// ===== ABOUT PAGE =====
function initAbout() {
  if (!authGuard()) return;
  updateCartCount();
}

function submitContact(e) {
  e.preventDefault();
  document.getElementById('contact-success').style.display = 'block';
  e.target.reset();
  setTimeout(() => { document.getElementById('contact-success').style.display = 'none'; }, 4000);
}

// ===== ACCOUNT PAGE =====
function initAccount() {
  if (!authGuard()) return;
  updateCartCount();

  const user = getUser();
  if (user) {
    document.getElementById('acc-name').textContent = user.name || 'User';
    document.getElementById('acc-email-display').textContent = user.email || '';
    if (document.getElementById('prof-email')) document.getElementById('prof-email').value = user.email || '';
    if (document.getElementById('prof-fname')) document.getElementById('prof-fname').value = user.name || '';
  }

  loadOrders();
  loadWishlistTab();

  const saved = localStorage.getItem('sz_address');
  if (saved) document.getElementById('saved-address').textContent = saved;

  const dark = localStorage.getItem('sz_dark') === 'true';
  const toggle = document.getElementById('dark-toggle');
  if (toggle) toggle.checked = dark;
  if (dark) document.body.dataset.dark = 'true';
}

function showTab(name, btn) {
  document.querySelectorAll('.tab-panel').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.acc-tab').forEach(el => el.classList.remove('active'));
  const panel = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

function saveProfile() {
  const name = document.getElementById('prof-fname')?.value;
  const user = getUser();
  if (user) { user.name = name; saveUser(user); }
  document.getElementById('acc-name').textContent = name;
  document.getElementById('profile-success').style.display = 'block';
  setTimeout(() => document.getElementById('profile-success').style.display = 'none', 3000);
}

function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('sz_orders') || '[]');
  const list = document.getElementById('orders-list');
  if (!list) return;
  if (orders.length === 0) {
    list.innerHTML = '<p style="color:var(--muted)">No orders yet. <a href="products.html" style="color:var(--primary)">Start shopping!</a></p>';
    return;
  }
  list.innerHTML = orders.map(o => `
    <div class="order-card">
      <div class="order-card-left">
        <h4>${o.id}</h4>
        <p>${o.date} · ${o.items} item(s)</p>
      </div>
      <span class="order-status status-${o.status.toLowerCase()}">${o.status}</span>
      <span class="order-amount">${formatPrice(o.amount)}</span>
    </div>
  `).join('');
}

function loadWishlistTab() {
  const wl = getWishlist();
  const grid = document.getElementById('wishlist-grid');
  const empty = document.getElementById('empty-wishlist');
  if (!grid) return;
  const wlProducts = PRODUCTS.filter(p => wl.includes(p.id));
  if (wlProducts.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
  } else {
    grid.innerHTML = wlProducts.map(buildProductCard).join('');
    if (empty) empty.style.display = 'none';
  }
}

function editAddress() {
  const f = document.getElementById('address-form');
  if (f) f.style.display = f.style.display === 'none' ? 'block' : 'none';
}

function saveAddress() {
  const street = document.getElementById('addr-street')?.value;
  const city = document.getElementById('addr-city')?.value;
  const state = document.getElementById('addr-state')?.value;
  const pin = document.getElementById('addr-pin')?.value;
  const country = document.getElementById('addr-country')?.value;
  if (!street || !city || !pin) { showToast('❌ Please fill required fields'); return; }
  const addr = `${street}, ${city}, ${state} - ${pin}, ${country}`;
  localStorage.setItem('sz_address', addr);
  document.getElementById('saved-address').textContent = addr;
  document.getElementById('address-form').style.display = 'none';
  showToast('✅ Address saved!');
}

function toggleDark() {
  const isDark = document.getElementById('dark-toggle')?.checked;
  document.body.dataset.dark = isDark ? 'true' : 'false';
  localStorage.setItem('sz_dark', isDark ? 'true' : 'false');
}

function deleteAccount() {
  if (confirm('Are you SURE you want to delete your account? This cannot be undone.')) {
    localStorage.clear();
    window.location.href = 'index.html';
  }
}

// ===== CART PAGE =====
let appliedCoupon = null;
const COUPONS = { 'SAVE10': 10, 'SHOPZONE20': 20, 'NEWUSER': 15, 'FLAT50': 50 };

function initCart() {
  if (!authGuard()) return;
  updateCartCount();
  renderCartItems();
  updateCartSummary();
}

function renderCartItems() {
  const cart = getCart();
  const list = document.getElementById('cart-items-list');
  const empty = document.getElementById('empty-cart');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (!list) return;

  if (cart.length === 0) {
    list.innerHTML = '';
    if (empty) empty.style.display = 'block';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (empty) empty.style.display = 'none';
  if (checkoutBtn) checkoutBtn.disabled = false;

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.category}</p>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
      <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
    </div>
  `).join('');
}

function changeQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
    showToast('Removed from cart');
  }
  saveCart(cart);
  renderCartItems();
  updateCartSummary();
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCartItems();
  updateCartSummary();
  showToast('Item removed from cart');
}

function updateCartSummary() {
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const delivery = subtotal > 499 ? 0 : 49;

  let discount = 0;
  if (appliedCoupon) {
    if (typeof appliedCoupon === 'number') discount = Math.round(subtotal * appliedCoupon / 100);
  }

  const total = subtotal - discount + delivery;

  if (document.getElementById('summary-items')) document.getElementById('summary-items').textContent = totalItems;
  if (document.getElementById('summary-subtotal')) document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
  if (document.getElementById('summary-discount')) document.getElementById('summary-discount').textContent = '-' + formatPrice(discount);
  if (document.getElementById('summary-delivery')) document.getElementById('summary-delivery').textContent = delivery === 0 ? 'FREE' : formatPrice(delivery);
  if (document.getElementById('summary-total')) document.getElementById('summary-total').textContent = formatPrice(total);
  if (document.getElementById('payment-total')) document.getElementById('payment-total').textContent = formatPrice(total);
  if (document.getElementById('cod-amount')) document.getElementById('cod-amount').textContent = total.toLocaleString('en-IN');

  localStorage.setItem('sz_order_total', total);
  localStorage.setItem('sz_order_items', totalItems);
}

function applyCoupon() {
  const code = document.getElementById('coupon-input')?.value.trim().toUpperCase();
  const msg = document.getElementById('coupon-msg');
  if (!msg) return;

  if (COUPONS[code]) {
    appliedCoupon = COUPONS[code];
    msg.style.color = 'var(--green)';
    msg.textContent = `✅ Coupon applied! ${COUPONS[code]}% off`;
    updateCartSummary();
  } else {
    msg.style.color = 'var(--red)';
    msg.textContent = '❌ Invalid coupon code. Try: SAVE10, SHOPZONE20, NEWUSER';
    appliedCoupon = null;
  }
}

// CHECKOUT STEPS
function goToStep(n) {
  if (n === 2) {
    const cart = getCart();
    if (cart.length === 0) { showToast('❌ Your cart is empty!'); return; }
  }
  if (n === 3) {
    const fname = document.getElementById('del-fname')?.value.trim();
    const phone = document.getElementById('del-phone')?.value.trim();
    const address = document.getElementById('del-address')?.value.trim();
    const city = document.getElementById('del-city')?.value.trim();
    const pin = document.getElementById('del-pin')?.value.trim();
    if (!fname || !phone || !address || !city || !pin) {
      showToast('❌ Please fill all required fields'); return;
    }
    if (pin.length !== 6 || isNaN(pin)) {
      showToast('❌ Please enter a valid 6-digit PIN code'); return;
    }
  }

  document.querySelectorAll('.checkout-step').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.step').forEach(el => { el.classList.remove('active'); el.classList.remove('done'); });
  document.getElementById('checkout-step-' + n).classList.add('active');
  document.getElementById('step-ind-' + n).classList.add('active');
  for (let i = 1; i < n; i++) document.getElementById('step-ind-' + i)?.classList.add('done');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectPayment(method) {
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
  document.getElementById('pm-' + method).classList.add('selected');
  document.querySelectorAll('.payment-detail-form').forEach(el => el.style.display = 'none');
  document.getElementById(method + '-form').style.display = 'block';
}

function formatCard(inp) {
  let val = inp.value.replace(/\D/g, '').substring(0, 16);
  val = val.replace(/(.{4})/g, '$1 ').trim();
  inp.value = val;
  document.getElementById('card-num-prev').textContent = val || '•••• •••• •••• ••••';
}

function formatExp(inp) {
  let val = inp.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 2) val = val.substring(0,2) + '/' + val.substring(2);
  inp.value = val;
  document.getElementById('card-exp-prev').textContent = val || 'MM/YY';
}

function setUPI(app) {
  document.getElementById('upi-id').value = app + '@upi';
}

function placeOrder() {
  const method = document.querySelector('input[name="payment"]:checked')?.value || 'card';

  if (method === 'card') {
    const num = document.getElementById('card-number')?.value.replace(/\s/g, '');
    const name = document.getElementById('card-name')?.value.trim();
    const exp = document.getElementById('card-exp')?.value.trim();
    const cvv = document.getElementById('card-cvv')?.value.trim();
    if (!num || num.length !== 16) { showToast('❌ Enter valid 16-digit card number'); return; }
    if (!name) { showToast('❌ Enter cardholder name'); return; }
    if (!exp || exp.length !== 5) { showToast('❌ Enter valid expiry date (MM/YY)'); return; }
    if (!cvv || cvv.length !== 3) { showToast('❌ Enter 3-digit CVV'); return; }
  }
  if (method === 'upi') {
    const upi = document.getElementById('upi-id')?.value.trim();
    if (!upi || !upi.includes('@')) { showToast('❌ Enter valid UPI ID'); return; }
  }

  const orderId = 'SZ' + Date.now().toString().slice(-8);
  const total = parseInt(localStorage.getItem('sz_order_total') || 0);
  const items = parseInt(localStorage.getItem('sz_order_items') || 0);
  const payNames = { card: 'Credit/Debit Card', upi: 'UPI', netbank: 'Net Banking', cod: 'Cash on Delivery', wallet: 'Wallet' };

  // Save order to history
  const orders = JSON.parse(localStorage.getItem('sz_orders') || '[]');
  orders.unshift({ id: orderId, date: new Date().toLocaleDateString('en-IN'), items, amount: total, status: method === 'cod' ? 'Processing' : 'Confirmed' });
  localStorage.setItem('sz_orders', JSON.stringify(orders));

  // Clear cart
  saveCart([]);

  // Show confirmation
  document.getElementById('order-id').textContent = orderId;
  document.getElementById('confirm-amount').textContent = formatPrice(total);
  document.getElementById('confirm-payment').textContent = payNames[method] || method;

  goToStep(4);
  updateCartCount();
}

// ===== DARK MODE INIT =====
function initDarkMode() {
  const dark = localStorage.getItem('sz_dark') === 'true';
  if (dark) document.body.dataset.dark = 'true';
}

// ===== PAGE INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();

  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  if (page === 'home.html') initHome();
  else if (page === 'products.html') initProducts();
  else if (page === 'about.html') initAbout();
  else if (page === 'account.html') initAccount();
  else if (page === 'cart.html') initCart();

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });
  });

  // Keyboard shortcut: Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
    }
  });
});
