import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  CssBaseline,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Flag as FlagIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import Sidebar from "../../components/Sidebar"; // Ensure Sidebar component is created
import { motion } from "framer-motion";
import Footer from "../../components/Footer";
import { Menu, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Department options
const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];

const UserProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate(); // Navigation hook
  const [openPhoto, setOpenPhoto] = useState(false);
  const [user, setUser] = useState({
    name: "Gamini",
    username: "Admin",
    password: "********",
    email: "gamini@gmail.com",
    id: "626452187",
    department: "IT",
    contact: "+94 777777777",
    photo: "",
  });
  const [editUser, setEditUser] = useState(user);
  const [imagePreview, setImagePreview] = useState("");

  // Toggle fullscreen mode
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


  // Handle edit form change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // Validate form inputs
  const validateForm = () => {
    if (!/^[a-zA-Z0-9]+$/.test(editUser.username)) {
      alert("Username should not contain symbols!");
      return false;
    }
    if (!/^\+?[0-9]+$/.test(editUser.contact)) {
      alert("Contact number must contain only numbers!");
      return false;
    }
    return true;
  };

  // Save updated user info
  const handleSaveEdit = () => {
    if (validateForm()) {
      setUser(editUser);
      setOpenEdit(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setUser((prev) => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
    setOpenPhoto(false);
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
      />      <Box sx={{ flexGrow: 1, p: 3 }}>
        {/* Top Navbar */}
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2, mb: 3 }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
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

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Box sx={{
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
            maxWidth: 800,
            mx: "auto",
          }}>
            {/* Profile Photo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Avatar
                src={user.photo || "/default-avatar.png"}
                sx={{ width: 100, height: 100 }}
              />
              <Button variant="outlined" onClick={() => setOpenPhoto(true)}>
                Add new photo
              </Button>
            </Box>

            {/* User Info */}
            <Typography variant="h6" sx={{ mb: 2 }}>User Info</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Typography><b>Name:</b> {user.name}</Typography>
              <Typography><b>Username:</b> {user.username}</Typography>
              <Typography><b>Password:</b> {user.password}</Typography>
              <Typography><b>Email:</b> {user.email}</Typography>
              <Typography><b>ID:</b> {user.id}</Typography>
              <Typography><b>Department:</b> {user.department}</Typography>
              <Typography><b>Contact:</b> {user.contact}</Typography>
            </Box>

            {/* Edit & Save Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ bgcolor: "blue" }}
                onClick={() => setOpenEdit(true)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ bgcolor: "green" }}
                onClick={handleSaveEdit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </motion.div>

        {/* Edit User Dialog */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>Edit User Info</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Name" name="name" value={editUser.name} onChange={handleEditChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Username" name="username" value={editUser.username} onChange={handleEditChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Email" name="email" value={editUser.email} onChange={handleEditChange} sx={{ mb: 2 }} />
            <TextField fullWidth label="Contact" name="contact" value={editUser.contact} onChange={handleEditChange} sx={{ mb: 2 }} />
            <TextField select fullWidth label="Department" name="department" value={editUser.department} onChange={handleEditChange} sx={{ mb: 2 }}>
              {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
            <Button onClick={handleSaveEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        {/* Photo Upload Dialog */}
        <Dialog open={openPhoto} onClose={() => setOpenPhoto(false)}>
          <DialogTitle>Upload New Photo</DialogTitle>
          <DialogContent>
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenPhoto(false)}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserProfile;
