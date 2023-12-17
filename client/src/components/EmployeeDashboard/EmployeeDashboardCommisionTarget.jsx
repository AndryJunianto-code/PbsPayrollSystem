import { Box, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const EmployeeDashboardCommisionTarget = () => {
  return (
    <Paper sx={{height:'500px', backgroundColor:'white'}}>
        <Box sx={{padding:'1rem',}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Commission</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={50} color='basicGreen' sx={{width:'88%'}} />
            <Typography fontSize={'12px'}>50%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            10000 / 16000
        </Typography>
        </Box>  

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>2nd Tier Commission</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={20} color='basicPink' sx={{width:'88%'}} />
            <Typography fontSize={'12px'}>20%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            10000 / 32000
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Quarter</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={15} color='basicLightBlue' sx={{width:'88%'}} />
            <Typography fontSize={'12px'}>15%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            10000 / 64000
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>1st Tier Quarter</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={9} color='basicPurple' sx={{width:'88%'}} />
            <Typography fontSize={'12px'}>9%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            10000 / 81000
        </Typography>
        </Box>   

        <Box sx={{padding:'1rem'}}>
        <Typography mb='0.2rem' letterSpacing={'1px'} fontSize={'15px'}>Champion Award</Typography>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <LinearProgress variant="determinate" value={33} color='basicPeach' sx={{width:'88%'}} />
            <Typography fontSize={'12px'}>33%</Typography>
        </Stack>     
        <Typography fontSize={'12px'}>
            10000 / 30000
        </Typography>
        </Box>   
    </Paper>
  )
}

export default EmployeeDashboardCommisionTarget