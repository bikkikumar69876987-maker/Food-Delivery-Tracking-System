export const DELIVERY_FEE = 40;
export const PLATFORM_FEE = 10;
export const GST_PERCENTAGE = 5;

export function calculateCheckoutTotals(items) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const platformFee = items.length > 0 ? PLATFORM_FEE : 0;
  const gst = subtotal * (GST_PERCENTAGE / 100);

  return {
    subtotal,
    deliveryFee,
    platformFee,
    gst,
    grandTotal: subtotal + deliveryFee + platformFee + gst,
  };
}

export function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`;
}
