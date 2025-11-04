import { Stack, Typography } from "@mui/material";
import { Button, TextFieldForm } from "@store-frontend/shared-ui";

import { useLoginForm } from "./useLoginForm";

export default function LoginForm() {
  const { onSubmit, control, formState } = useLoginForm();
  return (
    <form onSubmit={onSubmit}>
      <Stack gap={1}>
        <TextFieldForm
          control={control}
          name="email"
          label="Email"
          variant="outlined"
        />
        <TextFieldForm
          control={control}
          name="password"
          label="Password"
          variant="outlined"
          type="password"
        />
        <Button type="submit" loading={formState.isSubmitting}>
          Login
        </Button>
        {formState.errors.root?.message && (
          <Typography color="error">{formState.errors.root.message}</Typography>
        )}
      </Stack>
    </form>
  );
}
