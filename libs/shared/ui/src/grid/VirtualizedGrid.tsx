import { Box, styled } from "@mui/material";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";

import { useItemsPerRow } from "./hooks/useItemsPerRow";
import { SkeletonGrid } from "./SkeletonGrid";

const ESTIMATE_SIZE = 360;

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
    minItemWidth = ESTIMATE_SIZE,
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
  const rowCount = Math.ceil(items.length / resultItemPerRow);

  const isEmpty = items.length === 0;
  const isLastRowFull = !isEmpty && items.length % resultItemPerRow === 0;

  const showLoaderRow =
    !!renderSkeletonItem &&
    (isLoading || isFetchingNextPage) &&
    (isEmpty || isLastRowFull);

  const totalCount = rowCount + (showLoaderRow ? 1 : 0);
  const rowVirtualizer = useWindowVirtualizer({
    count: totalCount,
    estimateSize: () => ESTIMATE_SIZE + gap,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || !virtualRows.length) return;

    const virtualLastRow = virtualRows[virtualRows.length - 1];
    const lastRowIndex = rowCount - 1;

    if (virtualLastRow.index >= lastRowIndex) {
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
        const isLoaderRow = showLoaderRow && virtualRow.index === rowCount;

        return (
          <RowContainer
            ref={rowVirtualizer.measureElement}
            key={virtualRow.key}
            gap={gap}
            sx={{ transform: `translateY(${virtualRow.start}px)` }}
          >
            <GridRow gap={gap} itemPerRow={resultItemPerRow}>
              {isLoaderRow ? (
                <SkeletonGrid
                  rowKey={"loader"}
                  length={resultItemPerRow}
                  renderSkeletonItem={renderSkeletonItem}
                />
              ) : (
                (() => {
                  const rowIndex = virtualRow.index;
                  const startIndex = rowIndex * resultItemPerRow;
                  const endIndex = Math.min(
                    startIndex + resultItemPerRow,
                    items.length
                  );
                  const rowItems = items.slice(startIndex, endIndex);

                  return (
                    <>
                      {rowItems.map((item, indexInRow) => {
                        const itemIndex = startIndex + indexInRow;
                        return (
                          <Box key={itemIndex}>
                            {renderItem(item, itemIndex)}
                          </Box>
                        );
                      })}
                      {isFetchingNextPage &&
                        rowItems.length < resultItemPerRow && (
                          <SkeletonGrid
                            rowKey={`skeleton-${rowIndex}`}
                            length={resultItemPerRow - rowItems.length}
                            renderSkeletonItem={renderSkeletonItem}
                          />
                        )}
                    </>
                  );
                })()
              )}
            </GridRow>
          </RowContainer>
        );
      })}
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
