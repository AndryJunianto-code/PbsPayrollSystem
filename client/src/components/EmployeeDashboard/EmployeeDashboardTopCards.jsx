import { Grid } from '@mui/material'
import React from 'react'
import EmployeeDashboardLongCard from './EmployeeDashboardLongCard'
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

const EmployeeDashboardTopCards = () => {
  return (
    <Grid container spacing={3}>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Immunity"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#259c8a"
                content="2"
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Promotion Point"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#3699e8"
                content="20,000"
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Core"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#ffb396"
                content="2"
              />
            </Grid>
            <Grid item xs={6}>
            <EmployeeDashboardLongCard
                title={"Revenue Point"}
                icon={
                  <VaccinesOutlinedIcon sx={{ color: "white" }} />
                }
                backgroundColor="#5c5bec"
                content="2"
              />
            </Grid>
          </Grid>
  )
}

export default EmployeeDashboardTopCards