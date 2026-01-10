import React, { useState } from 'react';
import './PassengerDash.css';

const PassengerDash = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
    { id: 2, text: "I want to check my flight status.", sender: "user" },
    { id: 3, text: "Sure! Please enter your flight number.", sender: "bot" }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Dummy Data
  const stats = [
    { id: 1, label: "Upcoming Flights", value: "12", icon: "✈️", color: "blue" },
    { id: 2, label: "On Time", value: "10", icon: "✅", color: "green" },
    { id: 3, label: "Delayed", value: "2", icon: "🕒", color: "orange" },
    { id: 4, label: "Cancelled", value: "0", icon: "❌", color: "red" }
  ];

  const flights = [
    { id: 1, flightNo: "AI220", airline: "Air India", from: "Mumbai", to: "London", time: "10:30 AM", gate: "B12", status: "On Time" },
    { id: 2, flightNo: "EK506", airline: "Emirates", from: "Dubai", to: "Mumbai", time: "01:15 PM", gate: "A05", status: "Delayed" },
    { id: 3, flightNo: "6E432", airline: "IndiGo", from: "Delhi", to: "Bangalore", time: "03:45 PM", gate: "C08", status: "On Time" },
    { id: 4, flightNo: "UK811", airline: "Vistara", from: "Mumbai", to: "Singapore", time: "08:20 PM", gate: "B02", status: "On Time" }
  ];

  const shuttles = [
    { id: "S101", type: "Internal", route: "Terminal 1 → Terminal 2", pickup: "Gate 5", drop: "Gate 12", status: "Active" },
    { id: "C202", type: "External", route: "Airport → City Center", pickup: "Bus Stand A", drop: "Metro Station", status: "Coming Soon" }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const userMsg = { id: chatMessages.length + 1, text: newMessage, sender: "user" };
    setChatMessages([...chatMessages, userMsg]);
    setNewMessage('');
    
    // Simple bot reply
    setTimeout(() => {
      const botMsg = { id: chatMessages.length + 2, text: "Our representative will assist you shortly.", sender: "bot" };
      setChatMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="passenger-container">
      {/* Top Header Bar */}
      <header className="passenger-topbar">
        <div className="topbar-left">
          <h1>Passenger Dashboard</h1>
        </div>
        <div className="topbar-right">
          <div className="profile-badge" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            P
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => console.log('Logout')}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Banner Section */}
      <section className="passenger-welcome">
        <div className="welcome-content">
          <h2>Welcome, Passenger</h2>
          <p>Track your flight, gate and shuttle info in real time.</p>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Enter Flight Number (ex: AI220)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </section>

      {/* Stats Cards Row */}
      <section className="passenger-stats">
        {stats.map(stat => (
          <div key={stat.id} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="dashboard-grid">
        {/* Flight Details Table */}
        <section className="passenger-table-section">
          <div className="card-header">
            <h3>Your Flight Status</h3>
          </div>
          <div className="table-container">
            <table className="passenger-table">
              <thead>
                <tr>
                  <th>Flight No</th>
                  <th>Airline</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Time</th>
                  <th>Gate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.id}>
                    <td><strong>{flight.flightNo}</strong></td>
                    <td>{flight.airline}</td>
                    <td>{flight.from}</td>
                    <td>{flight.to}</td>
                    <td>{flight.time}</td>
                    <td>{flight.gate}</td>
                    <td>
                      <span className={`status-badge ${flight.status.toLowerCase().replace(' ', '-')}`}>
                        {flight.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Shuttle Availability Section */}
        <section className="passenger-shuttle-section">
          <div className="card-header">
            <h3>Airport Shuttle Info</h3>
          </div>
          <div className="shuttle-cards">
            {shuttles.map(shuttle => (
              <div key={shuttle.id} className="shuttle-card">
                <div className="shuttle-header">
                  <span className="shuttle-id">{shuttle.id}</span>
                  <span className={`shuttle-type ${shuttle.type.toLowerCase()}`}>{shuttle.type} Shuttle</span>
                </div>
                <div className="shuttle-body">
                  <p><strong>Route:</strong> {shuttle.route}</p>
                  <p><strong>Pickup:</strong> {shuttle.pickup}</p>
                  <p><strong>Drop:</strong> {shuttle.drop}</p>
                </div>
                <div className="shuttle-footer">
                  <span className={`status-badge ${shuttle.status.toLowerCase().replace(' ', '-')}`}>
                    {shuttle.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Chatbot Floating Button */}
      <div className="chatbot-wrapper">
        <button className="chatbot-fab" onClick={() => setShowChatbot(!showChatbot)}>
          💬
        </button>
        {showChatbot && (
          <div className="chatbot-panel">
            <div className="chatbot-header">
              <h4>Airport Assistant</h4>
              <button onClick={() => setShowChatbot(false)}>×</button>
            </div>
            <div className="chatbot-messages">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form className="chatbot-input" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerDash;
