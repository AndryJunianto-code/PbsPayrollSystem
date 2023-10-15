import React from 'react'
import ViewFirstBox from '../widgets/ViewFirstBox';
import { Box, Button, Stack } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { useViewContext } from '../../context/ViewContext';

const SalesView = () => {
  const {openDrawer} = useViewContext();

  const handleOpenSalesModal = () => {

  }
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt:'2.5rem',
          mb:'0.5rem',
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
            onClick={handleOpenSalesModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </ViewFirstBox>

  )
}

export default SalesView