import React, { useEffect, useState } from "react";
import "./Shuttleedit.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const Shuttleedit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    // Mock initial state to simulate pre-filled data
    const [shuttleId, setShuttleId] = useState("SH-INT-05");
    const [shuttleType, setShuttleType] = useState("");
    const [flightNo, setFlightNo] = useState("");
    const [gateNo, setGateNo] = useState("");
    const [routeFrom, setRouteFrom] = useState("");
    const [routeTo, setRouteTo] = useState("");
    const [pickup, setPickup] = useState("");
    const [drop, setDrop] = useState("");
    const [schedule, setSchedule] = useState("");
    const [staff, setStaff] = useState("");
    const [status, setStatus] = useState("");

    

    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(()=>{
        const fetchdata = async()=>{
            const res = await axios.get("http://localhost:5000/internalshuttle");
            console.log(res.data);
            const user = res.data.find((n)=>n.shuttleid == id);
            setShuttleId(user.data.shuttleid);
            setShuttleType(user.data.type);
            setFlightNo(user.data.flightno);
            setGateNo(user.data.gate);
            setRouteFrom(user.data.routefrom);
            setRouteTo(user.data.routeto);
            setPickup(user.data.pickup);
            setDrop(user.data.drop);
            setSchedule(user.data.schedule);
            setStaff(user.data.staff);
            setStatus(user.data.status)

        };
        fetchdata();
    },[id])

    return (
        <div className="edit-shuttle-container">
            <div className="form-card">
                <div className="form-header">
                    <h2>Edit Shuttle Bus</h2>
                    <p>Update internal or external airport shuttle service details</p>
                </div>

                <form className="shuttle-form" >
                    {/* Row 1: ID and Type */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Shuttle ID</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-bus"></i>
                                <input
                                    type="text"
                                    value={shuttleId}
                                    disabled
                                    className="disabled-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Shuttle Type</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-layer-group"></i>
                                <select
                                    value={shuttleType}
                                    disabled
                                    className="disabled-input"
                                    onChange={(e) => setShuttleType(e.target.value)}>
                                    <option value="Internal">Internal (Airport)</option>
                                    <option value="External">External (City)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Flight & Gate (Internal Only) */}
                    {shuttleType === "Internal" && (
                        <div className="form-row">
                            <div className="form-group">
                                <label>Flight Number</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-plane"></i>
                                    <select
                                        value={flightNo}
                                        onChange={(e) => setFlightNo(e.target.value)}
                                    >
                                        <option value="">Select Flight</option>
                                        {flightOptions.map((f, index) => (
                                            <option key={index} value={f}>
                                                {f}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Gate Number</label>
                                <div className="input-icon">
                                    <i className="fa-solid fa-dungeon"></i>
                                    <input
                                        type="text"
                                        value={gateNo}
                                        onChange={(e) => setGateNo(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Row 3: Route */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Route From</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-map-pin"></i>
                                <input
                                    type="text"
                                    value={routeFrom}
                                    onChange={(e) => setRouteFrom(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Route To</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-location-dot"></i>
                                <input
                                    type="text"
                                    value={routeTo}
                                    onChange={(e) => setRouteTo(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 4: Pickup & Drop */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Pickup Location</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-street-view"></i>
                                <input
                                    type="text"
                                    value={pickup}
                                    onChange={(e) => setPickup(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Drop Location</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-flag-checkered"></i>
                                <input
                                    type="text"
                                    value={drop}
                                    onChange={(e) => setDrop(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 5: Schedule & Staff */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Schedule / Frequency</label>
                            <div className="input-icon">
                                <i className="fa-regular fa-clock"></i>
                                <input
                                    type="text"
                                    value={schedule}
                                    onChange={(e) => setSchedule(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Assigned Staff / Driver</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-id-card"></i>
                                <input
                                    type="text"
                                    value={staff}
                                    onChange={(e) => setStaff(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Row 6: Status */}
                    <div className="form-row full-width">
                        <div className="form-group">
                            <label>Status</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-circle-info"></i>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Running">Running</option>
                                    <option value="Delayed">Delayed</option>
                                    <option value="Maintenance">Maintenance</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="button" className="btn-submit">
                            <i className="fa-solid fa-check"></i> Update Shuttle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Shuttleedit;
