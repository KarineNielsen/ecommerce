let cart = JSON.parse(localStorage.getItem('cart')) || [];

// RENDER AS LIST
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElem = document.getElementById('total-price');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElem.textContent = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <h2>${item.name}</h2>
                <p>kr.${item.price.toFixed(2)}</p>
                <div class="quantity">
                    <label>Quantity: </label>
                    <input type="number" min="0" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                </div>
                <p>Subtotal: kr.${itemTotal.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElem.textContent = total.toFixed(2);
}

// ITEM QUANTITY
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
    }
    else {removeItem(index);
    }
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// EMPTY CART
function emptyCart() {
    cart = [];
    saveCart();
}

// SAVE IN LOCAL STORAGE
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
}

// CHECKOUT
function checkout() {
    alert('Proceeding to checkout...');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});
