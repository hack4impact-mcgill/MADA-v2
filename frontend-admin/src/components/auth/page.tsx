import React from 'react'
import {Box, Grid, Paper, Link, Typography, TextField, Avatar, Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import madaImg from 'src/assets/mada.jpg';
import { useNavigate } from 'react-router-dom'
import {login} from 'src/api/auth';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function SignInSide() {
    const navigate = useNavigate();
    const [error, setError] = React.useState("");

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!formData.get('email') || !formData.get('password')) {
            setError("Missing email or password")
            return
        }
        
        try {
            const response = await login({
                password: formData.get('password'),
                email: formData.get('email'),
            })

            cookies.set("TOKEN", response.data.token, {
                path: "/",
                sameSite: "strict",
            });

            navigate('/volunteers')

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response!.data.message)
            } else {
                console.error(error);
                setError("Something went wrong")
            }
        }
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
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 2, mx: 8 }}>
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
                                    <Typography variant="body2" color="error">
                                        {error}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
