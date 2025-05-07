import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
    IconButton,
    Divider
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    BrandingWatermark as BrandingWatermarkIcon,
    LocationOn as LocationOnIcon,
    Settings as SettingsIcon,
    ExitToApp as ExitToAppIcon,
    Close as CloseIcon,
    SupportAgent as SupportAgentIcon,
} from '@mui/icons-material';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LandingPage from '../LandingPage/LandingPage';
import { clearAllAuthData } from '../../utils/indexedDbUtils';
import UsersPage from '../UsersPage/UsersPage';
import Subscriptions from '../Subscriptions/Subscriptions';
import Location from '../Location/Location';

const AdminDashboard = () => {
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [sideBarTab, setSideBarTab] = React.useState("Dashboard");

    const sidebarItems = [
        { text: "Dashboard", icon: <DashboardIcon /> },
        { text: "Clients", icon: <PeopleIcon /> },
        { text: "Subscriptions", icon: <SubscriptionsIcon /> },
        { text: "Locations", icon: <LocationOnIcon /> },
        { text: "Settings", icon: <SettingsIcon /> },
        { text: "Support Center", icon: <SupportAgentIcon /> },
        { text: "Logout", icon: <ExitToAppIcon /> },
    ];

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const closeSidebar = () => {
        setOpenSidebar(false);
    };

    const handleSidebarClick = async (text) => {
        if (text === "Logout") {
            await clearAllAuthData();
            window.location.reload()
        } else {
            setSideBarTab(text);
        }
        closeSidebar();
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* App Bar */}
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={toggleSidebar}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">{sideBarTab}</Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="temporary"
                anchor="left"
                open={openSidebar}
                onClose={closeSidebar}
            >
                <Box sx={{ overflow: 'auto' }}>
                    <IconButton
                        edge="start"
                        onClick={closeSidebar}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            color: 'primary.main',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <List sx={{ mt: 10 }}>
                        {sidebarItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem button onClick={() => handleSidebarClick(item.text)} style={{cursor: "pointer"}}>
                                    <IconButton edge="start" sx={{ mr: 2 }}>
                                        {item.icon}
                                    </IconButton>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                                {index < sidebarItems.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    width: '100%',
                    transition: 'margin 0.3s ease',
                    marginLeft: openSidebar ? '240px' : '0',
                }}
            >
                <Toolbar />
                {sideBarTab === "Dashboard" && <LandingPage />}
                {sideBarTab === "Clients" && <UsersPage />}
                {sideBarTab === "Subscriptions" && <Subscriptions />}
                {sideBarTab === "Locations" && <Location />}






            </Box>
        </Box>
    );
};

export default AdminDashboard;
