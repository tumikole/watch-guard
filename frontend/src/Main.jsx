import React, { useEffect, useState } from 'react';
import Home from './Components/ComponentUserInterface/Home/Home';
import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoutes from './PrivateRouter/PrivateRoutes';
import SupportHome from './Components/ComponentSupport/SupportHome/SupportHome';
import MainClientDashboard from './Components/ComponentMainClient/MainClientDashboard/MainClientDashboard';

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInUserType, setLoggedInUserType] = useState(null);
  const [loggedInUserToken, setLoggedInUserToken] = useState(null);

  // Get user details from localStorage
  const getUserDetails = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserType = JSON.parse(localStorage.getItem("type"));
    setLoggedInUser(storedUser);
    setLoggedInUserType(storedUserType);
  };

  // Effect to fetch user token and details when necessary
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    setLoggedInUserToken(userToken);

    if (userToken) {
      getUserDetails();
    }
  }, [loggedInUserToken]); // only depends on token change

  return (
    <Routes>
      <Route
        path='/'
        element={<Home getUserDetails={getUserDetails} loggedInUser={loggedInUser} loggedInUserToken={loggedInUserToken} setLoggedInUserToken={setLoggedInUserToken} loggedInUserType={loggedInUserType} />} 
      />

      {/* <Route element={<PrivateRoutes loggedInUserToken={loggedInUserToken} />}> */}
        <Route path='/support_home' element={<SupportHome />} />
        <Route path='/client' element={<MainClientDashboard />} />

      {/* </Route> */}
    </Routes>
  );
};

export default Main;
