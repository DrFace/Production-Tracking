import { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  CssBaseline,
  Divider
} from '@mui/material';
import {
  Palette,
  Straighten,
  Style,
  Build,
  BugReport,
  Menu as MenuIcon,
  Flag as FlagIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Sidebar from '../../components/Sidebar';
import { colorData, sizeData, styleData, operationData, defectData } from '../../data/TableData'; // Import data from TableData.ts
import Footer from '../../components/Footer';
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface TableData {
  id: number;
  [key: string]: any;
}

const SystemManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tableData, setTableData] = useState<TableData[]>(colorData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<TableData>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook

  const tableConfigs = [
    { name: 'Color Settings', data: colorData },
    { name: 'Size Settings', data: sizeData },
    { name: 'Style Settings', data: styleData },
    { name: 'Operation Settings', data: operationData },
    { name: 'Defect Settings', data: defectData }
  ];

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
    setTableData(tableConfigs[newValue].data);
  };

  const handleAddData = () => {
    setFormData({});
    setEditId(null);
    setIsDialogOpen(true);
  };

  const handleEditData = (id: number) => {
    const dataToEdit = tableData.find(item => item.id === id);
    if (dataToEdit) {
      setFormData(dataToEdit);
      setEditId(id);
      setIsDialogOpen(true);
    }
  };

  const handleDeleteData = (id: number) => {
    const updatedData = tableData.filter(item => item.id !== id);
    setTableData(updatedData);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFormData({});
    setEditId(null);
  };

  const handleFormSubmit = () => {
    if (editId !== null) {
      const updatedData = tableData.map(item =>
        item.id === editId ? { ...formData, id: editId } : item
      );
      setTableData(updatedData);
    } else {
      setTableData([...tableData, { ...formData, id: Date.now() }]);
    }
    handleDialogClose();
  };

  const renderActionButtons = (params: any) => (
    <>
      <IconButton onClick={() => handleEditData(params.row.id)}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton onClick={() => handleDeleteData(params.row.id)}>
        <DeleteIcon color="error" />
      </IconButton>
    </>
  );

  const columns: GridColDef[] = [
    ...Object.keys(tableData[0] || {}).map(key => ({
      field: key,
      headerName: key.replace(/_/g, ' ').toUpperCase(),
      width: 180
    })),
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: renderActionButtons
    }
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
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
      />      <Box sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static" sx={{ bgcolor: 'white', boxShadow: 2, mb: 3 }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
              System Management
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

        <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
          <Tab label="Color Settings" icon={<Palette />} />
          <Tab label="Size Settings" icon={<Straighten />} />
          <Tab label="Style Settings" icon={<Style />} />
          <Tab label="Operation Settings" icon={<Build />} />
          <Tab label="Defect Settings" icon={<BugReport />} />
        </Tabs>

        <Button
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
          onClick={handleAddData}
        >
          Add Data
        </Button>

        <Paper elevation={3} sx={{ height: '70vh', borderRadius: '12px', mt: 2 }}>
          <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </Paper>

        <Dialog open={isDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>{editId ? 'Edit Data' : 'Add Data'}</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {Object.keys(tableData[0] || {}).map(key => (
                key !== 'id' && (
                  <Grid item xs={12} key={key}>
                    <TextField
                      label={key.replace(/_/g, ' ').toUpperCase()}
                      fullWidth
                      value={formData[key] || ''}
                      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                    />
                  </Grid>
                )
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleFormSubmit} variant="contained">
              {editId ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </Box>
  );
};

export default SystemManagement;
