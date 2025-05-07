import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Typography,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
} from '@mui/material';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import debounce from 'lodash.debounce';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const provinces = [
  "Gauteng", "North West", "Eastern Cape", "Northern Cape", "Western Cape",
  "Mpumalanga", "Free State", "KwaZulu-Natal", "Limpopo",
];

const FlyToMarker = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 13, { duration: 1.2 });
    }
  }, [position, map]);
  return null;
};

const MapClickHandler = ({ setCoords, setMarkerPos, setLocationName }) => {
  const map = useMap();

  useEffect(() => {
    const onClick = (e) => {
      const { lat, lng } = e.latlng;
      setCoords({ lat, lng });
      setMarkerPos({ lat, lng });
      setLocationName(''); // Optional: Clear the typed name
    };

    map.on('click', onClick);
    return () => map.off('click', onClick);
  }, [map, setCoords, setMarkerPos, setLocationName]);

  return null;
};

const AddLocationWithMap = () => {
  const [province, setProvince] = useState('');
  const [locationName, setLocationName] = useState('');
  const [coords, setCoords] = useState({ lat: '', lng: '' });
  const [markerPos, setMarkerPos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCoordinates = debounce(async (name) => {
    if (!name.trim()) {
      setCoords({ lat: '', lng: '' });
      setMarkerPos(null);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(name)}`
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const parsedLat = parseFloat(lat);
        const parsedLng = parseFloat(lon);
        setCoords({ lat: parsedLat, lng: parsedLng });

        setTimeout(() => {
          setMarkerPos({ lat: parsedLat, lng: parsedLng });
        }, 100);
      } else {
        setCoords({ lat: '', lng: '' });
        setMarkerPos(null);
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      setError('Error fetching coordinates ❌');
      setTimeout(() => setError(''), 5000);
    } finally {
      setLoading(false);
    }
  }, 700);

  useEffect(() => {
    if (locationName.trim()) {
      fetchCoordinates(locationName);
    } else {
      setCoords({ lat: '', lng: '' });
      setMarkerPos(null);
    }
  }, [locationName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!province || !locationName || !coords.lat || !coords.lng) {
      setError('All fields are required ❌');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const locationData = {
      Province: province,
      name: locationName,
      latitude: coords.lat,
      longitude: coords.lng,
    };

    try {
      const response = await axios.post(
        'http://localhost:4000/add_location',
        locationData
      );

      if (response.status === 200) {
        setSuccess(response.data.message || 'Location added ✅');
        setProvince('');
        setLocationName('');
        setCoords({ lat: '', lng: '' });
        setMarkerPos(null);
      } else {
        setError(response.data.message || 'Unexpected response ❌');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Server error ❌';
      setError(msg);
    } finally {
      setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', p: 2 }}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Location
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Select
                fullWidth
                value={province}
                displayEmpty
                onChange={(e) => setProvince(e.target.value)}
                renderValue={(selected) => selected || 'Select Province'}
              >
                {provinces.map((prov) => (
                  <MenuItem key={prov} value={prov}>{prov}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Location Name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField label="Latitude" value={coords.lat || ''} fullWidth disabled />
            </Grid>
            <Grid item xs={6} sm={2}>
              <TextField label="Longitude" value={coords.lng || ''} fullWidth disabled />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || !province || !locationName || !coords.lat || !coords.lng}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Location'}
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      </Paper>

      <Box sx={{ height: '70%', width: '100%' }}>
        <MapContainer
          center={markerPos || [0, 0]}
          zoom={markerPos ? 13 : 2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markerPos && <Marker position={[markerPos.lat, markerPos.lng]} />}
          <FlyToMarker position={markerPos} />
          <MapClickHandler
            setCoords={setCoords}
            setMarkerPos={setMarkerPos}
            setLocationName={setLocationName}
          />
        </MapContainer>
      </Box>
    </Box>
  );
};

export default AddLocationWithMap;
