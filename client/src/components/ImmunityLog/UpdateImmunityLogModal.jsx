import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Stack,
    Typography,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { mediumModalStyle } from "../../assets/styles/styles";
  import { getAllEmployeeId } from "../../requests/employeeRequest";
  import { useMutation, useQuery } from "react-query";
  import { createImmunityLog, updateImmunityLog } from "../../requests/immunityLogRequest";
  import dayjs from "dayjs";
  import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import getWeekNumber from "../../utils/getWeekNumber";
  
  const UpdateImmunityLogModal = ({
    openImmunityLogUpdateModal,
    setOpenImmunityLogUpdateModal,
    refetchImmunityLog,
    selectedRow
  }) => {
    const initialState = {
      employeeId: "",
      date: "",
      immunity: 0,
      lead: 0,
      coreWallet: 0,
      supplementWallet: 0,
      promotionPoint: 0,
      revenuePoint: 0,
    };
    const initialFieldError = {
      date: false,
      immunity:false,
      lead:false,
      coreWallet:false,
      supplementWallet:false,
      promotionPoint:false,
      revenuePoint:false
    };
    const [input, setInput] = useState(initialState);
    const [fieldError, setFieldError] = useState(initialFieldError);
  
    const handleCloseImmunityLogUpdateModal = () => setOpenImmunityLogUpdateModal(false);
    const handleInput = (e) =>
      setInput({ ...input, [e.target.name]: e.target.value });

      const validateField = () => {
        const errors = {};
        if (
          input.date.toString().trim() === "" ||
          input.date.toString() === "Invalid Date"
        ) {
          errors.date = true;
        }
        if (input.immunity.toString().trim() === "") {
          errors.immunity = true;
        }
        if (input.lead.toString().trim() === "" || parseInt(input.lead) < 0 ) {
          errors.lead = true;
        }
        if (input.coreWallet.toString().trim() === "" || parseInt(input.coreWallet) < 0 ) {
          errors.coreWallet = true;
        }
        if (input.supplementWallet.toString().trim() === "" || parseInt(input.supplementWallet) < 0 ) {
          errors.supplementWallet = true;
        }
        if (input.promotionPoint.toString().trim() === "" ) {
          errors.promotionPoint = true;
        }
        if (input.revenuePoint.toString().trim() === "" || parseInt(input.revenuePoint) < 0 ) {
          errors.revenuePoint = true;
        }
        return errors;
      };
  
    const { data: employeeIdData, isSuccess: employeeIdSuccess } = useQuery(
      ["getAllEmployeeId"],
      getAllEmployeeId,
      { retryDelay: 3000 }
    );
        
    const { mutate: mutateImmunityLog } = useMutation(updateImmunityLog);
    const handleUpdateImmunityLog = () => {
      const errors = validateField();
      setFieldError(errors);
      const hasErrors = Object.values(errors).some((error) => error === true);

      if(!hasErrors) {
        mutateImmunityLog({id:selectedRow?.row.id, ...input}, {
            onSuccess: ()=> {
              handleCloseImmunityLogUpdateModal();
              refetchImmunityLog();
            }
          })
      }
    };
  
  
    const handleImmunityLogDate = (selectedDate) => {
      setInput({
        ...input,
        date: selectedDate
      });
    };
    
    useEffect(() => {
        if(selectedRow !== null) {
          setInput({...selectedRow.row,date:dayjs(selectedRow.row?.date).toDate()});
        }
        return () => {
         setInput(initialState) 
         /* setFieldError(initialFieldError) */
       }
       }, [selectedRow]);
    return (
      <Modal
        open={openImmunityLogUpdateModal}
        onClose={handleCloseImmunityLogUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mediumModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Immunity Log
          </Typography>
          <Box mt="2rem">
            <Stack direction="row" justifyContent={"space-between"} flex={2}>
              <FormControl sx={{ flex: 1, mr: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select
                  label="Employee"
                  name="employeeId"
                  onChange={handleInput}
                  value={input.employeeId}
                >
                  {employeeIdSuccess &&
                    employeeIdData !== null &&
                    employeeIdData.map((employee) => (
                      <MenuItem
                        key={employee.id}
                        value={employee.id}
                      >{`${employee.name} | ${employee.id}`}</MenuItem>
                    ))}
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flex: 1 }}>
                <DatePicker
                  error={fieldError.date}
                  onChange={(value) => {
                    handleImmunityLogDate(value);
                  }}
                  value={dayjs(input.date)}
                  label={"Date"}
                  name="date"
                  format="DD MMM YYYY"
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction="row" justifyContent={"space-between"} my="1.5rem">
              <FormControl
                required
                onChange={handleInput}
                sx={{ flex: 1, mr: "1rem" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Immunity
                </InputLabel>
                <OutlinedInput
                  error={fieldError.immunity}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Immunity"
                  name="immunity"
                  value={input.immunity}
                />
              </FormControl>
              <FormControl required onChange={handleInput} sx={{ flex: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Lead</InputLabel>
                <OutlinedInput
                  error={fieldError.lead}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Lead"
                  name="lead"
                  value={input.lead}
                />
              </FormControl>
            </Stack>
  
            <Stack direction="row" justifyContent={"space-between"} my="1.5rem">
              <FormControl
                required
                onChange={handleInput}
                sx={{ flex: 1, mr: "1rem" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Core Wallet
                </InputLabel>
                <OutlinedInput
                  error={fieldError.coreWallet}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Core Wallet"
                  name="coreWallet"
                  value={input.coreWallet}
                />
              </FormControl>
              <FormControl required onChange={handleInput} sx={{ flex: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Supplement Wallet
                </InputLabel>
                <OutlinedInput
                  error={fieldError.supplementWallet}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Supplement Wallet"
                  name="supplementWallet"
                  value={input.supplementWallet}
                />
              </FormControl>
            </Stack>
  
            <Stack direction="row" justifyContent={"space-between"} my="1.5rem">
              <FormControl
                required
                onChange={handleInput}
                sx={{ flex: 1, mr: "1rem" }}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  Promotion Point
                </InputLabel>
                <OutlinedInput
                  error={fieldError.promotionPoint}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Promotion Point"
                  name="promotionPoint"
                  value={input.promotionPoint}
                />
              </FormControl>
              <FormControl required onChange={handleInput} sx={{ flex: 1 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Revenue Point
                </InputLabel>
                <OutlinedInput
                  error={fieldError.revenuePoint}
                  type="number"
                  id="outlined-adornment-amount"
                  label="Revenue Point"
                  name="revenuePoint"
                  value={input.revenuePoint}
                />
              </FormControl>
            </Stack>
          </Box>
          <Button
            onClick={handleUpdateImmunityLog}
            variant="contained"
            sx={{ float: "right", mt: "1rem" }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default UpdateImmunityLogModal;
  