// --- وظائف السلة ---

// عرض السلة عند تحميل الصفحة
function displayCart() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemRow = `
      <div class="d-flex align-items-center border p-2 mb-2 bg-white shadow-sm rounded">
        <img src="${item.image}" class="cart-img" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;">
        <div class="flex-grow-1 ms-2">
          <h6 class="mb-1">${item.name}</h6>
          <small>${item.price} دج للوحدة</small><br>
          <button class="btn btn-sm btn-danger mt-1" onclick="removeItem(${index})">🗑️ حذف</button>
        </div>
        <div>
          <input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm mb-1" style="width: 70px;" onchange="updateQuantity(${index}, this.value)">
          <div class="text-primary fw-bold">${itemTotal} دج</div>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemRow;
  });

  document.getElementById('total-price').textContent = total;
  document.getElementById('order').value = cart.map(item => `${item.name} (x${item.quantity})`).join(', ');
  document.getElementById('total').value = total + ' دج';
}

// تحديث الكمية وتحديث السلة
function updateQuantity(index, newQuantity) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart[index].quantity = parseInt(newQuantity);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// حذف منتج معين من السلة
function removeItem(index) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

// مسح السلة بالكامل
function clearCart() {
  if (confirm("هل تريد مسح جميع المنتجات من السلة؟")) {
    sessionStorage.removeItem('cart');
    displayCart();
  }
}

// إرسال النموذج عبر EmailJS
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_cyhvrc2', 'template_xwo6xxi', this)
    .then(() => {
      alert('✅ تم إرسال الطلب بنجاح!');
      sessionStorage.removeItem('cart');
      displayCart();
      document.getElementById('order-form').reset();
    })
    .catch((error) => {
      alert('❌ حدث خطأ أثناء الإرسال.');
      console.error('EmailJS Error:', error);
    });
});

// أول تحميل
displayCart();

// --- وظيفة إضافة منتج جديد ---
function addToCart(name, price, image) {
  let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

  const existingIndex = cart.findIndex(item => item.name === name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1, image: image });
  }

  sessionStorage.setItem('cart', JSON.stringify(cart));
  alert('✅ تمت إضافة المنتج إلى السلة!');
}
