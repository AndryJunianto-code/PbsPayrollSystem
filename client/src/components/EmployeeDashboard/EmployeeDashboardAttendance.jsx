import { Paper, Typography } from '@mui/material'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const EmployeeDashboardAttendance = () => {
  const data =  [
    { name: 'Jan', paidLeave: 4, unpaidLeave: 1, mc: 0, present: 26 },
    { name: 'Feb', paidLeave: 3, unpaidLeave: 1, mc: 1, present: 23 },
    { name: 'Mar', paidLeave: 4, unpaidLeave: 2, mc: 0, present: 25 },
    { name: 'Apr', paidLeave: 1, unpaidLeave: 1, mc: 2, present: 26 },
    { name: 'May', paidLeave: 0, unpaidLeave: 1, mc: 0, present: 30 },
    { name: 'Jun', paidLeave: 0, unpaidLeave: 0, mc: 2, present: 28 },
    { name: 'Jul', paidLeave: 3, unpaidLeave: 2, mc: 0, present: 26 },
    { name: 'Aug', paidLeave: 0, unpaidLeave: 0, mc: 0, present: 31 },
    { name: 'Sep', paidLeave: 0, unpaidLeave: 0, mc: 0, present: 30 },
    { name: 'Oct', paidLeave: 0, unpaidLeave: 0, mc: 0, present: 31 },
    { name: 'Nov', paidLeave: 1, unpaidLeave: 0, mc: 0, present: 29 },
    { name: 'Dec', paidLeave: 0, unpaidLeave: 1, mc: 2, present: 28 },
  ];
  return (
    <Paper sx={{height:'500px', backgroundColor:'white', padding:'1rem', paddingTop:'1.5rem'}}>
        <Typography fontSize={'18px'} letterSpacing={'1px'} sx={{mb:'1rem'}} textAlign={'center'}>Attendance 2023</Typography>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="present" stackId="a" fill="#0088fe" />
          <Bar dataKey="paidLeave" stackId="a" fill="#feb930" />
          <Bar dataKey="unpaidLeave" stackId="a" fill="#00c49f" />
          <Bar dataKey="mc" stackId="a" fill="#ff0051" />
        </BarChart>
        </ResponsiveContainer>
    </Paper>
  )
}

export default EmployeeDashboardAttendance