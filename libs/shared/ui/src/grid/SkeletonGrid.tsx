import { Box } from "@mui/material";
import { ReactNode } from "react";

interface SkeletonGridProps {
  length: number;
  rowKey: string;
  renderSkeletonItem?: ((index: number) => ReactNode) | undefined;
}

export function SkeletonGrid({
  length,
  rowKey,
  renderSkeletonItem,
}: SkeletonGridProps) {
  if (!renderSkeletonItem) return null;
  return Array.from({
    length,
  }).map((_, i) => <Box key={`${rowKey}-${i}`}>{renderSkeletonItem(i)}</Box>);
}
