import { Stack } from "@mui/material";
import { CategoryTabs } from "@store-frontend/features-categories";
import { ProductsCards } from "@store-frontend/features-products";

export default function MainPage() {
  return (
    <Stack gap={1} sx={{ position: "relative", top: "64px" }}>
      <CategoryTabs />
      <ProductsCards />
    </Stack>
  );
}
