"use client";
import Loader from "@/common/components/Loader";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ toBeDeletedId, setDeleteProductModal, reFetch }) => {
  const [loading, setLoading] = useState(false);

  const DeleteHandler = async () => {
    setLoading(true);

    try {
      const token = Cookies.get("token");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/delete-product/${toBeDeletedId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = await axios.request(config);

      if (data?.data?.success) {
        toast.success(data?.data?.message);
        setDeleteProductModal(false);
        reFetch();
        setLoading(false);
        return;
      } else {
        setLoading(false);
        toast.error(data?.data?.message);
      }
    } catch (error) {
      setLoading(false);

      return toast.error("something went wrong");
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="fixed inset-0 min-h-screen min-w-full z-50 flex flex-col items-center justify-center bg-black bg-opacity-20 ">
        <div className="md:w-1/2 p-7 bg-white md:m-0 mx-4">
          <div className="flex  flex-col justify-between w-full ">
            <h3 className="text-center">
              Are you sure you want to delete this Product
            </h3>
            <div className="mt-5 flex justify-center items-center">
              <Button
                onClick={() => setDeleteProductModal(false)}
                colorScheme={"blue"}
                className="mr-4 mb-4"
              >
                Cancel
              </Button>
              <Button
                colorScheme={"red"}
                type="button"
                onClick={DeleteHandler}
                className="mb-4"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
