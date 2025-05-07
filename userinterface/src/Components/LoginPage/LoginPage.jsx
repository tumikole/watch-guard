import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Container,
    Box,
    IconButton,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import './LoginPage.css';
import { setAuthData, getAuthData } from '../../utils/indexedDbUtils'; // 👈 import IndexedDB utils

const LoginPage = ({ setLoggedInUser, setLoggedInUserToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const userData = { email, password };

        try {
            const response = await axios.post('http://localhost:4000/admin_login', userData);
            console.log({ response });

            if ([301, 401].includes(response.data.status)) {
                setErrorMessage(response.data.message || 'Unauthorized access');
                return;
            }

            if (response.data.token) {
                // Explicitly remove password (in case it's there)
                const { password, ...cleanUser } = response.data.user;

                console.log('Saving user to IndexedDB:', cleanUser);

                await setAuthData('token', response.data.token);
                await setAuthData('user', cleanUser);

                const checkUser = await getAuthData('user');
                const checkToken = await getAuthData('token');

                setLoggedInUser(checkUser);
                setLoggedInUserToken(checkToken);
            }

        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || 'Something went wrong. Please try again.'
            );
            console.error('Login error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login_container">
            <Container maxWidth="xs">
                <Box
                    className="glassy-container"
                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}
                >
                    <Typography variant="h5">Login</Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            edge="end"
                                            aria-label="toggle password visibility"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        {errorMessage && (
                            <Typography
                                variant="body2"
                                color="error"
                                sx={{ marginTop: 1, textAlign: 'center' }}
                            >
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ marginTop: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </form>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
