import { useQuery } from "react-query";
import getWeekNumber from "../utils/getWeekNumber";
import { getAllEmployeeTrackRecords } from "../requests/employeeRequest";

const useGetAllEmployeeTrackRecords = (selectedDate) => {
  const week = getWeekNumber(selectedDate);
    const data = useQuery(["getAllEmployeeTrackRecords", week], getAllEmployeeTrackRecords, {
        retryDelay: 3000,
      });
    return data;
}

export default useGetAllEmployeeTrackRecords;