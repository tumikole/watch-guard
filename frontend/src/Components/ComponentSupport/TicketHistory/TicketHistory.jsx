import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketHistory = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://localhost:4000/support/tickets');
        setTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Ticket History</h2>
      {tickets.length > 0 ? (
        tickets.map((ticket, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Issue Type: {ticket.issueType}</h5>
              <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
              <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
              <button className="btn btn-primary" onClick={() => alert('View details')}>View Details</button>
            </div>
          </div>
        ))
      ) : (
        <p>No tickets submitted yet.</p>
      )}
    </div>
  );
};

export default TicketHistory;
