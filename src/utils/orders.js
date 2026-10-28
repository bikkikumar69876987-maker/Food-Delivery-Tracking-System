import { calculateCheckoutTotals } from "./checkout";

const ORDERS_STORAGE_KEY = "food-delivery-orders";

export const ORDER_STAGES = [
  "Order Placed",
  "Restaurant Accepted",
  "Preparing Food",
  "Out For Delivery",
  "Delivered",
];

export const DELIVERY_PARTNER = {
  name: "Arjun Mehta",
  phone: "+91 98765 43210",
  vehicleNumber: "MH 12 AB 4582",
};

export function formatDeliveryAddress(customer) {
  return [
    customer.address,
    customer.city,
    customer.state,
    customer.pinCode,
  ]
    .filter(Boolean)
    .join(", ");
}

export function getAllOrders() {
  let storedOrders;

  try {
    storedOrders = window.localStorage.getItem(ORDERS_STORAGE_KEY);
  } catch (error) {
    console.error("Unable to read saved orders.", error);
    throw new Error("Saved orders are unavailable in this browser.");
  }

  if (!storedOrders) {
    return [];
  }

  const orders = JSON.parse(storedOrders);
  if (!Array.isArray(orders)) {
    throw new Error("Saved order data has an invalid format.");
  }

  return orders;
}

function writeOrders(orders) {
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Unable to save the order.", error);
    throw new Error("Your order could not be saved. Please try again.");
  }
}

function generateOrderId(existingIds) {
  const randomValues = new Uint32Array(1);

  for (;;) {
    window.crypto.getRandomValues(randomValues);
    const randomNumber = 10000 + (randomValues[0] % 90000);
    const orderId = `FDT-${new Date().getFullYear()}-${randomNumber}`;

    if (!existingIds.has(orderId)) {
      return orderId;
    }
  }
}

export function createOrder({ customer, paymentMethod, items }) {
  if (!items.length) {
    throw new Error("Add items to your cart before placing an order.");
  }

  const orders = getAllOrders();
  const order = {
    orderId: generateOrderId(new Set(orders.map((savedOrder) => savedOrder.orderId))),
    createdAt: new Date().toISOString(),
    customer,
    paymentMethod,
    items: items.map((item) => ({ ...item })),
    totals: calculateCheckoutTotals(items),
    progressIndex: 0,
  };

  writeOrders([...orders, order]);
  return order;
}

export function getOrderById(orderId) {
  return getAllOrders().find((order) => order.orderId === orderId) ?? null;
}

export function getLatestOrder() {
  const orders = getAllOrders();
  return orders.length > 0 ? orders[orders.length - 1] : null;
}

export function advanceOrderProgress(orderId) {
  const orders = getAllOrders();
  const orderIndex = orders.findIndex((order) => order.orderId === orderId);

  if (orderIndex === -1) {
    return null;
  }

  const order = orders[orderIndex];
  const progressIndex = Math.min(order.progressIndex + 1, ORDER_STAGES.length - 1);
  const updatedOrder = { ...order, progressIndex };

  orders[orderIndex] = updatedOrder;
  writeOrders(orders);

  return updatedOrder;
}

export function getOrderRestaurantName(order) {
  const restaurantNames = [
    ...new Set(order.items.map((item) => item.restaurantName).filter(Boolean)),
  ];

  if (restaurantNames.length === 0) {
    return "Food Tracker Restaurant";
  }

  return restaurantNames.length === 1
    ? restaurantNames[0]
    : "Multiple Restaurants";
}

export function getOrderStatus(order) {
  if (order.status === "cancelled") {
    return "Cancelled";
  }

  return order.progressIndex >= ORDER_STAGES.length - 1
    ? "Delivered"
    : "On the Way";
}
