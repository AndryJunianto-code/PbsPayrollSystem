import { Box, Paper, Typography } from '@mui/material';
import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Text, Tooltip } from 'recharts';

const EmployeeDashboardPayslip = () => {
    
const data = [
    { name: 'Basic Salary', value: 10000000 },
    { name: 'Commision', value: 2000000 },
    { name: 'Deduction', value: 1000000 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  return (
    <Paper sx={{height:'500px', backgroundColor:'white', padding:'1rem',paddingTop:'1.5rem',position:'relative'}}>
    <Typography fontSize={'18px'} letterSpacing={'1px'}  textAlign={'center'}>Latest Payslip</Typography>
    <Typography fontSize={'14px'} letterSpacing={'1px'} sx={{mb:'1rem'}} textAlign={'center'}>Nov 2023</Typography>
    <ResponsiveContainer width={'100%'} height={'100%'}>
    <PieChart width={400} height={400} >
         <Pie
          data={data}
          cx={280}
          cy={160}
          innerRadius={120}
          outerRadius={140}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >

          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip/>
    </PieChart>
    </ResponsiveContainer>
    <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography fontSize={'20px'} fontWeight={'bold'}>Rp12.100.000</Typography>
      </Box>
    </Paper>
  )
}

export default EmployeeDashboardPayslip