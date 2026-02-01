import { Skeleton, Stack, Typography } from "@mui/material";
import { useSearchProductInfinite } from "@store-frontend/shared-api";
import {
  Button,
  CircularLoader,
  VirtualizedGrid,
} from "@store-frontend/shared-ui";

import { CartItem } from "./CartItem";
import { usePrepareCartProducts } from "./libs/helpers";
import { useCartContext } from "./providers/CartProvider";

const LIMIT = 50;
const CART_ITEM_HEIGHT = 100;

export function CartContainer() {
  const { items } = useCartContext();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useSearchProductInfinite(
      {
        limit: LIMIT,
        search_conditions: [
          {
            field: "ID",
            operation: "in",
            value: items.map((item) => item.productId),
          },
        ],
      },
      {
        query: {
          enabled: items.length > 0,
          initialPageParam: 0,
          getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === LIMIT ? allPages.length * LIMIT : null;
          },
          placeholderData: (prev) => prev,
        },
      },
    );

  const prepareData = usePrepareCartProducts(items, data);

  if (isLoading) {
    return <CircularLoader />;
  }

  if (!prepareData.length) {
    return (
      <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
        <Typography fontWeight={500}>Cart is empty</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="row" gap={2} p={2}>
      <Stack gap={1} flex={1}>
        <Typography variant="h4" fontWeight={600}>
          Cart
        </Typography>
        <VirtualizedGrid
          items={prepareData}
          estimateSize={CART_ITEM_HEIGHT}
          itemPerRow={1}
          renderItem={(item) => <CartItem cartProduct={item} />}
          infiniteProps={{
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            isLoading,
          }}
          renderSkeletonItem={() => (
            <Skeleton sx={{ width: 1, height: `${CART_ITEM_HEIGHT}px` }} />
          )}
        />
      </Stack>
      <Stack flex="0 1 350px" gap={1}>
        <Button>Order</Button>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>Items:</Typography>
          <Typography fontWeight={600}>
            {prepareData.reduce((sum, item) => sum + item.quantity, 0)}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography fontWeight={600}>Total:</Typography>
          <Typography fontWeight={600}>
            {prepareData.reduce(
              (sum, item) => sum + Number(item.product.price) * item.quantity,
              0,
            )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
