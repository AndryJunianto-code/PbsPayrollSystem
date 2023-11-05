import axios from "axios";

export const getAllSales = async (obj) => {
  const { data } = await axios.get("/sales/getAllSales");
  return data;
};

export const getSalesByWeek = async (obj) => {
  const { data } = await axios.get(`/sales/getAllSales/${obj.queryKey[1]}`);
  return data;
};

export const createSales = async (obj) => {
  const { data } = await axios.post("/sales", obj);
  return data;
};
