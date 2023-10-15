import React from 'react'
import Sidebar from '../layouts/Sidebar/Sidebar';
import {VIEW_ENUM} from '../data/enum';
import EmployeeView from '../components/Employee/EmployeeView';
import PositionView from '../components/Position/PositionView';
import {useViewContext} from '../context/ViewContext';

const Admin = () => {
  const {selectedView} = useViewContext();

  return (
    <>
        <Sidebar/>
        {selectedView === VIEW_ENUM.EMPLOYEE_VIEW && <EmployeeView/>}
        {selectedView === VIEW_ENUM.POSITION_VIEW && <PositionView/>}
    </>
  )
}

export default Admin