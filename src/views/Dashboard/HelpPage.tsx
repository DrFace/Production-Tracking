import { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Paper,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Search,
  AccountCircle,
  RocketLaunch,
  Update,
  Settings,
  HelpOutline,
  Lock,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  Flag as FlagIcon,
} from "@mui/icons-material";
import Sidebar from "../../components/Sidebar"; // Ensure Sidebar component exists
import Footer from "../../components/Footer";
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);

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


  // Help topics with navigation routes
  const helpTopics = [
    { icon: <RocketLaunch />, text: "Getting Started", route: "/getting-started" },
    { icon: <AccountCircle />, text: "My Account", route: "/UserProfile" },
    { icon: <Update />, text: "System Updates", route: "/system-updates" },
    { icon: <Settings />, text: "Settings & Preferences", route: "/settings" },
    { icon: <HelpOutline />, text: "FAQs & Troubleshooting", route: "/faqs" },
    { icon: <Lock />, text: "Security & Privacy", route: "/security" },
  ];

  // Simulated system-wide search results (sidebar + help topics)
  const allItems = [...helpTopics.map(topic => topic.text), "Dashboard", "Orders", "Reports", "Users", "Settings"];
  const filteredItems = searchTerm ? allItems.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  return (
    <Box sx={{ display: "full", width: "95vw", height: "100vh", minHeight: "100vh" }}>
      {/* Sidebar */}
      <CssBaseline />
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 2 }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>

            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              Help & Support
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
                <AccountCircle />
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

        {/* Search Box */}
        <Box sx={{ textAlign: "center", height: "200px", bgcolor: "#ffffff", p: 4, borderRadius: 5, mb: 3, mt: 4 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            How can we help you?
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <Button variant="outlined" onClick={() => console.log("Search clicked")}>
                  Search
                </Button>
              ),
              sx: { borderRadius: 50 } // Fully rounded search bar
            }}
            sx={{ maxWidth: 500, bgcolor: "white" }}
          />
        </Box>

        {/* Search Results */}
        {searchTerm && filteredItems.length > 0 && (
          <Box sx={{ bgcolor: "white", p: 2, borderRadius: 2, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Search Results:
            </Typography>
            <List>
              {filteredItems.map((item, index) => (
                <ListItemButton key={index} onClick={() => console.log("Navigate to", item)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        {/* Help Topics - Now horizontal */}
        <Box sx={{ bgcolor: "#ffffff", p: 3, borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Help Topics
          </Typography>
          <Grid container spacing={2}>
            {helpTopics.map((topic, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "action.hover" }
                  }}
                  onClick={() => navigate(topic.route)}
                >
                  <Box display="flex" alignItems="center">
                    <ListItemIcon sx={{ minWidth: 36 }}>{topic.icon}</ListItemIcon>
                    <Typography variant="body1">{topic.text}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default HelpPage;