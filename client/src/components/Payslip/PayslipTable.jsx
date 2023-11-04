import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useViewContext } from '../../context/ViewContext';

const PayslipTable = ({payslipData,payslipSuccess,handleOpenActionMenu}) => {
  const {openDrawer} = useViewContext();
    const columns = [
        {
            field: "date",
            headerName: "Date",
            width: openDrawer ? 150 : 170,
            headerClassName: "super-app-theme--header",
          },
        {
          field: "employeeName",
          headerName: "Name",
          width: openDrawer ? 230 : 255,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "basicSalary",
          headerName: "Basic Salary",
          width: openDrawer ? 150 : 180,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "totalCommision",
          headerName: "Total Commision",
          width: openDrawer ? 150 : 180,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "totalDeduction",
          headerName: "Total Deduction",
          width: openDrawer ? 170 : 190,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "netSalary",
          headerName: "Net Salary",
          width: openDrawer ? 170 : 190,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "status",
          headerName: "Status",
          width: openDrawer ? 120 : 140,
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