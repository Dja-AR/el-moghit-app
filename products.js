// قائمة المنتجات
const products = [
  { id: 1, name: "منتج 1", price: 1000, image: "images/.jpg", description: "وصف مفصل للمنتج 1" },
  { id: 2, name: "منتج 2", price: 1500, image: "images/.jpg", description: "وصف مفصل للمنتج 2" },
  { id: 3, name: "منتج 3", price: 2000, image: "img/product3.jpg", description: "وصف مفصل للمنتج 3" },
];

// عرض المنتجات ديناميكياً
const productList = document.getElementById('product-list');
products.forEach(product => {
  productList.innerHTML += `
    <div class="col-md-4 mb-4">
      <div class="card product-card h-100 text-center" onclick="openProductModal(${product.id})">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height:250px; object-fit:cover;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price} دج</p>
          <button class="btn btn-success" onclick="addToCart(${product.id}); event.stopPropagation();">أضف إلى السلة</button>
        </div>
      </div>
    </div>
  `;
});

// فتح نافذة تفاصيل المنتج
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  
  // تعبئة البيانات في المودال
  document.getElementById('modal-product-name').innerText = product.name;
  document.getElementById('modal-product-price').innerText = product.price + " دج";
  document.getElementById('modal-product-description').innerText = product.description;
  document.getElementById('modal-product-image').src = product.image;

  // فتح المودال
  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

// إضافة المنتج إلى السلة من المودال
function addToCartFromModal() {
  const productName = document.getElementById('modal-product-name').innerText;
  const product = products.find(p => p.name === productName);
  
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));

  alert('تمت إضافة المنتج إلى السلة!');
  updateCartCount();
}

// إضافة المنتج إلى السلة من البطاقة
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const product = products.find(p => p.id === productId);
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));

  alert('تمت إضافة المنتج إلى السلة!');
  updateCartCount();
}

// دالة لتحديث عدد المنتجات في السلة
function updateCartCount() {
  const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
  const cartCount = cart.length;
  const cartCountElement = document.getElementById('cart-count');
  
  if (cartCount > 0) {
      cartCountElement.style.display = 'inline-block';
      cartCountElement.innerText = cartCount;
  } else {
      cartCountElement.style.display = 'none';
  }
}

// التأكد من تحديث العدد عند تحميل الصفحة لأول مرة
window.onload = function() {
  updateCartCount();
}
