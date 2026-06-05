// ══ PRODUCT DATA ══
const PRODUCTS = [
  { id:1, name:"Scarlet Blazer", price:129, category:"clothing",
    img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    desc:"A bold double-breasted blazer in rich scarlet. Cut for confidence with structured shoulders and a nipped waist.", tags:["WOMEN","FASHION","BLAZER"], sku:"LX-SB-001", reviews:42, rating:4.6 },
  { id:2, name:"Celestia Dress", price:179, category:"clothing",
    img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    desc:"Flowing celestial-print maxi dress with deep V neckline and gold-toned belt.", tags:["WOMEN","FASHION","DRESS"], sku:"LX-CD-002", reviews:58, rating:4.7 },
  { id:3, name:"Urban Muse Set", price:119, category:"clothing",
    img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    desc:"Relaxed co-ord set in warm terracotta. Wide-leg trousers and a cropped blazer for effortless city style.", tags:["WOMEN","FASHION","SET"], sku:"LX-UM-003", reviews:31, rating:4.5 },
  { id:4, name:"Flame Heels", price:189, category:"shoes",
    img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80",
    desc:"Stiletto heels in fire-red patent leather. 4-inch heel with ankle strap and pointed toe.", tags:["WOMEN","SHOES","HEELS"], sku:"LX-FH-004", reviews:89, rating:4.8 },
  { id:5, name:"Ivory Bloom Top", price:89, category:"clothing",
    img:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80",
    desc:"Romantic floral chiffon top with puffed sleeves and delicate tie-neck detail.", tags:["WOMEN","FASHION","TOP"], sku:"LX-IB-005", reviews:27, rating:4.4 },
  { id:6, name:"Terra Bag", price:219, category:"accessories",
    img:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    desc:"Hand-woven leather tote in earthy multi-tone stripe. Spacious interior with gold hardware.", tags:["WOMEN","ACCESSORIES","BAG"], sku:"LX-TB-006", reviews:66, rating:4.9 },
  { id:7, name:"Savannah Scarf", price:69, category:"accessories",
    img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    desc:"Silk-feel scarf in warm savannah print. Style as a neck tie, headband, or bag accessory.", tags:["WOMEN","ACCESSORIES","SCARF"], sku:"LX-SS-007", reviews:19, rating:4.3 },
  { id:8, name:"Noir Shades", price:99, category:"accessories",
    img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    desc:"Oversized square-frame sunglasses with UV400 dark gradient lenses and black acetate frame.", tags:["WOMEN","ACCESSORIES","SUNGLASSES"], sku:"LX-NS-008", reviews:44, rating:4.7 },
  { id:9, name:"Crimson Bloom", price:299, category:"clothing",
    img:"https://images.unsplash.com/photo-1583759136431-fc4a1e75e6e2?w=600&q=80",
    desc:"CRIMSON BLOOM — An elegant floral couture gown with a flowing sheer tail and luxurious evening silhouette.", tags:["WOMEN","FASHION","DRESS"], sku:"GHFT95245AAA", reviews:350, rating:4.8 },
  { id:10, name:"Gold Chains", price:29, category:"accessories",
    img:"https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    desc:"Delicate layered gold chain necklace set. Perfect for stacking.", tags:["WOMEN","ACCESSORIES","JEWELRY"], sku:"LX-GC-010", reviews:102, rating:4.6 },
  { id:11, name:"Pearl Earrings", price:15, category:"accessories",
    img:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    desc:"Statement drop earrings with oversized faux pearls and gold posts.", tags:["WOMEN","ACCESSORIES","JEWELRY"], sku:"LX-PE-011", reviews:78, rating:4.5 },
  { id:12, name:"Classy Shades", price:29, category:"accessories",
    img:"https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80",
    desc:"Retro cat-eye frames in warm tortoise shell with gold trim.", tags:["WOMEN","ACCESSORIES","SUNGLASSES"], sku:"LX-CS-012", reviews:55, rating:4.4 },
  { id:13, name:"Feather Brown Heels", price:89, category:"shoes",
    img:"https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=600&q=80",
    desc:"Slingback heels in warm brown suede with feather trim at the toe.", tags:["WOMEN","SHOES","HEELS"], sku:"LX-FB-013", reviews:36, rating:4.5 },
  { id:14, name:"Creme Handbag", price:59, category:"accessories",
    img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    desc:"Structured mini bag in creme faux leather with a gold chain strap.", tags:["WOMEN","ACCESSORIES","BAG"], sku:"LX-CH-014", reviews:49, rating:4.6 },
  { id:15, name:"Creme Totebag", price:9, category:"accessories",
    img:"https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80",
    desc:"Cotton canvas tote in creme with a playful print. Light, roomy, reusable.", tags:["WOMEN","ACCESSORIES","BAG"], sku:"LX-CT-015", reviews:88, rating:4.3 },
  { id:16, name:"Sugarplush Sneakers", price:199, category:"shoes",
    img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    desc:"Platform sneakers in pastel peach with chunky soles and satin laces.", tags:["WOMEN","SHOES","SNEAKERS"], sku:"LX-SP-016", reviews:123, rating:4.8 },
  { id:17, name:"Blue Denim Jeans", price:78, category:"clothing",
    img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80",
    desc:"High-waist straight-leg jeans in classic medium wash denim.", tags:["WOMEN","FASHION","JEANS"], sku:"LX-BJ-017", reviews:211, rating:4.7 },
  { id:18, name:"Silver Drift", price:899, category:"clothing",
    img:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80",
    desc:"Liquid silver satin slip dress with asymmetric hem and draped shoulder detail.", tags:["WOMEN","FASHION","DRESS"], sku:"LX-SD-018", reviews:29, rating:4.9 },
  { id:19, name:"Blush Haven", price:800, category:"clothing",
    img:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80",
    desc:"Blush pink chiffon cape gown with floral embroidery.", tags:["WOMEN","FASHION","GOWN"], sku:"LX-BH-019", reviews:41, rating:4.8 },
  { id:20, name:"Moonveil Gown", price:799, category:"clothing",
    img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80",
    desc:"Ethereal tulle ballgown in champagne with a corseted bodice and cathedral train.", tags:["WOMEN","FASHION","GOWN"], sku:"LX-MG-020", reviews:63, rating:4.9 },
  { id:21, name:"Wool Knit Sweater", price:89, category:"clothing",
    img:"https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
    desc:"Oversized ribbed knit sweater in oat-cream. Dropped shoulders, cozy and chic.", tags:["WOMEN","FASHION","SWEATER"], sku:"LX-WK-021", reviews:74, rating:4.5 },
  { id:22, name:"Silk Evening Dress", price:149, category:"clothing",
    img:"https://images.unsplash.com/photo-1495385794356-15371f348c31?w=600&q=80",
    desc:"Ivory silk midi dress with spaghetti straps and side slit.", tags:["WOMEN","FASHION","DRESS"], sku:"LX-SE-022", reviews:55, rating:4.6 },
  { id:23, name:"Leather Handbag", price:199, category:"accessories",
    img:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    desc:"Cognac leather bucket bag with adjustable strap and drawstring close.", tags:["WOMEN","ACCESSORIES","BAG"], sku:"LX-LH-023", reviews:91, rating:4.7 },
  { id:24, name:"Canvas Sneakers", price:79, category:"shoes",
    img:"https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
    desc:"Classic low-top canvas sneakers in forest green with contrast white sole.", tags:["WOMEN","SHOES","SNEAKERS"], sku:"LX-CN-024", reviews:139, rating:4.5 },
];

// ══ CART (localStorage) ══
function getCart() {
  try { return JSON.parse(localStorage.getItem('luxe_cart') || '[]'); } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem('luxe_cart', JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(productId, size='S', quantity=1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.size === size);
  if (existing) existing.quantity += quantity;
  else cart.push({ id: productId, size, quantity });
  saveCart(cart);
}
function removeFromCart(productId, size) {
  saveCart(getCart().filter(i => !(i.id === productId && i.size === size)));
}
function getCartTotal() {
  return getCart().reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
}
function updateCartBadge() {
  const badge = document.querySelector('.cart-count');
  if (!badge) return;
  const count = getCart().reduce((s, i) => s + i.quantity, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

// ══ NAVIGATE ══
function goTo(page, params={}) {
  const q = new URLSearchParams(params).toString();
  window.location.href = page + (q ? '?' + q : '');
}

// ══ RENDER CARD ══
function renderCard(p) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img src="${p.img}" alt="${p.name}" loading="lazy">
    <h3>${p.name}</h3>
    <p class="price">$${p.price}.00</p>
  `;
  div.onclick = () => goTo('product.html', { id: p.id });
  return div;
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
