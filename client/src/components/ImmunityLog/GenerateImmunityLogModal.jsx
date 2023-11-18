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
import { useMutation } from "react-query";
import { bulkCreateImmunityLog } from "../../requests/immunityLogRequest";
import getWeekNumber from "../../utils/getWeekNumber";
import useGetAllPosition from '../../hooks/useGetAllPosition';
import { createBulkEmployeePositionHistory } from "../../requests/employeePositionHistoryRequest";

const GenerateImmunityLogModal = ({
  refetchImmunityLog,
  openGenerateImmunityLogModal,
  setOpenGenerateImmunityLogModal,
}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('DD MMM YYYY'));
  const [lastWeekDate, setLastWeekDate] = useState(dayjs());
  const [weekNumber,setWeekNumber] = useState(getWeekNumber(selectedDate));
  

  const handleCloseGenerateImmunityLogModal = () =>
    setOpenGenerateImmunityLogModal(false);

  const handleImmunityLogDate = (date) => {
    setSelectedDate(dayjs(date).format("DD MMM YYYY"));

    const currentDate = new Date(date);
    const weekBefore = new Date(currentDate);
    weekBefore.setDate(currentDate.getDate() - 7); // previous week
    setLastWeekDate(weekBefore);
    setWeekNumber(getWeekNumber(date));
  };

  const { data: prevImmunityLogData, isSuccess: prevImmunityLogSuccess} =
    useGetImmunityLog(lastWeekDate);

  const {data: employeeTrackRecordsData,isSuccess:employeeTrackRecordsSuccess} = useGetAllEmployeeTrackRecords(lastWeekDate);
  const modifiedEmployeeTrackRecords = useTrackRecordsAlgorithm(employeeTrackRecordsData,weekNumber,selectedDate);
  
  const {mutate:mutateGenerateImmunityLog} = useMutation(bulkCreateImmunityLog, {
    onSuccess: (data)=>console.log(data)
  })

  const {data: positionData} = useGetAllPosition();
  const { mutate: mutateBulkEmployeePositionHistory } = useMutation(
    createBulkEmployeePositionHistory
  );
  


  const handleGenerateImmunityLog = () => {
    if(modifiedEmployeeTrackRecords?.length > 0) {
      let promotedEmployee = modifiedEmployeeTrackRecords.filter(emp=>emp.promotionStatus === 'Promote').map(emp=> {
        let promotedPositionId = positionData.filter(pos=>pos.rank === emp.rank)[0]?.id
        return {employeeId:emp.employeeId,positionId:promotedPositionId}
      })
      if(promotedEmployee.length > 0) {
        mutateBulkEmployeePositionHistory(promotedEmployee)
      }

      mutateGenerateImmunityLog(
        modifiedEmployeeTrackRecords
      , {
        onSuccess: () => {
          handleCloseGenerateImmunityLogModal();
            refetchImmunityLog();
        }
      })
    }
   
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
            { modifiedEmployeeTrackRecords !== null && (
              <ImmunityLogMiniTable modifiedEmployeeTrackRecords={modifiedEmployeeTrackRecords}/>
            )}
          </Box>
        </Box>

        <SecondaryButton onClick={handleGenerateImmunityLog} sx={{float:'right', mt:'2rem'}}>Generate</SecondaryButton>
      </Box>
    </Modal>
  );
};

export default GenerateImmunityLogModal;
