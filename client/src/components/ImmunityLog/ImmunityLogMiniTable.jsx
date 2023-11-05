import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import useTrackRecordsAlgorithm from "../../hooks/useTrackRecordsAlgorithm";
import ImmunityLogTableCell from "./ImmunityLogTableCell";

const ImmunityLogMiniTable = ({employeeTrackRecordsData}) => {
  const modifiedEmployeeTrackRecords = useTrackRecordsAlgorithm(employeeTrackRecordsData);
  return (
    <TableContainer>
      <Table aria-label="simple table">
      <TableHead>
          <TableRow>
            <ImmunityLogTableCell fontWeight={'bold'}>Employee</ImmunityLogTableCell>
            <ImmunityLogTableCell>Position</ImmunityLogTableCell>
            <ImmunityLogTableCell>Immunity</ImmunityLogTableCell>
            <ImmunityLogTableCell>Core Wallet</ImmunityLogTableCell>
            <ImmunityLogTableCell>Supplement Wallet</ImmunityLogTableCell>
            <ImmunityLogTableCell>Promotion Point</ImmunityLogTableCell>
            <ImmunityLogTableCell>Revenue Point</ImmunityLogTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiedEmployeeTrackRecords.map((emp) => (
            <TableRow
              key={emp.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <ImmunityLogTableCell sx={{fontWeight:'bold'}}>{emp.name}</ImmunityLogTableCell>
              <ImmunityLogTableCell >{emp.position.title}</ImmunityLogTableCell>
              <ImmunityLogTableCell >
                {emp.immunityLog.immunity} 
              <span>+{emp.earned.immunityEarned}</span>
              <span> = {emp.earned.finalImmunity}</span>
              </ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp.earned.coreWalletLeft}</ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp.immunityLog.supplementWallet}</ImmunityLogTableCell>
              <ImmunityLogTableCell >
                {emp.immunityLog.immunity} 
              <span>+{emp.earned.immunityEarned}</span>
              <span> = {emp.earned.finalImmunity}</span>
              </ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp.immunityLog.revenuePoint}
              <span>+{emp.earned.revenuePointEarned}</span>
              <span> = {emp.earned.finalRevenuePoint}</span>
              </ImmunityLogTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImmunityLogMiniTable;
