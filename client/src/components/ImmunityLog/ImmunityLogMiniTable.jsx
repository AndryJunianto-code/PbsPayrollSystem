import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ImmunityLogTableCell from "./ImmunityLogTableCell";

const ImmunityLogMiniTable = ({modifiedEmployeeTrackRecords }) => {
 
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <ImmunityLogTableCell fontWeight={"bold"}>
              Employee
            </ImmunityLogTableCell>
            <ImmunityLogTableCell>Position</ImmunityLogTableCell>
            <ImmunityLogTableCell>Immunity</ImmunityLogTableCell>
            <ImmunityLogTableCell>Core Wallet</ImmunityLogTableCell>
            <ImmunityLogTableCell>Supplement Wallet</ImmunityLogTableCell>
            <ImmunityLogTableCell>Promotion Point</ImmunityLogTableCell>
            <ImmunityLogTableCell>Revenue Point</ImmunityLogTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modifiedEmployeeTrackRecords  !== null && modifiedEmployeeTrackRecords.map((emp) => (
            <TableRow
              key={emp?.employeeId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <ImmunityLogTableCell sx={{ fontWeight: "bold" }}>
                {emp?.name}
              </ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp?.promotionStatus === "None" ? emp?.position : emp?.promotionStatus}</ImmunityLogTableCell>
              <ImmunityLogTableCell>
                {emp?.promotionStatus === "None" && (
                  <span>
                    {emp?.prevImmunity}
                    <span>
                      {emp?.immunityEarned === 0 ? '-1 ' : `+${emp?.immunityEarned} `} 
                      =
                    </span>
                  </span>
                )}
                <span> {emp?.immunity}</span>
              </ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp.coreWallet}</ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp?.supplementWallet}</ImmunityLogTableCell>
              <ImmunityLogTableCell>
                {emp?.promotionStatus === "None" && (
                  <span>
                    {emp?.prevPromotion}
                    <span>
                      {emp?.immunityEarned === 0 ? '-1 ' : `+${emp?.immunityEarned} `} 
                      =
                    </span>
                  </span>
                )}
                <span> {emp?.promotionPoint}</span>
              </ImmunityLogTableCell>
              <ImmunityLogTableCell>{emp?.revenuePoint}</ImmunityLogTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ImmunityLogMiniTable;
