import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddOutlined} from "@mui/icons-material";
import BoyImage from "../../assets/images/boy.png";
import GirlImage from "../../assets/images/girl.png";

import { DataGrid } from "@mui/x-data-grid";
import NewEmployeeModal from "./NewEmployeeModal";
import { useQuery } from "react-query";
import { getAllEmployee } from "../../requests/employeeRequest";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { positionColor } from "../../assets/styles/styles";
import { useViewContext } from "../../context/ViewContext";

const EmployeeView = () => {
  const {openDrawer} = useViewContext();
  const [openEmpModal, setOpenEmpModal] = useState(false);
  const [openEmpUpdateModal, setOpenEmpUpdateModal] = useState(false);
  const [prevUpdatedData, setPrevUpdatedData] = useState(null);
  const handleOpenEmpModal = () => setOpenEmpModal(true);
  const handleCloseEmpModal = () => setOpenEmpModal(false);

  const handleOpenEmpUpdateModal = (data) => {
    setPrevUpdatedData(data);
    setOpenEmpUpdateModal(true);
  };

  const handleCloseEmpUpdateModal = () => {
    setOpenEmpUpdateModal(false);
    setPrevUpdatedData(null);
  };

  const {
    data: employeeData,
    isSuccess: employeeSuccess,
    refetch: refetchEmployee,
  } = useQuery(["getAllEmployee"], getAllEmployee, { retryDelay: 3000 });
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 60,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      minWidth: 250,
      maxWidth: 300,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "position_name",
      headerName: "Position",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              backgroundColor:
                positionColor[cellValues.row.position_name.toLowerCase()],
              color: "white",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {cellValues.row.position_name}
          </Box>
        );
      },
      valueGetter: (cellValues) => cellValues.row.position,
    },
    {
      field: "nik",
      headerName: "NIK",
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 85,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Avatar
            src={cellValues.row.gender === "Male" ? BoyImage : GirlImage}
            sx={{ ml: "0.6rem" }}
          />
        );
      },
      valueGetter: (cellValues) => cellValues.row.gender,
    },
    {
      field: "dob",
      headerName: "DOB",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "phone_number",
      headerName: "Telephone",
      width: 150,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "joined_date",
      headerName: "Joined Date",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              backgroundColor:
                cellValues.row.status === "Active" ? "green" : "red",
              color: "white",
              padding: "0.5rem",
              width: "100px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {cellValues.row.status}
          </Box>
        );
      },
      valueGetter: (cellValues) => cellValues.row.status,
    },
    {
      field: "button",
      headerName: "",
      width: 100,

      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "capitalize" }}
            onClick={() => handleOpenEmpUpdateModal(cellValues.row)}
          >
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Box component={"main"} sx={{ flexGrow: 1, pt: "4rem", pr: "2rem", pl:openDrawer ? '16rem' : '6rem'} }>
      <Box
        sx={{
          mt:'2.5rem',
          mb:'0.5rem',
          backgroundColor: "white",
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
            onClick={handleOpenEmpModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          height: "78vh",
          width: "100%",
          backgroundColor: "white",
          "& .super-app-theme--header": {
            backgroundColor: "rgb(63, 77, 103)",
            color: "white",
          },
        }}
      >
        {employeeSuccess && employeeData !== null && (
          <DataGrid
            sx={{
              fontSize: "16px",
            }}
            rows={employeeData}
            columns={columns}
            disableRowSelectionOnClick={true}
          />
        )}
      </Box>
      <NewEmployeeModal
        openEmpModal={openEmpModal}
        handleCloseEmpModal={handleCloseEmpModal}
        refetchEmployee={refetchEmployee}
      />
      <UpdateEmployeeModal
        openEmpUpdateModal={openEmpUpdateModal}
        handleCloseEmpUpdateModal={handleCloseEmpUpdateModal}
        refetchEmployee={refetchEmployee}
        data={prevUpdatedData}
      />
    </Box>
  );
};

export default EmployeeView;
