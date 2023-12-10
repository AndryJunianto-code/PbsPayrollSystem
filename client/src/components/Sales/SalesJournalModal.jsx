import {
  Box,
  Modal,
  Paper,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  payslipModalStyle,
  salesJournalModalStyle,
} from "../../assets/styles/styles";
import getMonthYear from "../../utils/getMonthYear";
import dayjs from "dayjs";

const SalesJournalModal = ({
  selectedRow,
  openViewJournalModal,
  setOpenViewJournalModal,
  selectedDate,
}) => {
  const [journals, setJournals] = useState([]);
  const handleCloseViewJournalModal = () => setOpenViewJournalModal(false);

  return (
    <Modal
      open={openViewJournalModal}
      onClose={handleCloseViewJournalModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={salesJournalModalStyle}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          textAlign={"center"}
          fontWeight={"700"}
          letterSpacing={"1px"}
        >
          CV.PERMATA BATAM SUKSESINDO
        </Typography>
        <Typography
          id="modal-modal-title"
          fontSize={"16px"}
          letterSpacing={'1px'}
          color='red'
          mt="0.5rem"
          mb="0.5rem"
          textAlign={"center"}
        >
         Sales Journal Entry
        </Typography>
        <Box sx={{ maxHeight: "26rem", height: "26rem", overflowY: "auto" }}>
          <Paper
            sx={{
              mt: "1.5rem",
              backgroundColor: "white",
              padding: "2rem 2rem",
              color: "black",
              height: "17rem",
            }}
          >
            <Stack
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack mb="1rem" px="2.5rem" direction="column">
                <Typography fontSize={"14px"} fontWeight='bold'>
                  Date : {dayjs(selectedRow.date).format("DD MMM YYYY")}
                </Typography>
                <Typography fontSize={"14px"} fontWeight='bold'>
                  Employee : {selectedRow.employeeName}
                </Typography>
              </Stack>
              <Stack mb="1rem" px="2.5rem" direction="column" >
                <Typography fontSize={"14px"} fontWeight='bold'>Invoice Id : {selectedRow.id}</Typography>
                <Typography fontSize={"14px"} fontWeight='bold'>
                  Product : {selectedRow.productName}
                </Typography>
              </Stack>
            </Stack>
            <TableContainer component={Box}>
              <TableHead
                sx={{
                  "& .MuiTableCell-head": {
                    color: "#8a93b1",
                    backgroundColor: "white",
                  },
                }}
              >
                <TableRow>
                  <TableCell sx={{ width: "25%" }}>Account</TableCell>
                  <TableCell sx={{ width: "10%" }}>Debit ($)</TableCell>
                  <TableCell sx={{ width: "10%" }}>Credit ($)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell>Kas</TableCell>
                <TableCell>{selectedRow.salesAmount.toLocaleString()}</TableCell>
                <TableCell>{null}</TableCell>
              </TableBody>
              <TableBody
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TableCell>Piutang</TableCell>
                <TableCell>{null}</TableCell>
                <TableCell>{selectedRow.salesAmount.toLocaleString()}</TableCell>
              </TableBody>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Modal>
  );
};

export default SalesJournalModal;
