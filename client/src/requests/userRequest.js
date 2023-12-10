import axios from "axios";

export const verifyUser = async (obj) => {
  const { data } = await axios.get(`/user/verifyUser/${obj.queryKey[1]}`);
  return data;
};
