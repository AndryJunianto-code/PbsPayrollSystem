import { useMutation } from "react-query";
import { createEmployeePositionHistory } from "../requests/employeePositionHistoryRequest";



const useTrackRecordsAlgorithm = (employeeTrackRecordsData,weekNumber,selectedDate) => {
  const { mutate: mutateEmployeePositionHistory } = useMutation(
    createEmployeePositionHistory
  );
  const data = [];
  employeeTrackRecordsData?.map(emp=> {
    if(!emp.immunityLog) {
      return null;
    } else {
      let currentImmunity = emp.immunityLog.immunity;
      let currentPromotion = emp.immunityLog.promotionPoint;
      let coreWallet = emp.immunityLog.coreWallet;
      let immunityEarned = 0;
      let rank = emp.position.rank;
      let promotionStatus = 'None';
      let revenuePoint = 0;
      if(emp.totalSalesAmount === 0) { //nosales
        currentImmunity -= 1;
        currentPromotion = currentPromotion - 1 < 0 ? 0 : currentPromotion - 1;
        if(currentImmunity === 0 && emp.position.title !== 'Probation') {
          rank += 1;
          promotionStatus = 'Demote'
          currentImmunity = 4;
          currentPromotion = 0;
        }
      } else {
          let totalMoney = coreWallet + emp.totalSalesAmount;
          coreWallet = totalMoney % emp.position.target;
          revenuePoint = totalMoney * 2;

          if(totalMoney >= emp.position.target) { //hit target
            immunityEarned = Math.floor(totalMoney / emp.position.target);
            currentImmunity += immunityEarned;
            currentPromotion += immunityEarned;

            if(currentPromotion >= emp.position.promotionTarget) {
              rank -= 1;
              promotionStatus = 'Promote'
              currentImmunity = 4;
              currentPromotion = 0;
              coreWallet = 0;
            }
          } else if(totalMoney < emp.position.target) { //got sales but no hit
              currentImmunity -= 1;
              currentPromotion = currentPromotion - 1 < 0 ? 0 : currentPromotion - 1;
              if(currentImmunity === 0 && emp.position.title !== 'Probation') {
                rank += 1;
                promotionStatus = 'Demote';
                currentImmunity = 4;
                currentPromotion = 0;
              }
          }
      }
      data.push ({
        name:emp.name,
        position:emp.position.title,
        immunity:currentImmunity, 
        promotionPoint:currentPromotion,
        coreWallet,
        immunityEarned,
        revenuePoint,
        rank,
        employeeId:emp.id,
        promotionStatus,
        prevImmunity:emp.immunityLog.immunity,
        prevPromotion:emp.immunityLog.promotionPoint,
        lead:emp.immunityLog.lead,
        week:weekNumber,
        date:selectedDate
      })
    }
  })
  return data;
}

export default useTrackRecordsAlgorithm;


/* let coreWalletLeft = emp.totalSalesAmount % emp.position.target;
    let immunityEarned = Math.floor(emp.totalSalesAmount / emp.position.target);
    let finalImmunity = emp.immunityLog.immunity + immunityEarned;

    let revenuePointEarned = emp.totalSalesAmount * 2;
    let finalRevenuePoint = emp.immunityLog.revenuePoint + revenuePointEarned;
    return {
        ...emp,
        earned: {coreWalletLeft,immunityEarned,finalImmunity,revenuePointEarned,finalRevenuePoint}
    } */