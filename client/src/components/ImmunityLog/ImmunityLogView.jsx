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
import { useQuery } from "react-query";
import { getImmunityLogOnDate } from "../../requests/immunityLogRequest";
import ImmunityLogActionMenu from "./ImmunityLogActionMenu";

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
  } = useQuery(["getImmunityLogOnDate", selectedDate], getImmunityLogOnDate, {
    retryDelay: 3000,
  });

  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box sx={{ width: "71.5rem" }}>
        <Box sx={{ mt: "1rem", mb: "0.5rem" }}>
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
              aria-label="add"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "capitalize",
              }}
              startIcon={<AddOutlined />}
              onClick={handleOpenImmunityLogModal}
            >
              Add
            </Button>
          </Stack>
        </Box>
        <Box
          sx={{
            mt: "0.5rem",
            height: "77vh",
            width: "100%",
            backgroundColor: "white",
            "& .super-app-theme--header": {
              backgroundColor: "rgb(63, 77, 103)",
              color: "white",
            },
          }}
        >
          <ImmunityLogTable
            immunityLogData={immunityLogData}
            immunityLogSuccess={immunityLogSuccess}
            handleOpenActionMenu={handleOpenActionMenu}
          />
        </Box>
      </Box>
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
