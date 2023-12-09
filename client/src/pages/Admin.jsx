import React from 'react'
import Sidebar from '../layouts/Sidebar/Sidebar';
import {VIEW_ENUM} from '../data/enum';
import EmployeeView from '../components/Employee/EmployeeView';
import PositionView from '../components/Position/PositionView';
import DashboardView from '../components/SalesDashboard/DashboardView';
import {useViewContext} from '../context/ViewContext';
import SalesView from '../components/Sales/SalesView';
import AttendanceView from '../components/Attendance/AttendanceView';
import PayslipView from '../components/Payslip/PayslipView';
import ImmunityLogView from '../components/ImmunityLog/ImmunityLogView';
import EmployeeDashboardView from '../components/EmployeeDashboard/EmployeeDashboardView';
import JournalView from '../components/Journal/JournalView';

const Admin = () => {
  const {selectedView} = useViewContext();

  return (
    <>
        <Sidebar/>
        {selectedView === VIEW_ENUM.SALES_DASHBOARD_VIEW && <DashboardView/>}
        {selectedView === VIEW_ENUM.SALES_DASHBOARD_VIEW && <EmployeeDashboardView/>}
        {selectedView === VIEW_ENUM.EMPLOYEE_VIEW && <EmployeeView/>}
        {selectedView === VIEW_ENUM.POSITION_VIEW && <PositionView/>}
        {selectedView === VIEW_ENUM.IMMUNITY_LOG_VIEW && <ImmunityLogView/>}
        {selectedView === VIEW_ENUM.SALES_VIEW && <SalesView/>}
        {selectedView === VIEW_ENUM.PAYSLIP_VIEW && <PayslipView/>}
        {selectedView === VIEW_ENUM.ATTENDANCE_VIEW && <AttendanceView/>}
        {selectedView === VIEW_ENUM.JOURNAL_VIEW && <JournalView/>}
    </>
  )
}

export default Admin