import { Grid } from '@mui/material'
import React from 'react'
import EmployeeDashboardLongCard from './EmployeeDashboardLongCard'
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const EmployeeDashboardTopCards = ({employee}) => {
  const ownedImmunityLogs = employee.immunityLogs.length > 0;
  return (
    <Grid container spacing={3}>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Immunity"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#259c8a"
                content={ownedImmunityLogs ? employee?.immunityLogs[0].immunity : '8'}
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Promotion Point"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#3699e8"
                content={ownedImmunityLogs ? employee?.immunityLogs[0].promotionPoint : '3'}
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Core"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#ffb396"
                content={ownedImmunityLogs ? employee?.immunityLogs[0].coreWallet : '800'}
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Revenue Point"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#5c5bec"
                content={ownedImmunityLogs ? employee?.immunityLogs[0].revenuePoint : '0'}
              />
            </Grid>
          </Grid>
  )
}

export default EmployeeDashboardTopCards