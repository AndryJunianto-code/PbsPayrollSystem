import axios from "axios";


export const bulkCreateAdjustment = async (obj) => {
  console.log(obj)
  const { data } = await axios.post("/adjustment/bulk", obj);
  return data;
};
