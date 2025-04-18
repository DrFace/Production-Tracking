import { AppBar, Toolbar, InputBase, IconButton, Box } from "@mui/material";
import { Search, Notifications, AccountCircle, Fullscreen } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: "white", color: "black" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <InputBase
            placeholder="Search..."
            sx={{ backgroundColor: "#ddd", borderRadius: "20px", padding: "5px 10px", width: "250px" }}
          />
          <IconButton><Search /></IconButton>
        </Box>
        <IconButton><Fullscreen /></IconButton>
        <IconButton><Notifications /></IconButton>
        <IconButton><AccountCircle /></IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
