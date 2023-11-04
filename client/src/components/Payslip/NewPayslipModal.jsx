import {
  Box,
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { payslipModalStyle } from "../../assets/styles/styles";
import { getAllEmployee } from "../../requests/employeeRequest";
import { useMutation, useQuery } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createPayslip, getAllPayslip } from "../../requests/payslipRequest";
import dayjs from "dayjs";

const NewPayslipModal = ({refetchPayslip,openPayslipModal, setOpenPayslipModal }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [deductedAmount, setDeductedAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleClosePayslipModal = () => setOpenPayslipModal(false);

  const handleSelectEmployeeId = (e) => {
    setSelectedEmployeeId(e.target.value);
  };

  const {
    data: employeeData,
    isSuccess: employeeSuccess,
  } = useQuery(["getAllEmployee"], getAllEmployee, { retryDelay: 3000 });

  const { mutate: mutateCreatePayslip } = useMutation(createPayslip);
  const handleCreatePayslip = () => {
    if (selectedEmployee) {
      mutateCreatePayslip(
        {
          date: dayjs(date).format("DD MMM YYYY"),
          basicSalary: selectedEmployee?.position.salary,
          totalCommision: 0,
          totalDeduction: deductedAmount,
          netSalary: selectedEmployee?.position?.salary - deductedAmount,
          employeeId: selectedEmployee?.id,
        },
        {
          onSuccess: (data) => {
            handleClosePayslipModal();
            refetchPayslip();
          },
        }
      );
    }
  };


  useEffect(() => {
    if (employeeSuccess && employeeData !== null) {
      let selected = employeeData.filter(
        (employee) => employee.id === selectedEmployeeId
      )[0];
      setSelectedEmployee(selected);
    }
  }, [selectedEmployeeId, employeeData]);

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
              <FormControl sx={{ flex: 1, mr: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select
                  label="Employee"
                  onChange={handleSelectEmployeeId}
                  value={selectedEmployeeId}
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
                  {selectedEmployee
                    ? selectedEmployee?.position?.title
                    : "Probation"}
                </Box>
              </Stack>

              <Box mt={"3rem"} mb="2rem">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) =>
                      setDate(dayjs(value).format("DD MMM YYYY"))
                    }
                    value={date}
                    label={"Date*"}
                    format="DD MMM YYYY"
                  />
                </LocalizationProvider>
              </Box>

              <FormControl required sx={{ flex: 2 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Deduction Amount
                </InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={(e) => setDeductedAmount(e.target.value)}
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
              <Stack direction="column" justifyContent={"start"}>
                <Typography variant="h6" color="#8bc34a">
                  Rp{" "}
                  {selectedEmployee
                    ? selectedEmployee?.position.salary
                    : "7000000"}
                </Typography>
                <Typography color={"#616161"}>
                  {selectedEmployee
                    ? selectedEmployee?.position?.title
                    : "Probation"}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"start"} my="1.5rem">
              <Typography variant="h6" mr="2.4rem">
                Total Commision
              </Typography>
              <Stack direction="column" justifyContent={"start"}>
                <Typography variant="h6" fontWeight={"bold"} color={"blue"}>
                  Rp 0
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
                  Rp {deductedAmount}
                </Typography>
                <Typography color={"#616161"}>Late 3x</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" alignItems={"center"}>
              <Typography variant="h6" mr="5.7rem">
                Net Salary
              </Typography>
              <Typography variant="h6" fontWeight={"bold"} color={"green"}>
                Rp{" "}
                {(selectedEmployee
                  ? selectedEmployee?.position?.salary
                  : 7000000) - deductedAmount}
              </Typography>
            </Stack>
            <Button
              onClick={handleCreatePayslip}
              variant="contained"
              sx={{ mt: "2.4rem", textTransform: "capitalize", float: "right" }}
            >
              Create
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default NewPayslipModal;
