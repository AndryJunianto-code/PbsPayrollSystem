import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const EmployeeDashboardDetails = ({employee}) => {
  console.log(employee)
  return (
    <Paper sx={{ backgroundColor: "white", height: "237px"}}>
      <Box pt="1rem" px="2rem">
        <Stack direction={"row"} alignItems={"center"}>
          <Typography
            fontWeight={"bold"}
            fontSize={"18px"}
            letterSpacing={"1px"}
            mr="0.8rem"
          >
            {employee.name}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#e9effd",
              padding: "5px 15px",
              color: "#5987ed",
              fontWeight: "bold ",
              fontSize: "12px",
              borderRadius: "4px",
            }}
          >
            {employee.status}
          </Box>
        </Stack>
        <Typography
          color="#898989"
          fontSize={"15px"}
          fontWeight={"bold"}
          letterSpacing={"0.8px"}
        >
          {employee.employeePositionHistory[0].position.title}
        </Typography>
      </Box>
      <Divider sx={{ my: "1rem" }} />
      <Grid container spacing={4} mx='auto'>
        <Grid item xs={4}>
            <Stack direction='column'>
                <Typography color='#898989' fontSize={'10px'}>FULL NAME</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.name}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack direction='column'>
              <Typography color='#898989' fontSize={'10px'}>JOINED DATE</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.joinedDate}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack direction='column'>
            <Typography color='#898989' fontSize={'10px'}>STATUS</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.status}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack direction='column'>
            <Typography color='#898989' fontSize={'10px'}>GENDER</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.gender}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack direction='column'>
            <Typography color='#898989' fontSize={'10px'}>DOB</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.dob}</Typography>
            </Stack>
        </Grid>
        <Grid item xs={4}>
            <Stack direction='column'>
            <Typography color='#898989' fontSize={'10px'}>PHONE NUMBER</Typography>
                <Typography sx={{fontWeight:'800', fontSize:'15px'}}>{employee.phoneNumber}</Typography>
            </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeDashboardDetails;
