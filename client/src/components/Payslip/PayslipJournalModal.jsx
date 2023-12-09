import {
    Box,
    Button,
    Modal,
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    tableCellClasses,
  } from "@mui/material";
import {payslipModalStyle } from "../../assets/styles/styles";
import getCurrency from '../../utils/getCurrency';
import { useEffect, useState } from "react";
import getMonthYear from "../../utils/getMonthYear";
  
  const PayslipJournalModal = ({
    incomeData,
    openViewJournalModal,
    setOpenViewJournalModal,
    selectedDate,
  }) => {
    const [journals,setJournals] = useState([]);
    const handleCloseViewJournalModal = () => setOpenViewJournalModal(false);

    const handleDownloadPdf = async () => {
     /*  const htmlContent = renderToStaticMarkup(<PayslipPdf payslipData={selectedRow.row}/>);
      mutateGeneratePayslip(
        {
          html: htmlContent
        },
        {
          onSuccess: (data) => {
            handleCloseActionMenu();
            const blob = new Blob([data], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "payslip.pdf";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          },
        }
      ); */
    };

    useEffect(()=> {
      if(incomeData) {
      setJournals([
        {
          date: 4,
          account: 'Beban Gaji',
          debit: getCurrency(incomeData.totalBaseSalary),
          credit: null,
        },
        {
          date: null,
          account: 'Hutang Gaji',
          debit: null,
          credit: getCurrency(incomeData.totalBaseSalary),
        },
        {
          date: 15,
          account: 'Beban Komisi',
          debit: getCurrency(incomeData.totalCommision),
          credit: null,
        },
        {
          date: null,
          account: 'Hutang Komisi',
          debit: null,
          credit: getCurrency(incomeData.totalCommision),
        },
        {
          date: null,
          account: 'TOTAL',
          debit: getCurrency(incomeData.totalNetSalary),
          credit: getCurrency(incomeData.totalNetSalary),
        }
      ])
      return () => setJournals([]);
    }
    },[incomeData])
    return (
      <Modal
        open={openViewJournalModal}
        onClose={handleCloseViewJournalModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={payslipModalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'center'} fontWeight={'700'} letterSpacing={'1px'}>
          Adjusting Payslip Journal
        </Typography>
        <Typography id="modal-modal-title" fontSize={'16px'} mt='0.5rem' mb='1.5rem' textAlign={'center'}>
          {getMonthYear(selectedDate)}
        </Typography>
        <TableContainer component={Paper}>
        <TableHead sx={{"& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#3f4d67"
        },}}>
          <TableRow>
            <TableCell  sx={{width:'10%'}}>Date</TableCell>
            <TableCell  sx={{width:'25%'}}>Account</TableCell>
            <TableCell  sx={{width:'10%'}}>Debit (IDR)</TableCell>
            <TableCell  sx={{width:'10%'}}>Credit (IDR)</TableCell>
          </TableRow>
        </TableHead>
          {journals.length > 0 && journals.map(journal=> (
          <TableBody sx={{
            [`& .${tableCellClasses.root}`]: {
              borderBottom: "none"
            }
          }}>
            <TableCell>{journal.date}</TableCell>
            <TableCell  sx={{fontWeight:journal.credit && journal.debit?'bold':'',fontSize:'16px',paddingRight:journal.credit && journal.debit ? '0rem' : '4rem'}}>{journal.account}</TableCell>
            <TableCell sx={{fontWeight:journal.credit && journal.debit?'bold':''}}>{journal.debit}</TableCell>
            <TableCell sx={{fontWeight:journal.credit && journal.debit?'bold':'',}}>{journal.credit}</TableCell>
          </TableBody>
          ))}
        </TableContainer>
        <Button
              onClick={handleDownloadPdf}
              variant="contained"
              sx={{ mt: "2.5rem", textTransform: "capitalize", float: "right" }}
            >
              Download PDF
        </Button>
        </Box>
      </Modal>
    );
  };
  
  export default PayslipJournalModal;
  