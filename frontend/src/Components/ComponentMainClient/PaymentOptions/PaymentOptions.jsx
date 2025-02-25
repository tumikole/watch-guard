import React from 'react';
import BulkPayment from '../BulkPayment/BulkPayment';
import IndividualPayment from '../IndividualPayment/IndividualPayment';
import '../MainClientDashboard/MainClientDashboard.css'

const PaymentOptions = ({ method }) => {
  return (
    <div className="payment-options">
      {method === 'bulk' && <BulkPayment />}
      {method === 'individual' && <IndividualPayment />}
    </div>
  );
};

export default PaymentOptions;
