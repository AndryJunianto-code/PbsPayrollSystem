import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useViewContext } from "../../context/ViewContext";

const ImmunityLogTable = ({immunityLogData,immunityLogSuccess,handleOpenActionMenu}) => {
  const {openDrawer} = useViewContext();
  const columns = [
    {
      field: "employeeName",
      headerName: "Name",
      width: openDrawer ? 230 : 280,
      minWidth: 250,
      maxWidth: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "promotionPoint",
      headerName: "Promotion Point",
      width: openDrawer ? 165 : 185,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "immunity",
      headerName: "Immunity",
      width: openDrawer ? 130 : 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "coreWallet",
      headerName: "Core Wallet",
      width: openDrawer ? 145 : 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "supplementWallet",
      headerName: "Supplement Wallet",
      width: openDrawer ? 180 : 220,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "revenuePoint",
      headerName: "Revenue Point",
      width: openDrawer ? 175 : 195,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lead",
      headerName: "Lead",
      width: 95,
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
            onClick={(e)=>handleOpenActionMenu(e,cellValues)}
          >
            Action
          </Button>
        );
      },
    }
  ];
  

  return (
    <>
      {immunityLogSuccess && immunityLogData !== null && (
        <DataGrid
          sx={{
            fontSize: "16px",
          }}
          rows={immunityLogData}
          columns={columns}
          disableRowSelectionOnClick={true}
        />
      )}
    </>
  );
};

export default ImmunityLogTable;
