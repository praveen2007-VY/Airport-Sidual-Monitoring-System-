import React, { useState, useEffect } from "react";
import "./Admindash.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Admindash = () => {
  const [adminname, setname] = useState("");
  const [adminemail, setemail] = useState("");

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

    fetchinternal();
    fetchexternal();
    fetchflight();
  }, []);

  const usenav = useNavigate();

  const handleaddflght = () => {
    usenav(`/adminlog/admin/${id}/addflight`);
  };

  const handlebulkflight = (ids) => {
    usenav(`/adminlog/admin/${ids}/bulkflight`);
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

  const handleedit = (sf) => {
    usenav(`/adminlog/admin/flightedit/${id}/${sf}`);
  };
      
  const goshuedit = ()=>{
    usenav(`/adminlog/admin/${id}/updateshuttle`);
  }
  const [showModal, setShowModal] = useState(false);
  const [selectedRunway, setSelectedRunway] = useState(null);
  const [runways, setRunways] = useState([
    { id: 4, name: "Runway 02R", status: "Maintenance" },
  ]);

  return (
    <div className="admin-container">
      {/* Top Navigation */}
      <header className="topbar">
        <div className="brand1">
          <h2>
            <i className="fa-solid fa-plane-departure"></i> Admin Dashboard
          </h2>
        </div>

        {/* Profile Section */}
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

            {/* Dropdown Menu */}
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

      {/* Main Content */}
      <main className="dashboard-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <h1>Welcome, Admin</h1>
          <p>
            Monitor flights, manage runways, and control airport operations in
            real time.
          </p>
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

        {/* Flight Actions */}
        <section className="actions-section">
          <div className="action-card">
            <div className="action-text">
              <h3>Flight Actions</h3>
              <p>Manage and control flight operations efficiently.</p>
            </div>
            <div className="action-buttons">
              <button className="btn primary" onClick={handleaddflght}>
                <i className="fa-solid fa-plus"></i> Add Flight
              </button>
              <button className="btn secondary" onClick={handlebulkflight}>
                <i className="fa-solid fa-pen-to-square"></i> Bulk Update
              </button>
              <button className="btn outline">
                <i className="fa-solid fa-rotate"></i> Refresh
              </button>
            </div>
          </div>
        </section>

        {/* Flight Status Table */}
        <section className="table-section">
          <div className="section-header">
            <h3>Flight Status Overview</h3>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Flight</th>
                  <th>Airline</th>
                  <th>Aircraft</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Gate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flighttable.map((n, i) => (
                  <tr key={i}>
                    <td>{n.flight}</td>
                    <td>{n.airline}</td>
                    <td>{n.aircraft}</td>
                    <td>{n.from}</td>
                    <td>{n.to}</td>
                    <td>
                      <span
                        className={`badge on-time ${n.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td>{n.time}</td>
                    <td>{n.gate}</td>
                    <td>
                      <button
                        className="table-btn"
                        onClick={() => handleedit(n._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Placeholder for more rows to show scrolling if needed */}
              </tbody>
            </table>
          </div>
        </section>

        {/* Airport Shuttle Management Section */}
        <section className="table-section shuttle-section">
          <div className="section-header shuttle-header">
            <div>
              <h3>Airport Shuttle Management</h3>
              <p>Manage internal and external airport shuttle services</p>
            </div>
            <button
              className="btn primary"
              onClick={() => usenav("/adminlog/admin/addshuttle")}
            >
              <i className="fa-solid fa-plus"></i> Add Shuttle Bus
            </button>
          </div>

          {/* Internal Shuttles Subsection */}
          <div className="shuttle-subsection">
            <h4 className="subsection-title">
              <i className="fa-solid fa-bus"></i> Internal Airport Shuttle Buses
            </h4>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Shuttle ID</th>
                    <th>Flight No.</th>
                    <th>Type</th>
                    <th>Route</th>
                    <th>Pickup</th>
                    <th>Drop</th>
                    <th>Schedule</th>
                    <th>Status</th>
                    <th>Staff</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {internal.map((n, i) => (
                    <tr key={i}>
                      <td>{n.shuttleid}</td>
                      <td>{n.flightno}</td>
                      <td>{n.type}</td>
                      <td>
                        {n.routefrom} To {n.routeto}
                      </td>
                      <td>{n.pickup}</td>
                      <td>{n.drop}</td>
                      <td>{n.schedule}</td>
                     <td><span className={`badge ${(n.status || "unknown").toLowerCase().replace(" ", "-")}`}>{n.status || "Unknown"}</span></td>
                      <td>{n.staff}</td>
                      <td>
                        <button className="table-btn" onClick={()=>goshuedit(n._id)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* External Shuttles Subsection */}
          <div className="shuttle-subsection">
            <h4 className="subsection-title">
              <i className="fa-solid fa-city"></i> External Airport Shuttle
              Buses
            </h4>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Shuttle ID</th>
                    <th>Type</th>
                    <th>Route</th>
                    <th>Pickup</th>
                    <th>Drop</th>
                    <th>Schedule</th>
                    <th>Status</th>
                    <th>Driver</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {external.map((n, i) => (
                    <tr key={i}>
                      <td>{n.shuttleid}</td>
                      <td>{n.type}</td>
                      <td>{`${n.routefrom} <-> ${n.routeto} `}</td>
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
                      <td>
                        <button className="table-btn">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Staff Management Section */}
        <section className="staff-section">
          <div className="section-header">
            <h3>Staff Management</h3>
            <p>Manage staff access and permissions</p>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Staff ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Access</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>STF001</td>
                  <td>Arjun Kumar</td>
                  <td>Gate Manager</td>
                  <td>Operations</td>
                  <td>Morning</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                  <td>
                    <span className="badge allowed">Allowed</span>
                  </td>
                  <td>
                    <button className="btn-deny">Deny</button>
                  </td>
                </tr>
                <tr>
                  <td>STF002</td>
                  <td>Priya Sharma</td>
                  <td>Flight Coordinator</td>
                  <td>Control Room</td>
                  <td>Evening</td>
                  <td>
                    <span className="badge active">Active</span>
                  </td>
                  <td>
                    <span className="badge denied">Denied</span>
                  </td>
                  <td>
                    <button className="btn-allow">Allow</button>
                  </td>
                </tr>
                <tr>
                  <td>STF003</td>
                  <td>Rahul Mehta</td>
                  <td>Ground Staff</td>
                  <td>Runway</td>
                  <td>Night</td>
                  <td>
                    <span className="badge inactive">Inactive</span>
                  </td>
                  <td>
                    <span className="badge denied">Denied</span>
                  </td>
                  <td>
                    <button className="btn-allow">Allow</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Runway Status Section */}
        {/* Runway Status Section */}
        <section className="runway-section">
          <div className="section-header">
            <h3>Runway Status</h3>
          </div>
          <div className="runway-grid">
            {runways.map((runway) => (
              <div
                key={runway.id}
                className={`runway-card ${
                  runway.status.toLowerCase().replace(" ", "-") === "in-use"
                    ? "active"
                    : runway.status.toLowerCase()
                }`}
              >
                <div className="runway-info">
                  <h4>{runway.name}</h4>
                  <span className="status-indicator">{runway.status}</span>
                </div>
                <button
                  className="edit-runway-btn"
                  onClick={() => {
                    setSelectedRunway(runway);
                    setShowModal(true);
                  }}
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Runway Edit Modal */}
        {showModal && selectedRunway && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Edit Runway Status</h3>
                <button
                  className="close-modal"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Runway:</strong> {selectedRunway.name}
                </p>
                <div className="form-group">
                  <label>Current Status</label>
                  <select
                    value={selectedRunway.status}
                    onChange={(e) => {
                      const updatedRunways = runways.map((r) =>
                        r.id === selectedRunway.id
                          ? { ...r, status: e.target.value }
                          : r
                      );
                      setRunways(updatedRunways);
                      setSelectedRunway({
                        ...selectedRunway,
                        status: e.target.value,
                      });
                    }}
                  >
                    <option value="In Use">In Use</option>
                    <option value="Available">Available</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn outline"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn primary"
                  onClick={() => setShowModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admindash;
