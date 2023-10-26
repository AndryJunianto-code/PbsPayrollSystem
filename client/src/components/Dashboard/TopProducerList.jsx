import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React from "react";

const TopProducerList = () => {
  return (
    <Paper
      sx={{
        mt: "2rem",
        padding: "1.2rem",
        background: "white",
        height: "350px",
      }}
    >
      <Typography
        textAlign={"center"}
        fontSize={"18px"}
        fontWeight={"bold"}
        mt="1rem"
        letterSpacing={'0.4px'}
      >
        Top Producer Current Month
      </Typography>
      <Box mt='2.5rem'>
        <Stack flex={3} direction={"row"} px='1rem'  alignItems={'center'} >
            <Typography flex={1} color={'#6b6f82'} fontWeight={'bold'}>Andry</Typography>
            <Button flex={1}  variant="outlined" sx={{borderRadius:'20px', textTransform:'capitalize', fontSize:'12px', fontWeight:600, py:'1px', color:"#3498db", borderColor:"#3498db"}}>Sen</Button>
            <Typography textAlign={'end'} flex={1} color={'#6b6f82'} fontWeight={'400'}>$10,600</Typography>
        </Stack>
        <Divider fullWidth sx={{my:'1rem'}}/>
        <Stack flex={3} direction={"row"} px='1rem'  alignItems={'center'} >
            <Typography flex={1} color={'#6b6f82'} fontWeight={'bold'}>Grace</Typography>
            <Button flex={1}  variant="outlined" sx={{borderRadius:'20px', textTransform:'capitalize', fontSize:'12px', fontWeight:600, py:'1px', color:"#f39c12", borderColor:"#f39c12"}}>Jun</Button>
            <Typography textAlign={'end'} flex={1} color={'#6b6f82'} fontWeight={'400'}>$6,600</Typography>
        </Stack>
        <Divider fullWidth sx={{my:'1rem'}}/>
        <Stack flex={3} direction={"row"} px='1rem'  alignItems={'center'} >
            <Typography flex={1} color={'#6b6f82'} fontWeight={'bold'}>Joen</Typography>
            <Button flex={1}  variant="outlined" sx={{borderRadius:'20px', textTransform:'capitalize', fontSize:'12px', fontWeight:600, py:'1px'}}>Pro</Button>
            <Typography textAlign={'end'} flex={1} color={'#6b6f82'} fontWeight={'400'}>$3,800</Typography>
        </Stack>
        <Divider fullWidth sx={{my:'1rem'}}/>
        <Stack flex={3} direction={"row"} px='1rem'  alignItems={'center'} >
            <Typography flex={1} color={'#6b6f82'} fontWeight={'bold'}>Jeff</Typography>
            <Button flex={1}  variant="outlined" sx={{borderRadius:'20px', textTransform:'capitalize', fontSize:'12px', fontWeight:600, py:'1px'}}>Pro</Button>
            <Typography textAlign={'end'} flex={1} color={'#6b6f82'} fontWeight={'400'}>$1,200</Typography>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TopProducerList;
