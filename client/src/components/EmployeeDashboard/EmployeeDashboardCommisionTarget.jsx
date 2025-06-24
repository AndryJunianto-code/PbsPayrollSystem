import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const EmployeeDashboardCommisionTarget = ({employee}) => {
  const target = employee && employee.employeePositionHistory[0].position
  const tempRevPoint = 11000
  return (
    <Paper sx={{height:'500px', backgroundColor:'white'}}>
        <Box sx={{padding:'1rem',}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Commission</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={68.7} color='basicGreen' sx={{width:'86%'}} />
            <Typography fontSize={'12px'}>68.7%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            {tempRevPoint} / {target.monthlyCommisionFirstTier}
        </Typography>
        </Box>  

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>2nd Tier Commission</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={44} color='basicPink' sx={{width:'86%'}} />
            <Typography fontSize={'12px'}>44%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            {tempRevPoint} / {target.monthlyCommisionSecondTier}
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Quarter</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={26.8} color='basicLightBlue' sx={{width:'86%'}} />
            <Typography fontSize={'12px'}>26.8%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            {tempRevPoint} / {target.quarterBonusFirstTier}
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Quarter</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={20} color='basicPurple' sx={{width:'86%'}} />
            <Typography fontSize={'12px'}>20%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            {tempRevPoint} / {target.quarterBonusSecondTier}
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>Champion Award</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={36.6} color='basicPeach' sx={{width:'86%'}} />
            <Typography fontSize={'12px'}>36.6%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            {tempRevPoint} / 30000
        </Typography>
        </Box>   
    </Paper>
  )
}

export default EmployeeDashboardCommisionTarget