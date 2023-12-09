import { useQuery } from "react-query";
import getMonthYear from "../utils/getMonthYear";
import { getTotalIncomeByMonth } from "../requests/payslipRequest";

const useGetTotalPayslipAmount = (selectedDate) => {
  const monthYear = getMonthYear(selectedDate);
  
  const data = useQuery(["getTotalIncomeByMonth", monthYear], getTotalIncomeByMonth, { retryDelay: 3000 });
  return data;
}

export default useGetTotalPayslipAmount;