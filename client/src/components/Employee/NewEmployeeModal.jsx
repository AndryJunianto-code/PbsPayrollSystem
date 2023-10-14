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
  import { useMutation } from "react-query";
  import { createEmployee } from "../../requests/employeeRequest";
  import dayjs from "dayjs";
  import { basicModalStyle } from "../../assets/styles/styles";
  
  const NewEmployeeModal = ({
    openEmpModal,
    handleCloseEmpModal,
    refetchEmployee,
  }) => {
    const initialState = {
      name: "",
      gender: "Male",
      nik: "",
      dob: "",
      phoneNumber: "",
      joinedDate: "",
      position: "Probation",
    }
    const [input, setInput] = useState(initialState);
    const [fieldError, setFieldError] = useState({
      name: false,
      nik: false,
      phoneNumber: false,
    });
  
    const handleInput = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    const validateField = () => {
      const errors = {}
      if (input.name.trim() === "") {errors.name = true};
      if (input.nik.trim() === "") {errors.nik = true};
      if (input.phoneNumber.trim() === "") {errors.phoneNumber = true};
      if (input.dob.trim() === "") {errors.dob = true}
      if (input.joinedDate.trim() === "") {errors.joinedDate = true}
      return errors;
    };
  
    const { mutate: mutateEmployee } = useMutation(createEmployee);
  
    const handleCreateEmployee = (e) => {
      const errors = validateField();
      setFieldError(errors);
      const hasErrors = Object.values(errors).some((error) => error === true);
      
      if (!hasErrors) {
        e.preventDefault();
        const { name, gender, nik, dob, phoneNumber, joinedDate,position } = input;
        mutateEmployee(
          { name, gender, nik, dob, phoneNumber, joinedDate,position },
          {
            onSuccess: (data) => {
              refetchEmployee();
              handleCloseEmpModal();
              setInput(initialState);
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
                sx={{ flex: 2, }}
              />
              <FormControl sx={{ flex: 1, mx: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.position}
                  label="Position"
                  name="position"
                  onChange={handleInput}
                >
                  <MenuItem value={"Probation"}>Probation</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
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
  