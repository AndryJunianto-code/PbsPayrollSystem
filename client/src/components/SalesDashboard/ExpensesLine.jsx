import React, { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Paper, Stack, Typography } from "@mui/material";
import { useQuery } from 'react-query';
import { getTotalPayslipYearly } from '../../requests/payslipRequest';

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const RevenueLine = () => {
  const [data,setData] = useState([])
  const {
    data: totalPayslipData,
  } = useQuery(["getTotalPayslipYearly", 2023], getTotalPayslipYearly, { retryDelay: 3000 });

  useEffect(()=> {
    if(totalPayslipData !== null) {
      months.map((month,index)=> {
      const includedMonth = totalPayslipData?.filter(item => item.month === index+1);
      if(includedMonth?.length > 0) {
        setData((prev)=> [...prev,{name:month,2023:includedMonth[0]?.totalSalary,2022:Math.floor(Math.random() * (30000-5000 +1) + 5000)}])
      } else {
        setData((prev)=> [...prev,{name:month,2023:0,2022:Math.floor(Math.random() * (100000000-5000 +1) + 5000)}])
      }
     })
    }
    return () => setData([])
  },[totalPayslipData])
  return (
    <Paper sx={{mt:'2rem', padding:'1rem',backgroundColor:'white', height:'500px'}}>
        <Typography fontSize={'18px'}>Expenses</Typography>
        <Stack direction='row' mb='1rem'>
          <Stack direction='column' mr='3rem'>
            <Typography color={"#7a7e8f"}>Current year</Typography>
            <Typography color={'#ff4961'} fontSize={'24px'}>$50,124</Typography>
          </Stack>
          <Stack direction='column'>
            <Typography color={"#7a7e8f"}>Previous year</Typography>
            <Typography color={'#7a7e8f'} fontSize={'24px'}>$48,102</Typography>
          </Stack>
        </Stack>
      <ResponsiveContainer height={'80%'}>
      <LineChart 
       data={data}>
        <CartesianGrid vertical={false}/>
        <XAxis dataKey={'name'} fontWeight={'600'} fontSize={'14px'}/>
        <YAxis fontWeight={'600'} fontSize={'11px'}/>
        <Tooltip/>
          <Line type="monotone" dataKey="2023" stroke="#ff4961"  strokeWidth={3} />
          <Line type="monotone" dataKey="2022" stroke="#c2c2c2" strokeWidth={3} strokeDasharray={"7 7"}/>
        </LineChart>
        </ResponsiveContainer>
        </Paper>
  )
}

export default RevenueLine