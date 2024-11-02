import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  Snackbar,
  Alert,
  // useTheme,
  IconButton,
  Link,
} from '@mui/material';

import {
  Person as PersonIcon,
  Lock as LockIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Computer as ComputerIcon
} from '@mui/icons-material';

type FormData = {
  name: string;
  last_name: string;
  email: string;
  password: string;
};

type State = {
  successful: boolean;
  message: string;
};

const Register = () => {
  const [state, setState] = useState<State>({
    successful: false,
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  //const theme = useTheme();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must not exceed 20 characters'),
    last_name: Yup.string()
      .required('Last name is required')
      .min(3, 'Last name must be at least 3 characters')
      .max(20, 'Last name must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
  });  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleRegister = (formData: FormData) => {
    const { name, last_name, email, password } = formData;

    setState({
      message: '',
      successful: false,
    });

    AuthService.register(name, last_name, email, password)
      .then((response) => {
        setState({
          message: response.data.message,
          successful: true,
        });
        setOpenSnackbar(true);

        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setState({
          successful: false,
          message: resMessage,
        });
        setOpenSnackbar(true);
      });
  };

  return (
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            maxWidth: '1000px',
            overflow: 'hidden',
            display: 'flex',
            borderRadius: 3,
          }}
        >
          {/* Left side - Image and Title */}
          <Box
            sx={{
              width: '45%',
              position: 'relative',
              display: { xs: 'none', md: 'block' },
              bgcolor: '#2196f3',
              color: 'bla',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src="https://i.postimg.cc/c4S3vkHW/ai-generated-8614984-1920.jpg"
              alt="Todo Tasks Illustration"
              sx={{
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
                height: '200px',
                background: 'linear-gradient(to bottom, rgba(33, 150, 243, 0), rgba(33, 150, 243, 0.9))',
                zIndex: 1,
              }}
            />
            
            <Box
              sx={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                p: 4,
                zIndex: 2,
              }}
            >
              <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                ToDo Tasks
              </Typography>
              <Typography variant="subtitle1">
                Organize your tasks, boost your productivity!
              </Typography>
            </Box>
          </Box>

          {/* Right side - Form */}
          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              p: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <ComputerIcon
                sx={{ fontSize: 40, color: 'primary.main', mb: 2 }}
              />
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Create an Account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please fill in your information to register
              </Typography>
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit(handleRegister)}
              sx={{ width: '100%' }}
            >
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name')}
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
                label="Last Name"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                {...register('last_name')}
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
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
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
                        onClick={() => setShowPassword(!showPassword)}
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
                }}
              >
                Sign Up
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link href="/login" underline="hover">
                    Sign in
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={state.successful ? 'success' : 'error'}
            sx={{ width: '100%' }}
          >
            {state.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Register;