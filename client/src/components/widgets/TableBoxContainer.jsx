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
          backgroundColor: "rgb(63, 77, 103)",
          color: "white",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default TableBoxContainer;
