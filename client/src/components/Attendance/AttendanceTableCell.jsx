import { TableCell } from '@mui/material'
import React from 'react'

const AttendanceTableCell = ({children,isWhite,width}) => {
  return (
    <TableCell sx={{color: isWhite?'white':'black', fontSize:'16px', width:width}}>{children}</TableCell>
  )
}

export default AttendanceTableCell