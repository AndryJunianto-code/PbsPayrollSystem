import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Paper, Stack, Typography } from "@mui/material";
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
const data = [];
months.map(month=> {
  const obj = {
    name: month,
    business: Math.floor(Math.random() * (50000-5000 +1) + 5000),
    loan: Math.floor(Math.random() * (50000-5000 +1) + 5000)  ,
    amt: Math.floor(Math.random() * (50000-5000 +1) + 5000)
  }
  data.push(obj)
})
const RevenueLine = () => {
  return (
    <Paper sx={{mt:'2rem', padding:'1rem',backgroundColor:'white', height:'500px'}}>
        <Typography fontSize={'18px'}>Revenue</Typography>
        <Stack direction='row' mb='1rem'>
          <Stack direction='column' mr='3rem'>
            <Typography color={"#7a7e8f"}>Current year</Typography>
            <Typography color={'#34be8d'} fontSize={'24px'}>$82,124</Typography>
          </Stack>
          <Stack direction='column'>
            <Typography color={"#7a7e8f"}>Previous year</Typography>
            <Typography color={'#7a7e8f'} fontSize={'24px'}>$52,102</Typography>
          </Stack>
        </Stack>
      <ResponsiveContainer height={'80%'}>
      <LineChart 
       data={data}>
        <CartesianGrid vertical={false}/>
        <XAxis dataKey={'name'} fontWeight={'600'} fontSize={'14px'}/>
        <YAxis fontWeight={'600'} fontSize={'14px'}/>
        <Tooltip/>
          <Line type="monotone" dataKey="business" stroke="#42d2bf"  strokeWidth={3} />
          <Line type="monotone" dataKey="loan" stroke="#c2c2c2" strokeWidth={3} strokeDasharray={"7 7"}/>
        </LineChart>
        </ResponsiveContainer>
        </Paper>
  )
}

export default RevenueLine