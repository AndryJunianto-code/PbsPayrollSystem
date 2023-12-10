import React from 'react'
import {  ListItemIcon, ListItemText, Menu, MenuItem, Paper } from "@mui/material";
import { UpgradeOutlined, PictureAsPdfOutlined} from "@mui/icons-material";
import EmployeePdf from './EmployeePdf';
import {generateEmployeePdf} from '../../requests/employeeRequest'
import { renderToStaticMarkup } from 'react-dom/server';
import { useMutation } from 'react-query';

const EmployeeActionMenu = ({selectedRow,actionAnchor,isActionMenuOpen,handleCloseActionMenu,handleOpenEmpUpdateModal}) => {

  const { mutate: mutateGenerateEmployee } = useMutation(generateEmployeePdf);
  const handleDownloadPdf = async () => {
    const htmlContent = renderToStaticMarkup(<EmployeePdf employeeData={selectedRow.row}/>);
    mutateGenerateEmployee(
      {
        html: htmlContent
      },
      {
        onSuccess: (data) => {
          handleCloseActionMenu();
          const blob = new Blob([data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "employee.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        },
      }
    );
  };

  return (
    <Paper>
    <Menu anchorEl={actionAnchor} open={isActionMenuOpen} onClose={handleCloseActionMenu}>
      <MenuItem onClick={handleDownloadPdf}>
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
    </Menu>
  </Paper>
  )
}

export default EmployeeActionMenu