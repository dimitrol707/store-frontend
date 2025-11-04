import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type TextFieldFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = Pick<
  ControllerProps<TFieldValues, TName, TTransformedValues>,
  "control" | "name"
> &
  Omit<TextFieldProps, keyof ControllerRenderProps>;

export function TextFieldForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  control,
  name,
  ...textFieldProps
}: Readonly<TextFieldFormProps<TFieldValues, TName, TTransformedValues>>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { value, ...otherFieldProps } = field;
        const { error } = fieldState;
        return (
          <>
            <TextField
              value={value ?? ""}
              helperText={error?.message ?? ""}
              error={!!error}
              {...otherFieldProps}
              {...textFieldProps}
            />
          </>
        );
      }}
    />
  );
}
