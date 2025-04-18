import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Divider,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Search as SearchIcon,
  Add,
  Save,
  Delete,
  Menu as MenuIcon,
  Flag as FlagIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import axios from "axios";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";
import { Menu, MenuItem, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserAccessManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hovered, setHovered] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newUser, setNewUser] = useState({ id: "", name: "", role: "Admin" });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook

  // Fetch users from API
  useEffect(() => {
    axios.get("https://your-api.com/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

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


  // Handle role change
  const handleRoleChange = (id: string, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      )
    );
  };

  // Save user role changes
  const handleSave = (id: string, role: string) => {
    axios.put(`https://your-api.com/users/${id}`, { role }).then(() => {
      alert("User role updated!");
    });
  };

  // Remove user
  const handleRemove = (id: string) => {
    axios.delete(`https://your-api.com/users/${id}`).then(() => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    });
  };

  // Add new user
  const handleAddUser = () => {
    axios.post("https://your-api.com/users", newUser).then(() => {
      setUsers([...users, newUser]);
      setOpenAddUser(false);
      setNewUser({ id: "", name: "", role: "Admin" });
    });
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "role",
      headerName: "User Role",
      flex: 2,
      renderCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) => handleRoleChange(params.row.id, e.target.value)}
          fullWidth
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="User">User</MenuItem>
          <MenuItem value="Manager">Manager</MenuItem>
        </Select>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<Save />}
            onClick={() => handleSave(params.row.id, params.row.role)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<Delete />}
            onClick={() => handleRemove(params.row.id)}
          >
            Remove
          </Button>
        </Box>
      ),
    },
  ];

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

        {/* Table Section */}
        <Box sx={{ height: 500, bgcolor: "white", borderRadius: 2, p: 2, mt: 2 }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{ "& .MuiDataGrid-cell": { display: "flex", alignItems: "center" } }}
          />
        </Box>

        {/* Total Users Row */}
        <Box sx={{ p: 2, bgcolor: "#e0e0e0", mt: 1, textAlign: "center", fontWeight: "bold" }}>
          Total users: {users.length}
        </Box>

        {/* Add User Dialog */}
        <Dialog open={openAddUser} onClose={() => setOpenAddUser(false)}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="User ID"
              variant="outlined"
              value={newUser.id}
              onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Name"
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Select
              fullWidth
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              sx={{ mt: 2 }}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddUser(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleAddUser} color="primary">
              Add User
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserAccessManagement;
