import { TableCell } from '@mui/material'
import React from 'react'

const AttendanceTableCell = ({children,isWhite}) => {
  return (
    <TableCell sx={{color: isWhite?'white':'black', fontSize:'16px', width:'200px'}}>{children}</TableCell>
  )
}

export default AttendanceTableCell