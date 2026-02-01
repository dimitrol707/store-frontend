import { ProductDTO } from "@store-frontend/shared-api";

export interface GuestCartItem {
  productId: number;
  quantity: number;
}

export interface GuestCart {
  items: GuestCartItem[];
}

export interface CartProduct {
  product: ProductDTO;
  quantity: number;
}
