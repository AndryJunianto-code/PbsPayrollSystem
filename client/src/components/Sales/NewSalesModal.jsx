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
import React, { useState } from "react";
import { basicModalStyle, mediumModalStyle } from "../../assets/styles/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const NewSalesModal = ({ openSalesModal, setOpenSalesModal }) => {
  const initialState = {};
  const [input, setInput] = useState(initialState);
  const handleCloseSalesModal = () => {
    setOpenSalesModal(false);
  };

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
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
          <Stack
            direction="row"
            justifyContent={"space-between"}
            flex="5"
          >
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
          <TextField
          sx={{my:'1.5rem'}}
          fullWidth
              label="Company Name"
              name="companyName"
              onChange={handleInput}
            />
            <Stack
            direction="row"
            justifyContent={"space-between"}
            mb="1.5rem"
          >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(value) =>
                    setInput({
                      ...input,
                      salesDate: dayjs(value).format("DD MMM YYYY"),
                    })
                  }
                  value={input.salesDate}
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
                name='salesAmount'
              />
            </FormControl>
            </Stack>
            <TextField fullWidth
              label="Remarks"
              name="remarks"
              onChange={handleInput}/>
        </Box>
        <Button
          onClick={''}
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
