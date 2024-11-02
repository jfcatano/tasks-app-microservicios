import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  Link
} from '@mui/material';

import {
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Computer as ComputerIcon,
} from '@mui/icons-material';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [redirect, setRedirect] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const theme = useTheme();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .min(4, 'Email must be at least 4 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const handleLogin = (formValue: FormValues) => {
    const { email, password } = formValue;

    setMessage('');
    setLoading(true);

    AuthService.login(email, password)
      .then(() => {
        setRedirect('/home');
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setOpenSnackbar(true);
        setLoading(false);
      });
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          display: 'flex',
          width: '80%',
          maxWidth: '1200px',
          height: '600px',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {/* Left side - Image */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <img
            src="https://i.postimg.cc/d0tmLH53/Career-in-Animation-1024x641.jpg"
            alt="Tasks illustration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              p: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              ToDo Tasks
            </Typography>
            <Typography variant="subtitle1">
              Organize your tasks, boost your productivity
            </Typography>
          </Box>
        </Box>

        {/* Right side - Login form */}
        <Box
          sx={{
            flex: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: alpha(theme.palette.background.paper, 0.8),
            backdropFilter: 'blur(10px)',
          }}
        >
          <Avatar
            sx={{
              m: 2,
              bgcolor: 'primary.main',
              width: 56,
              height: 56,
              boxShadow: 3,
            }}
          >
            <ComputerIcon />
          </Avatar>

          <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
            Welcome to ToDo Tasks!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please enter your credentials to continue
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            sx={{ width: '100%', maxWidth: '400px' }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
                boxShadow: 2,
              }}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
          <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                Don't have an account yet?{' '}
                  <Link href="/register" underline="hover">
                    Register now
                  </Link>
                </Typography>
              </Box>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="error"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default Login;