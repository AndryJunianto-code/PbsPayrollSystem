import {
    Box,
    Modal,
    Stack,
    Typography,
  } from "@mui/material";
  import React from "react";
  import {  smallModalStyle } from "../../assets/styles/styles";
  
  const SalesRemarksModal = ({selectedRow,setOpenSalesRemarksModal,openSalesRemarksModal}) => {
    const handleCloseSalesRemarksModal = () => setOpenSalesRemarksModal(false)
    return (
      <Modal
        open={openSalesRemarksModal}
        onClose={handleCloseSalesRemarksModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={smallModalStyle}>
            <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography id="modal-modal-title" variant="h6" component="h2" mb='1rem'>
            Remarks
          </Typography>
          <Typography fontWeight={'bold'}>
          ID : {selectedRow.id}
          </Typography>
          </Stack>
          <Typography>{selectedRow.remarks}</Typography>
        </Box>
      </Modal>
    );
  };
  
  export default SalesRemarksModal;
  