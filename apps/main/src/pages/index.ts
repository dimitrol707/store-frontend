import { lazy } from "react";

export const MainPage = lazy(() => import("./main/MainPage"));
export const LoginPage = lazy(() => import("./login/LoginPage"));
export const CartPage = lazy(() => import("./cart/CartPage"));
