// MANUAL & AUTOMATED TESTING

// TWO Types of Test Cases
// 1. Basics test cases = tests if the code is working or not
// 2. Edge test cases = test with values that are tricky or unexpected



// Automated Testing
// Automated testing is done by writing code that tests the code you have written.


// group of related tests = test suite

import {formatCurrency} from '../scripts/utils/money.js';

console.log('Test suite: formatCurrency function');

console.log('Converts cents into dollars');
if (formatCurrency(2095) === '20.95') {
  console.log('formatCurrency function works correctly');
} else {
  console.error('formatCurrency function does not work correctly');
}

console.log('works with 0');
if (formatCurrency(0) === '0.00') {
  console.log('pass');
} else {
  console.error('fail');
}

console.log('rounds-up');
if (formatCurrency(2000.5) === '20.01') {
  console.log('pass');
} else {
  console.error('fail');
}

if (formatCurrency(2000.4) === '20.00') {
  console.log('pass');
} else {
  console.error('fail');
}