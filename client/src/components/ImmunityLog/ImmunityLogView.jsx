import { useState } from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import { Box, Button, Stack } from "@mui/material";
import NewImmunityLogModal from "./NewImmunityLogModal";
import { AddOutlined } from "@mui/icons-material";

const ImmunityLogView = () => {
  const { openDrawer } = useViewContext();
  const [openImmunityLogModal, setOpenImmunityLogModal] = useState(false);

  const handleOpenImmunityLogModal = () => setOpenImmunityLogModal(true);

  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box sx={{ mt: "2.5rem", mb: "0.5" }}>
        <Stack direction="row" alignItems={"center"}>
          <Button
            aria-label="add"
            variant="contained"
            sx={{
              borderRadius: "50px",
              textTransform: "capitalize",
            }}
            startIcon={<AddOutlined />}
            onClick={handleOpenImmunityLogModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
      <NewImmunityLogModal
        openImmunityLogModal={openImmunityLogModal}
        setOpenImmunityLogModal={setOpenImmunityLogModal}
      />
    </ViewFirstBox>
  );
};

export default ImmunityLogView;
