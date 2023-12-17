import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import { SubheaderTypography } from './DashboardCustomWidget'

const Minibar = ({title,content,icon,fromColor,toColor}) => {
  return (
    <Paper sx={{mt:'2rem', padding:'1.2rem',background:`linear-gradient(180deg, ${fromColor}, ${toColor});`,width:'285px', height:'95px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
      <Box>
        <SubheaderTypography>{title}</SubheaderTypography>
        <Typography mt='0.5rem' color={'white'} fontSize={'20px'}>{content}</Typography>
        </Box>
        {icon}
    </Paper>
  )
}

export default Minibar