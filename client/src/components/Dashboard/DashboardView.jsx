import React from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import RevenueLine from "./RevenueLine";
import ExpensesLine from "./ExpensesLine";
import { Box, Grid } from "@mui/material";
import Minibar from "./Minibar";

const DashboardView = () => {
  const { openDrawer } = useViewContext();
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box sx={{pb:'2rem'}}>
      <Grid container columnSpacing={4}>
        <Grid item xs={6}>
          <RevenueLine />
        </Grid>
        <Grid item xs={6}>
          <ExpensesLine />
        </Grid>
        <Grid item xs={3}>
        <Minibar/>
        </Grid>
      </Grid>
      </Box>
    </ViewFirstBox>
  );
};

export default DashboardView;
