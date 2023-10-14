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
import { AddOutlined, PeopleOutlineOutlined, Boy } from "@mui/icons-material";
import { getAllPosition } from "../../requests/positionRequest";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import NewPositionModal from "./NewPositionModal";
import { useViewContext } from "../../context/ViewContext";
import UpdatePositionModal from "./UpdatePositionModal";

const PositionView = () => {
  const {openDrawer} = useViewContext();
  const [openPosModal, setOpenPosModal] = useState(false);
  const [openPosUpdateModal,setOpenPosUpdateModal] = useState(false)
  const [prevUpdatedData, setPrevUpdatedData] = useState(null);
  const handleOpenPosModal = () => setOpenPosModal(true);

  const handleOpenPosUpdateModal = (data) => {
    setPrevUpdatedData(data);
    setOpenPosUpdateModal(true);
  };
  const handleClosePosUpdateModal = () => {
    setOpenPosUpdateModal(false);
    setPrevUpdatedData(null);
  };

  const {
    data: positionData,
    isSuccess: positionSuccess,
    refetch: refetchPosition,
  } = useQuery(["getAllPosition"], getAllPosition, { retryDelay: 3000 });
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "salary",
      headerName: "Salary",
      width: 120,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "target",
      headerName: "Target",
      width: 100,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "promotion_target",
      headerName: "Promotion",
      width: 110,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "monthly_commision_first_tier",
      headerName: "1st Tier Comm",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "monthly_commision_second_tier",
      headerName: "2nd Tier Comm",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quarter_bonus_first_tier",
      headerName: "1st Tier Quarter",
      width: 135,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "quarter_bonus_second_tier",
      headerName: "2nd Tier Quarter",
      width: 140,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "button",
      headerName: "",
      width: 105,

      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "capitalize" }}
            onClick={()=>handleOpenPosUpdateModal(cellValues.row)}
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
            onClick={handleOpenPosModal}
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
        {positionSuccess && positionData !== null && (
          <DataGrid
            sx={{
              fontSize: "16px",
            }}
            rows={positionData}
            columns={columns}
            disableRowSelectionOnClick={true}
          />
        )}
      </Box>
      <NewPositionModal
        openPosModal={openPosModal}
        setOpenPosModal={setOpenPosModal}
        refetchPosition={refetchPosition}
      />
      <UpdatePositionModal 
      openPosUpdateModal={openPosUpdateModal}
      handleClosePosUpdateModal={handleClosePosUpdateModal}
      refetchPosition={refetchPosition}
      data={prevUpdatedData}
      />
    </Box>
  );
};

export default PositionView;
