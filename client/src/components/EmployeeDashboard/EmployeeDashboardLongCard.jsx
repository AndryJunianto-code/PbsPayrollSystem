import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const EmployeeDashboardLongCard = ({icon,title,backgroundColor,content}) => {
  return (
    <Paper
    sx={{
      padding: "1.2rem 0",
      backgroundColor: "white",
    }}
  >
    <Stack
      direction="row"
      alignItems={"center"}
    >
      <Stack direction={"column"} alignItems={"center"} width={'160px'}>
        <Box
          sx={{
            backgroundColor: {backgroundColor},
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "6px",
            borderRadius: "10px",
            width: "40px",
          }}
        >
          {icon}
        </Box>
        <Typography
          mt="0.6rem"
          color={"black"}
          fontSize={"15px"}
          letterSpacing={"1.5px"}
        >
          {title}
        </Typography>
      </Stack>
      <Divider
        orientation="vertical"
        sx={{ backgroundColor: "black" }}
        flexItem
      />
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}  width={'120px'}>
      <Typography color={"black"} fontSize={"20px"}  textAlign={'center'} >
        {content}
      </Typography>
      </Box>
    </Stack>
  </Paper>
  )
}

export default EmployeeDashboardLongCard