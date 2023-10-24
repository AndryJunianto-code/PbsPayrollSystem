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
import { createImmunityLog } from "../../requests/immunityLogRequest";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const NewImmunityLogModal = ({
  openImmunityLogModal,
  setOpenImmunityLogModal,
  refetchImmunityLog
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
  const [input, setInput] = useState(initialState);

  const handleCloseImmunityLogModal = () => setOpenImmunityLogModal(false);
  const handleInput = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const { data: employeeIdData, isSuccess: employeeIdSuccess } = useQuery(
    ["getAllEmployeeId"],
    getAllEmployeeId,
    { retryDelay: 3000 }
  );

  const { mutate: mutateImmunityLog } = useMutation(createImmunityLog);
  const handleCreateImmunityLog = () => {
    mutateImmunityLog(input, {
      onSuccess: (data) => {
        refetchImmunityLog();
        handleCloseImmunityLogModal();
      },
    });
  };


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
                onChange={(value) =>
                  setInput({
                    ...input,
                    date: dayjs(value).format("DD MMM YYYY"),
                  })
                }
                value={dayjs(input.date).format("DD MMM YYYY")}
                label={"Date"}
                name='date'
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
                type="number"
                id="outlined-adornment-amount"
                label="Immunity"
                name="immunity"
              />
            </FormControl>
            <FormControl required onChange={handleInput} sx={{ flex: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Lead</InputLabel>
              <OutlinedInput
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
