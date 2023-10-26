import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
 
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#42d2bf",
        position: "relative",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "white",
          height: "450px",
          width: "400px",
          padding: "3rem",
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
      >
        <Typography mb='3rem' textAlign={"center"} fontSize={"2rem"} fontWeight={"bold"}>
          PBS Payroll System
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Username"
          fullWidth={true}
          sx={{mb:'2rem'}}
        />
         <TextField
          required
          type="password"
          id="outlined-required"
          label="Password"
          fullWidth={true}
          sx={{mb:'3rem'}}
        />
        <Link to='/admin'>
        <Button variant='contained' sx={{textTransform:'capitalize',borderRadius:'20px'}} fullWidth={true}>Login</Button>
        </Link>
      </Paper>
    </Box>
  );
};

export default Login;
