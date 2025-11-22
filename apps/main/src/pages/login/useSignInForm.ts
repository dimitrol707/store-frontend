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

const signInValidationSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Please enter your email"),
  password: z.string().nonempty("Please enter your password"),
});

type SignInFormValues = z.infer<typeof signInValidationSchema>;

const defaultValues: SignInFormValues = {
  email: "",
  password: "",
};

export function useSignInForm() {
  const { handleSubmit, setError, ...otherFormProps } =
    useForm<SignInFormValues>({
      resolver: zodResolver(signInValidationSchema),
      reValidateMode: "onChange",
      defaultValues,
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: signInMutate } = usePostLogin({
    mutation: {
      onSuccess: (data) => {
        setLocalStorageValue(LocalStorageKey.JWT, data);
        queryClient.invalidateQueries({ queryKey: getGetAuthTokenQueryKey() });
        navigate("/");
      },
    },
  });

  const onValidSubmit: SubmitHandler<SignInFormValues> = async ({
    email,
    password,
  }) => {
    try {
      await signInMutate({
        data: {
          login: email,
          password: password,
        },
      });
    } catch (e) {
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
