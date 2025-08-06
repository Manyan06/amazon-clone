export const orders = JSON.parse(localStorage.getItem('orders')) || [];


function saveToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
} 

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage(); 
}
