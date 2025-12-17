import { Box, Skeleton, Stack, Typography } from "@mui/material";
import {
  ProductDTO,
  useGetProductMediaByProductId,
} from "@store-frontend/shared-api";
import { Button } from "@store-frontend/shared-ui";
import { useState } from "react";

interface ProductCardItemProps {
  product: ProductDTO;
}

export function ProductCardItem({ product }: Readonly<ProductCardItemProps>) {
  const [currentProductMediaIndex, setCurrentProductMediaIndex] =
    useState<number>(0);
  const { data: productMediaData } = useGetProductMediaByProductId(product.id);
  const currentProductMediaLink = productMediaData?.length
    ? productMediaData[currentProductMediaIndex]?.link
    : undefined;

  return (
    <Stack
      sx={{
        borderRadius: 2,
        padding: 1,
        height: 1,
        "&:hover": {
          backgroundColor: "#fff",
          boxShadow:
            "0 8px 10px 0 rgba(195, 195, 195, 0.2), 0 -11px 30px 0 rgba(195, 195, 195, 0.12), 0 16px 24px 0 rgba(195, 195, 195, 0.14)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          pb: 2,
          height: "200px",
        }}
      >
        {!currentProductMediaLink && <Skeleton sx={{ width: 1, height: 1 }} />}
        {currentProductMediaLink ? (
          <img
            src={"http://localhost:8080" + currentProductMediaLink}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : null}
        <Box
          sx={{
            position: "absolute",
            left: "0",
            top: "0",
            width: 1,
            height: 1,
            textAlign: "center",
          }}
        >
          <Stack direction="row" width={1} height={1}>
            {productMediaData?.map((_, index) => (
              <Stack
                onMouseOver={() => setCurrentProductMediaIndex(index)}
                onMouseOut={() => setCurrentProductMediaIndex(0)}
                flex={1}
              />
            ))}
          </Stack>
          {productMediaData?.map((_, index) => (
            <span
              style={{
                display: "inline-block",
                width: "12px",
                height: "3px",
                margin: "0 3px",
                transform: "translate(0, -25px)",
                background:
                  index === currentProductMediaIndex ? "#444" : "#ddd",
                borderRadius: "4px",
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography variant="subtitle1">{product.label}</Typography>
      <Typography variant="caption">{`Product code: ${product.code}`}</Typography>
      <Stack direction="row">
        <Typography variant="body1">
          {"Availability: "}
          <Typography component="span" variant="body1" color="success">
            {"In stock"}
          </Typography>
        </Typography>
      </Stack>
      <Typography variant="h5" color="primary">
        {`${product.price} RUB`}
      </Typography>
      <Button variant="contained">{"In Cart"}</Button>
    </Stack>
  );
}
