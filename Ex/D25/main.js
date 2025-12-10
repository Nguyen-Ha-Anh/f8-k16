const cart = [];
const addProduct = document.querySelector('.add-cart');
const cartBody = document.querySelector('.cart-body');
const totalPrice = document.querySelector('.total-price');
const cartTable = document.querySelector('.cart-table');
const emptyCart = document.querySelector('.empty-cart');

// update cart
function updateCartDisplay() {
    if (cart.length === 0) {
        cartTable.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        cartTable.style.display = 'table';
        emptyCart.style.display = 'none';
    }
}

addProduct.forEach((btn, index) => {
    btn.addEven
})

