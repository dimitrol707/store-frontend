import {
  clearLocalStorageValue,
  getLocalStorageValue,
  LocalStorageKey,
  setLocalStorageValue,
} from "@store-frontend/shared-utils";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { clampQty } from "../libs/helpers";
import { GuestCart, GuestCartItem } from "../libs/types";

interface CartContextValue {
  items: GuestCartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number, removeAll?: boolean) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = PropsWithChildren;

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState(() => {
    return getLocalStorageValue<GuestCart>(LocalStorageKey.CART)?.items ?? [];
  });

  useEffect(() => {
    if (!items.length) {
      clearLocalStorageValue(LocalStorageKey.CART);
      return;
    }
    setLocalStorageValue<GuestCart>(LocalStorageKey.CART, {
      items,
    });
  }, [items]);

  const addToCart = useCallback<CartContextValue["addToCart"]>((productId) => {
    setItems((prev) => {
      const idx = prev.findIndex((item) => item.productId === productId);

      if (idx === -1) {
        return [...prev, { productId, quantity: 1 }];
      }

      const currentItem = prev.at(idx);

      if (!currentItem) return [...prev];

      const nextItem: GuestCartItem = {
        ...currentItem,
        quantity: clampQty(currentItem.quantity + 1),
      };

      const items = prev.slice();
      items[idx] = nextItem;

      return items;
    });
  }, []);

  const removeFromCart = useCallback<CartContextValue["removeFromCart"]>(
    (productId, removeAll) => {
      setItems((prev) => {
        const idx = prev.findIndex((item) => item.productId === productId);

        if (idx === -1) {
          return [...prev];
        }

        const current = prev.at(idx);

        if (!current) return [...prev];

        const newQuantity = clampQty(current.quantity - 1);

        if (!newQuantity || removeAll) {
          return prev.filter((item) => item.productId !== productId);
        }

        const nextItem: GuestCartItem = {
          ...current,
          quantity: newQuantity,
        };

        const items = prev.slice();
        items[idx] = nextItem;

        return items;
      });
    },
    [],
  );

  return (
    <CartContext.Provider value={{ addToCart, removeFromCart, items }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider");
  }
  return context;
}
