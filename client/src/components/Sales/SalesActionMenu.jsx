import React from 'react'
import {  Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper,Typography } from "@mui/material";
import { StickyNote2Outlined,UpgradeOutlined, DeleteOutlineOutlined, Cloud} from "@mui/icons-material";

const SalesActionMenu = ({actionAnchor,isActionMenuOpen,handleCloseActionMenu}) => {
  return (
    <Paper>
    <Menu anchorEl={actionAnchor} open={isActionMenuOpen} onClose={handleCloseActionMenu}>
      <MenuItem>
        <ListItemIcon>
          <StickyNote2Outlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>View remarks</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <UpgradeOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DeleteOutlineOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  </Paper>
  )
}

export default SalesActionMenu