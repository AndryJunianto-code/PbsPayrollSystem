import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getAllJournal } from "../../requests/employeeRequest";
import { useViewContext } from "../../context/ViewContext";
import { ReactComponent as ExcelSvg } from '../../assets/images/excel.svg';
import {
  Box,
  Button,
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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import ViewFirstBox from "../widgets/ViewFirstBox";
import getCurrency from "../../utils/getCurrency";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FileDownloadOutlined } from "@mui/icons-material";

const JournalView = () => {
  const { openDrawer } = useViewContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const tableRef = useRef(null);
  const { data: journalData, isSuccess: journalSuccess } = useQuery(
    ["getAllJournal", selectedDate],
    getAllJournal,
    { retryDelay: 3000 }
  );

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(
      document.getElementById("table")
    );

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "Adjusting_Journal_Entries.xlsx");
  };

  const exportToPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current,{scale:2,fontSize:24}).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const width = pdf.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;
        pdf.addImage(imgData, "PNG", 5, 20, width, height);
        pdf.save("Adjusting_Journal_Entries.pdf");
      });
    }
  };

  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box
        sx={{
          mt: "1rem",
          mb: "0.5rem",
          width: openDrawer ? "80vw" : "91vw",
        }}
      >
        <Stack
          direction="row"
          mb="1rem"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{ start: "From", end: "To" }}
              format="DD MMM YYYY"
              onAccept={(value) => setSelectedDate(value)}
            />
          </LocalizationProvider>
          <Box>
          <Button variant="contained" color="primary" sx={{backgroundColor:"#f4170a", color:'white', mr:'1rem'}} onClick={exportToPDF} startIcon={<FileDownloadOutlined/>}> 
            PDF 
          </Button>
          <Button variant="contained" sx={{backgroundColor:"#107c42", color:'white',textTransform:'capitalize'}} onClick={exportToExcel} startIcon={<FileDownloadOutlined/>}> 
            Excel
          </Button>
          </Box>
        </Stack>
        <Paper ref={tableRef} sx={{ minHeight: "35rem", padding: "1rem 2rem" }}>
          <Typography
            textAlign={"center"}
            fontSize={"18px"}
            color="red"
            fontWeight={"bold"}
            letterSpacing={"1px"}
          >
            Adjusting Journal Entries
          </Typography>
          <TableContainer
            id="table"
            sx={{ margin: "0 auto", width: "90%", maxWidth: "90%" }}
          >
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  color: "#8a93b1",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ width: "10%" }}>Date</TableCell>
                <TableCell sx={{ width: "25%" }}>Account</TableCell>
                <TableCell sx={{ width: "8%" }}>Debit (IDR)</TableCell>
                <TableCell sx={{ width: "8%" }}>Credit (IDR)</TableCell>
              </TableRow>
            </TableHead>
            {journalSuccess &&
              journalData?.map((journal) => {
                if (typeof journal.id === "number") {
                  //payslip
                  return (
                    <>
                      <TableBody
                        key={journal.id}
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            {dayjs(journal.date).format("DD MMM")}
                          </TableCell>
                          <TableCell>Beban Gaji</TableCell>
                          <TableCell>
                            {getCurrency(journal.netSalary - journal.commision)}
                          </TableCell>
                          <TableCell>{null}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableRow>
                        <TableCell>{null}</TableCell>
                        <TableCell>Piutang Gaji</TableCell>
                        <TableCell>{null}</TableCell>
                        <TableCell>
                          {getCurrency(journal.netSalary - journal.commision)}
                        </TableCell>
                        </TableRow>
                      </TableBody>
                      {journal.commision !== 0 && (
                        <TableBody
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: "none",
                            },
                          }}
                        >
                          <TableRow>
                          <TableCell>{null}</TableCell>
                          <TableCell>Beban Komisi</TableCell>
                          <TableCell>
                            {getCurrency(journal.commision)}
                          </TableCell>
                          <TableCell>{null}</TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                      {journal.commision !== 0 && (
                        <TableBody
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: "none",
                            },
                          }}
                        >
                          <TableRow>
                          <TableCell>{null}</TableCell>
                          <TableCell>Piutang Komisi</TableCell>
                          <TableCell>{null}</TableCell>
                          <TableCell>
                            {getCurrency(journal.commision)}
                          </TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      <TableBody
                        key={journal.id}
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableRow>
                        <TableCell>
                          {dayjs(journal.date).format("DD MMM")}
                        </TableCell>
                        <TableCell>Kas</TableCell>
                        <TableCell>
                          {getCurrency(journal.salesAmount * 10100)}
                        </TableCell>
                        <TableCell>{null}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                          },
                        }}
                      >
                        <TableRow>
                        <TableCell>{null}</TableCell>
                        <TableCell>Piutang</TableCell>
                        <TableCell>{null}</TableCell>
                        <TableCell>
                          {getCurrency(journal.salesAmount * 10100)}
                        </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  );
                }
              })}
          </TableContainer>
        </Paper>
      </Box>
    </ViewFirstBox>
  );
};

export default JournalView;
