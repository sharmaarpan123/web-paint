"use client";
import React, { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loader from "@/common/components/Loader";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const SignIn = () => {
  const router = useRouter();
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
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
        {
          email: FormData?.email,
          password: FormData?.password,
        }
      );

      if (data?.data?.success) {
        Cookies.set("token", data.data.token);
        toast.success(data?.data?.message);
        setLoading(false);
        return router.push("/");
      }
      toast.error(data?.data?.message);
      setLoading(false);
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
            <h1 className="text-2xl font-semibold">Sign In</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </div>
          </form>
          <div className="mb-4">
            <h3 className=" font-semibold">{"Don't Have account ?"} </h3>
            <Link href="signup" className="hover:underline">
              Sign-up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
