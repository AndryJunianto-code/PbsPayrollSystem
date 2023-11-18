import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useMutation, useQuery } from "react-query";
import { createEmployee } from "../../requests/employeeRequest";
import { createEmployeePositionHistory } from "../../requests/employeePositionHistoryRequest";
import dayjs from "dayjs";
import { basicModalStyle } from "../../assets/styles/styles";
import { getAllPosition } from "../../requests/positionRequest";

const NewEmployeeModal = ({
  openEmpModal,
  setOpenEmpModal,
  refetchEmployee,
}) => {
  const initialState = {
    name: "",
    gender: "Male",
    nik: "",
    dob: "",
    phoneNumber: "",
    joinedDate: "",
    positionId: 1,
  };
  const initialFieldError = {
    name: false,
    nik: false,
    phoneNumber: false,
    dob: false,
    joinedDate: false,
  };
  const [input, setInput] = useState(initialState);
  const [fieldError, setFieldError] = useState(initialFieldError);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleCloseEmpModal = () => {
    setOpenEmpModal(false);
    setFieldError(initialFieldError);
  };

  const validateField = () => {
    const errors = {};
    if (input.name.trim() === "") {
      errors.name = true;
    }
    if (input.nik.trim() === "") {
      errors.nik = true;
    }
    if (input.phoneNumber.trim() === "") {
      errors.phoneNumber = true;
    }
    if (
      input.dob.toString().trim() === "" ||
      input.dob.toString() === "Invalid Date"
    ) {
      errors.dob = true;
    }
    if (
      input.joinedDate.toString().trim() === "" ||
      input.joinedDate.toString() === "Invalid Date"
    ) {
      errors.joinedDate = true;
    }
    return errors;
  };

  const { data: positionData, isSuccess: positionSuccess } = useQuery(
    ["getAllPosition"],
    getAllPosition,
    { retryDelay: 3000 }
  );

  const { mutate: mutateEmployee } = useMutation(createEmployee);
  const { mutate: mutateEmployeePositionHistory } = useMutation(
    createEmployeePositionHistory
  );

  const handleCreateEmployee = (e) => {
    const errors = validateField();
    setFieldError(errors);
    const hasErrors = Object.values(errors).some((error) => error === true);

    if (!hasErrors) {
      e.preventDefault();
      const { name, gender, nik, dob, phoneNumber, joinedDate, positionId } =
        input;
      mutateEmployee(
        { name, gender, nik, dob, phoneNumber, joinedDate },
        {
          onSuccess: (data) => {
            handleCloseEmpModal();
            setInput(initialState);
            mutateEmployeePositionHistory({ employeeId: data.id, positionId }, {
              onSuccess: (data) => {
                refetchEmployee();
              }
            });
          },
        }
      );
    }
  };

  return (
    <Modal
      open={openEmpModal}
      onClose={handleCloseEmpModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={basicModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Employee
        </Typography>
        <Box mt="2rem">
          <TextField
            required
            error={fieldError.name}
            id="outlined-required"
            label="Name"
            fullWidth={true}
            name="name"
            onChange={handleInput}
          />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            my="2rem"
            flex="5"
          >
            <TextField
              required
              error={fieldError.nik}
              id="outlined-required"
              label="NIK"
              name="nik"
              onChange={handleInput}
              sx={{ flex: 2 }}
            />
            <FormControl sx={{ flex: 1, mx: "1rem" }}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input.gender}
                label="Gender"
                name="gender"
                onChange={handleInput}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flex: 2 }}>
              <DatePicker
                onChange={(value) =>
                  setInput({
                    ...input,
                    dob: dayjs(value).format("DD MMM YYYY"),
                  })
                }
                value={input.dob}
                label={"Date of birth"}
                format="DD MMM YYYY"
              />
            </LocalizationProvider>
          </Stack>
          <Stack direction="row" justifyContent={"space-between"} flex={5}>
            <TextField
              required
              error={fieldError.phoneNumber}
              name="phoneNumber"
              onChange={handleInput}
              id="outlined-required"
              label="Phone Number"
              sx={{ flex: 2 }}
            />
            <FormControl sx={{ flex: 1, mx: "1rem" }}>
              <InputLabel id="demo-simple-select-label">Position</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input.positionId}
                label="Position"
                name="positionId"
                onChange={handleInput}
              >
                {positionSuccess &&
                  positionData !== null &&
                  positionData.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flex: 2 }}>
              <DatePicker
                onChange={(value) =>
                  setInput({
                    ...input,
                    joinedDate: dayjs(value).format("DD MMM YYYY"),
                  })
                }
                value={input.joinedDate}
                label={"Joined date"}
                format="DD MMM YYYY"
              />
            </LocalizationProvider>
          </Stack>
        </Box>

        <Button
          onClick={handleCreateEmployee}
          variant="contained"
          sx={{ float: "right", mt: "3rem" }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default NewEmployeeModal;
