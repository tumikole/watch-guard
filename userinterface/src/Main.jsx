import React, { useEffect, useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';

import LoginPage from './Components/LoginPage/LoginPage';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes';
import { getAuthData } from './utils/indexedDbUtils';

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserToken, setLoggedInUserToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserFromIndexedDb = async () => {
      try {
        const userData = await getAuthData('user');
        const tokenData = await getAuthData('token');

        setLoggedInUser(userData);
        setLoggedInUserToken(tokenData);

        if (tokenData) {
          navigate('/admin-dashboard'); // ✅ Navigate when token is present
        }
      } catch (error) {
        console.error("Error fetching user data from IndexedDB:", error);
      }
    };

    fetchUserFromIndexedDb();
  }, []);

  useEffect(() => {
    // Watch token changes from LoginPage to trigger navigation
    if (loggedInUserToken) {
      navigate('/admin-dashboard');
    }
  }, [loggedInUserToken, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginPage
            setLoggedInUser={setLoggedInUser}
            setLoggedInUserToken={setLoggedInUserToken}
          />
        }
      />

      <Route element={<PrivateRoutes token={loggedInUserToken} />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default Main;
