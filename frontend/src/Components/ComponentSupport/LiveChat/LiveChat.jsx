import React, { useState, useEffect } from 'react';

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { user: 'You', text: message }]);
      setMessage('');
      // Emit the message to server or handle it here
    }
  };

  return (
    <div className="card" style={{ width: '300px' }}>
      <div className="card-body">
        <h5 className="card-title">Live Chat</h5>
        <div className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="d-flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="form-control"
            style={{ marginRight: '5px' }}
          />
          <button className="btn btn-primary" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
