import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Theme from "./assets/styles/theme";
import Login from "./pages/Login";
import ProtectedRoute from './auth/ProtectedRoute';
import DashboardView from "./components/SalesDashboard/DashboardView";
import EmployeeDashboardView from "./components/EmployeeDashboard/EmployeeDashboardView";
import EmployeeView from "./components/Employee/EmployeeView";
import PositionView from "./components/Position/PositionView";
import SalesView from "./components/Sales/SalesView";
import ImmunityLogView from "./components/ImmunityLog/ImmunityLogView";
import PayslipView from "./components/Payslip/PayslipView";
import AttendanceView from "./components/Attendance/AttendanceView";
import JournalView from "./components/Journal/JournalView";

function App() {
  return (
    <Theme>
      <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/salesboard' element={<ProtectedRoute element={<DashboardView/>}/>}/>
            <Route path='/employeeboard' element={<ProtectedRoute element={<EmployeeDashboardView/>}/>}/>
            <Route path='/employee' element={<ProtectedRoute element={<EmployeeView/>}/>}/>
            <Route path='/position' element={<ProtectedRoute element={<PositionView/>}/>}/>
            <Route path='/sales' element={<ProtectedRoute element={<SalesView/>}/>}/>
            <Route path='/immunitylog' element={<ProtectedRoute element={<ImmunityLogView/>}/>}/>
            <Route path='/payslip' element={<ProtectedRoute element={<PayslipView/>}/>}/>
            <Route path='/attendance' element={<ProtectedRoute element={<AttendanceView/>}/>}/>
            <Route path='/journal' element={<ProtectedRoute element={<JournalView/>}/>}/>
          </Routes>
      </Router>
    </Theme>
  );
}

export default App;
