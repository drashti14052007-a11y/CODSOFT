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

let currentQty = 1;

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  window.scrollTo(0, 0);
}

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

function openDetail(id) {
  const all = [...menuData.starters, ...menuData.mains, ...menuData.desserts];
  const item = all.find(i => i.id === id);
  if (!item) return;
  document.getElementById('detail-name').textContent = item.name;
  document.getElementById('detail-price').textContent = item.price;
  document.getElementById('detail-desc').textContent = item.desc;
  document.getElementById('detail-img').src = item.img.replace('w=160', 'w=600');
  currentQty = 1;
  document.getElementById('qty-val').textContent = currentQty;
  goTo('screen-detail');
}

function changeQty(delta) {
  currentQty = Math.max(1, currentQty + delta);
  document.getElementById('qty-val').textContent = currentQty;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards('starters');
});
