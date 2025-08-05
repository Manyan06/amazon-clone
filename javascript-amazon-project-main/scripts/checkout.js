import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProducts, loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';



//Async Await is a shortcut for promises
// ASYNC = makes a function return a promise
// AWAIT = waits for a promise to finish, before going to the next line. (Lets us write asynchronous code in a synchronous way)

async function loadPage() {

  try {
    //throw 'error1';

    //Returns a promise
    await loadProductsFetch();

    // reject is a function and lets us create an error in the future

    const value = await new Promise((resolve,reject) => {
      //throw 'error2';
        loadCart(() => {
          //reject('error3');
          resolve('value3');
        });
    });

  } catch(error) {
    console.error('Error.Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();




// Promises  = keeps our code flat and avoids nesting

// Promise.all() = lets us run multiple promises parallely & wait for all of them to finish

//resolve is a function , similar to Jasmines's done function (lets us control when to go to the next step)


/*
Promise.all([
  loadProductsFetch(), //Returns a promise
  new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
  })

]).then((values) => {
  console.log(values); 
  renderOrderSummary();
  renderPaymentSummary();
});
*/


// MULTIPLE PROMISES

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {

  console.log(value); //value1

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});

*/



//CALLBACK

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
  