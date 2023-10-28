import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { mediumModalStyle } from "../../assets/styles/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { createSales } from "../../requests/salesRequest";
import { useMutation, useQuery } from "react-query";
import { getAllEmployee } from "../../requests/employeeRequest";

const NewSalesModal = ({ openSalesModal, setOpenSalesModal,refetchSales }) => {
  const initialState = {
    salesDate: "",
    productName: "Business Loan",
  };
  const [input, setInput] = useState(initialState);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const handleCloseSalesModal = () => {
    setOpenSalesModal(false);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSelectEmployeeId = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const {
    data: employeeData,
    isSuccess: employeeSuccess,
  } = useQuery(["getAllEmployee"], getAllEmployee, { retryDelay: 3000 });

  const { mutate: mutateSales } = useMutation(createSales);
  const handleCreateSales = (e) => {
    e.preventDefault();
    const {
      companyName,
      customerName,
      phoneNumber,
      remarks,
      salesAmount,
      salesDate,
      productName,
    } = input;
    mutateSales(
      {
        companyName,
        customerName,
        phoneNumber,
        remarks,
        salesAmount,
        salesDate,
        productName,
        employeeId:selectedEmployeeId
      },
      {
        onSuccess: () => {
          handleCloseSalesModal();
          refetchSales();
          setInput(initialState);
        },
      }
    );
  };
  useEffect(() => {
    console.log(input);
  }, [input]);
  return (
    <Modal
      open={openSalesModal}
      onClose={handleCloseSalesModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={mediumModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          New Sales
        </Typography>
        <Box mt="2rem">
          <Stack direction="row" justifyContent={"space-between"} flex="5">
            <TextField
              required
              id="outlined-required"
              label="Customer Name"
              name="customerName"
              onChange={handleInput}
              sx={{ flex: 3, mr: "1rem" }}
            />
            <TextField
              required
              id="outlined-required"
              label="Phone Number"
              name="phoneNumber"
              onChange={handleInput}
              sx={{ flex: 2 }}
            />
          </Stack>
          <Stack direction="row" justifyContent={"space-between"} my='1rem'>
            <TextField
              sx={{  flex: 1,mr:'1rem' }}
              label="Company Name"
              name="companyName"
              onChange={handleInput}
            />
            <FormControl sx={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-label">Employee</InputLabel>
              <Select label="Employee" 
                onChange={handleSelectEmployeeId}
                value={selectedEmployeeId}
              >
              {employeeSuccess &&
                    employeeData !== null &&
                    employeeData.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" justifyContent={"space-between"} mb="1.5rem">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(value) =>
                  setInput({
                    ...input,
                    salesDate: dayjs(value).format("DD MMM YYYY"),
                  })
                }
                value={dayjs(input.salesDate).format("DD MMM YYYY")}
                label={"Date*"}
                format="DD MMM YYYY"
              />
            </LocalizationProvider>
            <FormControl required sx={{ flex: 1, mx: "1rem" }}>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"Business Loan"}
                label="Product"
                name="productName"
                onChange={handleInput}
              >
                <MenuItem value={"Business Loan"}>Business Loan</MenuItem>
                <MenuItem value={"Housing Loan"}>Housing Loan</MenuItem>
              </Select>
            </FormControl>
            <FormControl required onChange={handleInput}>
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                type="number"
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                label="Amount"
                name="salesAmount"
              />
            </FormControl>
          </Stack>
          <TextField
            fullWidth
            label="Remarks"
            name="remarks"
            onChange={handleInput}
          />
        </Box>
        <Button
          onClick={handleCreateSales}
          variant="contained"
          sx={{ float: "right", mt: "3rem" }}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export default NewSalesModal;
