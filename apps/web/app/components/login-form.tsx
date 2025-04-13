import {
  form,
  formTextInput,
  formPasswordInput,
  submitButton,
  vstack,
  text,
  mutation,
  toastSuccess,
  toastError,
} from "melony";
import { loginAction } from "@/lib/actions/auth";

export const loginForm = () => {
  return mutation({
    action: loginAction,
    onSuccess: ({ navigate }) => {
      toastSuccess({ message: "Login successful" });
      navigate("/");
    },
    onError: ({ navigate }) => {
      toastError({ message: "Login failed" });
      navigate("/login");
    },
    render: (mutation) => {
      return vstack({
        className: "space-y-4",
        children: [
          form({
            onSubmit: mutation.mutate,
            children: [
              formTextInput({ label: "Username", name: "username" }),
              formPasswordInput({ label: "Password", name: "password" }),
              submitButton({
                label: "Login",
                isSubmitting: mutation.isPending,
              }),
            ],
          }),
          text({ children: "Forgot your password?" }),
        ],
      });
    },
  });
};
