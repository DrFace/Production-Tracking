import React, { useState, useEffect } from "react";
import {
  Box, Typography, Button, AppBar, Toolbar, IconButton, TextField, InputAdornment,
  CssBaseline, Menu, MenuItem,
  Divider
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import { useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';

const DayPlanUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [rows, setRows] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook


  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        fetchData();
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred.");
    }
  };

  // Fetch data from API after upload
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/day-plans");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch existing data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Define DataGrid columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "line_no", headerName: "Line No", width: 50 },
    { field: "resp_employee", headerName: "Resp Employee", width: 100 },
    { field: "buyer", headerName: "Buyer", width: 80 },
    { field: "style", headerName: "Style", width: 80 },
    { field: "gg", headerName: "GG", width: 60 },
    { field: "smv", headerName: "SMV", width: 80 },
    { field: "display_wh", headerName: "Display WH", width: 90 },
    { field: "actual_wh", headerName: "Actual WH", width: 90 },
    { field: "plan_tgt_pcs", headerName: "Plan Tgt Pcs", width: 100 },
    { field: "per_hour_pcs", headerName: "Per Hour Pcs", width: 100 },
    { field: "available_cader", headerName: "Available Cader", width: 120 },
    { field: "present_linkers", headerName: "Present Linkers", width: 100 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "created_at", headerName: "Created At", width: 90 },
    { field: "updated_at", headerName: "Updated At", width: 90 },
  ];

  // Toggle fullscreen mode
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
    <Box sx={{ display: "flex", flexDirection: "column", width: "95vw", height: "100vh", minHeight: "100vh" }}>
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
              Day Plan
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

        {/* Content */}
        <Box sx={{ padding: 3, backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            Day Plan Upload
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button variant="contained" component="span" sx={{ backgroundColor: "#FFD900", color: "black", "&:hover": { backgroundColor: "#E6C200" } }}>
                Choose File
              </Button>
            </label>
            <Typography>{file ? file.name : "No file chosen"}</Typography>

            {/* Spacer to push Upload button to the right */}
            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Box>
          <Box sx={{ height: 400, width: "100%", backgroundColor: "white", borderRadius: "8px", overflowX: "auto" }}>
            <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DayPlanUpload;