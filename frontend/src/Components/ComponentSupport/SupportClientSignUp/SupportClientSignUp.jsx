import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap';

const SupportClientSignUp = () => {
  const [formData, setFormData] = useState({
    cell_number: '',
    brand: '',
    location: '',
    first_name: '',
    last_name: '',
    email: '',
    clientLocation: '', // Track selected location
    newLocation: '', // Track new location added through modal
  });

  const [showModal, setShowModal] = useState(false); // Controls modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLocationSelect = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      clientLocation: value,
    }));

    if (value === 'AddLocation') {
      setShowModal(true); // Open the modal if "Add location" is selected
    }
  };

  const handleClientLocationRegister = async () => {
    const data = {
      brand: formData.brand,
      email: formData.email,
      location: formData.newLocation, // Use the new location entered
    };
    console.log({ data });

    if (!data.brand || !data.email || !data.location) {
      alert('form data missing');
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/register_client_location',
        data
      );
      console.log({ response });

      Swal.fire({
        text: response.data.message,
        icon: response.data.message.includes('✅') ? 'success' : 'warning',
      });

      setFormData((prevData) => ({
        ...prevData,
        clientLocation: formData.newLocation, // Update client location after saving
        newLocation: '', // Reset the new location field
      }));
      setShowModal(false); // Close the modal after saving
    } catch (error) {
      Swal.fire({
        text: 'Registration failed. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleClientRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/register_client', formData);
      console.log({ response });

      Swal.fire({
        text: response.data.message,
        icon: response.data.message.includes('✅') ? 'success' : 'warning',
      });
    } catch (error) {
      Swal.fire({
        text: 'Registration failed. Please try again.',
        icon: 'error',
      });
    }
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal without saving
  };

  return (
    <div className="container">
      <form onSubmit={handleClientRegister}>
        <div className="mb-3">
          <label htmlFor="cell_number" className="form-label">
            Cell Number
          </label>
          <input
            type="text"
            className="form-control"
            id="cell_number"
            name="cell_number"
            value={formData.cell_number}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="clientLocation" className="form-label">
            Location
          </label>
          <select
            name="clientLocation"
            value={formData.clientLocation}
            onChange={handleLocationSelect}
            className="form-control"
          >
            <option value="">Select location</option>
            <option value="AddLocation">Add location</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>

      {/* Modal for adding a new location */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            name="newLocation"
            value={formData.newLocation}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter new location"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClientLocationRegister}>
            Save Location
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SupportClientSignUp;
