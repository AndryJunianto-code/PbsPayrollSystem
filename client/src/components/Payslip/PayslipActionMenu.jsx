import React, { useEffect } from "react";
import {
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  UpgradeOutlined,
  DeleteOutlineOutlined,
  PictureAsPdfOutlined,
} from "@mui/icons-material";
import { useMutation } from "react-query";
import { generatePayslipPdf } from "../../requests/payslipRequest";
import PayslipPdf from "./PayslipPdf";
import { renderToStaticMarkup } from 'react-dom/server'; 


const PayslipActionMenu = ({
  selectedRow,
  refetchPayslip,
  actionAnchor,
  isActionMenuOpen,
  handleCloseActionMenu,
}) => {
  const { mutate: mutateGeneratePayslip } = useMutation(generatePayslipPdf);
  const handleDownloadPdf = async () => {
   
    const htmlContent = renderToStaticMarkup(<PayslipPdf payslipData={selectedRow.row}/>);
    mutateGeneratePayslip(
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
          a.download = "payslip.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        },
      }
    );
  };

  return (
    <Paper>
      <Menu
        anchorEl={actionAnchor}
        open={isActionMenuOpen}
        onClose={handleCloseActionMenu}
      >
        <MenuItem onClick={handleDownloadPdf}>
          <ListItemIcon>
            <PictureAsPdfOutlined fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download PDF</ListItemText>
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
  );
};

export default PayslipActionMenu;
