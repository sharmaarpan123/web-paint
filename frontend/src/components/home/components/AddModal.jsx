import Loader from "@/common/components/Loader";
import { Button, Input } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, { message: "Title  is required" }),
  description: z
    .string()
    .max(200, {
      message: "description must not be  greater then  30 characters",
    })
    .min(1, { message: "description  is required" }),
  price: z.string().min(1, { message: "Price is required" }),
});
const AddModal = ({ setAddNewModalStatus, type, editValues, reFetch }) => {
  const [updatedValues, setUpdatedValues] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: "",
    },
    values: updatedValues,
  });

  useEffect(() => {
    if (type === "Edit") {
      setUpdatedValues({
        title: editValues?.title,
        description: editValues?.description,
        price: editValues?.price,
      });
    }
  }, [type, editValues]);

  const onSubmit = async (FormData) => {
    try {
      setLoading(true);

      const token = Cookies.get("token");
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${
          type === "Add" ? "add" : "edit"
        }-product`,
        {
          title: FormData.title,
          description: FormData.description,
          price: FormData.price,
          ...(type === "Edit" && { productId: editValues?._id }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.data?.success) {
        toast.success(data?.data?.message);
        setLoading(false);
        setAddNewModalStatus(false);
        reFetch();
        return;
      }
      toast.error(data?.data?.message);
      return setLoading(false);
    } catch (error) {
      return toast.error("something went wrong");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 min-h-screen min-w-full z-50 flex flex-col items-center justify-center bg-black bg-opacity-20 ">
        <div className="md:w-1/2 p-7 bg-white md:m-0 mx-4">
          <div className="flex justify-between w-full ">
            <h3>{type} Product</h3>
            <Button
              colorScheme={"red"}
              type="button"
              onClick={() => setAddNewModalStatus(false)}
            >
              X
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">Title</label>
              <Input placeholder="Title" type="text" {...register("title")} />
              {errors.title && (
                <p className="text-red-600">{errors?.title?.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">Description</label>
              <Input
                placeholder="Description"
                type="text"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-600">{errors?.description?.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className=" text-gray-600 text-sm ">Price</label>
              <Input placeholder="Price" type="number" {...register("price")} />
              {errors.price && (
                <p className="text-red-600">{errors?.price?.message}</p>
              )}
            </div>

            <div className="mb-4">
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddModal;
