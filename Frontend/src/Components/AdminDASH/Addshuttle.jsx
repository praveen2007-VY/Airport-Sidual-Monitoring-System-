import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Addshuttle.css";
import "./GlobalForms.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Addshuttle = () => {
  const navigate = useNavigate();

  const [shuttleid, setshuid] = useState("");
  const [shutype, setshutype] = useState("Internal");
  const [shurfrom, setshufrom] = useState("");
  const [shuto, setshuto] = useState("");
  const [shupick, setshupick] = useState("");
  const [shud, setshud] = useState("");
  const [shusch, setshusch] = useState("");
  const [shustaff, setshustaff] = useState("");
  const [shustatus, setstatus] = useState("Running");

  const [flightId, setFlightId] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [gateNo, setGateNo] = useState("");

  const handleCancel = () => {
    navigate(-1);
  };
   const WEBHOOK="https://local.workflow-praveen.xyz/webhook-test/ef579df2-ab63-4f50-bebf-e4695d402026";
  const webhook1 = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "INTERNAL"
        }),
  })};

  
  const webhook2 = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "EXTERNAL"
        }),
  })};
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Shuttle Added:", {
      shuttleid,
      shutype,
      shurfrom,
      shuto,
      shupick,
      shud,
      shusch,
      shustaff,
      shustatus,
      flightNo: shutype === "Internal" ? flightNo : null,
      gateNo: shutype === "Internal" ? gateNo : null,
    });
    navigate(-1);
  };

  const [fid, setf] = useState([]);
  const handleinter = async () => {
    // Validation
    if (!shuttleid) {
      toast.error("Shuttle ID is required!");
      return;
    }

    if (shutype === "Internal") {
      if (!flightNo) {
        toast.error("Flight Number is required for Internal Shuttle!")
        return;
      }
      if (!gateNo) {
        toast.error("Gate Number is required for Internal Shuttle!")
        return;
      }
      toast.success("Shuttle Added successfully");
    }

    const data1 = {
      shuttleid,
      flightno: flightNo,
      gate: gateNo,
      type: shutype,
      routefrom: shurfrom,
      routeto: shuto,
      pickup: shupick,
      drop: shud,
      schedule: shusch,
      status: shustatus,
      staff: shustaff,
    };
    const data2 = {
      shuttleid,
      type: shutype,
      routefrom: shurfrom,
      routeto: shuto,
      pickup: shupick,
      drop: shud,
      schedule: shusch,
      status: shustatus,
      staff: shustaff,
    };

    if (shutype === "Internal") {
      try {
        // Save internal shuttle
        await axios.post("http://localhost:5000/internalshuttle", data1);

        // Update flight using MongoDB _id (already in flightNo)
        await axios.put(`http://localhost:5000/flightdetail/fli/${flightId}`, {
          completed: false,
        });
        webhook1();
        toast.success("Internal Shuttle Added successfully");

      } catch (err) {
        console.error(
          "Internal Shuttle Error:",
          err.response?.data || err.message
        );
        return;
      }
    } else {
      const res3 = await axios.post(
        "http://localhost:5000/externalshuttle",
        data2
      );
      webhook2();
      toast.success("External Shuttle Added successfully");
      console.log(res3.data);
    }

    navigate(-1);
  };
 
  const [filid, setfilid] = useState([]);

  const [fetchf, setfetchf] = useState([]);

  useEffect(() => {
    const fetchflight2 = async () => {
      const res = await axios.get("http://localhost:5000/flightdetail");
      setfetchf(res.data);
    };
    fetchflight2();
  }, []);

  useEffect(() => {
    const fil = fetchf.filter(
      (n) => n.completed === true && n.status === "On Time"
    );
    setfilid(fil);
  }, [fetchf]);

  return (
    <div className="add-shuttle-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add Shuttle Bus</h2>
          <p>Register a new internal or external airport shuttle service</p>
        </div>

        <form className="shuttle-form">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>Shuttle ID</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-bus"></i>
                <input
                  type="text"
                  placeholder="e.g. SH-INT-05"
                  value={shuttleid}
                  onChange={(e) => setshuid(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Shuttle Type</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-layer-group"></i>
                <select
                  value={shutype}
                  onChange={(e) => setshutype(e.target.value)}
                >
                  <option value="Internal">Internal (Airport)</option>
                  <option value="External">External (City)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Conditional Flight & Gate Number Row (Only for Internal) */}
          {shutype === "Internal" && (
            <div className="form-row">
              <div className="form-group">
                <label>Flight Number (Internal Only)</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-plane"></i>
                  <select
                    value={flightNo}
                    onChange={(e) => {
                      setFlightNo(e.target.value);

                      const selectedOption = e.target.selectedOptions[0];
                      setFlightId(selectedOption.getAttribute("data-id"));
                    }}
                  >
                    <option value="">Select Flight</option>
                    {filid.map((n) => (
                      <option key={n._id} value={n.flight} data-id={n._id}>
                        {n.flight}
                      </option>
                    ))}
                  </select>

                  {/* <input
                    type="text"
                    placeholder="e.g. AI 202"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value)}
                  /> */}
                </div>
              </div>

              <div className="form-group">
                <label>Gate Number (Internal Only)</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-dungeon"></i>
                  <input
                    type="text"
                    placeholder="e.g. A4"
                    value={gateNo}
                    onChange={(e) => setGateNo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Route From</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-map-pin"></i>
                <input
                  type="text"
                  placeholder="Starting Point"
                  value={shurfrom}
                  onChange={(e) => setshufrom(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Route To</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-location-dot"></i>
                <input
                  type="text"
                  placeholder="Destination"
                  value={shuto}
                  onChange={(e) => setshuto(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Pickup Location</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-street-view"></i>
                <input
                  type="text"
                  placeholder="Exact Pickup Location"
                  value={shupick}
                  onChange={(e) => setshupick(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Drop Location</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-flag-checkered"></i>
                <input
                  type="text"
                  placeholder="Exact Drop Location"
                  value={shud}
                  onChange={(e) => setshud(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row">
            <div className="form-group">
              <label>Schedule / Frequency</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-clock"></i>
                <input
                  type="text"
                  placeholder="e.g. Every 20 mins"
                  value={shusch}
                  onChange={(e) => setshusch(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Assigned Staff / Driver</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-id-card"></i>
                <input
                  type="text"
                  placeholder="Driver Name or Staff ID"
                  value={shustaff}
                  onChange={(e) => setshustaff(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Row 5 */}
          <div className="form-row full-width">
            <div className="form-group">
              <label>Status</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-circle-info"></i>
                <select
                  value={shustatus}
                  onChange={(e) => setstatus(e.target.value)}
                >
                  <option value="Running">Running</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="button" className="btn-submit" onClick={handleinter}>
              <i className="fa-solid fa-plus"></i> Add Shuttle Bus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addshuttle;
