import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DELIVERY_FEE } from "../utils/checkout";

const STORAGE_KEY = "food-delivery-cart";
const CartContext = createContext(null);

function isValidCartItem(item) {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    Number.isFinite(item.price) &&
    item.price >= 0 &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  );
}

function getStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart) || !parsedCart.every(isValidCartItem)) {
      throw new Error("Saved cart data has an invalid format.");
    }

    return parsedCart;
  } catch (error) {
    console.error("Unable to load the saved cart.", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Unable to save the cart.", error);
    }
  }, [items]);

  const addItem = (food, restaurant) => {
    const itemId = `${restaurant?.id ?? "default"}-${food.id}`;

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === itemId);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...currentItems,
        {
          ...food,
          id: itemId,
          foodId: food.id,
          restaurantId: restaurant?.id ?? null,
          restaurantName: restaurant?.name ?? "Restaurant",
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (itemId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const value = useMemo(() => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;

    return {
      items,
      itemCount,
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}
