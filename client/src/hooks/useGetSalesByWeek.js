import { useQuery } from "react-query";
import { getSalesByWeek } from "../requests/salesRequest";
import getWeekNumber from "../utils/getWeekNumber";

const useGetSalesByWeek = (selectedDate) => {
  const week = getWeekNumber(selectedDate);
    const data = useQuery(["getSalesByWeekly", week], getSalesByWeek, {
        retryDelay: 3000,
      });
    return data;
}

export default useGetSalesByWeek;