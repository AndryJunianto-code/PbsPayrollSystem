import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

const EmployeeDashboardLeave = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <Paper
          sx={{
            marginTop: "1.5rem",
            height: "175px",
            backgroundColor: "#b2d8f6",
            padding:'1rem'
          }}
        >
          <Typography textAlign={'center'} letterSpacing={'1px'} fontSize={'17px'} mb='2rem'>Paid Leave Left</Typography>
          <Typography textAlign={'center'} fontSize={'30px'} fontWeight={'bold'}>3</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            marginTop: "1.5rem",
            height: "175px",
            backgroundColor: "#c1c0f7",
            padding:'1rem'
          }}
        >
          <Typography textAlign={'center'} letterSpacing={'1px'} fontSize={'17px'} mb='2rem'>MC Left</Typography>
          <Typography textAlign={'center'} fontSize={'30px'} fontWeight={'bold'}>3</Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            marginTop: "1.5rem",
            height: "175px",
            backgroundColor: "#ffe2d7",
            padding:'1rem'
          }}
        >
          <Typography textAlign={'center'} letterSpacing={'1px'} fontSize={'17px'} mb='2rem'>Unpaid Leave Taken</Typography>
          <Typography textAlign={'center'} fontSize={'30px'} fontWeight={'bold'}>11</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EmployeeDashboardLeave;
