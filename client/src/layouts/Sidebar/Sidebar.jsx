import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SidebarItem from "./SidebarItem";
import {Badge,Eject,AttachMoney,Dashboard,Sell,SummarizeOutlined,VaccinesOutlined, SellOutlined, EjectOutlined, BadgeOutlined, DashboardOutlined, HowToRegOutlined, Vaccines, AnalyticsOutlined, FaceRetouchingNaturalOutlined, BookOutlined} from '@mui/icons-material';
import { useViewContext } from "../../context/ViewContext";
import pbsLogo from '../../assets/images/pbslogo.jpg';
import { Avatar } from "@mui/material";


const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const {setToSalesDashboard,setToEmployeeDashboard,setToEmployee,setToPosition,setToSales,setToImmunityLog,setToPayslip,setToAttendance,selectedView,setOpenDrawer,setToJournal,openDrawer} = useViewContext();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: {xs:2,lg:5},
              ...(openDrawer && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" fontWeight={'700'}>
            {selectedView}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={openDrawer} sx={{display: {md:'block',xs:openDrawer ? 'block' : 'none'}}}>
        <DrawerHeader>
          <Avatar sx={{mr:'1rem'}} src={pbsLogo} />
          <Typography mr='3.5rem'>Admin</Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider /> 
        <List>
          <SidebarItem open={openDrawer} name={'Sales Board'} icon={<Dashboard/>} handleView={setToSalesDashboard} />
          <SidebarItem open={openDrawer} name={'Employee Board'} icon={<AnalyticsOutlined/>} handleView={setToEmployeeDashboard} />
          <Divider sx={{my:'0.5rem'}}/>
          <SidebarItem open={openDrawer} name={'Employee'} icon={<FaceRetouchingNaturalOutlined />} handleView={setToEmployee}/>
          <SidebarItem open={openDrawer} name={'Position'} icon={<Eject/>} handleView={setToPosition}/>
          <SidebarItem open={openDrawer} name={'Sales'} icon={<SellOutlined/>} handleView={setToSales}/>
          <SidebarItem open={openDrawer} name={'Immunity Log'} icon={<Vaccines/>} handleView={setToImmunityLog}/>
          <SidebarItem open={openDrawer} name={'Payslip'} icon={<AttachMoney/>} handleView={setToPayslip}/>
          <SidebarItem open={openDrawer} name={'Attendance'} icon={<HowToRegOutlined/>} handleView={setToAttendance}/>
          <SidebarItem open={openDrawer} name={'Journal'} icon={<BookOutlined/>} handleView={setToJournal}/>
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
