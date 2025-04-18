import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  InputAdornment,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Flag as FlagIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import UserManagementTable from "./UserManagementTable";
import Sidebar from "../../../components/Sidebar";
import { sampleUsers, User } from "../../../data/users"; // Import sample data and User interface
import Footer from "../../../components/Footer";
import { Menu, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
const userTypes = ["Admin", "User", "Manager"];
const availabilityStatus = ["Active", "Inactive"];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers); // Initialize with sample data
  const [form, setForm] = useState<User>({
    id: 0,
    epf: "",
    employeeName: "",
    username: "",
    password: "",
    department: "",
    contact: "",
    email: "",
    userType: "",
    availability: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>, field: keyof User) => {
    setForm({ ...form, [field]: e.target.value as string });
  };

  const handleSave = () => {
    if (!form.epf || !form.employeeName || !form.username || !form.password) {
      alert("Please fill all required fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editIndex] = form;
      setUsers(updatedUsers);
      setEditIndex(null);
    } else {
      setUsers([...users, { ...form, id: users.length + 1 }]);
    }
    handleClear();
  };

  const handleClear = () => {
    setForm({
      id: 0,
      epf: "",
      employeeName: "",
      username: "",
      password: "",
      department: "",
      contact: "",
      email: "",
      userType: "",
      availability: "",
    });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setForm(users[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    setUsers(users.filter((_, i) => i !== index));
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
      {/* Sidebar */}
      <CssBaseline />
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />      {/* Main Content */}
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

        {/* User Management Content */}
        <Stack spacing={3} sx={{ mt: 3 }}>
          {/* User Form */}
          <Paper sx={{ p: 1.4 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "blue" }}>
                Add New User
              </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 0 }}>
              User Details
            </Typography>
            <Stack direction="row" spacing={1}>
              {/* Form Fields */}
              <TextField fullWidth label="ID" name="id" value={form.id} disabled />
              <TextField fullWidth label="EPF" name="epf" value={form.epf} onChange={handleChange} />
              <TextField fullWidth label="Employee Name" name="employeeName" value={form.employeeName} onChange={handleChange} />
              <TextField fullWidth label="User Name" name="username" value={form.username} onChange={handleChange} />
              <TextField fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
              <TextField
                select
                fullWidth
                label="Department"
                value={form.department}
                onChange={(e) => handleSelectChange(e, "department")}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              <TextField fullWidth label="Contact" name="contact" value={form.contact} onChange={handleChange} />
              <TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} />
              <TextField
                select
                fullWidth
                label="User Type"
                value={form.userType}
                onChange={(e) => handleSelectChange(e, "userType")}
              >
                {userTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Availability"
                value={form.availability}
                onChange={(e) => handleSelectChange(e, "availability")}
              >
                {availabilityStatus.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            {/* Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "flex-end", p: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {editIndex !== null ? "Update" : "Save"}
              </Button>
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
            </Stack>
          </Paper>

          {/* User Table */}
          <UserManagementTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserManagement;