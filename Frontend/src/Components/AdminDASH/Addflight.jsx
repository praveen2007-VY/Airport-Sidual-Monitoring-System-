import React from "react";
import "./Addflight.css";
import { useNavigate } from "react-router-dom";
const Addflight = () => {
    const usenav=useNavigate();
    const handleadmindash=()=>{
        usenav('/adminlog/admin/:id');
    }
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
                            <div className="input-icon">
                                <i className="fa-solid fa-plane"></i>
                                <input type="text" placeholder="e.g. AI 202" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Airline</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-building"></i>
                                <select>
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
                            <div className="input-icon">
                                <i className="fa-solid fa-jet-fighter"></i>
                                <input type="text" placeholder="e.g. A320 Neo" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-circle-info"></i>
                                <select>
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
                            <div className="input-icon">
                                <i className="fa-solid fa-plane-departure"></i>
                                <input type="text" placeholder="Origin City" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>To</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-plane-arrival"></i>
                                <input type="text" placeholder="Destination City" />
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Departure Time</label>
                            <div className="input-icon">
                                <i className="fa-regular fa-clock"></i>
                                <input type="time" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Gate Number</label>
                            <div className="input-icon">
                                <i className="fa-solid fa-dungeon"></i>
                                <input type="text" placeholder="e.g. A2" />
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleadmindash}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-submit">
                            <i className="fa-solid fa-plus"></i> Add Flight
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addflight;
