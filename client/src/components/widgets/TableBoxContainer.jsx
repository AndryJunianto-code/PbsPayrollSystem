import { Box } from "@mui/material";
import React from "react";

const TableBoxContainer = ({ children }) => {
  return (
    <Box
      sx={{
        height: "78vh",
        width: {
          lg: "fit-content",
          xs: "90vw",
        },
        backgroundColor: "white",
        "& .super-app-theme--header": {
          backgroundColor: "white",
          color: "#8a93b1",
          fontWeight:'600',
          fontFamily: 'Poppins, sans-serif',
          fontSize:'14px',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TableBoxContainer;
