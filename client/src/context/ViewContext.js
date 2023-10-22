import React, { useContext, useState } from "react";
import { VIEW_ENUM } from "../data/enum";

const ViewContext = React.createContext({});


const ViewContextProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState('Immunity Log');
  const [openDrawer, setOpenDrawer] = useState(false);

  const setToDashboard = () => setSelectedView(VIEW_ENUM.DASHBOARD_VIEW);
  const setToEmployee = () => setSelectedView(VIEW_ENUM.EMPLOYEE_VIEW);
  const setToPosition = () => setSelectedView(VIEW_ENUM.POSITION_VIEW);
  const setToImmunityLog = () => setSelectedView(VIEW_ENUM.IMMUNITY_LOG_VIEW);
  const setToSales = () => setSelectedView(VIEW_ENUM.SALES_VIEW);
  const setToPayslip = () => setSelectedView(VIEW_ENUM.PAYSLIP_VIEW);
  const setToAttendance = () => setSelectedView(VIEW_ENUM.ATTENDANCE_VIEW);
  const setToAttendanceSummary = () => setSelectedView(VIEW_ENUM.ATTENDANCE_SUMMARY_VIEW);
  return (
    <ViewContext.Provider value={{ setToDashboard,setToEmployee,setToPosition,setToImmunityLog,setToSales,setToPayslip,setToAttendance,setToAttendanceSummary,selectedView,openDrawer,setOpenDrawer }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};

export { ViewContext, ViewContextProvider };
