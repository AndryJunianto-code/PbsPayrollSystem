import React, { useContext, useState } from "react";
import { VIEW_ENUM } from "../data/enum";

const ViewContext = React.createContext({});


const ViewContextProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState('Employee');
  const [openDrawer, setOpenDrawer] = useState(false);

  const setToEmployee = () => setSelectedView(VIEW_ENUM.EMPLOYEE_VIEW);
  const setToPosition = () => setSelectedView(VIEW_ENUM.POSITION_VIEW);
  return (
    <ViewContext.Provider value={{ setToEmployee,setToPosition,selectedView,openDrawer,setOpenDrawer }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useViewContext = () => {
  return useContext(ViewContext);
};

export { ViewContext, ViewContextProvider };
