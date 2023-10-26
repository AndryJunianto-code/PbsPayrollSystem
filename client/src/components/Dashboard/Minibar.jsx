import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { SubheaderTypography } from './DashboardCustomWidget'

const Minibar = ({title,content,contentColor,icon}) => {
  return (
    <Paper sx={{mt:'2rem', padding:'1.2rem',backgroundColor:'white',width:'285px', height:'95px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <Box>
        <SubheaderTypography>{title}</SubheaderTypography>
        <Typography mt='0.5rem' color={contentColor} fontSize={'20px'}>{content}</Typography>
        </Box>
        {icon}
    </Paper>
  )
}

export default Minibar