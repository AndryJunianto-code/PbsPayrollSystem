import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {verifyUser} from '../requests/userRequest';
import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import {useViewContext} from '../context/ViewContext';

const Login = () => {
  const {setIsAuthenticated} = useViewContext();
  const navigate = useNavigate();
  const initialFieldError = {
    username: false,
    password: false,
  };
  const [input,setInput] = useState({username:"",password:""});
  const [fieldError, setFieldError] = useState(initialFieldError);

  const validateField = () => {
    const errors = {};
    if (input.username.trim() === "") {
      errors.username = true;
    }
    if (input.password.trim() === "") {
      errors.password = true;
    }
    return errors;
  }

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const {
    data: userData,
    isSuccess: userSuccess,
    refetch:refetchUser
  } = useQuery(["verifyUser",input.username], verifyUser, { retryDelay: 3000,enabled:false,onSuccess: (data)=> {
    if(data) {
      if(data.password === input.password) {
        setIsAuthenticated(true)
        navigate('/employeeboard');
      } else {
        setFieldError({...fieldError,password:true})
      }
    } else {
      setFieldError({...fieldError,username:true})
    }
  } });
  const handleLogin = (e) => {
    const errors = validateField();
    setFieldError(errors);
    const hasErrors = Object.values(errors).some((error) => error === true);
    
    if(!hasErrors) {
      e.preventDefault();
      refetchUser();
    }
  }
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
          label="Username"
          name='username'
          fullWidth={true}
          error={fieldError.username}
          helperText={fieldError.username && 'Username doesnt exist'}
          sx={{mb:'2rem'}}
          onChange={handleInput}
        />
         <TextField
          required
          type="password"
          label="Password"
          name='password'
          fullWidth={true}
          error={fieldError.password}
          helperText={fieldError.password && 'Invalid Password'}
          sx={{mb:'3rem'}}
          onChange={handleInput}
        />
        <Button onClick={handleLogin} variant='contained' sx={{textTransform:'capitalize',borderRadius:'20px'}} fullWidth={true}>Login</Button>
      </Paper>
    </Box>
  );
};

export default Login;
