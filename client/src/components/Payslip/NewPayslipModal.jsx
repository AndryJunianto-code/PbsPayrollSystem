import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { largeModalStyle, mediumModalStyle } from '../../assets/styles/styles'

const NewPayslipModal = ({openPayslipModal,setOpenPayslipModal}) => {

    const handleClosePayslipModal = () => setOpenPayslipModal(false);

  return (
    <Modal open={openPayslipModal} onClose={handleClosePayslipModal} aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description">
        <Box sx={largeModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Payslip
          </Typography>
        </Box>
    </Modal>
  )
}

export default NewPayslipModal