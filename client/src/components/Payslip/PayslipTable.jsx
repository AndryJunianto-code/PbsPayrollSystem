import { Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useViewContext } from '../../context/ViewContext';
import dayjs from 'dayjs';
import getCurrency from '../../utils/getCurrency';

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
          headerClassName: "super-app-theme--header",
          width: openDrawer ? 120 : 130,
          headerAlign:'right',
          align:'right',
          renderCell: (cellValues) => {
            return (
              <Typography>{getCurrency(cellValues.row.basicSalary)}</Typography>
            )
          }
        },
        {
          field: "commision",
          headerName: "Total Commision",
          width: openDrawer ? 160 : 170,
          headerClassName: "super-app-theme--header",
          headerAlign:'right',
          align:'right',
          renderCell: (cellValues) => {
            return (
              <Typography>{getCurrency(cellValues.row.commision)}</Typography>
            )
          }
        },
        {
          field: "deduction",
          headerName: "Total Deduction",
          width: openDrawer ? 150 : 170,
          headerClassName: "super-app-theme--header",
          headerAlign:'right',
          align:'right',
          renderCell: (cellValues) => {
            return (
              <Typography>{getCurrency(cellValues.row.deduction)}</Typography>
            )
          }
        },
        {
          field: "netAdjustment",
          headerName: "Adjustment",
          width: openDrawer ? 125 : 155,
          headerClassName: "super-app-theme--header",
          headerAlign:'right',
          align:'right',
          renderCell: (cellValues) => {
            return (
              <Typography>{getCurrency(cellValues.row.netAdjustment)}</Typography>
            )
          }
        },
        {
          field: "netSalary",
          headerName: "Net Salary",
          width: openDrawer ? 135 : 155,
          headerClassName: "super-app-theme--header",
          headerAlign:'right',
          align:'right',
          renderCell: (cellValues) => {
            return (
              <Typography>{getCurrency(cellValues.row.netSalary)}</Typography>
            )
          }
        },
        {
          field: "status",
          headerName: "Status",
          width: openDrawer ? 110 : 130,
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