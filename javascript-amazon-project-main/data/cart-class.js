//Class = Object generator

//Private = can be accessed only inside the class (SIGN = #)
//Public = can be accessed outside the class
//Constructor = function that runs when the class is instantiated

class Cart {
  cartItems;
  #localStorageKey; //localStorageKey = undefined;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
  this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)); 

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
  }

  SavetoLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems)); //Save the cart array to local storage
  }

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
  }

  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach ((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem); //Add the cart item to the new array if it doesn't match the productId
      }
    });

    this.cartItems = newCart; //Replace the cart with the new array
    this.SavetoLocalStorage(); //Save the updated cart to local storage
  }
  
  updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
      // Loop through the cart to find the matching product
      
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem; //Find the product in the cart array
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId; //Update the delivery option for the matching product

      this.SavetoLocalStorage(); 
  }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
//Instance of the Cart class
console.log(businessCart instanceof Cart);