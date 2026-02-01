import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { useGetProductMediaByProductId } from "@store-frontend/shared-api";
import { noProductImage } from "@store-frontend/shared-ui";
import { buildMediaUrl } from "@store-frontend/shared-utils";

import { CartProduct } from "./libs/types";
import { useCartContext } from "./providers/CartProvider";

interface CartItemProps {
  cartProduct: CartProduct;
}

export function CartItem({ cartProduct }: Readonly<CartItemProps>) {
  const { data: productMediaData, isLoading: isLoadingMedia } =
    useGetProductMediaByProductId(cartProduct.product?.id);
  const { addToCart, removeFromCart } = useCartContext();

  const currentProductMediaLink = productMediaData?.length
    ? productMediaData[0].link
    : undefined;
  const productImageSrc = currentProductMediaLink
    ? buildMediaUrl(currentProductMediaLink)
    : noProductImage;

  return (
    <Stack
      direction="row"
      gap={2}
      width={1}
      height={1}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ height: "100px", width: "100px" }}>
        {isLoadingMedia ? (
          <Skeleton sx={{ width: 1, height: 1 }} />
        ) : (
          <img
            src={productImageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            alt={cartProduct.product.label}
          />
        )}
      </Box>
      <Stack
        direction="row"
        flex={1}
        pr={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography fontWeight={600} variant="h5">
          {cartProduct.product.label}
        </Typography>
        <Typography fontWeight={600} variant="body1">
          {`${cartProduct.product.price} RUB`}
        </Typography>

        <Stack
          direction="row"
          gap={1}
          justifyContent={"space-between"}
          alignItems="center"
        >
          <IconButton>
            <RemoveCircleRoundedIcon
              onClick={() => removeFromCart(cartProduct.product.id)}
            />
          </IconButton>
          <Typography width="60px" textAlign="center">
            {cartProduct.quantity}
          </Typography>
          <IconButton>
            <AddCircleRoundedIcon
              onClick={() => addToCart(cartProduct.product.id)}
            />
          </IconButton>
        </Stack>
      </Stack>
      <IconButton
        color={"error"}
        onClick={() => removeFromCart(cartProduct.product.id, true)}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Stack>
  );
}
