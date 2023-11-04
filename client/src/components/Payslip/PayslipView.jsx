import { useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import { Box, Button, Stack } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import NewPayslipModal from "./NewPayslipModal";
import { getAllPayslip } from "../../requests/payslipRequest";
import { useQuery } from "react-query";
import PayslipTable from "./PayslipTable";
import PayslipActionMenu from "./PayslipActionMenu";
import TableBoxContainer from "../widgets/TableBoxContainer";

const PayslipView = () => {
  const { openDrawer } = useViewContext();
  const [openPayslipModal, setOpenPayslipModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [actionAnchor, setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);

  const handleOpenPayslipModal = () => setOpenPayslipModal(true);
  const handleOpenActionMenu = (e, data) => {
    setActionAnchor(e.currentTarget);
    setSelectedRow(data);
  };
  const handleCloseActionMenu = () => setActionAnchor(null);

  const {
    data: payslipData,
    isSuccess: payslipSuccess,
    refetch: refetchPayslip,
  } = useQuery(["getAllPayslip"], getAllPayslip, { retryDelay: 3000 });
  return (
    <ViewFirstBox openDrawer={openDrawer}>
        <Box
          sx={{
            mt: "2.5rem",
            mb: "0.5rem",
          }}
        >
          <Stack direction="row" alignItems="center">
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
        </Box>
        <TableBoxContainer>
          <PayslipTable
            handleOpenActionMenu={handleOpenActionMenu}
            payslipData={payslipData}
            payslipSuccess={payslipSuccess}
          />
        </TableBoxContainer>
      <NewPayslipModal
        refetchPayslip={refetchPayslip}
        openPayslipModal={openPayslipModal}
        setOpenPayslipModal={setOpenPayslipModal}
      />
      <PayslipActionMenu
        selectedRow={selectedRow}
        actionAnchor={actionAnchor}
        refetchPayslip={refetchPayslip}
        isActionMenuOpen={isActionMenuOpen}
        handleCloseActionMenu={handleCloseActionMenu}
      />
    </ViewFirstBox>
  );
};

export default PayslipView;
