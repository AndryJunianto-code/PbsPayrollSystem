import React from 'react'
import ViewFirstBox from '../widgets/ViewFirstBox'
import { useViewContext } from '../../context/ViewContext'
import { Box, Stack } from '@mui/material';

const AttendanceSummaryView = () => {
  const {openDrawer} = useViewContext();
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt: "2.5rem",
          mb: "0.5rem",
        }}
      >
        <Stack direction='row' alignItems={'center'}>
          
        </Stack>
      </Box>
    </ViewFirstBox>
  )
}

export default AttendanceSummaryView