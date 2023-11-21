import { Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useViewContext } from '../../context/ViewContext';
import dayjs from 'dayjs';

const PayslipTable = ({payslipData,payslipSuccess,handleOpenActionMenu}) => {
  const {openDrawer} = useViewContext();
    const columns = [
        {
            field: "date",
            headerName: "Date",
            width: openDrawer ? 120 : 140,
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
          headerName: "Name",
          width: openDrawer ? 220 : 245,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "basicSalary",
          headerName: "Basic Salary",
          width: openDrawer ? 130 : 150,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "commision",
          headerName: "Total Commision",
          width: openDrawer ? 150 : 160,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "deduction",
          headerName: "Total Deduction",
          width: openDrawer ? 150 : 170,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "netAdjustment",
          headerName: "Adjustment",
          width: openDrawer ? 130 : 160,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "netSalary",
          headerName: "Net Salary",
          width: openDrawer ? 140 : 160,
          headerClassName: "super-app-theme--header",
        },
        {
          field: "status",
          headerName: "Status",
          width: openDrawer ? 100 : 120,
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