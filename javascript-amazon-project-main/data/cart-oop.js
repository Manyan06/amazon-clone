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

//METHOD = Function inside an object ('OOP - Organize our code into Objects');


function Cart(localStorageKey) {
  const cart = {
  cartItems : undefined,

  loadFromStorage: function() {
  this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)); 

    if (!this.cartItems) {
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }];
  }
},

SavetoLocalStorage() {
  localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); //Save the cart array to local storage
},

addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem; //Find the product in the cart array
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1; //If the product is already in the cart, increase the quantity by 1
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1' //Default delivery option
        }); //Add the product to the cart array
      }
      this.SavetoLocalStorage(); //Save the cart to local storage
},

//STEPS
//1. Create a new array
//2. Loop through the cart array
//3. Add each Product to the new array, except for this productId
removeFromCart(productId) {
  const newCart = [];
  this.cartItems.forEach ((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem); //Add the cart item to the new array if it doesn't match the productId
    }
  });

  this.cartItems = newCart; //Replace the cart with the new array
  this.SavetoLocalStorage(); //Save the updated cart to local storage
},

updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    // Loop through the cart to find the matching product
    
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem; //Find the product in the cart array
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId; //Update the delivery option for the matching product

    this.SavetoLocalStorage(); //Save the updated cart to local storage
}
};
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business'); // Create a separate instance for business cart

cart.loadFromStorage();

businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);