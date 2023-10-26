import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const EmployeePieChart = () => {
  const data01 = [
    { name: "Probation", value: 6 },
    { name: "Junior Consultant", value: 3 },
    { name: "Senior Consultant", value: 1 },
  ];
  const data02 = [
    { name: "Male", value: 7 },
    { name: "Female", value: 3 },
  ];
  const COLORS = ["#1880ff", "#fb6f92"];
  const COLORSPOSITION = ["#27ae60","#f39c12","#e74c3c"]
  return (
    <Paper
      sx={{
        mt: "2rem",
        padding: "1rem",
        background: "white",
        height: "350px",
        position: "relative",
      }}
    >
      <ResponsiveContainer>
        <PieChart width={400} height={400}>
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="60%"
            outerRadius={70}
            fill="#8884d8"
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORSPOSITION[index % COLORSPOSITION.length]}
              />
            ))}
            </Pie>

          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="60%"
            innerRadius={80}
            outerRadius={100}
            fill="#82ca9d"
            label
          >
            {data02.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [
              `${name}: ${value}`,
              data01,
              data02,
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <Box
          sx={{
            position: "absolute",
            top: "15%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography fontSize={20} fontWeight={'bold'}>Employee Stats</Typography>
        </Box>
    </Paper>
  );
};

export default EmployeePieChart;
