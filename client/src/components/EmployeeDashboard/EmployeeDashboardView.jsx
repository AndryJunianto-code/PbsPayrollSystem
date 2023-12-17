import {
  Box,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useViewContext } from "../../context/ViewContext";
import EmployeeDashboardDetails from "./EmployeeDashboardDetails";
import EmployeeDashboardTopCards from "./EmployeeDashboardTopCards";
import { getAllEmployee, getSingleEmployeeDashboard } from "../../requests/employeeRequest";
import { useQuery } from "react-query";
import useGetSingleEmployeeTrackRecordsOnMonth from "../../hooks/useGetSingleEmployeeTrackRecordsOnMonth";
import EmployeeDashboardWeeklySales from "./EmployeeDashboardWeeklySales";
import EmployeeDashboardCommisionTarget from "./EmployeeDashboardCommisionTarget";
import EmployeeDashboardLeave from "./EmployeeDashboardLeave";
import EmployeeDashboardAttendance from "./EmployeeDashboardAttendance";
import EmployeeDashboardPayslip from "./EmployeeDashboardPayslip";

const EmployeeDashboardView = () => {
  const { openDrawer } = useViewContext();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const handleSelectEmployeeId = (e) => setSelectedEmployeeId(e.target.value);

  const { data: employeeData, isSuccess: employeeSuccess } = useQuery(
    ["getAllEmployee"],
    getAllEmployee,
    { retryDelay: 3000 }
  );

  const { data: employeeDashboardData } = useQuery(
    ["getSingleEmployeeDashboard",selectedEmployeeId,2023,12],
    getSingleEmployeeDashboard,
    { retryDelay: 3000 }
  );

  useEffect(()=> {
    if(employeeData?.length > 0) {
      setSelectedEmployeeId(employeeData[0]?.id)
    }
  },[employeeData])
  return (
    <>
      {employeeDashboardData && (
        <Box
          sx={{
            pb: "2rem",
            pt: "5rem",
            pl: { xs: "1rem", lg: openDrawer ? "16rem" : "6rem" },
            pr: { xs: "1rem", lg: "2rem" },
            backgroundColor: "#f7f7f7",
          }}
        >
          <FormControl sx={{ mb: "1rem" }}>
            <InputLabel id="demo-simple-select-label">Employee</InputLabel>
            <Select
              label="Employee"
              onChange={handleSelectEmployeeId}
              value={selectedEmployeeId}
              sx={{ width: "10rem" }}
            >
              {employeeData &&
                employeeData?.map((employee) => (
                  <MenuItem key={employee.id} value={employee.id}>
                    {employee.name} | {employee.id}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <EmployeeDashboardDetails employee={employeeDashboardData}/>
            </Grid>
            <Grid item xs={6}>
              <EmployeeDashboardTopCards />
            </Grid>
            <Grid item xs={9} >
              <EmployeeDashboardWeeklySales/>
              <EmployeeDashboardLeave/>
            </Grid>
            
            <Grid item xs={3}>
              <EmployeeDashboardCommisionTarget/>
            </Grid>
           
           <Grid item xs={6}>
              <EmployeeDashboardAttendance/>
           </Grid>

           <Grid item xs={6}>
              <EmployeeDashboardPayslip/>
           </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default EmployeeDashboardView;
