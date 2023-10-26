import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Button, Stack } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import BoyImage from "../../assets/images/boy.png";
import GirlImage from "../../assets/images/girl.png";

import { DataGrid } from "@mui/x-data-grid";
import NewEmployeeModal from "./NewEmployeeModal";
import { useQuery } from "react-query";
import { getAllEmployee } from "../../requests/employeeRequest";
import UpdateEmployeeModal from "./UpdateEmployeeModal";
import { positionColor } from "../../assets/styles/styles";
import { useViewContext } from "../../context/ViewContext";
import ViewFirstBox from "../widgets/ViewFirstBox";
import EmployeeActionMenu from "./EmployeeActionMenu";

const EmployeeView = () => {
  const theme = useTheme();
  const { openDrawer } = useViewContext();
  const [openEmpModal, setOpenEmpModal] = useState(false);
  const [openEmpUpdateModal, setOpenEmpUpdateModal] = useState(false);
  const handleOpenEmpModal = () => setOpenEmpModal(true);

  const [actionAnchor, setActionAnchor] = useState(null);
  const isActionMenuOpen = Boolean(actionAnchor);
  const [selectedRow, setSelectedRow] = useState(null);
  const handleCloseActionMenu = () => setActionAnchor(null);
  const handleOpenActionMenu = (e,data) => {
    setActionAnchor(e.currentTarget);
    setSelectedRow(data)
  };

  const handleOpenEmpUpdateModal = (data) => {
    handleCloseActionMenu();
    setOpenEmpUpdateModal(true)};

  const handleCloseEmpUpdateModal = () => {
    setOpenEmpUpdateModal(false);
    setSelectedRow(null)
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
      field: "positionName",
      headerName: "Position",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              backgroundColor:
                positionColor[
                  cellValues.row.position.title.toLowerCase().replace(" ", "_")
                ],
              color: "white",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {cellValues.row.position?.title}
          </Box>
        );
      },
      valueGetter: (cellValues) => cellValues.row.position,
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
      field: "phoneNumber",
      headerName: "Telephone",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "joinedDate",
      headerName: "Joined Date",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "status",
      headerName: "Status",
      width: 146,
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
            onClick={(e) => handleOpenActionMenu(e, cellValues)}
          >
            Action
          </Button>
        );
      },
    },
  ];

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
            onClick={handleOpenEmpModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
      <Box
        sx={{
          height: "78vh",
          width: "fit-content",
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
        setOpenEmpModal={setOpenEmpModal}
        refetchEmployee={refetchEmployee}
      />
      <UpdateEmployeeModal
        openEmpUpdateModal={openEmpUpdateModal}
        handleCloseEmpUpdateModal={handleCloseEmpUpdateModal}
        refetchEmployee={refetchEmployee}
        data={selectedRow}
      />
      <EmployeeActionMenu
      handleOpenEmpUpdateModal={handleOpenEmpUpdateModal}
        actionAnchor={actionAnchor}
        isActionMenuOpen={isActionMenuOpen}
        handleCloseActionMenu={handleCloseActionMenu}
        selectedRow={selectedRow}
      />
    </ViewFirstBox>
  );
};

export default EmployeeView;
