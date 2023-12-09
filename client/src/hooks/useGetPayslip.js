import { useQuery } from "react-query";
import getMonthYear from "../utils/getMonthYear";
import { getAllPayslipByMonth } from "../requests/payslipRequest";

const useGetPayslip = (selectedDate) => {
  const monthYear = getMonthYear(selectedDate);
  
  const data = useQuery(["getAllPayslipByMonth", monthYear], getAllPayslipByMonth, { retryDelay: 3000 });
  return data;
}

export default useGetPayslip;