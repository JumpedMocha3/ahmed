// DOM Elements
const cartCount = document.getElementById('cart-count');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Load featured products
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    
    // Cart icon click event
    cartIcon.addEventListener('click', openCart);
});

// Load featured products
function loadFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    
    // In a real app, you would fetch this from an API
    const featuredProducts = [
        {
            id: 1,
            name: "Wildflower Honey",
            price: 12.99,
            image: "images/honey1.jpg",
            description: "Collected from various wildflowers"
        },
        {
            id: 2,
            name: "Manuka Honey",
            price: 29.99,
            image: "images/honey2.jpg",
            description: "Premium medicinal honey"
        },
        // Add more products as needed
    ];
    
    productGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(id, name, price);
        });
    });
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
