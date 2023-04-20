import React, { useContext } from 'react'
import {Box, Grid, Paper, Link, Typography, TextField, Avatar, Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import madaImg from './mada.jpg';
import { useNavigate } from 'react-router-dom'
import {AuthState, useAuthStore} from 'src/auth.store';

export default function SignInSide() {
    const navigate = useNavigate();
    const auth = useAuthStore((state: AuthState) => state.auth)
    const setAuth = useAuthStore((state: AuthState) => state.setAuth)

    const handleLogin = () => {
        setAuth(true)
        navigate('/volunteers')
    }

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100vw', height: '100vh'}}>
            <Grid container component="main">
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: `url(${madaImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={() => handleLogin()} sx={{ mt: 2, mx: 8 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
