import { Button, useTheme } from "@mui/material";
import React from "react";

const SecondaryButton = ({ children, sx, startIcon, onClick }) => {
    const theme = useTheme();
  return (
    <Button
      variant="contained"
      sx={{
        ...sx,  
        textTransform: "capitalize",
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: theme.palette.secondary.hover,
        },
      }}
      startIcon={startIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
