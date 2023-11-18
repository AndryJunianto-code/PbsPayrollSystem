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
  import React, { useEffect, useState } from "react";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
  import { useMutation, useQuery } from "react-query";
  import { updateEmployee } from "../../requests/employeeRequest";
  import {basicModalStyle} from '../../assets/styles/styles'
  import dayjs from "dayjs";
import { getAllPosition } from "../../requests/positionRequest";
import { createEmployeePositionHistory } from "../../requests/employeePositionHistoryRequest";
  
  
  const UpdateEmployeeModal = ({
    openEmpUpdateModal,
    handleCloseEmpUpdateModal,
    refetchEmployee,
    selectedRow
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
    const initialFieldError = {name:false,nik:false,phoneNumber:false,dob:false,joinedDate:false}
    const [input, setInput] = useState(initialState);
    const [fieldError, setFieldError] = useState(initialFieldError);
  
    const handleInput = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    const validateField = () => {
      const errors = {}
      if (input.name.trim() === "") {errors.name = true};
      if (input.nik.trim() === "") {errors.nik = true};
      if (input.phoneNumber.trim() === "") {errors.phoneNumber = true};
      if (input.dob.toString().trim() === "" || input.dob.toString() === "Invalid Date") {errors.dob = true};
      if (input.joinedDate.toString().trim() === "" || input.joinedDate.toString() === "Invalid Date") {errors.joinedDate = true};
      return errors;
    };

    const {
      data: positionData,
      isSuccess: positionSuccess,
    } = useQuery(["getAllPosition"], getAllPosition, { retryDelay: 3000 });
  
    const { mutate: mutateEmployee } = useMutation(updateEmployee);
    const { mutate: mutateEmployeePositionHistory } = useMutation(
      createEmployeePositionHistory
    );
    
    const handleUpdateEmployee = (e) => {
      const errors = validateField();
      setFieldError(errors);
      const hasErrors = Object.values(errors).some((error) => error === true);
  
      if(!hasErrors) {
      e.preventDefault();
      const { name, gender, nik, dob, phoneNumber, joinedDate, positionId } = input;
      mutateEmployee(
        {id:selectedRow?.id, name, gender, nik, dob, phoneNumber, joinedDate },
        {
          onSuccess: () => {
            handleCloseEmpUpdateModal();
            if(selectedRow.positionId !== positionId) { //promotion changed 
              mutateEmployeePositionHistory({employeeId:selectedRow.id,positionId}, {
                onSuccess:()=>refetchEmployee()
              })
            } 
            refetchEmployee();
          },
        }
      );
      }
    };

    useEffect(() => {
     if(selectedRow !== null) setInput(selectedRow);
     return () => {
      setInput(initialState)
      setFieldError(initialFieldError)
    }
    }, [selectedRow]);
    return (
      <Modal
        open={openEmpUpdateModal}
        onClose={handleCloseEmpUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={basicModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Employee
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
              value={input.name}
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
                value={input.nik}
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
                    setInput({ ...input, dob: dayjs(value).format("DD MMM YYYY") })
                  }
                  value={dayjs(input.dob)}
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
                value={input.phoneNumber}
                id="outlined-required"
                label="Phone Number"
                sx={{ flex: 2}}
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
                  {positionSuccess && positionData !== null && positionData.map(position=> (
                    <MenuItem key={position.id} value={position.id}>{position.title}</MenuItem>
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
                  value={dayjs(input.joinedDate)}
                  label={"Joined date"}
                  format="DD MMM YYYY"
                />
              </LocalizationProvider>
            </Stack>
          </Box>
  
          <Button
            onClick={handleUpdateEmployee}
            variant="contained"
            sx={{ float: "right", mt: "3rem" }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default UpdateEmployeeModal;
  