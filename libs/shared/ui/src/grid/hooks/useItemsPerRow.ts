import { useLayoutEffect, useState } from "react";

type UseItemsPerRowOptions = {
  minItemWidth: number;
  gap: number;
};

export function useItemsPerRow(
  containerRef: React.RefObject<HTMLElement | null>,
  options: UseItemsPerRowOptions
) {
  const { minItemWidth, gap } = options;
  const [itemsPerRow, setItemsPerRow] = useState(1);

  useLayoutEffect(() => {
    const containerElement = containerRef.current;
    if (!containerElement) return;

    const resizeCb = () => {
      const containerWidth = containerElement.clientWidth;
      if (!containerWidth) return;

      const totalItemWidth = minItemWidth + gap;
      const items = Math.max(
        1,
        Math.floor((containerWidth + gap) / totalItemWidth)
      );

      setItemsPerRow(items);
    };

    resizeCb();

    const observer = new ResizeObserver(resizeCb);
    observer.observe(containerElement);

    return () => observer.disconnect();
  }, [containerRef, minItemWidth, gap]);

  return itemsPerRow;
}
