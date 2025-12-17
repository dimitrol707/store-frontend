import { Skeleton } from "@mui/material";
import { useGetProductSearchInfinite } from "@store-frontend/shared-api";
import { VirtualizedGrid } from "@store-frontend/shared-ui";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

import { ProductCardItem } from "./ProductCardItem";

const LIMIT = 50;

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

  return (
    <VirtualizedGrid
      items={flatResult}
      minItemWidth={200}
      renderItem={(item) => <ProductCardItem product={item} />}
      infiniteProps={{
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
      }}
      renderSkeletonItem={() => <Skeleton sx={{ width: 1, height: "350px" }} />}
    />
  );
}
