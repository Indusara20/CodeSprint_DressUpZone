let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector("#cart-box");
let closeCart = document.querySelector("#close-cart");

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};

if (window.location.hash === "#cart-box") {
  cart.classList.add("active");
}

// Get the necessary elements from the DOM
const addToCartButton = document.querySelector('.single-pro-details button');
const cartTableBody = document.querySelector('#cart tbody');
const cartSubtotalElement = document.querySelector('#subtotal td:last-child');
const cartTotalElement = document.querySelector('.cart-total');

// Initialize the cart subtotal and total
let cartSubtotal = 0;
let cartTotal = 0;

// Add a click event listener to the "Add to Cart" button
addToCartButton.addEventListener('click', function() {
  
  // Get the product information
  const productName = document.querySelector('#productName').textContent;
  const productPrice = document.querySelector('#productPrice').textContent;
  const MainImg = document.getElementById("MainImg").src;

  // Create a new row in the cart table
  const newRow = document.createElement('tr');

  // Create the columns for the new row
  const removeColumn = document.createElement('td');
  const imageColumn = document.createElement('td');
  const productNameColumn = document.createElement('td');
  const productPriceColumn = document.createElement('td');
  const quantityColumn = document.createElement('td');
  const subtotalColumn = document.createElement('td');

  // Add the content to the columns
  removeColumn.innerHTML = '<i class="far fa-times-circle"></i>';
  imageColumn.innerHTML = `<img src="${MainImg}" alt="">`;
  productNameColumn.textContent = productName;
  productPriceColumn.textContent = productPrice;
  quantityColumn.innerHTML = '<input type="number" value="1" min="1" max="10">';
  subtotalColumn.textContent = productPrice;

  // Add the columns to the new row
  newRow.appendChild(removeColumn);
  newRow.appendChild(imageColumn);
  newRow.appendChild(productNameColumn);
  newRow.appendChild(productPriceColumn);
  newRow.appendChild(quantityColumn);
  newRow.appendChild(subtotalColumn);

  // Add the new row to the cart table
  cartTableBody.appendChild(newRow);

  // Add an event listener to the quantity input
  const quantityInput = quantityColumn.querySelector('input');
  quantityInput.addEventListener('input', function() {
    // Update the subtotal when the quantity changes
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(productPrice.replace('Rs.', ''));
    subtotalColumn.textContent = 'Rs.' + parseInt((quantity * price).toFixed(2));

    // Recalculate the cart subtotal and total
    cartSubtotal = 0;
    const subtotalElements = document.querySelectorAll('#cart tbody td:nth-child(6)');
    subtotalElements.forEach(function(element) {
      const subtotal = parseFloat(element.textContent.replace('Rs.', ''));
      cartSubtotal += subtotal;
    });
    cartTotal = cartSubtotal;
    cartSubtotalElement.textContent = 'Rs.' + cartSubtotal.toFixed(2);
    cartTotalElement.textContent = 'Rs.' + cartTotal.toFixed(2);
  });

  // Add the new subtotal to the cart subtotal
  const price = parseFloat(productPrice.replace('Rs.', ''));
  cartSubtotal += price;
  cartTotal = cartSubtotal;
  cartSubtotalElement.textContent = 'Rs.' + cartSubtotal.toFixed(2);
  cartTotalElement.textContent = 'Rs.' + cartTotal.toFixed(2);
});


// Add an event listener to the "Remove" buttons in the cart table
cartTableBody.addEventListener('click', function(event) {
  const target = event.target;
  if (target.tagName.toLowerCase() === 'i') {
    const row = target.closest('tr');
    const price = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('Rs.', ''));
    cartSubtotal -= price;
    cartTotal = cartSubtotal;
    cartSubtotalElement.textContent = 'Rs.' + cartSubtotal.toFixed(2);
    cartTotalElement.textContent = 'Rs.' + cartTotal.toFixed(2);
    row.remove();
  }
});





