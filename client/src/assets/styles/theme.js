import {  ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    typography:{
      fontFamily:'Lato',
      fontSize:'14',
    },
    palette: {
      primary: {
        main: '#42d2bf',
      },
      secondary: {
        main: '#ffcc80',
      },
      backgroundColor: {
        main: "#f4f4f4"
      }
    },
  });

export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
