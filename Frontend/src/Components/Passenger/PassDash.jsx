import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PassDash.css";
import { toast } from "react-toastify";

const PassDash = () => {
  const [passname, setpassname] = useState("");
  const [passemail, setpassemail] = useState("");
  const { id } = useParams();

  const logout = () => {
    toast.success("Logout Successfull");
    usenav("/passenger/login");
  };
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
    const fetchdata = async () => {
      const res = await axios.get(`http://localhost:5000/passcenger/${id}`);
      const user = res.data;
      if (user) {
        setpassname(user.name);
        setpassemail(user.email);
        console.log("Fetch Success");
      }
    };
    fetchdata();
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

  const WEBHOOK_URL =
    "https://local.workflow-praveen.xyz/webhook/a60281b7-02f7-4db5-a6c2-2b5552a13cdf";

  // const WEBHOOK_URL =
  //   "https://local.workflow-praveen.xyz/webhook-test/a60281b7-02f7-4db5-a6c2-2b5552a13cdf";

  const handleChatSend = async () => {
    if (!chatInput.trim() && !chatFile) return;

    // 1) Store user input locally (before clearing)
    const userText = chatInput;

    // 2) Add user message to UI
    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText,
      file: chatFile ? chatFile.name : null,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatFile(null);

    // 3) Add "typing..." bot message (optional but nice)
    const typingMsgId = Date.now() + 1;
    const typingMsg = {
      id: typingMsgId,
      sender: "bot",
      text: "Typing...",
    };
    setChatMessages((prev) => [...prev, typingMsg]);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userText,
          sessionId: id,
          username: passname,
          useremail: passemail,
        }),
      });

      const botReplyText = await res.text(); // ✅ IMPORTANT (text response)

      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === typingMsgId ? { ...m, text: botReplyText } : m,
        ),
      );
    } catch (error) {
      // try {
      //   const res = await fetch(WEBHOOK_URL, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       message: userText,
      //       sessionId: id,
      //       username: passname,
      //       useremail: passemail,
      //     }),
      //   });

      //   const data = await res.json(); // ✅ parse JSON
      //   const botReplyText = data.answer || "No response from bot"; // ✅ safe

      //   setChatMessages((prev) =>
      //     prev.map((m) =>
      //       m.id === typingMsgId ? { ...m, text: botReplyText } : m,
      //     ),
      //   );
      // }
      setChatMessages((prev) =>
        prev.map((m) =>
          m.id === typingMsgId
            ? { ...m, text: "❌ Error: Could not connect to chatbot server" }
            : m,
        ),
      );
    }
  };

  // const handleChatKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleChatSend();
  //   }
  // };

  const handleChatKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChatSend();
    }
  };

  const deletewebhook =
    "https://local.workflow-praveen.xyz/webhook/8fe2f1b9-e117-4281-b40f-219a382f58e7";

  const deletepostsql = async () => {
    try {
      const res = await fetch(deletewebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: id,
        }),
      });

      const data = await res.json();
      console.log("✅ Deleted chat memory:", data);
    } catch (error) {
      console.error("❌ Delete error:", error);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      setSearchResult({ error: "❌ Please enter flight number" });
      setShowPopup(true);
      return;
    }

    const found = flighttable.find((f) => f.flight?.toLowerCase() === q);

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult({ error: "❌ Enter valid Flight No" });
    }

    setShowPopup(true);

    // auto close popup after 4 sec
    setTimeout(() => setShowPopup(false), 4000);
  };

  return (
    <>
      <div className="pass-container">
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
                {passname &&
                  passname
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
              </div>
              <div className="profile-info">
                <span className="admin-name">{passname}</span>
              </div>
              <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="dd-name">{passname}</span>
                  <span className="dd-email">{passemail}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <i className="fa-solid fa-key"></i> Change Password
                </button>
                <button
                  className="dropdown-item logout-danger"
                  onClick={logout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="dashboard-content">
          <section className="welcome-section">
            <h1>Welcome, {passname}</h1>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button onClick={handleSearch}>Search</button>
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
                        <span className="pass-shuttle-id-label">
                          Shuttle ID:
                        </span>
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
        onClick={() => {
          toggleChat(); // ✅ toggle only once
        }}
      >
        {isChatOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-message"></i>
        )}
      </div>

      {/* 2. Chat Popup Window */}
      {isChatOpen && (
        <div className="passchat-window">
          {/* Header */}
          <div className="passchat-header">
            <div className="passchat-header-info">
              <span className="passchat-title">Airport Assistant</span>
              <span className="passchat-status">
                <span className="passchat-dot"></span> Online
                <span className="passspan-h">
                  <button
                    className="passchat-reset"
                    onClick={async () => {
                      // ✅ clear DB when opening chat
                      setChatMessages([
                        {
                          id: 1,
                          sender: "bot",
                          text: "Hi 👋 I’m Airport Assistant. You can ask about flights, gates, or shuttle services.",
                        },
                      ]); // ✅ clear frontend messages also
                    }}
                  >
                    Reset
                  </button>
                </span>
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
                className={`passchat-message ${
                  msg.sender === "user" ? "passchat-user" : "passchat-bot"
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
      )}
      {showPopup && (
  <div className="flight-popup">
    <div className="flight-popup-card">
      <button className="flight-popup-close" onClick={() => setShowPopup(false)}>
        ✖
      </button>

      {searchResult?.error ? (
        <p className="flight-popup-error">{searchResult.error}</p>
      ) : (
        <>
          <h4>Flight Details</h4>
          <p><b>Flight No:</b> {searchResult.flight}</p>
          <p><b>Airline:</b> {searchResult.airline}</p>
          <p><b>From:</b> {searchResult.from}</p>
          <p><b>To:</b> {searchResult.to}</p>
          <p><b>Time:</b> {searchResult.time}</p>
          <p><b>Gate:</b> {searchResult.gate}</p>
          <p>
            <b>Status:</b>{" "}
            <span className={`badge ${searchResult.status.toLowerCase().replace(" ", "-")}`}>
              {searchResult.status}
            </span>
          </p>
        </>
      )}
    </div>
  </div>
)}

    </>
      
  );
};

export default PassDash;
