import { ProductDTO } from "@store-frontend/shared-api";
import { InfiniteData } from "@tanstack/react-query";
import { useMemo } from "react";

import { CartProduct, GuestCartItem } from "./types";

export const clampQty = (qty: number) => Math.max(0, Math.min(999, qty));

export const usePrepareCartProducts = (
  cartItems: GuestCartItem[],
  productItems: InfiniteData<ProductDTO[], unknown> | undefined,
) => {
  return useMemo(() => {
    const flatedProductItems =
      productItems?.pages.flatMap((page) => page) ?? [];
    return cartItems.reduce<CartProduct[]>((result, cartItem) => {
      const cartProductItem = flatedProductItems.find(
        (product) => product.id === cartItem.productId,
      );

      if (!cartProductItem) return result;

      result.push({
        product: cartProductItem,
        quantity: cartItem.quantity,
      });

      return result;
    }, []);
  }, [productItems, cartItems]);
};
