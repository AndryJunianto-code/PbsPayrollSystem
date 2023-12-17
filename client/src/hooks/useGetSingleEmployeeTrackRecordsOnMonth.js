import { useQuery } from "react-query";
import { getSingleEmployeeTrackRecordsOnMonth } from "../requests/employeeRequest";

const useGetSingleEmployeeTrackRecordsOnMonth = (employeeId,year,month) => {
    const data = useQuery(["getSingleEmployeeTrackRecordsOnMonth", employeeId,year,month], getSingleEmployeeTrackRecordsOnMonth, {
        retryDelay: 3000,
        enabled:true
      });
    return data;
}

export default useGetSingleEmployeeTrackRecordsOnMonth;