let products = [];
let cart = [];

// Fetch data from Fake Store API
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    displayProducts(data);
}

// Display products in the product list
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        productList.innerHTML += `
        <div class="col-md-3">
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="img-fluid">
                <h5>${product.title}</h5>
                <p>Price: ₹${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
        `;
    });
}

// Add item to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const cartItem = cart.find(item => item.id === id);
    
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    displayCart();
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cart-items');
    const totalMrp = document.getElementById('total-mrp');
    const totalAmount = document.getElementById('total-amount');
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cartItems.innerHTML += `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.title}">
            <h5>${item.title}</h5>
            <p>₹${item.price}</p>
            <div class="quantity-control">
                <button onclick="decreaseQuantity(${item.id})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${item.id})">+</button>
            </div>
            <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
        `;
    });

    totalMrp.textContent = `₹${total}`;
    totalAmount.textContent = `₹${total + 20 - 50 + 10}`;  // MRP + Shipping - Discount + Platform Fee
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    displayCart();
}

// Increase quantity of item
function increaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    cartItem.quantity++;
    displayCart();
}

// Decrease quantity of item
function decreaseQuantity(id) {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem.quantity > 1) {
        cartItem.quantity--;
    }
    displayCart();
}

// Search functionality
document.getElementById('search').addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));
    displayProducts(filteredProducts);
});

// Fetch products on load
fetchProducts();
