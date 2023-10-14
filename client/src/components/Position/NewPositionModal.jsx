import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { basicModalStyle } from "../../assets/styles/styles";
import { useMutation } from "react-query";
import { createPosition } from "../../requests/positionRequest";

const NewPositionModal = ({
  openPosModal,
  setOpenPosModal,
  refetchPosition,
}) => {
  const initialState = {
    title: "",
    salary: "",
    target: 0,
    promotionTarget: 0,
    monthlyCommisionFirstTier: 0,
    monthlyCommisionSecondTier:0,
    quarterBonusFirstTier:0,
    quarterBonusSecondTier:0
  }
  const initialFieldError = {title:false,salary:false}
  const [input,setInput] = useState(initialState)
  const [fieldError,setFieldError] = useState(initialFieldError)

  const handleInput = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  };
  const handleClosePosModal = () => {
    setOpenPosModal(false)
    setFieldError(initialFieldError)
  }

  const validateField = () => {
    const errors = {};
    if (input.title.toString().trim() === "") {errors.title = true};
    if (input.salary.toString().trim() === "" || parseInt(input.salary) <= 0) {errors.salary = true};
    return errors;
  }
  
  const {mutate:mutatePosition} = useMutation(createPosition)
  const handleCreatePosition = (e) => {
    const errors = validateField();
    setFieldError(errors);
    const hasErrors = Object.values(errors).some((error) => error === true);

    if(!hasErrors) {
      e.preventDefault();
      const {title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier} = input
      mutatePosition(
      {title,salary,target,promotionTarget,monthlyCommisionFirstTier,monthlyCommisionSecondTier,quarterBonusFirstTier,quarterBonusSecondTier},
      {
        onSuccess: (data) => {
          refetchPosition();
          handleClosePosModal();
          setInput(initialState)
        }
      }
     ) 
    }
  }
  
  return (
    <Modal
      open={openPosModal}
      onClose={handleClosePosModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={basicModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Position
        </Typography>
        <Box mt="2rem">
          <TextField
            required
            fullWidth
            error={fieldError.title}
            id="outlined-required"
            label="Title"
            name="title"
            onChange={handleInput}
          />
          <Stack direction="row" my="2rem" flex={5}>
            <FormControl required sx={{ flex: 2 }} onChange={handleInput} error={fieldError.salary}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Salary
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">Rp</InputAdornment>
                }
                label="Amount"
                name='salary'
              />
            </FormControl>
            <FormControl sx={{ flex:2,mx:'1rem' }} onChange={handleInput}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Target
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                name='target'
              />
            </FormControl>
            <TextField
              id="outlined"
              label="Promotion"
              type="number"
              name="promotionTarget"
              onChange={handleInput}
              sx={{flex:1}}
            />
          </Stack>
          <Stack direction="row">
            <TextField
              id="outlined"
              label="1st Tier Comm"
              type="number"
              onChange={handleInput}
              name='monthlyCommisionFirstTier'
            />
            <TextField
              id="outlined"
              label="2nd Tier Comm"
              type="number"
              onChange={handleInput}
              name='monthlyCommisionSecondTier'
              sx={{ mx: "1rem" }}
            />
            <TextField
              id="outlined"
              label="1st Tier Quarter"
              type="number"
              onChange={handleInput}
              name='quarterBonusFirstTier'
              sx={{ mr: "1rem" }}
            />
            <TextField
              id="outlined"
              label="2nd Tier Quarter"
              type="number"
              onChange={handleInput}
              name='quarterBonusSecondTier'
            />
          </Stack>
        </Box>
        <Button
          onClick={handleCreatePosition}
          variant="contained"
          sx={{ float: "right", mt: "3rem" }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default NewPositionModal;
