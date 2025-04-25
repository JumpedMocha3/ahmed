// Cart functionality
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCart();
    showAddedToCart(name);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartCount();
    saveCart();
    renderCartItems();
}

function openCart() {
    cartModal.style.display = 'flex';
    renderCartItems();
}

function closeCart() {
    cartModal.style.display = 'none';
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        cartTotalElement.textContent = 'Total: $0.00';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
            </div>
            <div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            removeFromCart(id);
        });
    });
}

function showAddedToCart(productName) {
    // Show a notification that item was added to cart
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `${productName} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        closeCart();
    }
});

// Close button event
document.querySelector('.close-cart').addEventListener('click', closeCart);
