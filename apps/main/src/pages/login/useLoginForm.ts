import { zodResolver } from "@hookform/resolvers/zod";
import {
  getGetAuthTokenQueryKey,
  usePostLogin,
} from "@store-frontend/shared-api";
import {
  LocalStorageKey,
  setLocalStorageValue,
} from "@store-frontend/shared-utils";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";

const loginValidationSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Please enter your email"),
  password: z.string().nonempty("Please enter your password"),
});

type LoginFormValues = z.infer<typeof loginValidationSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

export function useLoginForm() {
  const { handleSubmit, setError, ...otherFormProps } =
    useForm<LoginFormValues>({
      resolver: zodResolver(loginValidationSchema),
      reValidateMode: "onChange",
      defaultValues,
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: loginMutate } = usePostLogin({
    mutation: {
      onSuccess: (data) => {
        setLocalStorageValue(LocalStorageKey.JWT, data);
        queryClient.invalidateQueries({ queryKey: getGetAuthTokenQueryKey() });
        navigate("/");
      },
    },
  });

  const onValidSubmit: SubmitHandler<LoginFormValues> = async ({
    email,
    password,
  }) => {
    try {
      await loginMutate({
        data: {
          login: email,
          password: password,
        },
      });
    } catch (e) {
      console.log(123, e);
      if (isAxiosError(e) && e.response) {
        switch (e.response.status) {
          case 401: {
            setError("root", { message: "Invalid email or password" });
            break;
          }
          default: {
            setError("root", {
              message: e.response.data.message ?? "Unknown error",
            });
            break;
          }
        }
      }
    }
  };

  return {
    onSubmit: handleSubmit(onValidSubmit),
    ...otherFormProps,
  };
}
