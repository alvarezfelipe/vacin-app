"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  Eye,
  EyeSlash,
  WarningOctagon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { useBoolean, useDebounce } from "hookings";
import { signIn } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginFormSchema = z.object({
  username: z.string().min(1, "Usuário é obrigatório."),
  password: z.string().min(1, "Senha é obrigatória."),
});

type LoginFormInputs = z.infer<typeof LoginFormSchema>;

const Form = (): JSX.Element => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const pathname = usePathname();

  const onSubmit = async (data: LoginFormInputs) => {
    const a = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: pathname.split("?")[0],
    });

    console.log(a)
  };

  return (
    <React.Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg"
        autoComplete="off"
      >
        <h2 className="select-none text-center text-4xl font-thin tracking-widest">
          VacinApp Health Panel
        </h2>
        <div className="mt-24 flex flex-col space-y-6">
          <InputUsername
            error={{
              status: !!errors.username,
              message: errors.username?.message,
            }}
            value={watch("username", "")}
            inputProps={{ ...register("username") }}
          />
          <InputPassword
            error={{
              status: !!errors.password,
              message: errors.password?.message,
            }}
            value={watch("password", "")}
            inputProps={{ ...register("password") }}
          />
        </div>
        <div className="space-between mt-16 flex items-center">
          <h3 className="flex-1 text-2xl text-normal dark:text-white">
            Login
          </h3>
          <motion.button
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="btn-neutral rounded-full p-6 text-6xl font-thin duration-200"
          >
            <ArrowUpRight size={32} />
          </motion.button>
        </div>
      </form>
      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 flex w-[calc(100%-48px)] select-none gap-4 rounded bg-danger p-4 duration-200 md:left-6 md:w-full md:max-w-xs"
          >
            <div>
              <WarningOctagon size={32} color="#FFF" />
            </div>
            <div className="text-white">
              <p>{error}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </React.Fragment>
  );
};

interface InputProps {
  error: {
    status: boolean;
    message?: string;
  };
  value: string;
  inputProps: any;
}

const InputUsername: React.FC<InputProps> = ({ error, value, inputProps }) => {
  return (
    <label htmlFor="username" className="relative w-full">
      <input
        id="username"
        type="text"
        placeholder={error.message ?? "Usuário"}
        autoComplete="off"
        {...inputProps}
        className={cn(
          "peer w-full py-4 font-light text-black duration-200 dark:text-white !outline-none",
          error.status && "placeholder:text-danger",
        )}
      />
      <div className="bg-neutral-300 absolute bottom-0 left-0 h-px w-full"></div>
      <div
        className={cn(
          "absolute bottom-0 left-0 z-10 h-px w-full scale-x-0 bg-black duration-200 dark:bg-white",
          !value.length ? "peer-focus:scale-x-100" : "scale-x-100",
        )}
      ></div>
      <div
        data-error={error.status}
        className="absolute bottom-0 left-0 z-20 h-px w-full scale-x-0 bg-danger duration-200 data-[error=true]:scale-x-100"
      ></div>
    </label>
  );
};

const InputPassword: React.FC<InputProps> = ({ error, value, inputProps }) => {
  const [see, toggleSee] = useBoolean();

  const SeePasswordIcon = see ? EyeSlash : Eye;

  useDebounce(toggleSee.off, 1500, [see]);

  return (
    <label
      htmlFor="password"
      className="relative flex w-full items-center gap-4"
    >
      <input
        id="password"
        type={see ? "text" : "password"}
        placeholder={error.message ?? "Senha"}
        autoComplete="off"
        {...inputProps}
        className={cn(
          "peer flex-1 py-4 font-light text-black duration-200 dark:text-white !outline-none",
          error.status && "placeholder:text-danger",
        )}
      />
      <div className="bg-neutral-300 absolute bottom-0 left-0 h-px w-full"></div>
      <div
        className={cn(
          "absolute bottom-0 left-0 z-10 h-px w-full scale-x-0 bg-black duration-200 dark:bg-white",
          !value.length ? "peer-focus:scale-x-100" : "scale-x-100",
        )}
      ></div>
      <div
        data-error={error.status}
        className="absolute bottom-0 left-0 z-20 h-px w-full scale-x-0 bg-danger duration-200 data-[error=true]:scale-x-100"
      ></div>
      <button onClick={toggleSee.on} type="button" className="fill-baseline">
        <SeePasswordIcon size={20} color="current" />
      </button>
    </label>
  );
};

export default Form;