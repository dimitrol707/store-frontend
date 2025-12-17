import { Box, styled } from "@mui/material";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";

import { useItemsPerRow } from "./hooks/useItemsPerRow";

const ESTIMATE_SIZE = 200;

type InfiniteProps = {
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
};

type VirtualizedGridProps<T> = {
  items: T[];
  minItemWidth?: number;
  gap?: number;
  itemPerRow?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderSkeletonItem?: (index: number) => React.ReactNode;
  infiniteProps: InfiniteProps;
};

export function VirtualizedGrid<T>(props: VirtualizedGridProps<T>) {
  const {
    items,
    renderItem,
    minItemWidth = 300,
    itemPerRow,
    gap = 8,
    infiniteProps: {
      hasNextPage,
      fetchNextPage,
      isFetchingNextPage,
      isLoading,
    },
    renderSkeletonItem,
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const calculatedItemsPerRow = useItemsPerRow(containerRef, {
    minItemWidth,
    gap,
  });

  const resultItemPerRow = itemPerRow ?? calculatedItemsPerRow;
  const rowCount = Math.max(1, Math.ceil(items.length / resultItemPerRow));

  const rowVirtualizer = useWindowVirtualizer({
    count: rowCount,
    estimateSize: () => ESTIMATE_SIZE,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (!virtualRows.length) return;

    const lastRow = virtualRows[virtualRows.length - 1];
    const lastRowIndex = rowCount - 1;

    if (lastRow.index >= lastRowIndex) {
      fetchNextPage();
    }
  }, [virtualRows, rowCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: "relative",
        width: 1,
        height: totalHeight,
      }}
    >
      {virtualRows.map((virtualRow) => {
        const rowIndex = virtualRow.index;
        const startIndex = rowIndex * resultItemPerRow;
        const endIndex = Math.min(startIndex + resultItemPerRow, items.length);
        const rowItems = items.slice(startIndex, endIndex);

        return (
          <RowContainer
            ref={rowVirtualizer.measureElement}
            key={virtualRow.key}
            data-index={virtualRow.index}
            gap={gap}
            sx={{
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <GridRow gap={gap} itemPerRow={resultItemPerRow}>
              {rowItems.map((item, indexInRow) => {
                const itemIndex = startIndex + indexInRow;
                return <Box key={itemIndex}>{renderItem(item, itemIndex)}</Box>;
              })}
              {isFetchingNextPage &&
                renderSkeletonItem &&
                rowItems.length < resultItemPerRow &&
                Array.from({
                  length: resultItemPerRow - rowItems.length,
                }).map((_, i) => {
                  const key = `skeleton-${rowIndex}-${i}`;
                  return <Box key={key}>{renderSkeletonItem(i)}</Box>;
                })}
            </GridRow>
          </RowContainer>
        );
      })}
      {(isFetchingNextPage || isLoading) && renderSkeletonItem && (
        <RowContainer
          gap={gap}
          sx={{
            top: totalHeight,
          }}
        >
          <GridRow gap={gap} itemPerRow={resultItemPerRow}>
            {Array.from({ length: resultItemPerRow }).map((_, i) => (
              <Box key={`skeleton-bottom-${i}`}>{renderSkeletonItem(i)}</Box>
            ))}
          </GridRow>
        </RowContainer>
      )}
    </Box>
  );
}

const RowContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "gap",
})<{ gap: number }>(({ gap }) => ({
  position: "absolute",
  left: 0,
  width: "100%",
  paddingBottom: `${gap}px`,
}));

const GridRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "itemPerRow" && prop !== "gap",
})<{ itemPerRow: number; gap: number }>(({ gap, itemPerRow }) => ({
  display: "grid",
  gridTemplateColumns: `repeat(${itemPerRow}, minmax(0, 1fr))`,
  columnGap: `${gap}px`,
  width: "100%",
}));
