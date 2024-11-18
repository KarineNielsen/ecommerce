// PRODUCTS
const products = [
    {
        id: 1,
        name: 'Hat',
        category: 'clothing',
        price: 99.95,
        description: 'Hat in braided straw with an indented crown and wide colored ribbon.',
        image: 'images/hat.webp'
    },
    {
        id: 2,
        name: 'Jean Shorts',
        category: 'clothing',
        price: 229.49,
        description: 'Ripped jean shorts with rolled hem. Made from high quality denim.',
        image: 'images/shorts.webp'
    },
    {
        id: 3,
        name: 'White T-Shirt',
        category: 'clothing',
        price: 63.00,
        description: 'White T-shirt with short sleeves, and small design on the chest.',
        image: 'images/tshirt.webp'
    },
    {
        id: 4,
        name: 'Basic Gray Hoodie',
        category: 'clothing',
        price: 179.95,
        description: 'Hoodie made in 100% cotton with a kangaroo pocket.',
        image: 'images/hoodie.webp'
    },
    {
        id: 5,
        name: 'Leather Boots',
        category: 'clothing',
        price: 699.49,
        description: 'Suede waterproof lace-up boots. Assorted colors.', image: 'images/boots.webp'
    },
    {
        id: 6,
        name: 'Converse Sneakers',
        category: 'clothing',
        price: 363.00,
        description: 'Classic Chuck 70 Canvas sneakers. Assorted colors.',
        image: 'images/sneakers.webp'
    },
    {
        id: 7,
        name: 'Wired Optical Mouse',
        category: 'electronics',
        price: 49.95,
        description: 'Wired mouse with optical sensor and silent click and roll.',
        image: 'images/mouse.webp'
    },
    {
        id: 8,
        name: 'Wireless Mini Keyboard',
        category: 'electronics',
        price: 162.99,
        description: 'Compact keyboard in blue and white, with a wireless 2.4 GHz connection.',
        image: 'images/keyboard.webp'
    },
    {
        id: 9,
        name: 'Wireless Headphones',
        category: 'electronics',
        price: 194.00,
        description: 'Headphones with built-in microphone. Up to 20h of battery life.',
        image: 'images/headphones.webp'
    },
    {
        id: 10,
        name: 'Bluetooth Earbuds',
        category: 'electronics',
        price: 249.99,
        description: 'Dust and waterproof earphones for active sports.',
        image: 'images/earbuds.webp' //image2
    },
    {
        id: 11,
        name: 'Digital Camera Nikon D7000',
        category: 'electronics',
        price: 2699.99,
        description: 'Digital SLR Camera, 16 MP with 18-140 mm lens.',
        image: 'images/camera.webp'
    },
    {
        id: 12,
        name: 'Smart Watch Skull Design',
        category: 'electronics',
        price: 694.00,
        description: 'With GPS and Wi-Fi. Up to 18 hours of battery life.',
        image: 'images/smartwatch.webp'
    }
];

// ADD TO CART
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const itemInCart = cart.find(item => item.id === productId);
        if (itemInCart) {
            itemInCart.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    
        var element = document.getElementById("button-add-"+productId);
        element.innerHTML = "Added";
        setTimeout(() => {
            element.innerHTML = "Add to basket";
          }, 500);
    }
}





// CART COUNT
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
}

//RENDER PRODUCTS - PRODUCT CARD
function renderProducts(productsToRender) {
    const productContainer = document.getElementById('product-list');
    if (!productContainer) {
        console.error('Product container not found');
        return;
    }

    productContainer.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p>kr.${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button class="add" id="button-add-${product.id}" onclick="addToCart(${product.id})">Add to cart</button>
        `;
        productContainer.appendChild(productCard);
    });
}

function getProductsByCategory(category) {
    return products.filter(product => category === 'all' || product.category === category);
}

// SORTING
function sortProducts(productsArray, criteria) {
    return productsArray.slice().sort((a, b) => {
        if (criteria === 'price') {
            return a.price - b.price;
        } else if (criteria === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
}
//sorting inside
function handleSorting() {
    const category = document.body.dataset.category || 'all';
    const selectedCriteria = document.getElementById('sort-options').value;
    const filteredProducts = getProductsByCategory(category);
    const sortedProducts = sortProducts(filteredProducts, selectedCriteria);
    renderProducts(sortedProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.getElementById('sort-options');

    if (sortDropdown) {
        handleSorting();
        sortDropdown.addEventListener('change', handleSorting);
    } else {
        console.error('Sort dropdown not found');
    }
});

