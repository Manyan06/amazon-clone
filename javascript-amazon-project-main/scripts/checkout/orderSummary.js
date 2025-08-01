import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
// import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOptionById} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

// hello();

// const today = dayjs();
// const deliveryDate = today.add(7,'days');
// console.log(deliveryDate.format('dddd, MMM D'));

export function renderOrderSummary() {

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId); // Get the product from the products array

    if (!matchingProduct) {
      // Skip this cart item if product not found
      return;
    }
    const deliveryOptionId = cartItem.deliveryOptionId;
    // Find the delivery option that matches the deliveryOptionId

    const deliveryOption = getDeliveryOptionById(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
    deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format('dddd, MMM D'); 


    cartSummaryHTML += `
    <div class="cart-item-container
    js-cart-item-container
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
           ${matchingProduct.getPrice()} 
          </div>
          <div class="product-quantity 
          js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link
            js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  })

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => { 
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format('dddd, MMM D');  

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE Shipping'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
        <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
        <div>
        <div class="delivery-option-date">
        ${dateString}
        </div>
        <div class="delivery-option-price">
        ${priceString} Shipping
        </div>
        </div>
        </div>
    `
    });

    return html;
  }
  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId; // Get the product ID from the data attribute
      removeFromCart(productId); 

      const container = document.querySelector(`.js-cart-item-container-${productId}`); // Remove the cart item from the DOM

        container.remove();  // Remove the cart item from the DOM

        renderPaymentSummary();
      });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset; // Get the product ID and delivery option ID from the data attributes
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary(); // Re-render the order summary to reflect the updated delivery option
      renderPaymentSummary(); // Re-render the payment summary to reflect the updated delivery option
    });
  });
}

