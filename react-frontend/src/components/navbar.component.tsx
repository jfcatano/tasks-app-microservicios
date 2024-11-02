import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from '../services/auth.service';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = AuthService.getCurrentUser(); // Get the current user from the AuthService
  const userName = user?.data?.name || "Usuario"; // Get the user name to display in the welcome message


  const logOut = () => {
    AuthService.logout();
    navigate('/login');
  };

  const button = {
    color: 'white',
    fontWeight: 500,
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 0.9,
    },
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: '#026AA7',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          {location.pathname === '/home' && (
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              Welcome, <span style={{ fontWeight: 'bold' }}>{userName}</span>! Are you ready to start to organize your tasks and boost your productivity? What are you waiting for!
            </Typography>
          )}
        </Box>

        <Box>
          <Toolbar>
            {location.pathname === '/home' ? (
              <Button 
              disableRipple 
              sx={button}
              onClick={logOut}
            >
              Sign Out 
              <LogoutIcon sx={{ fontSize: 20  ,ml:1}} />
            </Button>
            ) : location.pathname === '/register' ? (
              <Link to={'/login'}>
                <Button disableRipple sx={button}>
                  Login
                </Button>
              </Link>
            ) : location.pathname === '/login' && (
              <Link to={'/register'}>
                <Button disableRipple sx={button}>
                  Sign Up
                </Button>
              </Link>
            )}
          </Toolbar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;