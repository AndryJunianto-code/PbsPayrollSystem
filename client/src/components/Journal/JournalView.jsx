import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { getAllJournal } from "../../requests/employeeRequest";
import { useViewContext } from "../../context/ViewContext";
import { ReactComponent as ExcelSvg } from "../../assets/images/excel.svg";
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
import Sidebar from "../../layouts/Sidebar/Sidebar";

const JournalView = () => {
  const { openDrawer } = useViewContext();
  const [selectedDate, setSelectedDate] = useState(null);
  const tableRef = useRef(null);
  const { data: journalData, isSuccess: journalSuccess } = useQuery(
    ["getAllJournal", selectedDate],
    getAllJournal,
    { retryDelay: 3000 }
  );
console.log(journalData)
  const exportToExcel = () => {
  const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet([]);

const titleRow = ["CV.PERMATA BATAM SUKSESINDO"];
XLSX.utils.sheet_add_aoa(worksheet, [titleRow], { origin: "B1" });
worksheet['!merges'] = [{ s: { r: 0, c: 1 }, e: { r: 0, c: 3 } }];

const dateRow = selectedDate && selectedDate[0] ? [`${dayjs(selectedDate[0]).format('DD MMM YYYY')} - ${dayjs(selectedDate[1]).format('DD MMM YYYY')}`] : ["All"];
XLSX.utils.sheet_add_aoa(worksheet, [dateRow], { origin: "A2" });
worksheet['!merges'].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 3 } });

const existingTable = XLSX.utils.table_to_sheet(document.getElementById("table"));
const tableData = XLSX.utils.sheet_to_json(existingTable, { header: 1 });
XLSX.utils.sheet_add_aoa(worksheet, tableData, { origin: "A3" }); 

const titleCell = worksheet["B1"];
titleCell.s = { font: { sz: 18, bold: true } };

const dateCell = worksheet[`A3`]; // Change to A3
dateCell.s = { alignment: { horizontal: "center" } };

XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

XLSX.writeFile(workbook, "Adjusting_Journal_Entries.xlsx");
  };

  const exportToPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current, { scale: 2, fontSize: 24 }).then(
        (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const width = pdf.internal.pageSize.getWidth();
          const height = (canvas.height * width) / canvas.width;
          pdf.addImage(imgData, "PNG", 5, 20, width, height);
          pdf.save("Adjusting_Journal_Entries.pdf");
        }
      );
    }
  };
console.log(selectedDate)
  return (
    <>
    <Sidebar/>
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
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#f4170a",
                color: "white",
                mr: "1rem",
                "&:hover": {
                  backgroundColor: "#e60f02",
                },
              }}
              onClick={exportToPDF}
              startIcon={<FileDownloadOutlined />}
            >
              PDF
            </Button>
            <Button
              variant="contained"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#107c42",
                color: "white",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#0a7039",
                },
              }}
              onClick={exportToExcel}
              startIcon={<FileDownloadOutlined />}
            >
              Excel
            </Button>
          </Box>
        </Stack>
        <Paper ref={tableRef} sx={{ minHeight: "35rem", padding: "1rem 2rem" }}>
        <Typography
            textAlign={"center"}
            fontSize={"20px"}
            fontWeight={"bold"}
            letterSpacing={"1px"}
          >
              CV.PERMATA BATAM SUKSESINDO
          </Typography>
          <Typography
            textAlign={"center"}
            fontSize={"15px"}
            color="red"
            fontWeight={"bold"}
            letterSpacing={"1px"}
            mb='1rem'
          >
              Adjusting Journal Entries {selectedDate !== null && selectedDate[0] !== null && selectedDate[1] !== null && `${dayjs(selectedDate[0]).format("DD MMM YYYY")} - ${dayjs(selectedDate[1]).format("DD MMM YYYY")}`}
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
                  borderTop:'1px solid #ccc',
                  fontSize:'16px'
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ width: "10%",borderLeft:'1px solid #ccc' }}>Date</TableCell>
                <TableCell sx={{ width: "10%",borderLeft:'1px solid #ccc' }}>Ref</TableCell>
                <TableCell sx={{ width: "10%",borderLeft:'1px solid #ccc' }}>Source</TableCell>
                <TableCell sx={{ width: "25%",borderLeft:'1px solid #ccc'}}>Account</TableCell>
                <TableCell sx={{ width: "8%",borderLeft:'1px solid #ccc',textAlign:'right' }}>Debit (IDR)</TableCell>
                <TableCell sx={{ width: "8%",borderLeft:'1px solid #ccc',borderRight:'1px solid #ccc',textAlign:'right'}}>Credit (IDR)</TableCell>
              </TableRow>
            </TableHead>
            {journalSuccess &&
              journalData.result?.map((journal) => {
                if (typeof journal.id === "number") {
                  //payslip
                  return (
                    <>
                      <TableBody
                        key={journal.id}
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                            fontSize:'16px'
                          },
                        }}
                      >
                        <TableRow>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}} >
                            {dayjs(journal.date).format("DD MMM")}
                          </TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{journal.id}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",fontStyle:'italic'}}>Payslip</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}> Beban Gaji</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",textAlign:'right'}}>
                            {getCurrency(journal.netSalary - journal.commision)}
                          </TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc",}}>{null}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                            fontSize:'16px'
                          },
                        }}
                      >
                        <TableRow>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{ borderLeft:'1px solid #ccc'  }}>Piutang Gaji</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc",textAlign:'right'}}>
                            {getCurrency(journal.netSalary - journal.commision)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                      {journal.commision !== 0 && (
                        <TableBody
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: "none",
                              fontSize:'16px'
                            },
                          }}
                        >
                          <TableRow>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>Beban Komisi</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",textAlign:'right'}}>
                              {getCurrency(journal.commision)}
                            </TableCell >
                            <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc"}}>{null}</TableCell>
                          </TableRow>
                        </TableBody>
                      )}
                      {journal.commision !== 0 && (
                        <TableBody
                          sx={{
                            [`& .${tableCellClasses.root}`]: {
                              borderBottom: "none",
                              fontSize:'16px'
                            },
                          }}
                        >
                          <TableRow > 
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>Piutang Komisi</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                            <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc",textAlign:'right'}}> 
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
                            fontSize:'16px'
                          },
                        }}
                      >
                        <TableRow>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>
                            {dayjs(journal.date).format("DD MMM")}
                          </TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{journal.id}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",fontStyle:'italic'}}>Sales</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>Kas</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",textAlign:'right'}}> 
                            {getCurrency(journal.salesAmount * 10100)}
                          </TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc"}}>{null}</TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody
                        sx={{
                          [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none",
                            fontSize:'16px'
                          },
                        }}
                      >
                        <TableRow>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>Piutang</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",}}>{null}</TableCell>
                          <TableCell sx={{borderLeft: "1px solid #ccc",borderRight: "1px solid #ccc",textAlign:'right'}}>
                            {getCurrency(journal.salesAmount * 10100)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </>
                  );
                }
              })}
              <TableRow sx={{borderTop:'1px solid #ccc'}}>
                <TableCell sx={{borderLeft: "1px solid #ccc",borderTop:'1px solid #ccc'}}>{null}</TableCell>
                <TableCell sx={{borderLeft: "1px solid #ccc",borderTop:'1px solid #ccc'}}>{null}</TableCell>
                <TableCell sx={{borderLeft: "1px solid #ccc",borderTop:'1px solid #ccc'}}>{null}</TableCell>
                <TableCell sx={{borderLeft: "1px solid #ccc",borderTop:'1px solid #ccc',fontWeight:'bold',fontSize:'16px'}}>Total</TableCell>
                <TableCell sx={{borderLeft: "1px solid #ccc",borderTop:'1px solid #ccc',fontWeight:'bold',fontSize:'16px',textAlign:'right'}}>{journalData && getCurrency(journalData.totalExpenses)}</TableCell>
                  <TableCell sx={{borderLeft: "1px solid #ccc",borderTop: "1px solid #ccc",borderRight:'1px solid #ccc',fontWeight:'bold',fontSize:'16px',textAlign:'right'}}>
                  {journalData && getCurrency(journalData.totalExpenses)}
                </TableCell>
              </TableRow>
          </TableContainer>
        </Paper>
      </Box>
    </ViewFirstBox>
    </>
  );
};

export default JournalView;
