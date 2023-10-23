import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const ImmunityLogTable = ({immunityLogData,immunityLogSuccess,handleOpenActionMenu}) => {
  const columns = [
    {
      field: "employeeName",
      headerName: "Name",
      width: 230,
      minWidth: 250,
      maxWidth: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "promotionPoint",
      headerName: "Promotion Point",
      width: 155,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "immunity",
      headerName: "Immunity",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "coreWallet",
      headerName: "Core Wallet",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "supplementWallet",
      headerName: "Supplement Wallet",
      width: 165,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "revenuePoint",
      headerName: "Revenue Point",
      width: 155,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "lead",
      headerName: "Lead",
      width: 75,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "Action",
      headerName: "",
      width: 122,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
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
