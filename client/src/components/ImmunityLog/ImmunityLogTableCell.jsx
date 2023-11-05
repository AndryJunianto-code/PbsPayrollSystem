import { TableCell } from '@mui/material'
import React from 'react'

const ImmunityLogTableCell = ({children,fontWeight}) => {
  return (
    <TableCell sx={{color:'white', fontWeight}}>{children}</TableCell>
  )
}

export default ImmunityLogTableCell