import { Box, Modal, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { largeModalStyle } from "../../assets/styles/styles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import useGetImmunityLog from "../../hooks/useGetImmunityLog";
import ImmunityLogMiniTable from "./ImmunityLogMiniTable";
import SecondaryButton from "../widgets/SecondaryButton";

const GenerateImmunityLogModal = ({
  openGenerateImmunityLogModal,
  setOpenGenerateImmunityLogModal,
}) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [lastWeekDate, setLastWeekDate] = useState("");
  const handleCloseGenerateImmunityLogModal = () =>
    setOpenGenerateImmunityLogModal(false);

  const handleImmunityLogDate = (date) => {
    setSelectedDate(dayjs(date).format("DD MMM YYYY"));

    const currentDate = new Date(date);
    const weekBefore = new Date(currentDate);
    weekBefore.setDate(currentDate.getDate() - 7); // previous week
    setLastWeekDate(weekBefore);
  };

  const { data: prevImmunityLogData, isSuccess: prevImmunityLogSuccess } =
    useGetImmunityLog(lastWeekDate);

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
          <Box mt="2rem">
            {prevImmunityLogSuccess && prevImmunityLogData !== null && (
              <ImmunityLogMiniTable />
            )}
          </Box>
        </Box>

        <SecondaryButton sx={{float:'right', mt:'2.5rem'}}>Generate</SecondaryButton>
      </Box>
    </Modal>
  );
};

export default GenerateImmunityLogModal;
