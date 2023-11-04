import { useQuery } from "react-query";
import { getImmunityLogOnWeek } from "../requests/immunityLogRequest";
import getWeekNumber from "../utils/getWeekNumber";

const useGetImmunityLog = (selectedDate) => {
  const week = getWeekNumber(selectedDate);
    const data = useQuery(["getImmunityLogOnWeek", week], getImmunityLogOnWeek, {
        retryDelay: 3000,
      });
    return data;
}

export default useGetImmunityLog;