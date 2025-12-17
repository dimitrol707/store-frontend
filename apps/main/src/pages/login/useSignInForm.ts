import { zodResolver } from "@hookform/resolvers/zod";
import {
  getGetHeaderTokenInfoQueryKey,
  useLoginUser,
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

  const {
    mutate: signInMutate,
    isPending,
    isSuccess,
  } = useLoginUser({
    mutation: {
      onSuccess: async (login) => {
        setLocalStorageValue(LocalStorageKey.JWT, login);
        await queryClient.invalidateQueries({
          queryKey: getGetHeaderTokenInfoQueryKey(),
          refetchType: "active",
        });
        navigate("/");
      },
      onError: (e) => {
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
      },
    },
  });

  const onValidSubmit: SubmitHandler<SignInFormValues> = ({
    email,
    password,
  }) => {
    signInMutate({
      data: {
        login: email,
        password: password,
      },
    });
  };

  return {
    onSubmit: handleSubmit(onValidSubmit),
    isSubmitting: isPending || isSuccess,
    ...otherFormProps,
  };
}
