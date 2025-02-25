import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportTicketForm from '../SupportTicketForm/SupportTicketForm';
import TicketHistory from '../TicketHistory/TicketHistory';
import LiveChat from '../LiveChat/LiveChat';
import FAQs from '../FAQs/FAQs';
import SupportClientSignUp from '../SupportClientSignUp/SupportClientSignUp';

const SupportHome = () => {
  const [activeTab, setActiveTab] = useState('ticket'); // Default active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mt-4">
      {/* Tabs */}
      <ul className="nav nav-tabs" id="supportTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'ticket' ? 'active' : ''}`}
            onClick={() => handleTabChange('ticket')}
            role="tab"
          >
            Submit a Ticket
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => handleTabChange('history')}
            role="tab"
          >
            Ticket History
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => handleTabChange('chat')}
            role="tab"
          >
            Live Chat
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'faq' ? 'active' : ''}`}
            onClick={() => handleTabChange('faq')}
            role="tab"
          >
            FAQs
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'signUp' ? 'active' : ''}`}
            onClick={() => handleTabChange('signUp')}
            role="tab"
          >
            Client Sign Up
          </a>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-3" id="supportTabsContent">
        {activeTab === 'ticket' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <SupportTicketForm />
          </div>
        )}
        {activeTab === 'history' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <TicketHistory />
          </div>
        )}
        {activeTab === 'chat' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <LiveChat />
          </div>
        )}
        {activeTab === 'faq' && (
          <div className="tab-pane fade show active" role="tabpanel">
            <FAQs />
          </div>
        )}
        {activeTab === 'signUp' && (
          <div className="tab-pane fade show active" role="tabpanel">
            {/* You can replace this with a SignUp form component */}
            <h4>Client Sign Up Form</h4>
            <SupportClientSignUp />
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportHome;
