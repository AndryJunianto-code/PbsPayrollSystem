import {useState} from 'react'
import ViewFirstBox from '../widgets/ViewFirstBox'
import { useViewContext } from '../../context/ViewContext'
import { Box, Button, Stack } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import NewPayslipModal from './NewPayslipModal';

const PayslipView = () => {
const {openDrawer} = useViewContext();
const [openPayslipModal, setOpenPayslipModal] = useState(false);

const handleOpenPayslipModal = () => setOpenPayslipModal(true);


  return (
    <ViewFirstBox openDrawer={openDrawer}>
        <Box
        sx={{
          mt: "2.5rem",
          mb: "0.5rem",
        }}
      >
        <Stack direction='row' alignItems='center'>
        <Button
            aria-label="add"
            variant="contained"
            sx={{
              borderRadius: "50px",
              textTransform: "capitalize",
            }}
            startIcon={<AddOutlined />}
            onClick={handleOpenPayslipModal}
          >
            Add
          </Button>
        </Stack>
      </Box>
      <NewPayslipModal openPayslipModal={openPayslipModal} setOpenPayslipModal={setOpenPayslipModal}/>
    </ViewFirstBox>
  )
}

export default PayslipView