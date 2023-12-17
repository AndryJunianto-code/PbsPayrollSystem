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
import React, { useState } from "react";
import { mediumModalStyle } from "../../assets/styles/styles";
import { getAllEmployeeId } from "../../requests/employeeRequest";
import { useMutation, useQuery } from "react-query";
import { createImmunityLog } from "../../requests/immunityLogRequest";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import getWeekNumber from "../../utils/getWeekNumber";

const NewImmunityLogModal = ({
  openImmunityLogModal,
  setOpenImmunityLogModal,
  refetchImmunityLog,
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
  const [weekNumber, setWeekNumber] = useState("");

  const handleCloseImmunityLogModal = () => setOpenImmunityLogModal(false);
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

  const { mutate: mutateImmunityLog } = useMutation(createImmunityLog);
  const handleCreateImmunityLog = () => {
    const errors = validateField();
    setFieldError(errors);
    const hasErrors = Object.values(errors).some((error) => error === true);

    if(!hasErrors) {
      const {
        employeeId,
        date,
        immunity,
        coreWallet,
        supplementWallet,
        promotionPoint,
        revenuePoint,
        lead,
      } = input;
      mutateImmunityLog(
        {
          employeeId,
          date,
          week: weekNumber,
          immunity,
          coreWallet,
          supplementWallet,
          promotionPoint,
          revenuePoint,
          lead,
        },
        {
          onSuccess: (data) => {
            refetchImmunityLog();
            handleCloseImmunityLogModal();
          },
        }
      );
    }
  };


  const handleImmunityLogDate = (selectedDate) => {
    setInput({
      ...input,
      date: dayjs(selectedDate).format("DD MMM YYYY"),
    });
    setWeekNumber(getWeekNumber(selectedDate));
  };

  /* const {
    data: immunityLogDataPrevWeek,
  } = useGetImmunityLog(lastWeek); */

  return (
    <Modal
      open={openImmunityLogModal}
      onClose={handleCloseImmunityLogModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={mediumModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Immunity Log
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
                onChange={(value) => {
                  handleImmunityLogDate(value);
                }}
                value={dayjs(input.date)}
                error={fieldError.date}
                label={"Date*"}
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
              />
            </FormControl>
          </Stack>
        </Box>
        <Button
          onClick={handleCreateImmunityLog}
          variant="contained"
          sx={{ float: "right", mt: "1rem" }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default NewImmunityLogModal;
