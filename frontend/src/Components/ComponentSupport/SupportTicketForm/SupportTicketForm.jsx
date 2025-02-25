import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const SupportTicketForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [hideEmail, setHideEmail] = useState(false);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('issueType', issueType);
    formData.append('description', description);
    if (attachment) formData.append('attachment', attachment);
    formData.append('hideEmail', hideEmail); // Add the 'hideEmail' value to form data

    try {
      const response = await axios.post('http://localhost:4000/support/ticket', formData);
      Swal.fire({
        text: response.data.message,
        icon: 'success',
      });
    } catch (error) {
      Swal.fire({
        text: 'Error submitting the ticket. Please try again.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Submit a Support Ticket</h2>
      <form onSubmit={handleTicketSubmit}>
        {/* Name Input */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="me@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Issue Type Input */}
        <div className="mb-3">
          <label htmlFor="issueType" className="form-label">Issue Type</label>
          <input
            type="text"
            id="issueType"
            className="form-control"
            placeholder="e.g. Login Issue"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            required
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Attachment Input */}
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">Attach File (Optional)</label>
          <input
            type="file"
            id="attachment"
            className="form-control"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>

        {/* Hide Email Switch */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="hideEmail"
            className="form-check-input"
            checked={hideEmail}
            onChange={() => setHideEmail(!hideEmail)}
          />
          <label htmlFor="hideEmail" className="form-check-label">Hide Email</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit Ticket</button>
      </form>
    </div>
  );
};

export default SupportTicketForm;
