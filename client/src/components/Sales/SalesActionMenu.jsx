import React from 'react'
import {  Divider, ListItemIcon, ListItemText, Menu, MenuItem, Paper } from "@mui/material";
import { StickyNote2Outlined,UpgradeOutlined, DeleteOutlineOutlined, SummarizeOutlined} from "@mui/icons-material";
import { useMutation } from 'react-query';
import { deleteSales } from '../../requests/salesRequest';

const SalesActionMenu = ({selectedRow,actionAnchor,isActionMenuOpen,handleOpenViewJournalModal,handleOpenSalesRemarksModal,handleCloseActionMenu,handleOpenSalesUpdateModal,refetchSales}) => {

  const {mutate:mutateDeleteSales} = useMutation(deleteSales);
  const handleDeleteSales = () => {
    mutateDeleteSales({id:selectedRow.id}, {
      onSuccess: () => {
        refetchSales();
        handleCloseActionMenu();
      }
    })
  }
  return (
    <Paper>
    <Menu anchorEl={actionAnchor} open={isActionMenuOpen} onClose={handleCloseActionMenu}>
      <MenuItem onClick={handleOpenSalesRemarksModal}>
        <ListItemIcon>
          <StickyNote2Outlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>View remarks</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleOpenViewJournalModal}>
        <ListItemIcon>
          <SummarizeOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>View journal</ListItemText>
      </MenuItem>
      <Divider/>
      <MenuItem onClick={handleOpenSalesUpdateModal}>
        <ListItemIcon>
          <UpgradeOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDeleteSales}>
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