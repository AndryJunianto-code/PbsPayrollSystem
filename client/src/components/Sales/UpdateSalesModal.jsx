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
  import { createSales, updateSales } from "../../requests/salesRequest";
  import { useMutation, useQuery } from "react-query";
  import { getAllEmployee } from "../../requests/employeeRequest";
  import getWeekNumber from '../../utils/getWeekNumber';
  
  const UpdateSalesModal = ({refetchSales,selectedRow,openSalesUpdateModal,setOpenSalesUpdateModal,handleCloseActionMenu}) => {
    const initialState = {
      date: "",
      productName: "Business Loan",
    };
    const [input, setInput] = useState(initialState);
    const [weekNumber,setWeekNumber] = useState("");
  
    const handleCloseSalesUpdateModal = () => setOpenSalesUpdateModal(false)
  
    const handleInput = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    const handleSalesDate = (selectedDate) => {
      setInput({
        ...input,
        date: dayjs(selectedDate).format("DD MMM YYYY"),
      })
      setWeekNumber(getWeekNumber(selectedDate));
    }

    const { mutate: mutateSales } = useMutation(updateSales);
    const handleUpdateSales = () => {
      mutateSales({id:selectedRow?.id, ...input}, {
        onSuccess: ()=> {
          handleCloseSalesUpdateModal();
          refetchSales();
        }
      })
    }
  
    const {
      data: employeeData,
      isSuccess: employeeSuccess,
    } = useQuery(["getAllEmployee"], getAllEmployee, { retryDelay: 3000 });
  
    useEffect(() => {
      if(selectedRow !== null) {
        setInput({...selectedRow,date:dayjs(selectedRow.date)});
      }
      return () => {
       setInput(initialState) 
       /* setFieldError(initialFieldError) */
     }
     }, [selectedRow]);
    return (
      <Modal
        open={openSalesUpdateModal}
        onClose={handleCloseSalesUpdateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mediumModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Sales
          </Typography>
          <Box mt="2rem">
            <Stack direction="row" justifyContent={"space-between"} flex="5">
              <TextField
                required
                id="outlined-required"
                label="Customer Name"
                name="customerName"
                onChange={handleInput}
                value={input.customerName}
                sx={{ flex: 3, mr: "1rem" }}
              />
              <TextField
                required
                id="outlined-required"
                label="Phone Number"
                name="phoneNumber"
                onChange={handleInput}
                value={input.phoneNumber}
                sx={{ flex: 2 }}
              />
            </Stack>
            <Stack direction="row" justifyContent={"space-between"} my='1rem'>
              <TextField
                sx={{  flex: 1,mr:'1rem' }}
                label="Company Name"
                name="companyName"
                onChange={handleInput}
                value={input.companyName}
              />
              <FormControl sx={{ flex: 1 }}>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select label="Employee" 
                  onChange={handleInput}
                  name='employeeId'
                  value={input.employeeId}
                >
                {employeeSuccess &&
                      employeeData !== null &&
                      employeeData.map((employee) => (
                        <MenuItem key={employee.id} value={employee.id}>
                          {`${employee.name} | ${employee.id}`}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Stack>
  
            <Stack direction="row" justifyContent={"space-between"} mb="1.5rem">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(value) => handleSalesDate(value)}
                  value={input.date}
                  label={"Date*"}
                  format="DD MMM YYYY"
                />
              </LocalizationProvider>
              <FormControl required sx={{ flex: 1, mx: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={input.productName}
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
                  value={input.salesAmount}
                />
              </FormControl>
            </Stack>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              onChange={handleInput}
              value={input.remarks}
            />
          </Box>
          <Button
            onClick={handleUpdateSales}
            variant="contained"
            sx={{ float: "right", mt: "3rem" }}
          >
            Update
          </Button>
        </Box>
      </Modal>
    );
  };
  
  export default UpdateSalesModal;
  