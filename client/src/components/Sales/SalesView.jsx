import React, { useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { Box, Button, Stack, Typography } from "@mui/material";
import { AddOutlined, SummarizeOutlined } from "@mui/icons-material";
import { useViewContext } from "../../context/ViewContext";
import { useQuery } from "react-query";
import { getAllSalesByMonth } from "../../requests/salesRequest";
import { DataGrid } from "@mui/x-data-grid";
import SalesActionMenu from "./SalesActionMenu";
import NewSalesModal from "./NewSalesModal";
import TableBoxContainer from "../widgets/TableBoxContainer";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import SecondaryButton from "../widgets/SecondaryButton";
import SalesJournalModal from "./SalesJournalModal";

const SalesView = () => {
  const { openDrawer } = useViewContext();
  const [openSalesModal, setOpenSalesModal] = useState(false);
  const [openViewJournalModal, setOpenViewJournalModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("MMM YYYY"));
  const [actionAnchor,setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);

  const handleOpenSalesModal = () => setOpenSalesModal(true);
  const handleOpenViewJournalModal = () => setOpenViewJournalModal(true);
  const handleOpenActionMenu = (e) => setActionAnchor(e.currentTarget);
  const handleCloseActionMenu = () => setActionAnchor(null);


  const {
    data: salesData,
    isSuccess: salesSuccess,
    refetch: refetchSales,
  } = useQuery(["getAllSalesByMonth", dayjs(selectedDate).format('MM YYYY')], getAllSalesByMonth, { retryDelay: 3000 });

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: openDrawer ? 140 : 160,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Typography
          >
            {dayjs(cellValues.row.date).format('DD MMM YYYY')}
          </Typography>
        );
      },
    },
    {
      field: "employeeName",
      headerName: "Employee",
      width: openDrawer ? 180 : 200,
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
            color="secondary"
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
          <Stack direction='row' alignItems={'center'}>
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
            onClick={handleOpenSalesModal}
          >
            Add
          </Button>
          </Stack>
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
      <SalesJournalModal salesData={salesData} selectedDate={selectedDate} openViewJournalModal={openViewJournalModal} setOpenViewJournalModal={setOpenViewJournalModal}/>
    </ViewFirstBox>
  );
};

export default SalesView;
