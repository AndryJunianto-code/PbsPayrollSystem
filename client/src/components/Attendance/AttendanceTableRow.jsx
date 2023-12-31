import React, { useEffect, useState } from 'react'
import {
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    TableRow,
    Typography,
  } from "@mui/material";
import { CalendarTodayOutlined } from "@mui/icons-material";
import AttendanceTableCell from './AttendanceTableCell';
import dayjs from 'dayjs';


const AttendanceTableRow = ({attendance,setIsChanged,setAttendanceInput,isConfirm,setIsConfirm}) => {
    const initialState =  ({
      id:attendance.id,
      date: attendance.date,
      workingHour:attendance.workingHour,
      reimbursedHour:attendance.reimbursedHour,
      status: attendance.status,
    })
    const [input,setInput] = useState(initialState);
    const handleInput = (e) => {
      let value = e.target.value;
      if(value.trim() === "") {
        value = 0;
      }
      setIsChanged(true);
      setInput({ ...input, [e.target.name]: value });
    }
    useEffect(()=> {
      if(isConfirm) {
        setAttendanceInput((prev)=> [...prev,input]);
      }
      return () => setIsConfirm(false);
    },[isConfirm])
  return (
    <TableRow key={attendance.id}>
                    <AttendanceTableCell isData={true}>
                      <Stack direction="row" alignItems={"center"}>
                        <CalendarTodayOutlined
                          sx={{ color: "gray", fontSize: "16px", mr: "0.3rem" }}
                        />
                        <Typography>{dayjs(attendance.date).format('DD MMM YYYY')}</Typography>
                      </Stack>
                    </AttendanceTableCell>
                    
                    <AttendanceTableCell isData={true}>{attendance?.employee?.name} ({attendance?.employeeId})</AttendanceTableCell>

                    <AttendanceTableCell >
                      <OutlinedInput
                        sx={{ fontSize: "12px"}}
                        type="number"
                        name='workingHour'
                        onChange={handleInput}
                        value={input.workingHour}
                        endAdornment={
                          <InputAdornment position="end">h</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "wh",
                        }}
                      />
                    </AttendanceTableCell>

                    <AttendanceTableCell width={200}>
                      <OutlinedInput
                        sx={{ fontSize: "12px"}}
                        type="number"
                        name='reimbursedHour'
                        onChange={handleInput}
                        value={input.reimbursedHour}
                        endAdornment={
                          <InputAdornment position="end">h</InputAdornment>
                        }
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                          "aria-label": "rh",
                        }}
                      />
                    </AttendanceTableCell>
                    
                    <AttendanceTableCell >
                      <Select fullWidth name='status' onChange={handleInput} value={input.status}>
                        <MenuItem value='Present'>Present</MenuItem>
                        <MenuItem value='Paid Leave'>Paid Leave</MenuItem>
                        <MenuItem value='Unpaid Leave'>Unpaid Leave</MenuItem>
                        <MenuItem value='MC'>MC</MenuItem>
                      </Select>
                    </AttendanceTableCell>
                  </TableRow>
  )
}

export default AttendanceTableRow