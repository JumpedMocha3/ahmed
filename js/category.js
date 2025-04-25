// Category Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize quick view modals
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            openQuickView(productName, productPrice, productImage);
        });
    });
    
    // Initialize add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace(/[^0-9.]/g, ''));
            
            addToCart(Math.floor(Math.random() * 1000), productName, productPrice);
        });
    });
});

function openQuickView(name, price, image) {
    const modal = document.getElementById('quickViewModal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="quick-view-content">
                <div class="quick-view-image">
                    <img src="${image}" alt="${name}">
                </div>
                <div class="quick-view-info">
                    <h2>${name}</h2>
                    <div class="price">${price}</div>
                    <p class="description">وصف المنتج سيكون هنا مع تفاصيل كاملة عن مكوناته وفوائده.</p>
                    <div class="quantity-selector">
                        <button class="decrease">-</button>
                        <input type="number" value="1" min="1">
                        <button class="increase">+</button>
                    </div>
                    <button class="add-to-cart">أضف إلى السلة</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Quantity selector
    const quantityInput = modal.querySelector('input[type="number"]');
    modal.querySelector('.decrease').addEventListener('click', function() {
        if (quantityInput.value > 1) {
            quantityInput.value--;
        }
    });
    
    modal.querySelector('.increase').addEventListener('click', function() {
        quantityInput.value++;
    });
    
    // Add to cart from modal
    modal.querySelector('.add-to-cart').addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        const productPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        
        addToCart(Math.floor(Math.random() * 1000), name, productPrice, quantity);
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('quickViewModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});