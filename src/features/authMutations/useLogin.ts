import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const useLogin = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: (data) => {
      toast.success("User login successful");
    },
    onError: (error) => {
      toast.error(error.message || "There was an error while logging in");
    },
  });

  return {
    login: mutate,
    loginPending: isPending,
  };
};

export default useLogin;
