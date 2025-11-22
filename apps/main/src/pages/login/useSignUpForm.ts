import { zodResolver } from "@hookform/resolvers/zod";
import {
  getGetAuthTokenQueryKey,
  usePostRegister,
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

const signUpValidationSchema = z
  .object({
    email: z.email("Enter a valid email").nonempty("Please enter your email"),
    password: z
      .string()
      .nonempty("Please enter your password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
    username: z.string().nonempty("Please enter your username"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpFormValues = z.infer<typeof signUpValidationSchema>;

const defaultValues: SignUpFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
};

export function useSignUpForm() {
  const { handleSubmit, setError, ...otherFormProps } =
    useForm<SignUpFormValues>({
      resolver: zodResolver(signUpValidationSchema),
      reValidateMode: "onChange",
      defaultValues,
    });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: signUpMutate } = usePostRegister({
    mutation: {
      onSuccess: (data) => {
        setLocalStorageValue(LocalStorageKey.JWT, data);
        queryClient.invalidateQueries({ queryKey: getGetAuthTokenQueryKey() });
        navigate("/");
      },
    },
  });

  const onValidSubmit: SubmitHandler<SignUpFormValues> = async ({
    email,
    password,
    confirmPassword,
    username,
  }) => {
    try {
      await signUpMutate({
        data: {
          email: email,
          password: password,
          confirm_password: confirmPassword,
          username,
        },
      });
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        switch (e.response.status) {
          case 409: {
            setError("root", { message: "User already registered" });
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
