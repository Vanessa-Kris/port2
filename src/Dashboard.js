import * as React from "react";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { styled, createTheme } from "@mui/material/styles";
//import ReactDOM from "react-dom";
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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import InboxIcon from "@mui/icons-material/MoveToInbox";
//import MailIcon from "@mui/icons-material/Mail";
//import LineAxisIcon from "@mui/icons-material/LineAxis";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
//import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Grid from "@mui/material/Grid";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import LineChart from "./Chart";
//import { TableVirtuoso } from "react-virtuoso";
import Table from "./Table";
//import Help from "./Help";
//import { Link } from "@mui/material";

const baseUrl = process.env.REACT_APP_BASE_URL;

const drawerWidth = 240;
//console.log(baseUrl);
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
//console.log(data);

export default function MiniDrawer() {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("Sorry we can't get any data right now");

  const handleChange = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${baseUrl}/users?start=${start_date}&end=${end_date}&type=${type}&format=${format}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log("result is: ", JSON.stringify(result, null, 4));
      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Telemetry
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
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
            {["Dashboard", "Help", "Support"].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 0 === 3 ? <DashboardIcon /> : <HelpOutlineIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />

          <Box>
            <Grid container spacing={2}>
              <Grid
                item
                xs={4}
                md={2}
                bgcolor="#212121"
                sx={{ m: 1 }}
                height="100px"
              >
                <Box color="#fff">
                  <TrendingUpOutlinedIcon />
                  Total
                </Box>
              </Grid>
              <Grid item xs={4} md={2} bgcolor="#212121" sx={{ m: 1 }}>
                <Box color="#fff">
                  <PublicOutlinedIcon />
                  Total
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ py: 2 }}>
              <Grid item xs={6} md={3}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id={type}
                      value={type}
                      label="Type"
                      onChange={handleChange}
                    >
                      <MenuItem color="" value={available}>
                        Available Users
                      </MenuItem>
                      <MenuItem value={signup}>Signed Up users</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={6} md={2}>
                <FormControl sx={{ ms: 5 }}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Format
                  </FormLabel>
                  <RadioGroup
                    color="#fff"
                    row
                    id={format}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Month"
                    value={format}
                    name="radio-buttons-group"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      col
                      xs={6}
                      md={6}
                      value={month}
                      id={month}
                      control={<Radio />}
                      label="Month"
                    />
                    <FormControlLabel
                      col
                      xs={6}
                      md={6}
                      value={day}
                      id={day}
                      control={<Radio />}
                      label="Day"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  id={start_date}
                  label="Start Date"
                  type="date"
                  onChange={handleChange}
                  value={start_date}
                  sx={{ width: 220, p: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />

                <TextField
                  id={end_date}
                  label="End Date"
                  type="date"
                  value={end_date}
                  onChange={handleChange}
                  sx={{ width: 220, p: 1 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} bgcolor="#212121">
                <Box color="#fff">
                  <LineChart onChange={handleChange} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6} bgcolor="#212121">
                <Box color="#fff">
                  <Table onChange={handleChange} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
