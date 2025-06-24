import React, { useEffect, useState } from "react";
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
import useGetSalesByWeek from "../../hooks/useGetSalesByWeek";
import Sidebar from "../../layouts/Sidebar/Sidebar";

const DashboardView = () => {
  const { openDrawer } = useViewContext();
  const [totalSalesWeekly,setTotalSalesWeekly] = useState("0");

  const {data:salesData} = useGetSalesByWeek(new Date());
  useEffect(()=> {
    if(salesData !== null) {
      const sum = salesData?.reduce((total,sales)=> total + sales.salesAmount,0)
      setTotalSalesWeekly(sum?.toLocaleString());
    }
  },[salesData])
  return (
    <>
      <Sidebar/>
      <Box sx={{ pb: "2rem",pt:'4rem',pl: { xs: "1rem", lg: openDrawer ? "16rem" : "6rem" },pr: { xs: "1rem", lg:"2rem" }, }}>
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
                content={`$${totalSalesWeekly}`}
                contentColor={"#34be8d"}
                fromColor={'#3ad2bc'}
                toColor={'#86d9d3'}
                icon={
                  <LocalAtmOutlined
                    sx={{ width: "35px", height: "35px", color: "white" }}
                  />
                }
              />
            </Grid>
            <Grid item xs={1}>
              <Minibar
                title={"Total Lead / Week"}
                content={"12"}
                contentColor={"#ffa87d"}
                fromColor={'#3297e7'}
                toColor={'#85c4f7'}
                icon={
                  <DraftsOutlined
                    sx={{ width: "32px", height: "32px", color: "white" }}
                  />
                }
              />
            </Grid>
            <Grid item xs={1}>
              <Minibar
                title={"Total Closure / Week"}
                content={salesData !== null ? salesData?.length : 0}
                contentColor={"#1880ff"}
                fromColor={'#fe8a96'}
                toColor={'#ffbc96'}
                icon={
                  <FileDownloadDoneOutlined
                    sx={{ width: "32px", height: "32px", color: "white" }}
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
    </>
  );
};

export default DashboardView;
