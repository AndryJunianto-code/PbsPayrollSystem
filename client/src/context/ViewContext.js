import React, { useContext, useState } from "react";
import { VIEW_ENUM } from "../data/enum";

const ViewContext = React.createContext({});


const ViewContextProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState('Dashboard');
  const [openDrawer, setOpenDrawer] = useState(false);

  const setToDashboard = () => setSelectedView(VIEW_ENUM.DASHBOARD_VIEW);
  const setToEmployee = () => setSelectedView(VIEW_ENUM.EMPLOYEE_VIEW);
  const setToPosition = () => setSelectedView(VIEW_ENUM.POSITION_VIEW);
  const setToSales = () => setSelectedView(VIEW_ENUM.SALES_VIEW);
  return (
    <ViewContext.Provider value={{ setToDashboard,setToEmployee,setToPosition,setToSales,selectedView,openDrawer,setOpenDrawer }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};

export { ViewContext, ViewContextProvider };
