import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
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
import React from "react";
import {
  largeModalStyle,
  mediumModalStyle,
  payslipModalStyle,
  positionColor,
} from "../../assets/styles/styles";

const NewPayslipModal = ({ openPayslipModal, setOpenPayslipModal }) => {
  const handleClosePayslipModal = () => setOpenPayslipModal(false);

  return (
    <Modal
      open={openPayslipModal}
      onClose={handleClosePayslipModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={payslipModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Payslip
        </Typography>
        <Stack
          direction="row"
          alignItems={"start"}
          mt="2rem"
          sx={{ flex: 2, height: "90%" }}
        >
          <Box sx={{ width: "50%", pr: "2rem" }}>
            <Stack direction="column">
              <Select
                label="Employee"
                name="employeeId"
                onChange={"handleInput"}
                value={"Andry"}
              >
                <MenuItem value={"2231192"}>Andry</MenuItem>
              </Select>
              <Stack direction={"column"} mt="2rem">
                <Typography>Position</Typography>
                <Box
                  sx={{
                    mt: "0.5rem",
                    backgroundColor: "green",
                    color: "white",
                    padding: "0.5rem",
                    width: "150px",
                    letterSpacing: "1px",
                    fontSize: "13px",
                    textAlign: "center",
                    borderRadius: "4px",
                  }}
                >
                  Junior Consultant
                </Box>
              </Stack>

              <Stack direction={"row"} mt="3rem" mb='2rem' sx={{ flex: 2 }}>
                <FormControl
                  required
                  onChange={""}
                  sx={{ flex: 1, mr: "1rem" }}
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Working Hour
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    id="outlined-adornment-amount"
                    label="Working Hour"
                  />
                </FormControl>
                <FormControl required onChange={""} sx={{ flex: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Reimbursed Hour
                  </InputLabel>
                  <OutlinedInput
                    type="number"
                    id="outlined-adornment-amount"
                    label="Reimbursed Hour"
                  />
                </FormControl>
              </Stack>

              <FormControl required sx={{ flex: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Deduction Amount
                </InputLabel>
                <OutlinedInput
                  type="number"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">Rp</InputAdornment>
                  }
                  label="Deduction Amount"
                  name="salary"
                />
              </FormControl>
            </Stack>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ width: "50%", pl: "2rem" }}>
            <Stack direction="row" alignItems={"start"}>
              <Typography variant="h6" mr="5rem">
                Basic Salary
              </Typography>
              <Stack direction="column" justifyContent={'start'}>
              <Typography variant="h6" color="#8bc34a">
                Rp 7000000
              </Typography>
                <Typography color={"#616161"}>Junior Consultant</Typography>
              </Stack>
              
            </Stack>
            <Stack direction="row" alignItems={"start"} my="1.5rem">
              <Typography variant="h6" mr="2.4rem">
                Total Commision
              </Typography>
              <Stack direction="column" justifyContent={'start'}>
                <Typography variant="h6" fontWeight={"bold"} color={"blue"}>
                  Rp 1500000
                </Typography>
                <Typography color={"#616161"}>RP 30000 x 1% x 1000</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"start"} mb="1.5rem">
              <Typography variant="h6" mr="2.7rem">
                Total Deduction
              </Typography>
              <Stack direction={"column"}>
                <Typography variant="h6" fontWeight={"bold"} color={"red"}>
                  Rp 500000
                </Typography>
                <Typography color={"#616161"}>Late 3x</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"center"}>
              <Typography variant="h6" mr="5.7rem">
                Net Salary
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} color={"green"}>
                Rp 8000000
              </Typography>
            </Stack>
            <Button variant="contained" sx={{mt:'2.4rem',textTransform:'capitalize',float:'right'}}>
              Create
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default NewPayslipModal;
