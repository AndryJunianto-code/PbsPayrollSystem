import { Paper, Typography } from '@mui/material'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts'

const EmployeeDashboardWeeklySales = () => {
    const data = [
        {
            name: 'Week 44',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 45',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 46',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 47',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 48',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 49',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
          {
            name: 'Week 50',
            amount: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
          },
    ]
  return (
    <Paper sx={{padding:'1rem',backgroundColor:'white', height:'300px'}}>
        <Typography fontSize={'18px'} letterSpacing={'1px'} sx={{mb:'1rem'}}>Weekly Sales</Typography>
        <ResponsiveContainer height={'90%'}>
      <LineChart 
       data={data}>
        <CartesianGrid vertical={false}/>
        <XAxis dataKey={'name'} fontWeight={'600'} fontSize={'14px'}/>
        <YAxis fontWeight={'600'} fontSize={'11px'}/>
        <Tooltip/>
          <Line type="monotone" dataKey="amount" stroke="#42d2bf"  strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </Paper>
  )
}

export default EmployeeDashboardWeeklySales