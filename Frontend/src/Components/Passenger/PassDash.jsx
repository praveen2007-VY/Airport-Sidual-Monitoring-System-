import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PassDash.css";

const PassDash = () => {
  const adminname = "Praveen";
  const adminemail = "praveen@gmail.com";
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`http://localhost:5000/adminpass/${id}`);
      const user = res.data.find((n) => n._id == id);
      if (user) {
        setname(user.name);
        setemail(user.email);
        console.log("Fetch Success");
      }
    };
    fetchdata();
  }, [id]);

  const [flighttable, setflighttable] = useState([]);
  const [internal, setinternal] = useState([]);
  const [external, setexternal] = useState([]);
  const [staff, setstaff] = useState([]);

  useEffect(() => {
    const fetchflight = async () => {
      const res1 = await axios.get(`http://localhost:5000/flightdetail`);
      setflighttable(res1.data);
    };
    const fetchinternal = async () => {
      const res2 = await axios.get(`http://localhost:5000/internalshuttle`);
      setinternal(res2.data);
    };
    const fetchexternal = async () => {
      const res3 = await axios.get(`http://localhost:5000/externalshuttle`);
      setexternal(res3.data);
    };
    const fetchstaff = async () => {
      const res4 = await axios.get(`http://localhost:5000/staff`);
      setstaff(res4.data);
    };

    fetchinternal();
    fetchexternal();
    fetchflight();
    fetchstaff();
  }, []);

  const fetchstaff = async () => {
    const res4 = await axios.get(`http://localhost:5000/staff`);
    setstaff(res4.data);
  };

  const usenav = useNavigate();

  const handleaddflght = () => {
    usenav(`/adminlog/admin/${id}/addflight`);
  };

  const handlebulkflight = (ids) => {
    usenav(`/adminlog/admin/bulkflight`);
  };

  const [totflight, setflight] = useState(0);
  const [ontime, setontime] = useState(0);
  const [delay, setdelay] = useState(0);
  const [cancel, setcancel] = useState(0);

  useEffect(() => {
    const total = flighttable.length;
    const ontime = flighttable.filter((n) => n.status == "On Time").length;
    const delay = flighttable.filter((n) => n.status == "Delayed").length;
    const cancel = flighttable.filter((n) => n.status == "Cancelled").length;
    setflight(total);
    setontime(ontime);
    setdelay(delay);
    setcancel(cancel);
  }, [flighttable]);
  /* --- Chatbot State & Logic --- */
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatFile, setChatFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi 👋 I’m Airport Assistant. You can ask about flights, gates, or shuttle services.",
    },
  ]);

  // Ref for auto-scroll
  const chatBodyRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages, isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const handleChatFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      setChatFile(e.target.files[0]);
    }
  };

  const handleChatSend = () => {
    if (!chatInput.trim() && !chatFile) return;

    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: chatInput,
      file: chatFile ? chatFile.name : null,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatFile(null);

    // 2. Fake Bot Reply after 600ms
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "✅ Thanks! I received your message. (UI demo only)",
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleChatKeyPress = (e) => {
    if (e.key === "Enter") {
      handleChatSend();
    }
  };

  return (
    <>
      <div className="pass-container">
        {/* <header className="pass-header">
          <div className="pass-brand">
            <h2>
              <i className="fa-solid fa-plane-departure pass-icon-mr"></i> Welcome
              Passenger
            </h2>
          </div>

          <div className="pass-profile-container">
            <div className="pass-profile-trigger" tabIndex="0">
              <div className="pass-avatar">
                {adminname &&
                  adminname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
              </div>
              <div className="pass-profile-info">
                <span className="pass-admin-name">{adminname}</span>
              </div>
              <i className="fa-solid fa-chevron-down pass-dropdown-arrow"></i>

           
              <div className="pass-dropdown-menu">
                <div className="pass-dropdown-header">
                  <span className="pass-dd-name">{adminname}</span>
                  <span className="pass-dd-email">{adminemail}</span>
                </div>
                <div className="pass-dropdown-divider"></div>
                <button className="pass-dropdown-item">
                  <i className="fa-solid fa-key"></i> Change Password
                </button>
                <button className="pass-dropdown-item pass-logout-danger">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="pass-dashboard-content">

          <section className="pass-welcome-section">
            <h1>Welcome, {adminname}</h1>
            <p>Track your flight and airport updates in real time</p>
          </section>

          <section className="pass-stats-grid">
            <div className="pass-stat-card pass-blue">
              <div className="pass-icon-box">
                <i className="fa-solid fa-plane-up"></i>
              </div>
              <div className="pass-stat-info">
                <h3>Total Flights</h3>
                <p>{totflight}</p>
              </div>
            </div>
            <div className="pass-stat-card pass-green">
              <div className="pass-icon-box">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className="pass-stat-info">
                <h3>On Time</h3>
                <p>{ontime}</p>
              </div>
            </div>
            <div className="pass-stat-card pass-orange">
              <div className="pass-icon-box">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div className="pass-stat-info">
                <h3>Delayed</h3>
                <p>{delay}</p>
              </div>
            </div>
            <div className="pass-stat-card pass-red">
              <div className="pass-icon-box">
                <i className="fa-solid fa-ban"></i>
              </div>
              <div className="pass-stat-info">
                <h3>Cancelled</h3>
                <p>{cancel}</p>
              </div>
            </div> */}

        <header className="topbar">
          <div className="brand1">
            <h2>
              <i className="fa-solid fa-plane-departure hhh"></i> Welcome
              Passcenger
            </h2>
          </div>

          <div className="profile-container">
            <div className="profile-trigger" tabIndex="0">
              <div className="avatar">
                {adminname &&
                  adminname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
              </div>
              <div className="profile-info">
                <span className="admin-name">{adminname}</span>
              </div>
              <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="dd-name">{adminname}</span>
                  <span className="dd-email">{adminemail}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <i className="fa-solid fa-key"></i> Change Password
                </button>
                <button className="dropdown-item logout-danger">
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="welcome-section">
            <h1>Welcome, {adminname}</h1>
            <p>Track your flight and airport updates in real time</p>
          </section>

          {/* Stats Cards */}
          <section className="stats-grid">
            <div className="stat-card blue">
              <div className="icon-box">
                <i className="fa-solid fa-plane-up"></i>
              </div>
              <div className="stat-info">
                <h3>Total Flights</h3>
                <p>{totflight}</p>
              </div>
            </div>
            <div className="stat-card green">
              <div className="icon-box">
                <i className="fa-regular fa-clock"></i>
              </div>
              <div className="stat-info">
                <h3>On Time</h3>
                <p>{ontime}</p>
              </div>
            </div>
            <div className="stat-card orange">
              <div className="icon-box">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <div className="stat-info">
                <h3>Delayed</h3>
                <p>{delay}</p>
              </div>
            </div>
            <div className="stat-card red">
              <div className="icon-box">
                <i className="fa-solid fa-ban"></i>
              </div>
              <div className="stat-info">
                <h3>Cancelled</h3>
                <p>{cancel}</p>
              </div>
            </div>
          </section>

          <section className="pass-search-section">
            <div className="pass-search-bar">
              <input
                type="text"
                placeholder="Enter Flight Number (ex: AI220)"
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>Search</button>
            </div>
          </section>

          <section className="pass-content-grid">
            {/* Flight Table */}
            <div className="pass11">
              <div className="pass-flight-section">
                <h3 className="pass-section-title">Flight Status</h3>
                <div className="pass-table-wrapper">
                  <table className="pass-table">
                    <thead className="pass-table-head">
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
                    <tbody className="pass-table-body">
                      {flighttable.map((flight) => (
                        <tr key={flight._id} className="pass-table-row">
                          <td>{flight.flight}</td>
                          <td>{flight.airline}</td>
                          <td>{flight.from}</td>
                          <td>{flight.to}</td>
                          <td>{flight.time}</td>
                          <td>{flight.gate}</td>
                          <td>
                            <span
                              className={`pass-status-badge ${flight.status
                                .toLowerCase()
                                .replace(" ", "-")}`}
                            >
                              {flight.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Shuttle Cards */}
            <div className="pass11">
              <div className="pass-shuttle-section">
                <h3 className="pass-section-title">Internal Shuttle Service</h3>
                <div className="pass-shuttle-container">
                  {internal.map((shuttle) => (
                    <div key={shuttle._id} className="pass-shuttle-card">
                      <div className="pass-shuttle-header">
                        <span className="pass-shuttle-id-label">Shuttle ID:</span>
                        <span className="pass-shuttle-id-value">
                          {shuttle.shuttleid}
                        </span>
                      </div>
                      <div className="pass-shuttle-body">
                        <div className="pass-shuttle-row">
                          <strong>Pickup:</strong> <span>{shuttle.pickup}</span>
                        </div>
                        <div className="pass-shuttle-row">
                          <strong>Drop:</strong> <span>{shuttle.drop}</span>
                        </div>
                      </div>
                      <div className="pass-shuttle-footer">
                        <span
                          className={`badge ${(shuttle.status || "unknown")
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {shuttle.status || "Unknown"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <section id="passexter" className="pass1">
        <div className="pass-flight-section2">
          <h3 className="pass-section-title"> External Shuttle Service</h3>
          <div className="pass-table-wrapper">
            <table className="pass-table">
              <thead className="pass-table-head">
                <tr>
                  <th>Shuttle Id</th>
                  <th>Route From</th>
                  <th>Route To</th>
                  <th>Pick Up</th>
                  <th>Droup</th>
                  <th>Schedule</th>
                  <th>Status</th>
                  <th>Staff</th>
                </tr>
              </thead>
              <tbody className="pass-table-body">
                {external.map((n, i) => (
                  <tr key={n._id} className="pass-table-row">
                    <td>{n.shuttleid}</td>
                    <td>{n.routefrom}</td>
                    <td>{n.routeto}</td>
                    <td>{n.pickup}</td>
                    <td>{n.drop}</td>
                    <td>{n.schedule}</td>
                    <td>
                      <span
                        className={`badge ${n.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td>{n.staff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer class="footer">
        <p>© 2025 Airport Schedule Monitoring System</p>
        <span>Built using MERN Stack | Academic Project</span>
      </footer>
      {/* --- Floating Chatbot UI --- */}
      {/* 1. Floating Action Button (FAB) */}
      <div
        className={`passchat-fab ${isChatOpen ? "passchat-fab-active" : ""}`}
        onClick={toggleChat}
      >
        {isChatOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-message"></i>
        )}
      </div>

      {/* 2. Chat Popup Window */}
      {
        isChatOpen && (
          <div className="passchat-window">
            {/* Header */}
            <div className="passchat-header">
              <div className="passchat-header-info">
                <span className="passchat-title">Airport Assistant</span>
                <span className="passchat-status">
                  <span className="passchat-dot"></span> Online
                </span>
              </div>
              <button className="passchat-close-btn" onClick={toggleChat}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Body (Messages) */}
            <div className="passchat-body" ref={chatBodyRef}>
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`passchat-message ${msg.sender === "user" ? "passchat-user" : "passchat-bot"
                    }`}
                >
                  <div className="passchat-bubble">
                    {msg.text && <p>{msg.text}</p>}
                    {msg.file && (
                      <div className="passchat-file-bubble">
                        <i className="fa-solid fa-paperclip"></i> {msg.file}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="passchat-input-area">
              {chatFile && (
                <div className="passchat-file-preview">
                  <span>📎 {chatFile.name}</span>
                  <button
                    onClick={() => setChatFile(null)}
                    className="passchat-remove-file"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              )}
              <div className="passchat-input-row">
                <label htmlFor="chat-file-upload" className="passchat-upload-btn">
                  <i className="fa-solid fa-paperclip"></i>
                </label>
                <input
                  id="chat-file-upload"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleChatFile}
                />
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={handleChatInput}
                  onKeyDown={handleChatKeyPress}
                />
                <button className="passchat-send-btn" onClick={handleChatSend}>
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default PassDash;
