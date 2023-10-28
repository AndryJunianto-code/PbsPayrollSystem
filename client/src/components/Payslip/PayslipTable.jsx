import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const PayslipTable = ({payslipData,payslipSuccess,handleOpenActionMenu}) => {
    const columns = [
        {
            field: "date",
            headerName: "Date",
            width: 155,
            headerClassName: "super-app-theme--header",
          },
        {
          field: "employeeName",
          headerName: "Name",
          width: 230,
          minWidth: 250,
          maxWidth: 300,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "basicSalary",
          headerName: "Basic Salary",
          width: 150,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "totalCommision",
          headerName: "Total Commision",
          width: 150,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "totalDeduction",
          headerName: "Total Deduction",
          width: 150,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "netSalary",
          headerName: "Net Salary",
          width: 150,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "status",
          headerName: "Status",
          width: 120,
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
      {payslipSuccess && payslipData !== null && (
        <DataGrid
          sx={{
            fontSize: "16px",
          }}
          rows={payslipData}
          columns={columns}
          disableRowSelectionOnClick={true}
        />
      )}
    </>
  )
}

export default PayslipTable