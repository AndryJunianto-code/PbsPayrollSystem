import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const TeamTargetPieChart = () => {
  const data = [
    { name: "Hit", value: 27000 },
    { name: "Remain", value: 3000 },
  ];
  const COLORS = ["white", "rgba(255,255,255,0.3)"];

  return (
    <Paper
      sx={{
        mt: "2rem",
        padding: "1rem",
        background: "#ff3954",
        height: "350px",
        position:'relative'
      }}
    >
      <ResponsiveContainer>
        <PieChart width={800} height={200}>
          <Pie
            data={data}
            cx={"50%"}
            cy={"60%"}
            innerRadius={90}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip wrapperStyle={{zIndex:1000}} formatter={(value) => `${value}`} />
        </PieChart>
      </ResponsiveContainer>
      <Box
          sx={{
            position: "absolute",
            top: "58%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography fontSize={20} color='white' fontWeight={'bold'}>90%</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography fontSize={'18px'} color='white'>Team Target 30k</Typography>
        </Box>
    </Paper>
  );
};

export default TeamTargetPieChart;
