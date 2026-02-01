import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { useCartContext } from "@store-frontend/features-cart";
import {
  ProductDTO,
  useGetProductMediaByProductId,
} from "@store-frontend/shared-api";
import { Button, noProductImage } from "@store-frontend/shared-ui";
import { buildMediaUrl } from "@store-frontend/shared-utils";
import { useState } from "react";

interface ProductCardItemProps {
  product: ProductDTO;
}

export function ProductCardItem({ product }: Readonly<ProductCardItemProps>) {
  const [currentProductMediaIndex, setCurrentProductMediaIndex] =
    useState<number>(0);
  const { data: productMediaData, isLoading: isLoadingMedia } =
    useGetProductMediaByProductId(product.id);
  const { addToCart, items, removeFromCart } = useCartContext();
  const currentProductMediaLink = productMediaData?.length
    ? buildMediaUrl(productMediaData[currentProductMediaIndex]?.link)
    : noProductImage;

  const productInCart = items.find((item) => item.productId === product.id);

  return (
    <Stack
      sx={{
        borderRadius: 2,
        padding: 1,
        height: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          pb: 2,
          height: "200px",
        }}
      >
        {isLoadingMedia ? (
          <Skeleton sx={{ width: 1, height: 1 }} />
        ) : (
          <img
            src={currentProductMediaLink}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
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
      {productInCart ? (
        <Stack
          direction="row"
          gap={1}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <IconButton>
            <RemoveCircleRoundedIcon
              onClick={() => removeFromCart(product.id)}
            />
          </IconButton>
          <Typography>{productInCart.quantity}</Typography>
          <IconButton>
            <AddCircleRoundedIcon onClick={() => addToCart(product.id)} />
          </IconButton>
        </Stack>
      ) : (
        <Button onClick={() => addToCart(product.id)}>{"In Cart"}</Button>
      )}
    </Stack>
  );
}
