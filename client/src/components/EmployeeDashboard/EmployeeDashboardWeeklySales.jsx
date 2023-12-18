import { Paper, Typography } from '@mui/material'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts'

const EmployeeDashboardWeeklySales = () => {
    const data = [
        {
            name: 'Week 41',
            amount: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Week 42',
            amount: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Week 43',
            amount: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: 'Week 44',
            amount: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            name: 'Week 45',
            amount: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            name: 'Week 46',
            amount: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            name: 'Week 47',
            amount: 3490,
            pv: 4300,
            amt: 2100,
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