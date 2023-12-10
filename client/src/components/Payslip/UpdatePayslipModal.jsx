import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { payslipModalStyle } from "../../assets/styles/styles";
import { getAllEmployee } from "../../requests/employeeRequest";
import { useMutation, useQuery } from "react-query";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createPayslip, updatePayslip } from "../../requests/payslipRequest";
import useGetSingleEmployeeTrackRecordsOnMonth from "../../hooks/useGetSingleEmployeeTrackRecordsOnMonth";
import dayjs from "dayjs";
import { AddOutlined } from "@mui/icons-material";
import { bulkCreateAdjustment } from "../../requests/adjustmentRequest";
import getCurrency from "../../utils/getCurrency";

const UpdatePayslipModal = ({
  refetchPayslip,
  openPayslipUpdateModal,
  setOpenPayslipUpdateModal,
  selectedRow,
}) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [formattedDate, setFormattedDate] = useState({ year: "", month: "" });
  const inputAdjustmentInitial = { name: "", amount: "" };
  const [inputAdjustment, setInputAdjustment] = useState(
    inputAdjustmentInitial
  );
  const [tempAdjustment, setTempAdjustment] = useState([]);
  const [employeeTrackRecords, setEmployeeTrackRecords] = useState({});

  const handleClosePayslipUpdateModal = () => setOpenPayslipUpdateModal(false);

  const handleSelectEmployeeId = (e) => {
    setSelectedEmployeeId(e.target.value);
  };
  const handleInputDate = (value) => {
    let tempDate = dayjs(value);
    let formattedDate = tempDate.format("DD MM YYYY").split(" ");
    setInputDate(tempDate);
    setFormattedDate({ year: formattedDate[2], month: formattedDate[1] });
  };
  const handleInputAdjustment = (e) => {
    setInputAdjustment({ ...inputAdjustment, [e.target.name]: e.target.value });
  };
  const handleTempAddAdjustment = () => {
    if (inputAdjustment.name !== "" && inputAdjustment.amount !== "") {
      setTempAdjustment([...tempAdjustment, inputAdjustment]);
      setInputAdjustment(inputAdjustmentInitial);
    }
  };
  const countTotalAdjustment = () =>
    tempAdjustment.reduce(
      (total, adjustment) => total + Math.floor(adjustment.amount),
      0
    );

  const { data: employeeData, isSuccess: employeeSuccess } = useQuery(
    ["getAllEmployee"],
    getAllEmployee,
    { retryDelay: 3000 }
  );
  const resetPaySlipModal = () => {
    setEmployeeTrackRecords({});
    setSelectedEmployeeId("");
    setTempAdjustment([]);
  };

  const { mutate: mutateUpdatePayslip } = useMutation(updatePayslip);
  const { mutate: mutateBulkCreateAdjustment } = useMutation(bulkCreateAdjustment);
  const handleUpdatePayslip = () => {
    if (Object.keys(employeeTrackRecords).length > 0) {
      const { basicSalary, commision, deduction, netSalary } =
        employeeTrackRecords;
      let monthYear = dayjs(inputDate).format("MMMYYYY");
      mutateUpdatePayslip(
        {
          id:selectedRow.row?.id,
          employeeId: selectedEmployeeId,
          date: inputDate,
          monthYear,
          basicSalary,
          commision,
          deduction,
          netSalary,
        },
        {
          onSuccess: (data) => {
            let finalAdjustment = tempAdjustment.map((adj) => ({
              ...adj,
              payslipId: data?.id,
            }));
            mutateBulkCreateAdjustment(finalAdjustment, {
              onSuccess: () => {
                setOpenPayslipUpdateModal();
                refetchPayslip();
                resetPaySlipModal();
              },
            });
          },
        }
      );
    }
  };

  const { data: employeeTrackRecordsData, refetch } =
    useGetSingleEmployeeTrackRecordsOnMonth(
      selectedEmployeeId,
      formattedDate.year,
      formattedDate.month
    );

  useEffect(() => {
    if (selectedEmployeeId !== "" && formattedDate.year !== "") {
      refetch();
    }
  }, [selectedEmployeeId, formattedDate]);

  useEffect(() => {
    if (employeeTrackRecordsData) {
      let position =
        employeeTrackRecordsData.employeePositionHistory[0].position;
      let commisionPercent =
        employeeTrackRecordsData.totalRevenuePoint >=
        position.monthlyCommisionSecondTier
          ? 3
          : employeeTrackRecordsData.totalRevenuePoint >=
            position.monthlyCommisionFirstTier
          ? 1
          : 0;

      let championAward =
        employeeTrackRecords.totalRevenuePoint >= 30000 ? 1000000 : 0;
      let commision =
        ((employeeTrackRecordsData.totalRevenuePoint * commisionPercent) /
          100) *
          1000 +
        championAward;
      let totalHours = employeeTrackRecordsData.totalHours;
      let workingHours =
        totalHours.totalWorkingHours + totalHours.totalReimbursedHours;
      let salaryHours = Math.floor((workingHours / 270) * position.salary);
      let deduction = position.salary - salaryHours;
      let adjustment = countTotalAdjustment();
      setEmployeeTrackRecords({
        positionTitle: position.title,
        basicSalary: position.salary,
        totalRevenuePoint: employeeTrackRecordsData.totalRevenuePoint,
        netSalary: position.salary + commision - deduction + adjustment,
        commision,
        commisionPercent,
        championAward,
        workingHours,
        salaryHours,
        deduction,
      });
    }
  }, [employeeTrackRecordsData, tempAdjustment]);

  useEffect(() => {
   console.log(selectedRow.row)
   if(selectedRow !== null) {
     setSelectedEmployeeId(selectedRow.row?.employeeId)
     handleInputDate(selectedRow.row?.date)
    }
  }, [selectedRow]);
  return (
    <Modal
      open={openPayslipUpdateModal}
      onClose={handleClosePayslipUpdateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={payslipModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Payslip
        </Typography>
        <Stack
          direction="row"
          alignItems={"start"}
          mt="2rem"
          sx={{ flex: 2, height: "90%" }}
        >
          <Box sx={{ width: "50%", pr: "2rem" }}>
            <Stack direction="row">
              <FormControl sx={{ flex: 1, mr: "1rem" }}>
                <InputLabel id="demo-simple-select-label">Employee</InputLabel>
                <Select
                  label="Employee"
                  onChange={handleSelectEmployeeId}
                  value={selectedEmployeeId}
                >
                  <MenuItem value={""}></MenuItem>
                  {employeeSuccess &&
                    employeeData !== null &&
                    employeeData.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {`${employee.name} | ${employee.id}`}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <Box sx={{ flex: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    onChange={(value) => handleInputDate(value)}
                    value={inputDate}
                    label={"Date*"}
                    format="DD MMM YYYY"
                  />
                </LocalizationProvider>
              </Box>
            </Stack>

            <Paper
              sx={{
                backgroundColor: "#fccfa4",
                padding: "2rem",
                mt: "1.5rem",
                color: "#3d4a63",
                height: "19.5rem",
              }}
            >
              <Stack direction={"column"}>
                <Stack direction="row" alignItems={"start"}>
                  <Typography fontSize={"16px"} flex={1}>
                    Basic Salary
                  </Typography>
                  <Typography fontSize={"16px"} flex={1} fontWeight={"bold"}>
                    Rp{getCurrency(employeeTrackRecords?.basicSalary)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems={"start"} my="1.5rem">
                  <Typography fontSize={"16px"} flex={1}>
                    Total Commision
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={"bold"} flex={1}>
                    Rp{getCurrency(employeeTrackRecords?.commision)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems={"start"}>
                  <Typography fontSize={"16px"} flex={1}>
                    Total Deduction
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={"bold"} flex={1}>
                    Rp{employeeTrackRecords?.deduction < 0 ? 0 : getCurrency(employeeTrackRecords?.deduction)}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems={"start"} my="1.5rem">
                  <Typography fontSize={"16px"} flex={1}>
                    Net Adjustment
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={"bold"} flex={1}>
                    Rp{getCurrency(countTotalAdjustment())}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems={"start"}>
                  <Typography fontSize={"16px"} flex={1}>
                    Net Salary
                  </Typography>
                  <Typography fontSize={"16px"} fontWeight={"bold"} flex={1}>
                    Rp{getCurrency(employeeTrackRecords?.netSalary)}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Box>

          <Divider orientation="vertical" flexItem />

          <Box sx={{ width: "50%", pl: "2rem" }}>
            <Stack direction="row" alignItems={"center"}>
              <TextField
                label="Adjustment"
                name="name"
                value={inputAdjustment.name}
                onChange={handleInputAdjustment}
              />
              <FormControl onChange={handleInputAdjustment} sx={{ mx: "1rem" }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  value={inputAdjustment.amount}
                  type="number"
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">Rp</InputAdornment>
                  }
                  label="Amount"
                  name="amount"
                />
              </FormControl>
              <IconButton
                onClick={handleTempAddAdjustment}
                sx={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50px",
                  border: "1px solid #42d2bf",
                }}
              >
                <AddOutlined
                  sx={{ color: "#3d4a63", width: "18px", height: "18px" }}
                />
              </IconButton>
            </Stack>

            <Paper
              sx={{
                mt: "1.5rem",
                backgroundColor: "#3f4d67",
                padding: "1rem 2rem",
                color: "white",
                height: "19.5rem",
                maxHeight: "19.5rem",
                overflowY: "auto",
              }}
            >
              <Box mb="1rem">
                <Typography color="#86d9d3" mb="0.5rem">
                  Basic Salary
                </Typography>
                <Stack direction={"row"}>
                  <Typography fontSize={"14px"} ml="1rem" flex={3}>
                    {employeeTrackRecords.positionTitle} Salary
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    Rp {employeeTrackRecords.basicSalary}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography fontSize={"14px"} ml="1rem" flex={3}>
                    Working Hour
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    {employeeTrackRecords.workingHours} h
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography
                    fontSize={"14px"}
                    ml="1rem"
                    flex={3}
                    fontWeight={"bold"}
                  >
                    WH / SWH x Salary
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    Rp {employeeTrackRecords.salaryHours}
                  </Typography>
                </Stack>
              </Box>

              <Box mb="1rem">
                <Typography color="#86d9d3" mb="0.5rem">
                  Total Commision
                </Typography>
                <Stack direction="row">
                  <Typography fontSize={"14px"} flex={3} ml="1rem">
                    Total Revenue Point
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    {employeeTrackRecords.totalRevenuePoint
                      ? employeeTrackRecords.totalRevenuePoint
                      : 0}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography fontSize={"14px"} flex={3} ml="1rem">
                    Champion Award
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    Rp {employeeTrackRecords.championAward}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography
                    fontSize={"14px"}
                    flex={3}
                    ml="1rem"
                    fontWeight={"bold"}
                  >
                    (TRP x {employeeTrackRecords.commisionPercent}% x 1000) + CA
                  </Typography>
                  <Typography
                    fontSize={"14px"}
                    flex={1}
                    color="#86d9d3"
                    fontStyle={"italic"}
                  >
                    Rp{" "}
                    {employeeTrackRecords.commision
                      ? employeeTrackRecords.commision
                      : 0}
                  </Typography>
                </Stack>
              </Box>

              <Box mb="1rem">
                <Typography color="#86d9d3" mb="0.5rem">
                  Adjustment
                </Typography>
                {tempAdjustment.length > 0 &&
                  tempAdjustment.map((adjustment, index) => (
                    <Stack direction={"row"} key={index}>
                      <Typography fontSize={"14px"} ml="1rem" flex={3}>
                        {adjustment.name}
                      </Typography>
                      <Typography
                        fontSize={"14px"}
                        flex={1}
                        color="#86d9d3"
                        fontStyle={"italic"}
                      >
                        Rp {adjustment.amount}
                      </Typography>
                    </Stack>
                  ))}
              </Box>
            </Paper>
            <Button
              onClick={handleUpdatePayslip}
              variant="contained"
              sx={{ mt: "1rem", textTransform: "capitalize", float: "right" }}
            >
              Update
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdatePayslipModal;
