import React, { useState } from 'react';
import './Navbar.css';
import Swal from 'sweetalert2';
import { loginUser } from '../../../Redux/Actions/index';
import { useDispatch } from "react-redux";
import Logo from '../../../Asserts/Logo.png';
import FormLogo from '../../../Asserts/149765656-professional-people-working-with-face-mask-vector-illustration-design.jpg';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Input } from '@chakra-ui/react';
import { Field } from '../../ui/field'; // Assuming Field is a custom component
import axios from 'axios';

const Navbar = ({ loggedInUserToken, setLoggedInUserToken, loggedInUser, loggedInUserType }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // States for user registration and login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [brand, setBrand] = useState('');
  const [cellNumber, setCellNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [username, setUsername] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');

  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const storedUser = await dispatch(loginUser(email, password));
      if (storedUser.storedUser) {
        Swal.fire({
          title: "Signed In successfully",
          icon: "success",
        });
        const userToken = JSON.parse(localStorage.getItem("token"));
        setLoggedInUserToken(userToken);
        setEmail("");
        setPassword("");
        setShow(false);
      } else {
        Swal.fire({
          text: "Invalid credentials",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        text: "Fill all the required fields",
        icon: "warning",
      });
    }
  };

  const handleRegister = async () => {
    const userData = {
      cellNumber,
      password,
      brand,
      firstName,
      lastName,
      email,
      username,
    };

    try {
      const response = await axios.post('http://localhost:4000/register', userData);
      console.log({ response });

      Swal.fire({
        text: response.data.message,
        icon: response.data.message.includes("✅") ? "success" : "warning",
      });

      handleRegisterClose();
    } catch (error) {
      Swal.fire({
        text: "Registration failed. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <h1>
          <img src={Logo} alt="Logo" className="navbar__logo" />
          {loggedInUserType === "support_user" ? "Community Guard" : loggedInUserType}
        </h1>
      </div>
      <ul className={`navbar__links ${isMobile ? 'active' : ''}`}>
        <li><a href="#home">Home</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#faq">FAQ</a></li>

        <li onClick={handleShow}><a href="#login">Login</a></li>
        {/* <li onClick={handleRegisterShow}><a href="#register">Register</a></li> */}

      </ul>
      <div className="navbar__toggle" onClick={() => setIsMobile(!isMobile)}>
        <span className="toggle-bar"></span>
        <span className="toggle-bar"></span>
        <span className="toggle-bar"></span>
      </div>

      {/* Login Modal */}
      <Modal show={show} onHide={handleClose} style={{ color: 'white' }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'white' }}>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'white' }}>
          <Form>
            <Field label="Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Password" required>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Field>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleLogin} style={{ width: "100%" }}>Sign In</Button>
        </Modal.Footer>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegister} onHide={handleRegisterClose} style={{ color: 'white' }}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'white' }}>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'black' }}>
          <Form>
            <Field label="First Name" required>
              <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </Field>
            <Field label="Last Name" required>
              <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Field>
            <Field label="Username" required>
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </Field>
            <Field label="Email" required>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Password" required>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Field>
            <Field label="Cell Number" required>
              <Input type="text" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} required />
            </Field>
            {/* <Field label="Location" required>
              <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
            </Field> */}
            {/* <Field label="Brand">
              <Input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
            </Field> */}
            {/* <Field label="Reference Number">
              <Input type="text" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
            </Field> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={handleRegister} style={{ width: "100%" }}>Register</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Navbar;
