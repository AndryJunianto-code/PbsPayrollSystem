import { Box, Modal, Paper, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, tableCellClasses } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { payslipModalStyle, salesJournalModalStyle } from '../../assets/styles/styles'
import getMonthYear from '../../utils/getMonthYear'
import dayjs from 'dayjs'

const SalesJournalModal = ({salesData,openViewJournalModal,setOpenViewJournalModal,selectedDate}) => {
    const [journals,setJournals] = useState([]);
    const handleCloseViewJournalModal = () => setOpenViewJournalModal(false)

    useEffect(()=> {
      if(salesData) {
       /* salesData.map(sales=> {
        setJournals()
       }) */
       setJournals(salesData);
      }
      return () => setJournals([]);
    },[salesData])
  return (
    <Modal
    open={openViewJournalModal}
    onClose={handleCloseViewJournalModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={salesJournalModalStyle}>
    <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'} fontWeight={'700'} letterSpacing={'1px'}>
      Adjusting Sales Journal
    </Typography>
    <Typography id="modal-modal-title" fontSize={'16px'} mt='0.5rem' mb='0.5rem' textAlign={'center'}>
      {getMonthYear(selectedDate)}
    </Typography>
    <Box sx={{maxHeight:'26rem', height:'26rem', overflowY:'auto'}}>
    {journals.length > 0 && journals.map(journal=> (
      <Paper
      key={journal.id}
      sx={{
        mt: "1.5rem",
        backgroundColor: "white",
        padding: "2rem 2rem",
        color: "black",
        height: "17rem",
      }}
    >
      <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
      <Stack mb='1rem' px='2.5rem' direction='column'>
      <Typography fontSize={'14px'}>Date : {dayjs(journal.date).format('DD MMM YYYY')}</Typography>
      <Typography fontSize={'14px'}>Employee : {journal.employeeName}</Typography>
      </Stack>
      <Stack mb='1rem' px='2.5rem' direction='column'>
      <Typography fontSize={'14px'}>Invoice Id : 20320291</Typography>
      <Typography fontSize={'14px'}>Product : Business Loan</Typography>
      </Stack>
      </Stack>
      <TableContainer component={Box}>
<TableHead sx={{"& .MuiTableCell-head": {
    color: "#8a93b1",
    backgroundColor: "white"
},}}>
  <TableRow>
    <TableCell  sx={{width:'25%'}}>Account</TableCell>
    <TableCell  sx={{width:'10%'}}>Debit ($)</TableCell>
    <TableCell  sx={{width:'10%'}}>Credit ($)</TableCell>
  </TableRow>
</TableHead>
<TableBody sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }}>
    <TableCell>Kas</TableCell>
    <TableCell>{journal.salesAmount}</TableCell>
    <TableCell>{null}</TableCell>
</TableBody>
<TableBody sx={{
    [`& .${tableCellClasses.root}`]: {
      borderBottom: "none"
    }
  }}>
    <TableCell>Piutang</TableCell>
    <TableCell>{null}</TableCell>
    <TableCell>{journal.salesAmount}</TableCell>
</TableBody>
</TableContainer>
      </Paper>
    ))}
    </Box>
    </Box>
  </Modal>
  )
}

export default SalesJournalModal