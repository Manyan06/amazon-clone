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


export const cart =[{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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
          quantity: 1
        }); //Add the product to the cart array
      }
}
