    //  Using modules to combine all the files together into 1 big file 

    //  Create a Module
    // 1. Create a file
    // 2. Don't load the file with <scripts>
    // Any variables we create inside the file, will be contained inside the file. 

    // Get a Variable Out of a File
    // 1. Add type="module" attribute in html file
    // 2. Export
    // 3. Import

    //type="module" attribute (script file in amazon.html)
    // Lets this file get variables out of other files.
    // export in cart.js
    // import in amazon.js


export let cart;

loadFromStorage();


export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];}
}

function SavetoLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart)); //Save the cart array to local storage
}

export function addToCart(productId) {
        let matchingItem;

      cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem; //Find the product in the cart array
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1; //If the product is already in the cart, increase the quantity by 1
      } else {
        cart.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1' //Default delivery option
        }); //Add the product to the cart array
      }
      SavetoLocalStorage(); //Save the cart to local storage
}


//STEPS
//1. Create a new array
//2. Loop through the cart array
//3. Add each Product to the new array, except for this productId
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach ((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem); //Add the cart item to the new array if it doesn't match the productId
    }
  });

  cart = newCart; //Replace the cart with the new array
  SavetoLocalStorage(); //Save the updated cart to local storage
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    // Loop through the cart to find the matching product
    
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem; //Find the product in the cart array
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId; //Update the delivery option for the matching product

    SavetoLocalStorage(); //Save the updated cart to local storage
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
  console.log('loaded cart');
  fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}