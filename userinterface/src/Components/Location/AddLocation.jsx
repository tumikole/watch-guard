import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Grid,
    Alert,
} from '@mui/material';
import axios from 'axios';

const AddLocation = () => {
    const [locationName, setLocationName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!locationName || !latitude || !longitude) {
            setError('All fields are required ❌');
            return;
        }

        const locationData = {
            name: locationName,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        };

        try {
            const response = await axios.post('http://localhost:4000/add_location', locationData);

            if (response.status === 200) {
                setSuccess('Location registered successfully ✅');
                setLocationName('');
                setLatitude('');
                setLongitude('');
                setTimeout(() => {
                    setSuccess('');
                }, 5000);
            } else {
                setError(response.data.message || 'Something went wrong ❌');
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Server error ❌';
            setError(message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                marginTop: 4,
                maxWidth: 400,
                margin: 'auto',
            }}
        >
            <Paper sx={{ padding: 3, width: '100%' }}>
                <Typography variant="h5" gutterBottom>
                    Add New Location
                </Typography>

                <TextField
                    label="Location Name"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    fullWidth
                    sx={{ marginBottom: 2 }}
                />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Latitude"
                            type="number"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Longitude"
                            type="number"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Save Location
                </Button>
                <br />
                <br />

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            </Paper>
        </Box>
    );
};

export default AddLocation;
