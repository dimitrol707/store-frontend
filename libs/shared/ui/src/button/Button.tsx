import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = MuiButtonProps;

export function Button(props: Readonly<ButtonProps>) {
  return <MuiButton {...props} />;
}
