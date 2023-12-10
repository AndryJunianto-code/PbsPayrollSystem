import React, { useEffect } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { UpgradeOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import { useMutation } from "react-query";
import { deleteImmunityLog } from "../../requests/immunityLogRequest";

const ImmunityLogActionMenu = ({
  selectedRow,
  refetchImmunityLog,
  actionAnchor,
  isActionMenuOpen,
  handleCloseActionMenu,
  handleOpenImmunityLogUpdateModal
}) => {
  const { mutate: mutateDeleteImmunityLog } = useMutation(deleteImmunityLog);

  const handleDeleteImmunityLog = () => {
    mutateDeleteImmunityLog(
      { id: selectedRow.id },
      {
        onSuccess: () => {
          handleCloseActionMenu();
          refetchImmunityLog();
        },
      }
    );
  }
   
    
  return (
    <Paper>
      <Menu
        anchorEl={actionAnchor}
        open={isActionMenuOpen}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleOpenImmunityLogUpdateModal}>
          <ListItemIcon>
            <UpgradeOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Update</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeleteImmunityLog}>
          <ListItemIcon>
            <DeleteOutlineOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default ImmunityLogActionMenu;
