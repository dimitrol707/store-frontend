import { Chip, Skeleton, Stack } from "@mui/material";
import { useGetCategoryAll } from "@store-frontend/shared-api";
import { useSearchParams } from "react-router";

export function CategoryTabs() {
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategoryAll();

  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoadingCategories) {
    return (
      <Stack direction="row" gap={1}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            sx={{
              borderRadius: 2,
              height: "32px",
              width: "90px",
            }}
          />
        ))}
      </Stack>
    );
  }

  if (!categoriesData?.length) {
    return null;
  }

  return (
    <>
      <Stack direction="row" gap={1} flexWrap="wrap">
        {categoriesData.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            variant="filled"
            onClick={() => {
              setSearchParams((prev) => {
                const newSearchParams = new URLSearchParams(prev);
                newSearchParams.set("category", String(category.id));
                return newSearchParams;
              });
            }}
            onDelete={
              searchParams.get("category") === String(category.id)
                ? () => {
                    setSearchParams((prev) => {
                      const newSearchParams = new URLSearchParams(prev);
                      newSearchParams.delete("category");
                      return newSearchParams;
                    });
                  }
                : undefined
            }
          />
        ))}
      </Stack>
    </>
  );
}
