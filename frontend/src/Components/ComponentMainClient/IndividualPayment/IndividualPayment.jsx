import React, { useState } from 'react';
import '../MainClientDashboard/MainClientDashboard.css'

const IndividualPayment = () => {
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = () => {
    // Logic for individual payment (e.g., integrate with a payment gateway)
    setPaymentStatus('Payment Successful');
  };

  return (
    <div className="individual-payment">
      <h3>Individual Payment</h3>
      <p>Each client can make their own payment.</p>
      <button className="btn btn-success" onClick={handlePayment}>
        Pay Now
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default IndividualPayment;
