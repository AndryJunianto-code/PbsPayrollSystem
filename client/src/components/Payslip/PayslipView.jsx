import { useEffect, useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import { Box, Button, Stack } from "@mui/material";
import { AddOutlined, SummarizeOutlined } from "@mui/icons-material";
import NewPayslipModal from "./NewPayslipModal";
import useGetPayslip from '../../hooks/useGetPayslip';
import PayslipTable from "./PayslipTable";
import PayslipActionMenu from "./PayslipActionMenu";
import TableBoxContainer from "../widgets/TableBoxContainer";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import SecondaryButton from "../widgets/SecondaryButton";
import PayslipJournalModal from "./PayslipJournalModal";
import UpdatePayslipModal from "./UpdatePayslipModal";
import useGetTotalPayslipAmount from "../../hooks/useGetTotalPayslipAmount";
import Sidebar from "../../layouts/Sidebar/Sidebar";

const PayslipView = () => {
  const { openDrawer } = useViewContext();
  const [openPayslipModal, setOpenPayslipModal] = useState(false);
  const [openPayslipUpdateModal, setOpenPayslipUpdateModal] = useState(false);
  const [openViewJournalModal,setOpenViewJournalModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedDate, setSelectedDate] = useState(dayjs().format("DD MMM YYYY"));
  const [actionAnchor, setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);

  const handleOpenActionMenu = (e, data) => {
    setActionAnchor(e.currentTarget);
    setSelectedRow(data);
  };
  const handleCloseActionMenu = () => setActionAnchor(null);

  const handleOpenPayslipModal = () => setOpenPayslipModal(true);
  const handleOpenPayslipUpdateModal = () => {
    handleCloseActionMenu();
    setOpenPayslipUpdateModal(true);
  }
  const handleOpenViewJournalModal = () => setOpenViewJournalModal(true);


  const {
    data: payslipData,
    isSuccess: payslipSuccess,
    refetch: refetchPayslip,
  } = useGetPayslip(selectedDate);

  const {data:incomeData,refetch:refetchIncomeData} = useGetTotalPayslipAmount(selectedDate);

  useEffect(()=> {
    if(payslipSuccess) refetchIncomeData();
  },[payslipData])
  return (
    <>
    <Sidebar/>
    <ViewFirstBox openDrawer={openDrawer}>
        <Box
          sx={{
            mt: "1rem",
            mb: "0.5rem",
            width: openDrawer ? "80vw" : "91vw" 
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent={'space-between'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(value) =>
                setSelectedDate(dayjs(value).format("DD MMM YYYY"))
              }
              value={dayjs(selectedDate)}
              format="MMM YYYY"
            />
          </LocalizationProvider>
          <Stack direction={'row'} alignItems={'center'}>
          <SecondaryButton
              sx={{
                borderRadius: "50px",
                mr: "1rem",
              }}
              startIcon={<SummarizeOutlined />}
              onClick={handleOpenViewJournalModal}
            >
              View Journal
            </SecondaryButton>
            <Button
              aria-label="add"
              variant="contained"
              sx={{
                borderRadius: "50px",
                textTransform: "capitalize",
              }}
              startIcon={<AddOutlined />}
              onClick={handleOpenPayslipModal}
            >
              Add
            </Button>
            </Stack>
          </Stack>
        </Box>
        <TableBoxContainer>
          <PayslipTable
            handleOpenActionMenu={handleOpenActionMenu}
            payslipData={payslipData}
            payslipSuccess={payslipSuccess}
          />
        </TableBoxContainer>
     {openPayslipModal && <NewPayslipModal
        refetchPayslip={refetchPayslip}
        openPayslipModal={openPayslipModal}
        setOpenPayslipModal={setOpenPayslipModal}
      />}
      {openPayslipUpdateModal && <UpdatePayslipModal selectedRow={selectedRow} refetchPayslip={refetchPayslip} openPayslipUpdateModal={openPayslipUpdateModal} setOpenPayslipUpdateModal={setOpenPayslipUpdateModal}/>}
      <PayslipActionMenu
        selectedRow={selectedRow}
        actionAnchor={actionAnchor}
        refetchPayslip={refetchPayslip}
        isActionMenuOpen={isActionMenuOpen}
        handleCloseActionMenu={handleCloseActionMenu}
        handleOpenPayslipUpdateModal={handleOpenPayslipUpdateModal}
      />
      {openViewJournalModal && <PayslipJournalModal incomeData={incomeData} selectedDate={selectedDate} openViewJournalModal={openViewJournalModal} setOpenViewJournalModal={setOpenViewJournalModal}/>}
    </ViewFirstBox>
    </>
  );
};

export default PayslipView;
