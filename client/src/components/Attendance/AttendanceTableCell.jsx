import { TableCell } from '@mui/material'
import React from 'react'

const AttendanceTableCell = ({children,width,isData}) => {
  return (
    <TableCell sx={{  backgroundColor: "white",
    color: isData ? 'black' :"#8a93b1",
    fontWeight:isData ? '500' : '600',
    fontFamily: isData ? '' : 'Poppins, sans-serif',
    fontSize:isData ? '16px' : '14px', width:width}}>{children}</TableCell>
  )
}

export default AttendanceTableCell