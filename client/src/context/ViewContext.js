import React, { useContext, useState } from "react";
import { VIEW_ENUM } from "../data/enum";

const ViewContext = React.createContext({});


const ViewContextProvider = ({ children }) => {
  const [isAuthenticated,setIsAuthenticated] = useState(true);
  const [selectedView, setSelectedView] = useState('Sales Board');
  const [openDrawer, setOpenDrawer] = useState(true);

  const setToSalesDashboard = () => setSelectedView(VIEW_ENUM.SALES_DASHBOARD_VIEW);
  const setToEmployeeDashboard = () => setSelectedView(VIEW_ENUM.EMPLOYEE_DASHBOARD_VIEW);
  const setToEmployee = () => setSelectedView(VIEW_ENUM.EMPLOYEE_VIEW);
  const setToPosition = () => setSelectedView(VIEW_ENUM.POSITION_VIEW);
  const setToImmunityLog = () => setSelectedView(VIEW_ENUM.IMMUNITY_LOG_VIEW);
  const setToSales = () => setSelectedView(VIEW_ENUM.SALES_VIEW);
  const setToPayslip = () => setSelectedView(VIEW_ENUM.PAYSLIP_VIEW);
  const setToAttendance = () => setSelectedView(VIEW_ENUM.ATTENDANCE_VIEW);
  const setToJournal = () => setSelectedView(VIEW_ENUM.JOURNAL_VIEW);
  return (
    <ViewContext.Provider value={{isAuthenticated,setIsAuthenticated,setToSalesDashboard,setToEmployeeDashboard,setToEmployee,setToPosition,setToImmunityLog,setToSales,setToPayslip,setToAttendance,setToJournal,selectedView,openDrawer,setOpenDrawer }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};

export { ViewContext, ViewContextProvider };
