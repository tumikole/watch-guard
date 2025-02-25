import React, { useState } from 'react';
import '../MainClientDashboard/MainClientDashboard.css'

const BulkPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = () => {
    // Logic for bulk payment (e.g., integrate with a payment gateway)
    setPaymentStatus('Payment Successful for All Clients');
  };

  return (
    <div className="bulk-payment">
      <h3>Bulk Payment</h3>
      <p>Make a payment for all registered clients at once.</p>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay for All Clients
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default BulkPayment;
