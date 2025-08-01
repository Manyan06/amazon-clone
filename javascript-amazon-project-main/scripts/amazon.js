//MAIN IDEA of JavaScript
//1. Save the data
//2. Generate the HTML
//3. Make it interactive

//100 cents = 1 dollar

//Combine the HTML and put it in one webpage (using DOM)



//DATA/PRODUCTS.JS is taken 

// const products = [{
//   image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//   name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//   rating: {
//     stars: 4.5,
//     count: 87
//   },
//   priceCents: 1090
// }, {
//   image: 'images/products/intermediate-composite-basketball.jpg',
//   name: 'Intermediate Size Basketball',
//   rating: {
//     stars: 4.0,
//     count: 127
//   },
//   priceCents: 2095
// }, {
//   image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
//   name: 'Adults Plain Cotton T-Shirt - 2 Pack',
//   rating: {
//     stars: 4.5,
//     count: 56
//   },
//   priceCents: 799
// }, {
//   image: 'images/products/black-2-slot-toaster.jpg',
//   name: '2 Slot Toaster - Black',
//   rating: {
//     stars: 5.0,
//     count: 2197
//   },
//   priceCents: 1899
// }];

import {cart, addToCart} from '../data/cart.js';
//import {cart as myCart} from '../data/cart.js';
//const cart = [];

//import * as cartModule from '../data/cart.js';
//cartModule.cart;
//cartModule.addToCart('id');

import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML = productsHTML + `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      
      <div class="product-price">
          ${product.getPrice()}
      </div> 

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-Id="${product.Id}">
        Add to Cart
      </button>
    </div>
  `;
}) ;

document.querySelector('.js-products-grid').innerHTML = productsHTML; 

// How do we know which product to add?
// DATA ATTRIBUTE - is just another HTML attribute which allows us to attach any information to an element

// SYNTAX: data-<name>="<value>"
// EXAMPLE: data-product-name="Black and Gray Athletic Cotton Socks - 6 Pairs"

//LOGIC of CART
// 1. Check if the product is already int the cart
// 2. If it is, increase the quantity by 1
// 3. If it is not, add the product to the cart 


function updateCartQuantity() {
  let cartQuantity = 0; //Total quantity of items in the cart
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity; //Update the cart quantity in the HTML
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;  //Gives us all the data attributes
      addToCart(productId); //Call the function to add the product to the cart

      updateCartQuantity(); //Update the cart quantity in the HTML
      
    });
  });