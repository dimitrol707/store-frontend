import { Skeleton, Stack, Typography } from "@mui/material";
import { useGetProductSearchInfinite } from "@store-frontend/shared-api";
import { VirtualizedGrid } from "@store-frontend/shared-ui";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { ProductCardItem } from "./ProductCardItem";

const LIMIT = 50;
const CARD_MIN_WIDTH = 200;
const CARD_HEIGHT = 360;

export function ProductsCards() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } =
    useGetProductSearchInfinite(
      {
        limit: LIMIT,
        ...(categoryId
          ? {
              search_conditions: [
                {
                  field: "CATEGORYID",
                  operation: "=",
                  value: Number(categoryId),
                },
              ],
            }
          : {}),
      },
      {
        query: {
          initialPageParam: 0,
          getNextPageParam: (lastPage, allPages) => {
            return lastPage.length === LIMIT ? allPages.length * LIMIT : null;
          },
        },
      }
    );

  const flatResult = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  if (!flatResult.length && !isLoading) {
    return (
      <Stack flex={1} alignItems={"center"} justifyContent={"center"}>
        <Typography fontWeight={500}>Products not found</Typography>
      </Stack>
    );
  }

  return (
    <VirtualizedGrid
      items={flatResult}
      minItemWidth={CARD_MIN_WIDTH}
      estimateSize={CARD_HEIGHT}
      renderItem={(item) => <ProductCardItem product={item} />}
      infiniteProps={{
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      }}
      renderSkeletonItem={() => (
        <Skeleton sx={{ width: 1, height: `${CARD_HEIGHT}px` }} />
      )}
    />
  );
}
