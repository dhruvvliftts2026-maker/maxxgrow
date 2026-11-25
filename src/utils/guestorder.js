const KEY = "maxxgrow-orders";
export function getOrders() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
}
export function saveOrder(order) {
  const orders = [order, ...getOrders()];
  localStorage.setItem(KEY, JSON.stringify(orders));
  return orders;
}
