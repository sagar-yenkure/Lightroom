"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useRegister from "@/features/authMutations/useRegister";
import { IRegisterUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

const SignUpForm = () => {
  const { register, registerLoading } = useRegister();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: IRegisterUser = {
      userName: formData.get("userName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
    };
    register(data, {
      onSuccess: () => router.push("/sign-in"),
    });
  };

  return (
    <div className="max-w-md m-6 w-full mx-auto rounded-none md:rounded-2xl  md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to LightRoom
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="userName">User name</Label>
            <Input
              id="userName"
              name="userName"
              placeholder="user"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="user@example.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn flex justify-center from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 items-center  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {registerLoading ? <Spinner /> : "Sign Up"}

          <BottomGradient />
        </button>
      </form>
      <p className="mt-10 text-center text-sm/6 text-gray-500">
        already have account !{" "}
        <Link
          href="/sign-in"
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          SignIn
        </Link>
      </p>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default SignUpForm;
