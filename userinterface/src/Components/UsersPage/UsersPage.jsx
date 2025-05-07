import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Divider,
    Tooltip,
    Pagination,
} from '@mui/material';

import { MoreVert } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

    const handleMenuOpen = (event, user) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    const handleView = () => {
        setViewDialogOpen(true);
        handleMenuClose();
    };

    const handleEdit = () => {
        console.log('Edit user:', selectedUser);
        handleMenuClose();
    };

    const handleDelete = () => {
        console.log('Delete user:', selectedUser);
        handleMenuClose();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/get_all_users');
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const renderCell = (value, fallback = 'N/A') => (value ? value : fallback);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 } }}>
            <Typography variant="h4" fontWeight={600} gutterBottom>
                Client Management
            </Typography>

            <Paper elevation={3}>
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Region</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Preferences</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{renderCell(user.username)}</TableCell>
                                    <TableCell>{renderCell(user.first_name)}</TableCell>
                                    <TableCell>{renderCell(user.last_name)}</TableCell>
                                    <TableCell>{renderCell(user.email)}</TableCell>
                                    <TableCell>{renderCell(user.phone_number)}</TableCell>
                                    <TableCell>{renderCell('N/A')}</TableCell>
                                    <TableCell sx={{ color: user.status === true ? 'green' : 'red' }}>
                                        {user.status === true ? '✅ Active' : '❌ Inactive'}
                                    </TableCell>
                                    <TableCell>{renderCell(user.role, 'User')}</TableCell>
                                    <TableCell>{renderCell(user.plan, 'Free')}</TableCell>
                                    <TableCell>{renderCell('N/A')}</TableCell>
                                    <TableCell>
                                        <Tooltip title="More actions">
                                            <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                                                <MoreVert />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={Math.ceil(users.length / usersPerPage)}
                    page={currentPage}
                    onChange={(e, value) => setCurrentPage(value)}
                    color="primary"
                    shape="rounded"
                />
            </Box>

            {/* Menu for actions */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleView}>
                    <VisibilityIcon fontSize="small" sx={{ color: 'info.main', mr: 1 }} />
                    <Typography sx={{ color: 'info.main' }}>View</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleEdit}>
                    <EditIcon fontSize="small" sx={{ color: 'warning.main', mr: 1 }} />
                    <Typography sx={{ color: 'warning.main' }}>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <DeleteIcon fontSize="small" sx={{ color: 'error.main', mr: 1 }} />
                    <Typography sx={{ color: 'error.main' }}>Delete</Typography>
                </MenuItem>
            </Menu>

            {/* View Dialog */}
            <Dialog
                open={viewDialogOpen}
                onClose={() => setViewDialogOpen(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>User Details</DialogTitle>
                <DialogContent dividers>
                    {selectedUser ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Typography><strong>Username:</strong> {selectedUser.username}</Typography>
                            <Typography><strong>First Name:</strong> {selectedUser.first_name || 'N/A'}</Typography>
                            <Typography><strong>Last Name:</strong> {selectedUser.last_name || 'N/A'}</Typography>
                            <Typography><strong>Email:</strong> {selectedUser.email || 'N/A'}</Typography>
                            <Typography><strong>Phone:</strong> {selectedUser.phone_number || 'N/A'}</Typography>
                            <Typography><strong>Status:</strong> {selectedUser.status === true ? 'Active' : 'Inactive'}</Typography>
                            <Typography><strong>Role:</strong> {selectedUser.role || 'User'}</Typography>
                            <Typography><strong>Plan:</strong> {selectedUser.plan || 'Free'}</Typography>
                        </Box>
                    ) : (
                        <Typography>No user selected.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UsersPage;
