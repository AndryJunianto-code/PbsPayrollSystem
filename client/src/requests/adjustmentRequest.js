import axios from "axios";


export const bulkCreateAdjustment = async (obj) => {
  const { data } = await axios.post("/adjustment/bulk", obj);
  return data;
};
