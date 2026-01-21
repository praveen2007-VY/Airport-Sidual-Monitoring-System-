import React, { useState, useEffect } from "react";
import "./Admindash.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RunwayStatus from "./RunwayStatus";
import { toast } from "react-toastify";
const Admindash = () => {
  const [adminname, setname] = useState("");
  const [adminemail, setemail] = useState("");

  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`${API}/adminpass/${id}`);
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
      const res1 = await axios.get(`${API}/flightdetail`);
      setflighttable(res1.data);
    };
    const fetchinternal = async () => {
      const res2 = await axios.get(`${API}/internalshuttle`);
      setinternal(res2.data);
    };
    const fetchexternal = async () => {
      const res3 = await axios.get(`${API}/externalshuttle`);
      setexternal(res3.data);
    };
    const fetchstaff = async () => {
      const res4 = await axios.get(`${API}/staff`);
      setstaff(res4.data);
    };

    fetchinternal();
    fetchexternal();
    fetchflight();
    fetchstaff();
  }, []);

  const fetchstaff = async () => {
    const res4 = await axios.get(`${API}/staff`);
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

  const handleedit = (sf) => {
    usenav(`/adminlog/admin/flightedit/${id}/${sf}`);
  };

  // const [typee,settypee]=useState("");

  // const handleinter = (ii) => {
  //   usenav(`/adminlog/admin/updateshuttle/${typee}/${ii}`);
  // };

  // const handleexter = (ii)=>{
  //   usenav(`/adminlog/admin/updateshuttle/${typee}/${ii}`);
  // }

  const goadminlogin = () => {
    toast.success("Logout Successful")
    usenav(`/adminlog`);
  };

  const goadminforget = () => {
    usenav(`/adminforget/request`);
  };

  const handlestaffedit = async (id, currentAccess) => {
    try {
      const data = {
        access: currentAccess === "Allowed" ? "Denied" : "Allowed",
        action: currentAccess === "Allowed" ? "Allow" : "Deny",
      };

      const res = await axios.put(`${API}/staff/${id}`, data);

      fetchstaff(); 
      console.log("Updated successfully", res.data);
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="admin-container">
      <header className="topbar">
        <div className="brand1">
          <h2>
            <i className="fa-solid fa-plane-departure"></i> Admin Dashboard
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
              <button className="dropdown-item" onClick={goadminforget}>
                <i className="fa-solid fa-key"></i> Change Password
              </button>
              <button
                className="dropdown-item logout-danger"
                onClick={goadminlogin}
              >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="welcome-section">
          <h1>Welcome, {adminname}</h1>
          <p>
            Monitor flights, manage runways, and control airport operations in
            real time.
          </p>
        </section>
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
              <button className="btn outline  refresh-btn" >
                <i className="fa-solid fa-rotate"></i> Refresh
              </button>
            </div>
          </div>
        </section>
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
              </tbody>
            </table>
          </div>
        </section>
        <section className="table-section shuttle-section">
          <div className="section-header shuttle-header">
            <div>
              <h3>Airport Shuttle Management</h3>
              <p>Manage internal and external airport shuttle services</p>
            </div>
            <button
              className="btn primary"
              onClick={() => usenav(`/adminlog/admin/addshuttle/${id}`)}
            >
              <i className="fa-solid fa-plus"></i> Add Shuttle Bus
            </button>
          </div>
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
                      <td>
                        <span
                          className={`badge ${(n.status || "unknown")
                            .toLowerCase()
                            .replace(" ", "-")}`}
                        >
                          {n.status || "Unknown"}
                        </span>
                      </td>
                      <td>{n.staff}</td>
                      <td>
                        <button
                          className="table-btn"
                          onClick={() =>
                            usenav(
                              `/adminlog/admin/updateshuttle/Internal/${n._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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
                        <button
                          className="table-btn"
                          onClick={() =>
                            usenav(
                              `/adminlog/admin/updateshuttle/External/${n._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="staff-section">
          <div className="section-header shuttle-header">
            <div>
              <h3>Staff Management</h3>
              <p>Manage staff access and permissions</p>
            </div>
            <button
              className="btn primary"
              onClick={() => usenav(`/adminlog/admin/staffreg`)}
            >
              <i className="fa-solid fa-user-plus"></i> Assign Staff
            </button>
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
                {staff.map((n, i) => (
                  <tr key={i}>
                    <td>{n.staffid}</td>
                    <td>{n.name}</td>
                    <td>{n.role}</td>
                    <td>{n.dept}</td>
                    <td>{n.shift}</td>
                    <td>
                      <span
                        className={`badge ${n.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {n.status}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${n.access
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {n.access}
                      </span>
                    </td>
                    <td>
                      {/* <button className={`btn-${n.action.toLowerCase().replace(" ", "-")}`} onClick={()=>(
                                  handlestaffedit(n._id,n.action))} >{n.action}</button> */}
                      <button
                        className={`btn-${n.action.toLowerCase()}`}
                        onClick={() => handlestaffedit(n._id, n.access)}
                      >
                        {n.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <RunwayStatus />
      </main>
    </div>
  );
};

export default Admindash;
