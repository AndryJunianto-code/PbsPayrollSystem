import React from "react";
import { ListItemIcon,ListItem,ListItemText,ListItemButton } from "@mui/material";


const SidebarItem = ({ open, name, icon,handleView}) => {

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
      onClick={handleView}
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
         {icon}
        </ListItemIcon>
        <ListItemText sx={{ display: open ? "block" : "none" }}>
          {name}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
