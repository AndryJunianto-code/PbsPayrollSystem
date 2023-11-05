import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { largeModalStyle } from "../../assets/styles/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetImmunityLog from "../../hooks/useGetImmunityLog";
import ImmunityLogMiniTable from "./ImmunityLogMiniTable";
import SecondaryButton from "../widgets/SecondaryButton";
import useGetSalesByWeek from "../../hooks/useGetSalesByWeek";
import useGetAllEmployeeTrackRecords from "../../hooks/useGetAllEmployeeTrackRecords";
import useTrackRecordsAlgorithm from "../../hooks/useTrackRecordsAlgorithm";

const GenerateImmunityLogModal = ({
  openGenerateImmunityLogModal,
  setOpenGenerateImmunityLogModal,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [lastWeekDate, setLastWeekDate] = useState(dayjs());
  const handleCloseGenerateImmunityLogModal = () =>
    setOpenGenerateImmunityLogModal(false);

  const handleImmunityLogDate = (date) => {
    setSelectedDate(dayjs(date).format("DD MMM YYYY"));

    const currentDate = new Date(date);
    const weekBefore = new Date(currentDate);
    weekBefore.setDate(currentDate.getDate() - 7); // previous week
    setLastWeekDate(weekBefore);
  };

  const { data: prevImmunityLogData, isSuccess: prevImmunityLogSuccess} =
    useGetImmunityLog(lastWeekDate);

  const {data: employeeTrackRecordsData,isSuccess:employeeTrackRecordsSuccess} = useGetAllEmployeeTrackRecords(lastWeekDate);

  const modifiedEmployeeTrackRecords = useTrackRecordsAlgorithm(employeeTrackRecordsData);
  const handleGenerateImmunityLog = () => {
    
  }

  return (
    <Modal
      open={openGenerateImmunityLogModal}
      onClose={handleCloseGenerateImmunityLogModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={largeModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Auto Generate Immunity Log
        </Typography>
        <Box mt="2rem">
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ flex: 1 }}>
            <DatePicker
              onChange={(value) => {
                handleImmunityLogDate(value);
              }}
              value={dayjs(selectedDate)}
              label={"Date"}
              name="date"
              format="DD MMM YYYY"
            />
          </LocalizationProvider>
          <Typography mt='1rem'>Preview</Typography>
          <Box mt="0.5rem" height='310px' maxHeight='310px' sx={{backgroundColor:'#4c4c4c', borderRadius:'4px',overflowY:'scroll',}}>
            {employeeTrackRecordsSuccess && employeeTrackRecordsData !== null && (
              <ImmunityLogMiniTable employeeTrackRecordsData={employeeTrackRecordsData}/>
            )}
          </Box>
        </Box>

        <SecondaryButton onClick={handleGenerateImmunityLog} sx={{float:'right', mt:'2rem'}}>Generate</SecondaryButton>
      </Box>
    </Modal>
  );
};

export default GenerateImmunityLogModal;
