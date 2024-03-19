"use client";
import React, { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "@/common/components/Loader";
import axios from "axios";

const schema = z
  .object({
    fullName: z.string().min(1, { message: "Full Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
  });

  const onSubmit = async (FormData) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-up`,
        {
          email: FormData?.email,
          password: FormData?.password,
          fullName: FormData?.fullName,
        }
      );

      if (res?.data?.success) {
        setLoading(false);
        return toast.success(res?.data.message);
      }
      setLoading(false);
      toast.error(res?.data.message);
    } catch (error) {
      setLoading(false);
      return toast.error("something went wrong");
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">Full Name</label>
              <Input
                placeholder="Full Name"
                type="text"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-600">{errors.fullName.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">Email</label>
              <Input placeholder="Email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">PassWord</label>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">
                Confirm PassWord
              </label>
              <Input
                placeholder="Confirm Password"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </div>
          </form>
          <div className="mb-4">
            <h3 className=" font-semibold">{"Already Have account ?"} </h3>
            <Link href="signin" className="hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
