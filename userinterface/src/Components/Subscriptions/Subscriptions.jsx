import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
    Box,
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Grid
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import StarIcon from '@mui/icons-material/Star'

const Subscriptions = () => {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:4000/get_all_subscriptions')
            if (response.data.statusText === 'OK') {
                setPlans(response.data.plans)
            }
        } catch (error) {
            console.error('Error fetching subscriptions:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllSubscriptions()
    }, [])

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        )
    }

    const getColor = (type) => {
        switch (type) {
            case 'Free Trial': return '#f5f5f5'
            case 'Basic Plan': return '#e3f2fd'
            case 'Premium Plan': return '#fff9c4'
            case 'Premium Gold Plan': return '#fff59d'
            default: return '#ffffff'
        }
    }

    return (
        <Box p={3}>
            <Grid container spacing={3}>
                {plans.map((plan) => (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                        <Card
                            elevation={3}
                            sx={{
                                backgroundColor: getColor(plan.title),
                                borderRadius: 3,
                                minHeight: 400,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom fontWeight="bold">
                                    {plan.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" mb={2}>
                                    {plan.price}
                                </Typography>

                                <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                                    Features
                                </Typography>
                                <List dense>
                                    {plan.features?.map((feature, i) => (
                                        <ListItem key={i}>
                                            <ListItemIcon>
                                                <CheckCircleIcon color="success" />
                                            </ListItemIcon>
                                            <ListItemText primary={feature} />
                                        </ListItem>
                                    ))}
                                </List>

                                {plan.limitations?.length > 0 && (
                                    <>
                                        <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                                            Limitations
                                        </Typography>
                                        <List dense>
                                            {plan.limitations.map((limitation, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <CancelIcon color="error" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={limitation} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}

                                {plan.extras?.length > 0 && (
                                    <>
                                        <Typography variant="subtitle2" fontWeight="bold" mt={2}>
                                            Extras
                                        </Typography>
                                        <List dense>
                                            {plan.extras.map((extra, i) => (
                                                <ListItem key={i}>
                                                    <ListItemIcon>
                                                        <StarIcon color="warning" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={extra} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Subscriptions
