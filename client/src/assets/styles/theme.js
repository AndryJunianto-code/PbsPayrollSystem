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
        main:"#fccfa4",
        hover:"#d1ac88"
      },
      basicGreen: {
        main: "#259c8a"
      },
      basicPink: {
        main: "#fe7096"
      },
      basicLightBlue: {
        main: '#3699e8'
      },
      basicPurple: {
        main: "#5c5bec"
      },
      basicPeach: {
        main: "#ffb396"
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
