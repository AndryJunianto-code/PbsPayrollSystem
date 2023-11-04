import { useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import { Box, Button, Stack } from "@mui/material";
import NewImmunityLogModal from "./NewImmunityLogModal";
import { AddOutlined } from "@mui/icons-material";
import ImmunityLogTable from "./ImmunityLogTable";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ImmunityLogActionMenu from "./ImmunityLogActionMenu";
import TableBoxContainer from '../widgets/TableBoxContainer';
import useGetImmunityLog from "../../hooks/useGetImmunityLog";

const ImmunityLogView = () => {
  const { openDrawer } = useViewContext();
  const [openImmunityLogModal, setOpenImmunityLogModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("DD MMM YYYY")
  );
  const [selectedRow, setSelectedRow] = useState({});
  const [actionAnchor, setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);

  const handleOpenImmunityLogModal = () => setOpenImmunityLogModal(true);
  const handleOpenActionMenu = (e, data) => {
    setActionAnchor(e.currentTarget);
    setSelectedRow(data);
  };
  const handleCloseActionMenu = () => setActionAnchor(null);

  const {
    data: immunityLogData,
    isSuccess: immunityLogSuccess,
    refetch: refetchImmunityLog,
  } = useGetImmunityLog(selectedDate);

  return (
    <ViewFirstBox openDrawer={openDrawer}>
        <Box sx={{ mt: "1rem", mb: "0.5rem", width: openDrawer ? '80vw' : '91vw' }}>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={'space-between'}
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
              aria-label="add"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "capitalize",
                float:'right'
              }}
              startIcon={<AddOutlined />}
              onClick={handleOpenImmunityLogModal}
            >
              Add
            </Button>
          </Stack>
        </Box>
        <TableBoxContainer>
          <ImmunityLogTable
            immunityLogData={immunityLogData}
            immunityLogSuccess={immunityLogSuccess}
            handleOpenActionMenu={handleOpenActionMenu}
          />
        </TableBoxContainer>
      <NewImmunityLogModal
        openImmunityLogModal={openImmunityLogModal}
        setOpenImmunityLogModal={setOpenImmunityLogModal}
        refetchImmunityLog={refetchImmunityLog}
      />
      <ImmunityLogActionMenu
        selectedRow={selectedRow}
        refetchImmunityLog={refetchImmunityLog}
        actionAnchor={actionAnchor}
        isActionMenuOpen={isActionMenuOpen}
        handleCloseActionMenu={handleCloseActionMenu}
      />
    </ViewFirstBox>
  );
};

export default ImmunityLogView;
