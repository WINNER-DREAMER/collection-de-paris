// Collection de Paris — main.js
(function(){
  "use strict";

  const WHATSAPP_NUMBER = "2250140491329"; // numéro de la boutique, sans le +
  let cart = []; // [{id, qty}]

  const fmt = (n) => n.toLocaleString("fr-FR") + " FCFA";
  const findProduct = (id) => PRODUCTS.find(p => p.id === id);

  /* ---------- Rendu du catalogue ---------- */
  function renderProducts(filter){
    const grid = document.getElementById("productGrid");
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
    grid.innerHTML = list.map(p => `
      <article class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-card-body">
          <p class="product-card-cat">${CATEGORY_LABELS[p.category]}</p>
          <h3 class="product-card-name">${p.name}</h3>
          <p class="product-card-price">${fmt(p.price)}</p>
          <div class="product-card-actions">
            <button class="add-to-cart" data-id="${p.id}">Ajouter</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  /* ---------- Filtres ---------- */
  document.getElementById("filterRow").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if(!btn) return;
    document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderProducts(btn.dataset.filter);
  });

  /* ---------- Clic sur carte produit -> modale, sauf sur "Ajouter" ---------- */
  document.getElementById("productGrid").addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart");
    if(addBtn){
      addToCart(addBtn.dataset.id);
      return;
    }
    const card = e.target.closest(".product-card");
    if(card) openProductModal(card.dataset.id);
  });

  /* ---------- Modale produit ---------- */
  const productOverlay = document.getElementById("productOverlay");
  const productModal = document.getElementById("productModal");
  const productModalInner = document.getElementById("productModalInner");

  function openProductModal(id){
    const p = findProduct(id);
    if(!p) return;
    productModalInner.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-modal-body">
        <p class="product-modal-cat">${CATEGORY_LABELS[p.category]}</p>
        <h3>${p.name}</h3>
        <p class="product-modal-price">${fmt(p.price)}</p>
        <p class="product-modal-desc">${p.description}</p>
        <button class="btn btn-primary btn-block" data-id="${p.id}" id="modalAddBtn">Ajouter au panier</button>
      </div>
    `;
    document.getElementById("modalAddBtn").addEventListener("click", () => {
      addToCart(p.id);
      closeProductModal();
    });
    productOverlay.classList.add("is-open");
    productModal.classList.add("is-open");
  }
  function closeProductModal(){
    productOverlay.classList.remove("is-open");
    productModal.classList.remove("is-open");
  }
  productOverlay.addEventListener("click", closeProductModal);
  document.getElementById("productModalClose").addEventListener("click", closeProductModal);

  /* ---------- Panier ---------- */
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartItemsEl = document.getElementById("cartItems");
  const cartCountEl = document.getElementById("cartCount");

  function addToCart(id){
    const existing = cart.find(c => c.id === id);
    if(existing) existing.qty += 1;
    else cart.push({id, qty:1});
    renderCart();
    openCart();
  }

  function changeQty(id, delta){
    const item = cart.find(c => c.id === id);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) cart = cart.filter(c => c.id !== id);
    renderCart();
  }

  function renderCart(){
    const totalQty = cart.reduce((s,c) => s + c.qty, 0);
    cartCountEl.textContent = totalQty;

    if(cart.length === 0){
      cartItemsEl.innerHTML = `<p class="cart-empty">Votre panier est vide.</p>`;
      return;
    }

    cartItemsEl.innerHTML = cart.map(c => {
      const p = findProduct(c.id);
      return `
        <div class="cart-item" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-item-info">
            <p class="cart-item-name">${p.name}</p>
            <p>${fmt(p.price)}</p>
            <div class="cart-item-qty">
              <button data-action="dec">&minus;</button>
              <span>${c.qty}</span>
              <button data-action="inc">&plus;</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if(!btn) return;
    const id = btn.closest(".cart-item").dataset.id;
    changeQty(id, btn.dataset.action === "inc" ? 1 : -1);
  });

  function openCart(){
    cartDrawer.classList.add("is-open");
    cartOverlay.classList.add("is-open");
  }
  function closeCart(){
    cartDrawer.classList.remove("is-open");
    cartOverlay.classList.remove("is-open");
  }
  document.getElementById("cartToggle").addEventListener("click", openCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* ---------- Commande WhatsApp ---------- */
  document.getElementById("cartCheckout").addEventListener("click", () => {
    if(cart.length === 0){
      alert("Votre panier est vide.");
      return;
    }
    let message = "Bonjour, je souhaite commander :%0A";
    let total = 0;
    cart.forEach(c => {
      const p = findProduct(c.id);
      const lineTotal = p.price * c.qty;
      total += lineTotal;
      message += `- ${p.name} x${c.qty} (${fmt(lineTotal)})%0A`;
    });
    message += `%0ATotal indicatif : ${fmt(total)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  });

  /* ---------- Nav mobile ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", () => mainNav.classList.toggle("is-open"));
  mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mainNav.classList.remove("is-open")));

  /* ---------- Année footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Init ---------- */
  renderProducts("all");
  renderCart();
})();
