import { Box } from "@mui/material";
import React from "react";

const ViewFirstBox = ({ children, openDrawer }) => {
  return (
    <Box
      component={"main"}
      sx={{
        flexGrow: 1,
        pt: "4rem",
        pr: { xs: "1rem", lg: openDrawer ? "2rem" : "12rem" },
        pl: { xs: "1rem", lg: openDrawer ? "16rem" : "6rem" },
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
};

export default ViewFirstBox;
