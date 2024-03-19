"use client";
import Loader from "@/common/components/Loader";
import {
  Button,
  Container,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import AddModal from "./AddModal";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [addNewModalStatus, setAddNewModalStatus] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [editValues, setEditValues] = useState({});
  const [toBeDeletedId, setToBeDeletedId] = useState(null);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const productRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/get-products`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (productRes?.data?.success) {
        setData(productRes?.data?.product);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      return toast.error("something went wrong");
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {editProductModal && (
        <AddModal
          setAddNewModalStatus={setEditProductModal}
          type={"Edit"}
          editValues={editValues}
          reFetch={fetchProduct}
        />
      )}
      {addNewModalStatus && (
        <AddModal
          setAddNewModalStatus={setAddNewModalStatus}
          type={"Add"}
          reFetch={fetchProduct}
        />
      )}
      {deleteProductModal && (
        <DeleteModal
          toBeDeletedId={toBeDeletedId}
          setDeleteProductModal={setDeleteProductModal}
          reFetch={fetchProduct}
        />
      )}
      {loading && <Loader />}
      <Container centerContent={true} maxW={"98%"}>
        <div className="mt-6 w-full">
          <div className="justify-end p-6 bg-dark flex  ">
            <Button
              colorScheme="green"
              type="button"
              onClick={() => setAddNewModalStatus(true)}
            >
              Add new Product
            </Button>
          </div>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>sr.no</Th>
                  <Th>Title</Th>
                  <Th isNumeric> Price</Th>
                  <Th> description</Th>
                  <Th> Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((item, ind) => {
                  return (
                    <Tr key={ind}>
                      <Td>{ind + 1}</Td>
                      <Td>{item.title}</Td>
                      <Td isNumeric>{item.price}</Td>
                      <Td className="text-wrap min-w-60">{item.description}</Td>
                      <Td>
                        <Button
                          colorScheme={"green"}
                          className="mr-3"
                          type="button"
                          onClick={() => {
                            setEditValues(
                              data.find((itm) => itm._id === item._id)
                            );
                            return setEditProductModal(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          colorScheme={"red"}
                          onClick={() => {
                            setDeleteProductModal(true);
                            setToBeDeletedId(item._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </Container>
    </>
  );
};

export default Products;
