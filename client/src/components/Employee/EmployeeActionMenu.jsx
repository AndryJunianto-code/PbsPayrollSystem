import React from 'react'
import {  ListItemIcon, ListItemText, Menu, MenuItem, Paper } from "@mui/material";
import { StickyNote2Outlined,UpgradeOutlined, DeleteOutlineOutlined, PictureAsPdfOutlined} from "@mui/icons-material";

const EmployeeActionMenu = ({actionAnchor,isActionMenuOpen,handleCloseActionMenu,handleOpenEmpUpdateModal}) => {
  return (
    <Paper>
    <Menu anchorEl={actionAnchor} open={isActionMenuOpen} onClose={handleCloseActionMenu}>
      <MenuItem>
        <ListItemIcon>
          <StickyNote2Outlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>View Details</ListItemText>
      </MenuItem>
      <MenuItem>
          <ListItemIcon>
            <PictureAsPdfOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download PDF</ListItemText>
        </MenuItem>
      <MenuItem onClick={handleOpenEmpUpdateModal}>
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

export default EmployeeActionMenu