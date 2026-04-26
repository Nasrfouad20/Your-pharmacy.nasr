/* =====================
   Cart Logic (Fixed)
===================== */

const cartCount = document.getElementById("cart-count");
const addButtons = document.querySelectorAll(".add-btn");
const cartContainer = document.querySelector(".cart-items");
const printBtn = document.getElementById("printInvoice");

/* =====================
   Get cart from localStorage
===================== */
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
updateCartCount();
renderCart();

/* =====================
   Add product to cart
===================== */
addButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();

    const card = btn.closest(".product-card");

    // ✅ FIX: safe price extraction (number only)
    const priceElement = card.querySelector(".price");
    const priceText =
      priceElement.dataset.price || priceElement.innerText;

    const product = {
      name: card.querySelector("h3").innerText,
      price: Number(priceText.replace(/[^\d.]/g, "")), // ✔ always number
      image: card.querySelector("img").src
    };

    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    updateCartCount();
    renderCart();

    btn.innerText = "✔ تمت الإضافة";
    btn.style.background = "#22c55e";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerText = "أضف للسلة";
      btn.style.background = "#0f766e";
      btn.disabled = false;
    }, 1200);
  });
});

/* =====================
   Update cart counter
===================== */
function updateCartCount() {
  if (cartCount) {
    cartCount.innerText = cartItems.length;
  }
}

/* =====================
   Render cart items
===================== */
function renderCart() {
  if (!cartContainer) return;

  cartContainer.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>السلة فارغة</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const price = Number(item.price) || 0; // ✅ protection
    total += price;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="60">
        <div>
          <h4>${item.name}</h4>
          <p>${price} جنيه</p>
        </div>
        <button onclick="removeItem(${index})">❌</button>
      </div>
    `;
  });

  cartContainer.innerHTML += `
    <h3>الإجمالي: ${total} جنيه</h3>
  `;
}

/* =====================
   Remove item
===================== */
function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartCount();
  renderCart();
}

/* =====================
   Print invoice
===================== */
if (printBtn) {
  printBtn.addEventListener("click", () => {
    let total = 0;
    let invoice = `<h2>فاتورة مشترياتك</h2><ul>`;

    cartItems.forEach(item => {
      const price = Number(item.price) || 0;
      total += price;
      invoice += `<li>${item.name} - ${price} جنيه</li>`;
    });

    invoice += `</ul><h3>الإجمالي: ${total} جنيه</h3>`;

    const printWindow = window.open("", "", "width=600,height=600");
    printWindow.document.write(invoice);
    printWindow.document.close();
    printWindow.print();
  });
}addButtons.forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    if(!currentUser){
      alert('يرجى تسجيل الدخول أولاً!');
      return;
    }

    const card = btn.closest(".product-card");
    const product = {
      name: card.querySelector("h3").innerText,
      price: card.querySelector(".price").innerText,
      image: card.querySelector("img").src
    };

    currentUser.cart.push(product);
    users = users.map(u => u.phone === currentUser.phone ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    btn.innerText = "✔ تمت الإضافة";
    btn.style.background = "#22c55e";

    setTimeout(() => {
      btn.innerText = "أضف للسلة";
      btn.style.background = "#0f766e";
    }, 1200);
  });
});
