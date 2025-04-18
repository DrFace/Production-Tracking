import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  InputAdornment,
  Divider,
  CssBaseline,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  AccountCircle as AccountCircleIcon,
  Flag as FlagIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { dashboardInfo } from "../../data/dashboardInfo";
import { DashboardData, dashboardData as mockData } from "../../data/dashboardData";
import Footer from "../../components/Footer";
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData[]>([]);
  const [hourlyData, setHourlyData] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Account menu handlers
  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate("/userProfile");
    handleAccountMenuClose();
  };

  const handleLogout = () => {
    navigate("/login");
    handleAccountMenuClose();
  };

  // Notifications menu handlers
  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleViewAllNotifications = () => {
    navigate("/notifications");
    handleNotificationMenuClose();
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulated API call
        const response = await axios.get("http://your-backend-api.com/dashboard-data");
        setDashboardData(response.data);
        setHourlyData(response.data.hourly || []);

        // Temporary mock data
        setDashboardData(mockData);
        setHourlyData([56, 45, 60, 55, 48, 52, 49, 51]); // Mock hourly data
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData(mockData);
        setHourlyData([0, 0, 0, 0, 0, 0, 0, 0]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: "flow", width: "100%", height: "100vh", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ color: "black" }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              Day Plan Report
            </Typography>


            {/* Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {/* Notifications dropdown */}
              <IconButton onClick={handleNotificationMenuOpen}>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Menu
                anchorEl={notificationAnchorEl}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    width: 300,
                    maxHeight: 400
                  }
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2">You have {notificationCount} new notifications</Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <Typography variant="body2">Notification 1</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant="body2">Notification 2</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleViewAllNotifications}>
                  <Button fullWidth variant="contained" size="small">
                    View All Notifications
                  </Button>
                </MenuItem>
              </Menu>

              <IconButton onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>

              {/* Account dropdown menu */}
              <IconButton onClick={handleAccountMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAccountMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>User Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>

          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ p: 2 }}>
          {/* Top Info Bar */}
          <Stack spacing={2} sx={{ my: 1 }}>
            <Card sx={{ p: 0, textAlign: "center", borderRadius: "8px", boxShadow: 1 }}>
              <CardContent>
                <Stack
                  direction="row"
                  spacing={10}
                  justifyContent="center"
                  sx={{
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    py: 1
                  }}
                >
                  {dashboardInfo.map((info, index) => (
                    <Typography key={index} variant="body1" fontWeight="bold">
                      {info}
                    </Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>

          {/* Main Dashboard Cards */}
          {loading ? (
            <Stack justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
              <CircularProgress color="primary" />
            </Stack>
          ) : (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // Changed to 4 columns for better control
              gridTemplateRows: 'repeat(4, 1fr)', // Changed to 4 rows
              gap: 2,
              p: 3,
              height: '600px' // Set a fixed height for the grid container
            }}>
              {dashboardData.map((item, index) => {
                const gridStyles = {
                  0: { gridColumn: '1', gridRow: '1 / span 2' }, // Large box (span 2 rows)
                  1: { gridColumn: '2', gridRow: '1 / span 2' }, // Large box (span 2 rows)
                  2: { gridColumn: '3', gridRow: '1' }, // Small box
                  3: { gridColumn: '4', gridRow: '1' }, // Small box
                  4: { gridColumn: '3', gridRow: '2' }, // Small box (near last box)
                  5: { gridColumn: '4', gridRow: '2' }, // Small box
                  6: { gridColumn: '1', gridRow: '3' }, // Small box
                  7: { gridColumn: '2', gridRow: '3' }, // Small box
                  8: { gridColumn: '1', gridRow: '4' }, // Small box
                  9: { gridColumn: '2', gridRow: '4' }, // Small box
                  10: { gridColumn: '3', gridRow: '3 / span 2' }, // Large box (span 2 rows, near 4)
                  11: { gridColumn: '4', gridRow: '3 / span 2' } // Large box (span 2 rows)
                };

                const isLargeBox = [0, 1, 10, 11].includes(index);

                return (
                  <Box
                    key={item.id}
                    sx={{
                      ...gridStyles[index],
                      minHeight: 0
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: "16px",
                        boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "#0780FF",
                          color: "white",
                          p: isLargeBox ? 3 : 2,
                          textAlign: "center",
                          flex: isLargeBox ? 3 : 1,
                          display: "flex",
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant={isLargeBox ? "h3" : "h4"}
                          fontWeight={800}
                          sx={{ fontSize: isLargeBox ? '2.5rem' : '1.5rem' }}
                        >
                          {item.value}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          bgcolor: "white",
                          color: "black",
                          p: 1,
                          textAlign: "center",
                          flex: isLargeBox ? 0.8 : 0.5,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          fontWeight={600}
                          sx={{ fontSize: isLargeBox ? '1rem' : '0.875rem' }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                    </Card>
                  </Box>
                );
              })}
            </Box>
          )}
          {/* Hourly Boxes Section */}
          <Stack
            direction="row"
            flexWrap="initial"
            spacing={2}
            useFlexGap
            sx={{ width: '100%', mt: 3 }}
          >
            {hourlyData.map((value, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(16.66% - 16px)' },
                }}
              >
                <Card
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: 3,
                    bgcolor: index < 4 ? '#00BA57' : index >= hourlyData.length - 4 ? '#78B3CE' : 'background.paper',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}
                >
                  <Typography variant="subtitle2" color="textSecondary">
                    HOUR: {index + 1}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="h5">{value}</Typography>
                </Card>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;