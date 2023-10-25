import { useEffect, useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AttendanceTableRow from "./AttendanceTableRow";
import { useViewContext } from "../../context/ViewContext";
import AttendanceTableCell from "./AttendanceTableCell";
import { getAllEmployeeId } from "../../requests/employeeRequest";
import {
  createAttendance,
  getAttendanceOnDate,
  updateAllAttendance,
} from "../../requests/attendanceRequest";

const AttendanceView = () => {
  const { openDrawer } = useViewContext();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("DD MMM YYYY")
  );
  const [attendanceInput, setAttendanceInput] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const {
    data: attendanceData,
    isSuccess: attendanceSuccess,
    refetch: refetchAttendance,
  } = useQuery(["getAttendanceOnDate", selectedDate], getAttendanceOnDate, {
    retryDelay: 3000,
  });

  const { data: employeeIdData, isSuccess: employeeIdSuccess } = useQuery(
    ["getAllEmployeeId"],
    getAllEmployeeId,
    { retryDelay: 3000 }
  );

  const { mutate: mutateCreateAttendance } = useMutation(createAttendance, {
    onSuccess: (data) => {
      refetchAttendance();
    },
  });
  const { mutate: mutateUpdateAllAttendance } = useMutation(
    updateAllAttendance,
    {
      onSuccess: (data) => {
        refetchAttendance();
        setIsChanged(false);
      },
    }
  );

  const handleSubmitAttendance = () => {
    setAttendanceInput([]);
    setIsConfirm(true);
  };

  const handleCreateAttendance = () => {
    if (attendanceSuccess && employeeIdSuccess) {
      if (attendanceData.length === 0) {
        let modifiedData = employeeIdData.map((id) => ({
          employeeId: id.id,
          date: dayjs(selectedDate).format("DD MMM YYYY"),
        }));
        mutateCreateAttendance(modifiedData);
      } else if (employeeIdData.length > attendanceData.length) {
        const newEmployeeId = employeeIdData.filter(
          (id) =>
            !attendanceData.some(
              (attendance) => id.id === attendance.employeeId
            )
        );
        let newData = newEmployeeId.map((id) => ({
          employeeId: id.id,
          date: dayjs(selectedDate).format("DD MMM YYYY"),
        }));
        mutateCreateAttendance(newData);
      }
    }
  };

  const handleUpdateAllAttendance = () => {
    if (attendanceInput.length > 0) {
      mutateUpdateAllAttendance({
        allAttendance: attendanceInput,
      });
    }
  };

  useEffect(() => {
    handleUpdateAllAttendance();
  }, [attendanceInput]);
  useEffect(() => {
    handleCreateAttendance();
  }, [attendanceData, attendanceSuccess, employeeIdSuccess]);
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt: "1rem",
          mb: "0.5rem",
        }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) =>
                setSelectedDate(dayjs(value).format("DD MMM YYYY"))
              }
              value={dayjs(selectedDate)}
              format="DD MMM YYYY"
            />
          </LocalizationProvider>
          <Button
            onClick={handleSubmitAttendance}
            variant="contained"
            sx={{
              float: "right",
              textTransform: "capitalize",
              backgroundColor: isChanged ? "#42d2bf" : "#9e9e9e",
            }}
          >
            Confirm
          </Button>
        </Stack>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ height: "76vh", width: {lg:"100%", xs:'fit-content'} }}
      >
        <Table>
          <TableHead>
            <TableRow className="sticky-header" sx={{ backgroundColor: "#3f4d67"}}>
              <AttendanceTableCell isWhite={true}>Name</AttendanceTableCell>
              <AttendanceTableCell isWhite={true}>Date</AttendanceTableCell>
              <AttendanceTableCell isWhite={true}>
                Working Hour
              </AttendanceTableCell>
              <AttendanceTableCell isWhite={true}>
                Reimbursed Hour
              </AttendanceTableCell>
              <AttendanceTableCell isWhite={true}>Status</AttendanceTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceSuccess &&
              attendanceData !== null &&
              attendanceData?.map((attendance) => (
                <AttendanceTableRow
                  setIsChanged={setIsChanged}
                  isConfirm={isConfirm}
                  setIsConfirm={setIsConfirm}
                  attendance={attendance}
                  key={attendance.id}
                  setAttendanceInput={setAttendanceInput}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ViewFirstBox>
  );
};

export default AttendanceView;
