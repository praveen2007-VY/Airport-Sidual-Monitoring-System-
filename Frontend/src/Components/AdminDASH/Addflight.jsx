import React, { useState } from "react";
import "./Addflight.css";
import "./GlobalForms.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Addflight = () => {
  const usenav = useNavigate();

  const { id } = useParams();

  const handleadmindash = () => {
    usenav(`/adminlog/admin/${id}`);
  };

  const [flightno, setfno] = useState("");
  const [airline, setair] = useState("");
  const [aircraft, setairc] = useState("");
  const [from, setfrom] = useState("");
  const [status, setstatus] = useState("On Time");
  const [time, settime] = useState("");
  const [gate, setgate] = useState("");
  const [des, setdes] = useState("");

 

  const addflight = async () => {
    let details = {
      flight: flightno,
      airline: airline,
      aircraft: aircraft,
      from: from,
      to: des,
      status: status,
      time: time,
      gate: gate,
      des: des,
    };

    if (
      flightno === "" ||
      airline === "" ||
      aircraft === "" ||
      from === "" ||
      des === "" ||
      status === "" ||
      time === "" ||
      gate === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = await axios.post(
      "http://localhost:5000/flightdetail/add",
      details,
    );
    const newFlightId = res.data._id; 
    setnewf(newFlightId);
    setair("");
    setairc("");
    setfno("");
    setfrom("");
    setstatus("");
    settime("");
    setgate("");
    setdes("");
    handleadmindash();
    webhook();
    toast.success("Flight added successfully");
  };
  
  
  const WEBHOOK="https://local.workflow-praveen.xyz/webhook/ef579df2-ab63-4f50-bebf-e4695d402026";
  const webhook = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "FLIGHT",
        }),
  })

};

  return (
    <div className="add-flight-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Flight</h2>
          <p>Enter flight details to schedule a new operation</p>
        </div>

        <form className="flight-form">
          <div className="form-row">
            <div className="form-group">
              <label>Flight Number</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-plane"></i>
                <input
                  type="text"
                  placeholder="e.g. AI 202"
                  onChange={(e) => setfno(e.target.value)}
                  value={flightno}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Airline</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-building"></i>
                <select
                  onChange={(e) => setair(e.target.value)}
                  value={airline}
                >
                  <option value="">Select Airline</option>
                  <option value="Indigo">IndiGo</option>
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
                  onChange={(e) => setairc(e.target.value)}
                  value={aircraft}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-circle-info"></i>
                <select
                  onChange={(e) => setstatus(e.target.value)}
                  value={status}
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
                  onChange={(e) => setfrom(e.target.value)}
                  value={from}
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
                  onChange={(e) => setdes(e.target.value)}
                  value={des}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Departure Time</label>
              <div className="input-wrapper">
                <input
                  type="time"
                  onChange={(e) => settime(e.target.value)}
                  value={time}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Gate Number</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-dungeon"></i>
                <input
                  type="text"
                  placeholder="e.g. A2"
                  onChange={(e) => setgate(e.target.value)}
                  value={gate}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleadmindash}
            >
              Cancel
            </button>
            <button type="button" className="btn-submit" onClick={addflight}>
              <i className="fa-solid fa-plus"></i> Add Flight
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addflight;
