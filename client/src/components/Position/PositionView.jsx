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
import getCurrency from '../../utils/getCurrency';
import NewPositionModal from "./NewPositionModal";
import { useViewContext } from "../../context/ViewContext";
import UpdatePositionModal from "./UpdatePositionModal";
import ViewFirstBox from "../widgets/ViewFirstBox";
import TableBoxContainer from "../widgets/TableBoxContainer";
import useGetAllPosition from "../../hooks/useGetAllPosition";

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
  } = useGetAllPosition();
  
  const columns = [
    {
      field: "rank",
      headerName: "Rank",
      width: 60,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "title",
      headerName: "Title",
      width:  openDrawer ? 160 : 170,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "salary",
      headerName: "Salary (Rp)",
      width: 120,
      headerClassName: "super-app-theme--header",
      align:'right',
      headerAlign:'right',
      renderCell: (cellValues) => {
        return (
          <Typography>
            {getCurrency(cellValues.row.salary)}
          </Typography>
        )
      }
    },
    {
      field: "target",
      headerName: "Target",
      width: openDrawer ? 110 : 125,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "promotionTarget",
      headerName: "Promotion",
      width: 110,
      headerClassName: "super-app-theme--header",
    },
    {
      field: "monthlyCommisionFirstTier",
      headerName: "1st Tier Comm",
      width: openDrawer ? 145 : 180,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              fontWeight:'bold',
              border:'1px solid orange',
              color: "darkOrange",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {getCurrency(cellValues.row.monthlyCommisionFirstTier)}
          </Box>
        )
      }
    },
    {
      field: "monthlyCommisionSecondTier",
      headerName: "2nd Tier Comm",
      width: openDrawer ? 145 : 180,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              fontWeight:'bold',
              border:'1px solid red',
              color: "red",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {getCurrency(cellValues.row.monthlyCommisionSecondTier)}
          </Box>
        )
      }
    },
    {
      field: "quarterBonusFirstTier",
      headerName: "1st Tier Quarter",
      width: openDrawer ? 145 : 180,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              fontWeight:'bold',
              border:'1px solid #207af7',
              color: "#207af7",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {getCurrency(cellValues.row.quarterBonusFirstTier)}
          </Box>
        )
      }
    },
    {
      field: "quarterBonusSecondTier",
      headerName: "2nd Tier Quarter",
      width: openDrawer ? 145 : 180,
      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Box
            sx={{
              fontWeight:'bold',
              border:'1px solid #b222f0',
              color: "#b222f0",
              padding: "0.5rem",
              width: "150px",
              letterSpacing: "1px",
              fontSize: "13px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {getCurrency(cellValues.row.quarterBonusSecondTier)}
          </Box>
        )
      }
    },
    {
      field: "button",
      headerName: "Action",
      width: 100,

      headerClassName: "super-app-theme--header",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="contained"
            color="secondary"
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
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt:'2rem',
          mb:'1rem',
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
      <TableBoxContainer>
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
      </TableBoxContainer>
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
    </ViewFirstBox>
  );
};

export default PositionView;
