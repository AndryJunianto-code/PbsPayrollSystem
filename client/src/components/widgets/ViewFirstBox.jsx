import { Box } from '@mui/material'
import React from 'react'

const ViewFirstBox = ({children,openDrawer}) => {
  return (
    <Box component={'main'} sx={{flexGrow:1, pt:'4rem', pr:openDrawer?'2rem':'12rem', pl:openDrawer? '16rem' : '6rem', backgroundColor:'#f4f4f4', height:'100%'}}>
        {children}
    </Box>
  )
}

export default ViewFirstBox