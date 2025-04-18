import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Grid,
  Card,
  CircularProgress,
  TextField,
  InputAdornment,
  Select,
  InputLabel,
  FormControl,
  Avatar,
  Divider,
  CssBaseline,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Fullscreen as FullscreenIcon,
  AccountCircle as AccountCircleIcon,
  Flag as FlagIcon,
  Search as SearchIcon,
  CheckCircle,
  Warning,
  ExpandMore,
  Person,
  Style as StyleIcon,

  AssignmentTurnedIn
} from '@mui/icons-material';
import { Delete } from '@mui/icons-material';

import axios from 'axios';
import Sidebar from "../../components/Sidebar";
import Footer from '../../components/Footer';
import { Menu, MenuItem, Badge } from "@mui/material";  
import { useNavigate } from "react-router-dom"; 

// Interface for TypeScript type checking
interface ProductionData {
  buyer: string;
  gg: string;
  smv: string;
  presentCarder: string;
  successCount: number;
  defectCount: number;
  hourlyData: number[];
}

const ProductionUpdatePage = () => {
  const [data, setData] = useState<ProductionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null); 
const [notificationCount, setNotificationCount] = useState(3); 
const navigate = useNavigate(); // Navigation hook
  const [filters, setFilters] = useState({
    teamNo: '',
    style: '',
    color: '',
    size: '',
    checkPoint: '',
  });

  // Mock data for initial rendeuu
  const mockData: ProductionData = {
    buyer: 'Kohl s',
    gg: '0.5',
    smv: '6.97',
    presentCarder: '21',
    successCount: 760,
    defectCount: 0,
    hourlyData: [0, 0, 0, 0, 0, 0, 0, 0]
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/production-updates');
        setData(response.data);

        // Using mock data temporarily
        setData(mockData);
        setError(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: any) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

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


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load data. Please try again later.
        </Typography>
      </Box>
    );
  }

  const dropdownOptions = {
    teams: ['Team 01', 'Team 02', 'Team 03'],
    styles: ['Style A', 'Style B', 'Style C'],
    colors: ['Green', 'Blue', 'Red'],
    sizes: ['S', 'M', 'L', 'XL'],
    checkPoints: ['End Line QC', 'Mid Line QC', 'Pre-Production']
  };

  return (
    <Box sx={{ display: "full", width: "95vw", height: "100vh", minHeight: "100vh" }}>
      <CssBaseline />
      <Sidebar
        open={sidebarOpen || hovered}
        setOpen={setSidebarOpen}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />      <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 2 }}>
        <AppBar position="static" sx={{ bgcolor: "white", boxShadow: 2 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <MenuIcon sx={{ color: 'black' }} />
            </IconButton>

            <Typography variant="h6" sx={{ flexGrow: 1, color: "black" }}>
              Production Update
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
          <Card sx={{ p: 3, borderRadius: '12px', boxShadow: 3 }}>
            {/* Top Info Section */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
              {[
                { label: 'BUYER', value: data.buyer, icon: <Person /> },
                { label: 'GG', value: data.gg, icon: <StyleIcon /> },
                { label: 'SMV', value: data.smv, icon: <AssignmentTurnedIn /> },
                { label: 'PRESENT CARDER', value: data.presentCarder, icon: <Person /> }
              ].map((item, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 4 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{item.icon}</Avatar>
                    <div>
                      <Typography variant="subtitle2" color="textSecondary">
                        {item.label}
                      </Typography>
                      <Typography variant="h6">{item.value}</Typography>
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Filters Section */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: 'TEAM NO', name: 'teamNo', options: dropdownOptions.teams },
                { label: 'STYLE', name: 'style', options: dropdownOptions.styles },
                { label: 'COLOR', name: 'color', options: dropdownOptions.colors },
                { label: 'SIZE', name: 'size', options: dropdownOptions.sizes },
                { label: 'CHECK POINT', name: 'checkPoint', options: dropdownOptions.checkPoints }
              ].map((filter, index) => (
                <Grid item xs={12} md={2.4} key={index}>
                  <FormControl fullWidth>
                    <InputLabel>{filter.label}</InputLabel>
                    <Select
                      name={filter.name}
                      value={filters[filter.name]}
                      label={filter.label}
                      onChange={handleChange}
                      IconComponent={ExpandMore}
                      sx={{ borderRadius: '8px', marginBottom: 4 }}
                    >
                      {filter.options.map((option, i) => (
                        <MenuItem key={i} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>

            {/* Status Cards */}
            <Grid container spacing={16} sx={{ mb: 3 }}>
              {[
                {
                  title: 'Success',
                  value: data.successCount,
                  gradient: 'linear-gradient(to right, #00BA57, #006931)',
                  icon: <AssignmentTurnedIn sx={{ fontSize: 40, opacity: 0.8 }} />
                },
                {
                  title: 'Success',
                  value: data.successCount,
                  gradient: 'linear-gradient(to right, #FFD900, #DB5B00)',
                  icon: <StyleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                },
                {
                  title: 'Defect',
                  value: data.defectCount,
                  gradient: 'linear-gradient(to right, #EB0004, #960003)',
                  icon: <Delete sx={{ fontSize: 40, opacity: 0.8 }} />
                }

              ].map((status, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{
                    p: 3,
                    borderRadius: '12px',
                    background: status.gradient,
                    color: 'white',
                    boxShadow: 3,
                    height: 120,
                    width: 300,
                    display: 'flex',
                    marginBottom: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.02)' }
                  }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {status.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ position: 'absolute', bottom: 10, left: 15 }}>
                        {status.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', position: 'absolute', bottom: 10, right: 15 }}>
                        {status.value}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>


            {/* Hourly Boxes */}
            <Grid container spacing={2}>
              {data.hourlyData.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} lg={1.5} key={index}>
                  <Box sx={{
                    p: 2,
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: 3,
                    bgcolor: '#78B3CE',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      HOUR: {index + 1}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="h5">{value}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductionUpdatePage;