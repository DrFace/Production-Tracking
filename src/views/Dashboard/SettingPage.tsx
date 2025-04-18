import { useState } from "react";
import {
  Box,
  Typography,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  IconButton,
  CssBaseline,
  Paper,
  TextField,
  InputAdornment,
  useTheme,
  Button
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Search as SearchIcon,
  Flag as FlagIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon
} from "@mui/icons-material";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import { useCustomTheme } from "../../context/ThemeContext";
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { mode, toggleTheme } = useCustomTheme(); // Updated to use mode and toggleTheme
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    console.log("Notifications:", !notificationsEnabled);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
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

  return (
    <Box sx={{ display: "full", width: "95vw", height: "100vh", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <Box sx={{
        flexGrow: 1,
        bgcolor: theme.palette.background.default,
        transition: theme.transitions.create('background-color')
      }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`,
            zIndex: theme.zIndex.drawer + 1,
            color: theme.palette.text.primary
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                fontWeight: 600
              }}
            >
              User Management
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

        <Box sx={{ p: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>

            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <NotificationsIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Enable notifications"
                  secondary="Receive notification messages"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Switch
                  checked={notificationsEnabled}
                  onChange={toggleNotifications}
                  color="primary"
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Appearance
            </Typography>

            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  {mode === 'dark' ? (
                    <DarkModeIcon color="primary" />
                  ) : (
                    <LightModeIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary="Dark mode"
                  secondary="Change system theme"
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default SettingsPage;