import React from "react";
import ViewFirstBox from "../widgets/ViewFirstBox";
import { useViewContext } from "../../context/ViewContext";
import RevenueLine from "./RevenueLine";
import ExpensesLine from "./ExpensesLine";
import { Box, Grid } from "@mui/material";
import Minibar from "./Minibar";
import {
  LocalAtmOutlined,
  DraftsOutlined,
  FileDownloadDoneOutlined,
} from "@mui/icons-material";
import TeamTargetPieChart from "./TeamTargetPieChart";
import EmployeePieChart from "./EmployeePieChart";
import TopProducerList from "./TopProducerList";

const DashboardView = () => {
  const { openDrawer } = useViewContext();
  return (
    <ViewFirstBox openDrawer={openDrawer}>
      <Box sx={{ pb: "2rem" }}>
        <Grid container columnSpacing={4}>
          <Grid item xs={6}>
            <RevenueLine />
          </Grid>
          <Grid item xs={6}>
            <ExpensesLine />
          </Grid>

          <Grid item xs={3}>
            <Grid item xs={1}>
              <Minibar
                title={"Total Sales / Week"}
                content={"$82,102"}
                contentColor={"#34be8d"}
                icon={
                  <LocalAtmOutlined
                    sx={{ width: "50px", height: "50px", color: "#34be8d" }}
                  />
                }
              />
            </Grid>
            <Grid item xs={1}>
              <Minibar
                title={"Total Lead / Week"}
                content={"12"}
                contentColor={"#ffa87d"}
                icon={
                  <DraftsOutlined
                    sx={{ width: "46px", height: "46px", color: "#ffa87d" }}
                  />
                }
              />
            </Grid>
            <Grid item xs={1}>
              <Minibar
                title={"Total Closure / Week"}
                content={"6"}
                contentColor={"#1880ff"}
                icon={
                  <FileDownloadDoneOutlined
                    sx={{ width: "46px", height: "46px", color: "#1880ff" }}
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <TopProducerList />
          </Grid>
          <Grid item xs={3}>
            <TeamTargetPieChart />
          </Grid>
          <Grid item xs={3}>
            <EmployeePieChart />
          </Grid>
        </Grid>
      </Box>
    </ViewFirstBox>
  );
};

export default DashboardView;
