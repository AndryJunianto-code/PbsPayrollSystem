import axios from "axios";

export const getAllSales = async (obj) => {
  const { data } = await axios.get("/sales/getAllSales");
  return data;
};

export const createSales = async (obj) => {
  const { data } = await axios.post("/sales", obj);
  return data;
};
