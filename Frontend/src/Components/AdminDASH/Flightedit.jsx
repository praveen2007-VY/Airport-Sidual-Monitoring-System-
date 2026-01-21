import React, { useEffect, useState } from "react";
import "./Flightedit.css";
import "./GlobalForms.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Flightedit = () => {
  const { id, sf } = useParams();
  const API = import.meta.env.VITE_API_URL;
  const usenav = useNavigate();

  const returnadmin = () => {
    usenav(`/adminlog/admin/${id}`);
  };

  const [flightno, setfno] = useState("");
  const [airline, setAirline] = useState("");
  const [aircraft, setAircraft] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [time, setTime] = useState("");
  const [gate, setGate] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get(`${API}/flightdetail/${sf}`);
      console.log(res.data);
      setfno(res.data.flight);
      setAirline(res.data.airline);
      setAircraft(res.data.aircraft);
      setFrom(res.data.from);
      setTo(res.data.to);
      setStatus(res.data.status);
      setGate(res.data.gate);
    };
    fetchdata();
  }, [sf]);


  const handleupdate = async () => {
    const res = await axios.put(`${API}/adminpass/updatedetail/${sf}`,
      {
        flight: flightno,
        airline,
        aircraft,
        from,
        to,
        status,
        time,
        gate,
      }
    );
    webhook();
    console.log(res.data);
    usenav(`/adminlog/admin/${id}`);
  };
  
  const WEBHOOK="https://local.workflow-praveen.xyz/webhook-test/ef579df2-ab63-4f50-bebf-e4695d402026";
  const webhook = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "FLIGHT"
        }),
  })};

  return (
    <div className="edit-flight-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Edit Flight</h2>
          <p>Update flight details and operational status</p>
        </div>

        <form className="flight-form">
          <div className="form-row">
            <div className="form-group">
              <label>Flight Number</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-plane"></i>
                <input
                  type="text"
                  value={flightno}
                  disabled
                  className="disabled-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Airline</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-building"></i>
                <select
                  value={airline}
                  onChange={(e) => setAirline(e.target.value)}
                >
                  <option value="">Select Airline</option>
                  <option value="IndiGo">IndiGo</option>
                  <option value="Air India">Air India</option>
                  <option value="Vistara">Vistara</option>
                  <option value="Akasa">Akasa</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Aircraft Type</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-jet-fighter"></i>
                <input
                  type="text"
                  placeholder="e.g. A320 Neo"
                  value={aircraft}
                  onChange={(e) => setAircraft(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-circle-info"></i>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="On Time">On Time</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>From</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-plane-departure"></i>
                <input
                  type="text"
                  placeholder="Origin City"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>To</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-plane-arrival"></i>
                <input
                  type="text"
                  placeholder="Destination City"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departure Time</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-clock"></i>
                <input
                  type="time"
                  value={time}
                  disabled={status === "Cancelled"}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gate Number</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-dungeon"></i>
                <input
                  type="text"
                  placeholder={
                    status === "Cancelled" ? "Not applicable" : "e.g. A2"
                  }
                  value={gate}
                  disabled={status === "Cancelled"}
                  onChange={(e) => setGate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={returnadmin}>
              Cancel
            </button>
            <button
              type="button"
              className="btn-update"
              onClick={() => (handleupdate())}>
              <i className="fa-solid fa-check"></i> Update Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Flightedit;
