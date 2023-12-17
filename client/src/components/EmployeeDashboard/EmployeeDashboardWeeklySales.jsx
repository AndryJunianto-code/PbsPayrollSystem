import { Paper, Typography } from '@mui/material'
import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, } from 'recharts'

const EmployeeDashboardWeeklySales = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
          },
          {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
          },
          {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
          },
          {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
          },
          {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
          },
          {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
          },
          {
            name: 'Page G',
            uv: 3490,
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
          <Line type="monotone" dataKey="pv" stroke="#42d2bf"  strokeWidth={3} />
        </LineChart>
        </ResponsiveContainer>
    </Paper>
  )
}

export default EmployeeDashboardWeeklySales