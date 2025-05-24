"use client";
import React from "react";
import Image from "next/image";
import bg from "@/image/auth_bg.jpg";
import Link from "next/link";
import { GoArrowLeft, GoLock, GoMail, GoPerson } from "react-icons/go";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@/schema/form.schema";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: object) =>
    console.log(data, `error: ${errors.Confirm_password}`);

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url('${bg.src}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[350px] py-5 w-full relative text-black border border-blue-500 rounded-ss-[25%] rounded-ee-[25%] shadow-md shadow-blue-400 bg-white/30 backdrop-blur-sm">
        <Link className="absolute top-10 left-10" href={"/"}>
          <GoArrowLeft />
        </Link>
        <h1 className="text-center font-bold text-2xl my-3 text-blue-600">
          Sign up
        </h1>
        <div className="px-7 py-4 mb-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start justify-center gap-2 relative">
              <GoPerson className="absolute top-9 text-slate-500 left-1 text-base" />
              <label className="text-sm text-thin text-slate-500">
                Full name:
              </label>
              <input
                className={`w-full px-4 py-1 pl-5 text-thin text-sm text-slate-600 border-0 focus:outline-none border-b-[1px] bg-transparent ${
                  errors.full_name && errors.full_name.message
                    ? " border-red-400"
                    : "border-blue-400"
                }`}
                {...register("full_name")}
                type="text"
                placeholder="jhon hearly"
              />
              {errors.full_name && (
                <p className="text-red-500 text-xs font-thin">
                  {errors.full_name.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center gap-2 relative mt-3">
              <GoMail className="absolute top-9 text-slate-500 left-1 text-base" />
              <label className="text-sm text-thin text-slate-500">Email:</label>
              <input
                className={`w-full px-4 py-1 pl-5 text-thin text-sm text-slate-600 border-0 border-b-[1px] focus:outline-none bg-transparent ${
                  errors.email && errors.email.message
                    ? " border-red-400"
                    : " border-blue-400"
                }`}
                {...register("email")}
                type="text"
                placeholder="demomail@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs font-thin">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center gap-2 mt-3 relative">
              <GoLock className="absolute top-9 text-slate-500 left-1 text-base" />
              <label className="text-sm text-thin text-slate-500">
                Password:
              </label>
              <input
                className={`w-full px-4 py-1 pl-5 text-thin text-sm text-slate-600 border-0 border-b-[1px] focus:outline-none bg-transparent ${
                  errors.password && errors.password.message
                    ? " border-red-400"
                    : "border-blue-400"
                }`}
                {...register("password")}
                type="password"
                placeholder="password"
              />
              {errors.password && (
                <p className="text-red-500 text-xs font-thin">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center gap-2 mt-3 relative">
              <GoLock className="absolute top-9 text-slate-500 left-1 text-base" />
              <label className="text-sm text-thin text-slate-500">
                Confirm password:
              </label>
              <input
                className={`w-full px-4 py-1 pl-5 text-thin text-sm text-slate-600 border-0 border-b-[1px] focus:outline-none bg-transparent ${
                  errors.Confirm_password && errors.Confirm_password.message
                    ? " border-red-400"
                    : " border-blue-400"
                }`}
                {...register("Confirm_password")}
                type="password"
                placeholder="password"
              />
              {errors.Confirm_password && (
                <p className="text-red-500 text-xs font-thin">
                  {errors.Confirm_password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start justify-center mt-[18px]">
              <button
                className="w-full text-center font-bold text-lg py-2 border-[1px] border-blue-400 text-blue-400 ease duration-200 hover:bg-blue-400 hover:text-white"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm font-thin text-center mt-5">
              Already have an account?
              <Link className="underline text-sky-500" href={"/auth/login"}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
