import React from 'react'
import Sidebar from '../layouts/Sidebar/Sidebar';
import {VIEW_ENUM} from '../data/enum';
import EmployeeView from '../components/Employee/EmployeeView';
import PositionView from '../components/Position/PositionView';
import DashboardView from '../components/Dashboard/DashboardView';
import {useViewContext} from '../context/ViewContext';
import SalesView from '../components/Sales/SalesView';

const Admin = () => {
  const {selectedView} = useViewContext();

  return (
    <>
        <Sidebar/>
        {selectedView === VIEW_ENUM.DASHBOARD_VIEW && <DashboardView/>}
        {selectedView === VIEW_ENUM.EMPLOYEE_VIEW && <EmployeeView/>}
        {selectedView === VIEW_ENUM.POSITION_VIEW && <PositionView/>}
        {selectedView === VIEW_ENUM.SALES_VIEW && <SalesView/>}
    </>
  )
}

export default Admin