
const useTrackRecordsAlgorithm = (employeeTrackRecordsData) => {
  const data =  employeeTrackRecordsData?.map(emp=> {
    let coreWalletLeft = emp.totalSalesAmount % emp.position.target;
    let immunityEarned = Math.floor(emp.totalSalesAmount / emp.position.target);
    let finalImmunity = emp.immunityLog.immunity + immunityEarned;

    let revenuePointEarned = emp.totalSalesAmount * 2;
    let finalRevenuePoint = emp.immunityLog.revenuePoint + revenuePointEarned;
    return {
        ...emp,
        earned: {coreWalletLeft,immunityEarned,finalImmunity,revenuePointEarned,finalRevenuePoint}
    }
  })
  return data;
}

export default useTrackRecordsAlgorithm;