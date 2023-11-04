import React, { useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { Box, Button, Stack } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useViewContext } from "../../context/ViewContext";
import { useQuery } from "react-query";
import { getAllSales } from "../../requests/salesRequest";
import { DataGrid } from "@mui/x-data-grid";
import SalesActionMenu from "./SalesActionMenu";
import NewSalesModal from "./NewSalesModal";
import TableBoxContainer from "../widgets/TableBoxContainer";

const SalesView = () => {
  const { openDrawer } = useViewContext();
  const [openSalesModal, setOpenSalesModal] = useState(false);
  const [actionAnchor,setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);

  const handleOpenSalesModal = () => setOpenSalesModal(true);
  const handleOpenActionMenu = (e) => setActionAnchor(e.currentTarget);
  const handleCloseActionMenu = () => setActionAnchor(null);


  const {
    data: salesData,
    isSuccess: salesSuccess,
    refetch: refetchSales,
  } = useQuery(["getAllSales"], getAllSales, { retryDelay: 3000 });

  const columns = [
    {
      field: "salesDate",
      headerName: "Sales Date",
      width: openDrawer ? 140 : 160,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: openDrawer ? 170 : 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: openDrawer ? 180 : 255,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "employeeName",
      headerName: "Employee",
      width: openDrawer ? 180 : 200,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 170,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "productName",
      headerName: "Product Name",
      width: openDrawer ? 160 : 190,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "salesAmount",
      headerName: "Sales Amount",
      width: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Action",
      headerName: "",
      width: 100,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "capitalize" }}
            onClick={handleOpenActionMenu}
          >
            Action
          </Button>
        );
      },
    }
  ]
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt: "2.5rem",
          mb: "0.5rem",
        }}
      >
        <Stack direction="row" alignItems={"center"}>
          <Button
            aria-label="add"
            variant="contained"
            sx={{
              borderRadius: "50px",
              textTransform: "capitalize",
            }}
            startIcon={<AddOutlined />}
            onClick={handleOpenSalesModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
      <TableBoxContainer>
        {salesSuccess && salesData !== null && (
          <DataGrid
          sx={{
            fontSize: "16px",
          }}
          rows={salesData}
          columns={columns}
          disableRowSelectionOnClick={true}
        />
        )}
      </TableBoxContainer>
      <SalesActionMenu actionAnchor={actionAnchor} isActionMenuOpen={isActionMenuOpen} handleCloseActionMenu={handleCloseActionMenu}/>
      <NewSalesModal openSalesModal={openSalesModal} setOpenSalesModal={setOpenSalesModal} refetchSales={refetchSales}/>
    </ViewFirstBox>
  );
};

export default SalesView;
