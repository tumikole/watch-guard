import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  Avatar,
  Stack,
  Divider,
  Grid,
  Chip,
} from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { getAuthData } from '../../utils/indexedDbUtils';

const LandingPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userData = await getAuthData('user');
      setUser(userData);
      setLoading(false);
    };
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography color="error" align="center" mt={5}>
        User not found.
      </Typography>
    );
  }

  const fullName = `${user.firstname} ${user.lastname}`;

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" mb={5}>
        <Avatar
          src={user.profile_picture_url}
          alt={fullName}
          sx={{
            bgcolor: deepPurple[500],
            width: 120,
            height: 120,
            fontSize: 40,
            boxShadow: 3,
          }}
        >
          {!user.profile_picture_url && fullName[0]}
        </Avatar>
        <Box textAlign={{ xs: 'center', sm: 'left' }}>
          <Typography variant="h4" fontWeight={700}>
            Welcome, {fullName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={0.5}>
            Your dashboard is personalized based on your role and activity.
          </Typography>
        </Box>
      </Stack>

      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          👤 Profile Information
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Username:</strong> {user.username}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Email:</strong> {user.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>First Name:</strong> {user.firstname}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Last Name:</strong> {user.lastname}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography><strong>Role:</strong> {user.role || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔐 Permissions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {Array.isArray(user.permissions) && user.permissions.length > 0 ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {user.permissions.map((perm, index) => (
              <Chip key={index} label={perm} variant="outlined" color="primary" />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">No permissions assigned.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LandingPage;
