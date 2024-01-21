import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import moment from "moment";
import axios from "axios";
import { useState } from "react";
// import { mainListItems, secondaryListItems } from './listItems';
// import Chart from './Chart';
// import Deposits from './Deposits';
// import Orders from './Orders';

const drawerWidth = 240;

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
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LiveDashboard() {
  const getPullerApi = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/getActiveOrders`;
  const getAllPullers = `${process.env.REACT_APP_APIENDPOINTNEW}api/admin/allPullers`;
  const [pullerDetails, setPullerDetails] = React.useState([]);
  const [pullers, setPullers] = useState([]);
  const [open, setOpen] = React.useState(true);
  axios.defaults.headers.common["x-auth-token-admin"] =
    localStorage.getItem("AdminLogToken");

  React.useEffect(() => {
    getPuller();
    getPullers();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getPuller = async (id) => {
    await axios.get(getPullerApi + "/" + id).then((res) => {
      setPullerDetails(res?.data.results?.orders);
    });
  };

  const getPullers = async () => {
    await axios.get(getAllPullers).then((res) => {
      setPullers(res?.data.results.pullers);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Active Orders Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <Typography
              component="h6"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
              Assigned Pullers
            </Typography>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {console.log(pullers)}
          <List component="nav">
            {pullers
              ?.filter((itm) => itm?.isPullerBusy)
              .map((item) => (
                <ListItemButton onClick={() => getPuller(item?._id)}>
                  <ListItemIcon>
                    <EngineeringIcon />
                  </ListItemIcon>
                  <ListItemText primary={item?.fullName} />
                </ListItemButton>
              ))}
          </List>

          {/* {secondaryListItems} */}
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {(pullerDetails || [])?.map((item, index) => (
                <Grid item xs={12} md={3} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}>
                    <div class="">
                      <div
                        class=""
                        // onClick={() => navigate(`/app/order-detail/${item?._id}`)}
                        // state={{ id: item?._id }}
                      >
                        <div class="row">
                          <div class="col-6 mb-1 pe-0">
                            <div class="orderID ">
                              Order ID: <strong>{item?.orderId}</strong>
                            </div>
                          </div>

                          <div class="col-6 mb-2">
                            <div class="datee_part ">
                              Assign Date:{" "}
                              <strong>
                                {moment(item?.assignDate?.slice(0, 10)).format(
                                  "MM/DD/YYYY"
                                )}
                              </strong>
                            </div>
                          </div>
                          <div class="col-6 mb-2">
                            <div class="datee_part">
                              Time:<strong>{item?.startTime}</strong>
                            </div>
                          </div>
                          <div class="col-12 items_part">
                            <div class="items_head">Items:</div>
                            {(item?.products || []).map((item, ind) => (
                              <ul className="list-unstyled mb-0">
                                <li key={ind}>
                                  <strong>
                                    {item?.flavour?._id
                                      ? item?.productId?.unitName +
                                        "-" +
                                        item?.flavour?.flavour
                                      : item?.productId?.unitName}
                                  </strong>
                                </li>
                              </ul>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Grid>
              ))}

              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {/* <Orders /> */}
                </Paper>
              </Grid>
            </Grid>
            {/* <Copyright sx={{ pt: 4 }} /> */}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
