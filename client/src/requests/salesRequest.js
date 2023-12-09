import axios from "axios";

export const getAllSalesByMonth = async (obj) => {
  let date = obj.queryKey[1].split(' ');
  const { data } = await axios.get(`/sales/getAllSalesByMonth/${date[0]}/${date[1]}`);
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
