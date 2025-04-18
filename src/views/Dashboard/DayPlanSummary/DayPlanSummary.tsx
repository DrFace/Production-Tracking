import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider
} from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import Sidebar from "../../../components/Sidebar";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import PrintIcon from "@mui/icons-material/Print";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Footer from "../../../components/Footer";
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "serverDateTime", headerName: "Server Date Time", width: 180 },
  { field: "lineNo", headerName: "Line No", width: 100 },
  { field: "buyer", headerName: "Buyer", width: 120 },
  { field: "style", headerName: "Style", width: 120 },
  { field: "color", headerName: "Color", width: 100 },
  { field: "size", headerName: "Size", width: 80 },
  { field: "success", headerName: "Success", width: 100 },
  { field: "rework", headerName: "Rework", width: 100 },
  { field: "defect", headerName: "Defect", width: 100 },
];

const DayPlanReport = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  const [performanceMetrics, setPerformanceMetrics] = useState({
    performanceEfi: 12,
    lineEfi: 12,
    totalSuccess: 12,
    totalRework: 17,
    totalDefect: 10,
    topDefects: 10
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch(err => console.error('Error attempting to enable fullscreen:', err));
    } else {
      document.exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch(err => console.error('Error attempting to exit fullscreen:', err));
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


  const fetchReports = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/dayplan-reports`,
        {
          params: {
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
          },
        }
      );
      setRows(response.data);

      // In a real app, you would fetch these metrics from your API
      const metricsResponse = await axios.get(
        `http://localhost:8000/api/performance-metrics`,
        {
          params: {
            start_date: startDate.format('YYYY-MM-DD'),
            end_date: endDate.format('YYYY-MM-DD'),
          },
        }
      );
      setPerformanceMetrics(metricsResponse.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <Box sx={{ display: "full", width: "95vw", height: "100vh", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5" }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon sx={{ color: "black" }} />
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

        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Details
          </Typography>

          {/* Performance Metrics Boxes */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Performance EFI
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div">
                      {performanceMetrics.performanceEfi}
                    </Typography>
                    <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    More than yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    LINE EFI
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div">
                      {performanceMetrics.lineEfi}
                    </Typography>
                    <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    More than yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Total Success
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div">
                      {performanceMetrics.totalSuccess}
                    </Typography>
                    <TrendingUpIcon color="success" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    More than yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Total Rework
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div">
                      {performanceMetrics.totalRework}
                    </Typography>
                    <TrendingUpIcon color="error" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    More than yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Total Defect
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="div">
                      {performanceMetrics.totalDefect}
                    </Typography>
                    <TrendingUpIcon color="error" sx={{ ml: 1 }} />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    More than yesterday
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={2}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    TOP 3 DEFECTS
                  </Typography>
                  <Typography variant="h5" component="div">
                    {performanceMetrics.topDefects}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1. Product Buyer<br />
                    2. Product Buyer<br />
                    3. Product Buyer
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Date Pickers & View Reports */}
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              padding: 2,
              borderRadius: 1,
              mb: 3,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: 'small'
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        size: 'small'
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={fetchReports}
                  sx={{ height: '40px' }}
                >
                  View Reports
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Export Buttons */}
          <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mb: 1 }}>
            <Button startIcon={<FileCopyIcon />} size="small">
              Copy
            </Button>
            <Button startIcon={<PrintIcon />} size="small">
              Print
            </Button>
            <Button startIcon={<FileDownloadIcon />} size="small">
              Excel
            </Button>
            <Button startIcon={<FileDownloadIcon />} size="small">
              CSV
            </Button>
            <Button startIcon={<FileDownloadIcon />} size="small">
              PDF
            </Button>
          </Stack>

          {/* DataGrid Table */}
          <Box sx={{ height: 400, backgroundColor: "#fff", p: 2, borderRadius: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default DayPlanReport;