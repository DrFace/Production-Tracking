import { AppBar as MuiAppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Define drawerWidth constant
const drawerWidth = 20;

interface AppBarProps {
  handleDrawerToggle: () => void;
}

const AppBar = ({ handleDrawerToggle }: AppBarProps) => {
  return (
    <MuiAppBar
    >
      

    </MuiAppBar>
  );
};

export default AppBar;