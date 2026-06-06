const menuData = {
  starters: [
    { id: 1, name: "Velour Eclat", price: "$13.52", desc: "Silky Risotto crowned with glazed Salmon and delicate balsamic notes", img: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=160&q=80" },
    { id: 2, name: "Glazed Signature Bowl", price: "$9.33", desc: "Crispy bites glazed in rich house reduction", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=160&q=80" },
    { id: 3, name: "Rosso Crostini", price: "$5.66", desc: "Toasted artisan bread topped with fresh tomato basil", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=160&q=80" },
    { id: 4, name: "Etoile Fig Plate", price: "$12.60", desc: "Delicate fig arrangement with creamy gourmet accents", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=160&q=80" },
    { id: 5, name: "Pearl Tartines", price: "$6.00", desc: "Mini tartines layered with cream and sweet white grapes", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=160&q=80" }
  ],
  mains: [
    { id: 6, name: "Truffle Spaghetti", price: "$10.60", desc: "Silky spaghetti finished with creamy truffle glaze and parmesan notes", img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=160&q=80" },
    { id: 7, name: "Saffron Risotto", price: "$14.80", desc: "Slow-cooked saffron risotto with aged parmesan and wild herbs", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=160&q=80" },
    { id: 8, name: "Noir Lamb Rack", price: "$22.50", desc: "Herb-crusted lamb with rosemary jus and roasted root vegetables", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=160&q=80" },
    { id: 9, name: "Sea Bass Royale", price: "$18.90", desc: "Pan-seared sea bass with lemon butter and asparagus spears", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=160&q=80" },
    { id: 10, name: "Duck Confit", price: "$19.40", desc: "Slow-cooked duck leg with cherry reduction and crushed potatoes", img: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=160&q=80" }
  ],
  desserts: [
    { id: 11, name: "Noir Velvet", price: "$7.80", desc: "Dark cocoa delicacy finished with silky vanilla cream", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=160&q=80" },
    { id: 12, name: "Creme Brulee", price: "$8.50", desc: "Classic vanilla custard with a perfectly caramelised sugar crust", img: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=160&q=80" },
    { id: 13, name: "Mille-Feuille", price: "$9.20", desc: "Layered puff pastry with pastry cream and fresh raspberries", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=160&q=80" },
    { id: 14, name: "Tarte Tatin", price: "$7.40", desc: "Caramelised apple tart served warm with vanilla bean ice cream", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=160&q=80" },
    { id: 15, name: "Chocolate Fondant", price: "$8.80", desc: "Warm dark chocolate cake with a molten centre and gold leaf", img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=160&q=80" }
  ]
};

const allItems = [...menuData.starters, ...menuData.mains, ...menuData.desserts];
let heroIndex = 0;
let currentItemId = null;
let currentQty = 1;
let cart = [];
let currentStars = 0;
let toastTimer;

// ── HERO CYCLING ──
function heroLabelLines(name) {
  return name.toUpperCase().split(' ').join('<br>');
}

function nextHeroItem() {
  heroIndex = (heroIndex + 1) % allItems.length;
  const item = allItems[heroIndex];
  const img = document.getElementById('hero-img');
  img.style.opacity = '0';
  setTimeout(() => {
    img.src = item.img.replace('w=160', 'w=600');
    img.style.opacity = '1';
  }, 200);
  document.getElementById('hero-label').innerHTML = heroLabelLines(item.name);
  document.getElementById('hero-desc').textContent = item.desc;
  document.getElementById('home-fav-btn').classList.remove('liked');
  document.getElementById('home-fav-btn').innerHTML = '&#9825;';
}

function toggleHomeFav() {
  const btn = document.getElementById('home-fav-btn');
  btn.classList.toggle('liked');
  btn.innerHTML = btn.classList.contains('liked') ? '&#9829;' : '&#9825;';
  if (btn.classList.contains('liked')) showToast('Added to favourites ♥');
}

// ── NAVIGATION ──
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  if (screenId === 'screen-cart') renderCart();
  if (screenId === 'screen-order') renderOrder();
}

// ── MENU ──
function setTab(btn, tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderCards(tab);
}

function renderCards(tab) {
  const list = document.getElementById('cards-list');
  const items = menuData[tab] || [];
  list.innerHTML = items.map(item => `
    <div class="food-card" onclick="openDetail(${item.id})">
      <img class="food-thumb" src="${item.img}" alt="${item.name}" onerror="this.style.background='#1e4030'" />
      <div class="food-info">
        <div class="food-name-row">
          <span class="food-name">${item.name}</span>
          <span class="food-price">${item.price}</span>
        </div>
        <p class="food-desc">${item.desc}</p>
      </div>
    </div>
  `).join('');
}

// ── DETAIL ──
function openDetail(id) {
  const item = allItems.find(i => i.id === id);
  if (!item) return;
  currentItemId = id;
  document.getElementById('detail-name').textContent = item.name;
  document.getElementById('detail-price').textContent = item.price;
  document.getElementById('detail-desc').textContent = item.desc;
  document.getElementById('detail-img').src = item.img.replace('w=160', 'w=600');
  currentQty = 1;
  document.getElementById('qty-val').textContent = currentQty;

  const favBtn = document.getElementById('detail-fav-btn');
  favBtn.classList.remove('liked');
  favBtn.innerHTML = '&#9825;';

  const others = allItems.filter(i => i.id !== id);
  const smItem = others[Math.floor(Math.random() * others.length)];
  document.getElementById('see-more-thumb').src = smItem.img;
  document.getElementById('see-more-name').textContent = smItem.name;
  document.getElementById('see-more-price').textContent = smItem.price;
  document.getElementById('see-more-desc').textContent = smItem.desc;
  document.getElementById('see-more-card').dataset.seeMoreId = smItem.id;

  goTo('screen-detail');
}

function openSeeMore() {
  const id = parseInt(document.getElementById('see-more-card').dataset.seeMoreId);
  if (id) openDetail(id);
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-val').textContent = currentQty;
}

// ── CART ──
function addToCart() {
  if (!currentItemId) return;
  const item = allItems.find(i => i.id === currentItemId);
  if (!item) return;
  const existing = cart.find(c => c.id === currentItemId);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({ ...item, qty: currentQty });
  }
  updateCartBadges();
  showToast('Added to cart ✓');
}

function updateCartBadges() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  ['cart-count', 'detail-cart-count'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
  });
}

function getCartTotal() {
  return cart.reduce((s, c) => s + parseFloat(c.price.replace('$', '')) * c.qty, 0);
}

function renderCart() {
  const empty = document.getElementById('cart-empty-state');
  const list = document.getElementById('cart-items-list');
  const footer = document.getElementById('cart-footer');
  if (cart.length === 0) {
    empty.style.display = 'flex';
    list.style.display = 'none';
    footer.style.display = 'none';
    return;
  }
  empty.style.display = 'none';
  list.style.display = 'block';
  footer.style.display = 'block';
  list.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price}</div>
        <div class="cart-item-qty">Qty: ${item.qty}</div>
      </div>
      <button class="cart-remove-btn" onclick="removeFromCart(${idx})">&#215;</button>
    </div>
  `).join('');
  document.getElementById('cart-total').textContent = '$' + getCartTotal().toFixed(2);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartBadges();
  renderCart();
}

// ── ORDER ──
function renderOrder() {
  const sub = getCartTotal();
  const service = sub * 0.1;
  const tax = sub * 0.05;
  const grand = sub + service + tax;
  document.getElementById('order-subtotal').textContent = '$' + sub.toFixed(2);
  document.getElementById('order-service').textContent = '$' + service.toFixed(2);
  document.getElementById('order-tax').textContent = '$' + tax.toFixed(2);
  document.getElementById('order-grand').textContent = '$' + grand.toFixed(2);
  document.getElementById('order-items-list').innerHTML = cart.map(item => `
    <div class="order-summary-item">
      <div>
        <div class="order-item-name">${item.name}</div>
        <div class="order-item-qty">× ${item.qty}</div>
      </div>
      <div class="order-item-price">$${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}</div>
    </div>
  `).join('');
}

function placeOrder() {
  cart = [];
  updateCartBadges();
  goTo('screen-home');
  setTimeout(() => showToast('🍽️  Order Placed! Bon Appétit'), 300);
}

// ── REVIEW MODAL ──
function openReviewModal() {
  const item = allItems.find(i => i.id === currentItemId);
  if (item) document.getElementById('review-modal-sub').textContent = item.name;
  currentStars = 0;
  updateStars(0);
  document.getElementById('review-text').value = '';
  document.getElementById('review-modal-overlay').classList.add('open');
  const btn = document.getElementById('detail-fav-btn');
  btn.classList.add('liked');
  btn.innerHTML = '&#9829;';
}

function closeReviewModal() {
  document.getElementById('review-modal-overlay').classList.remove('open');
}

function closeReviewOnBg(e) {
  if (e.target === document.getElementById('review-modal-overlay')) closeReviewModal();
}

function setStar(n) {
  currentStars = n;
  updateStars(n);
}

function updateStars(n) {
  document.querySelectorAll('#stars-row .star-btn').forEach((btn, i) => {
    btn.classList.toggle('lit', i < n);
  });
}

function submitReview() {
  if (currentStars === 0) { showToast('Please select a star rating'); return; }
  closeReviewModal();
  showToast('Thank you for your review ★');
}

// ── TOAST ──
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderCards('starters');
  const first = allItems[0];
  document.getElementById('hero-img').src = first.img.replace('w=160', 'w=600');
});
