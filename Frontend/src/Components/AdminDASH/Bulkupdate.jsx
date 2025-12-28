import React, { useState } from "react";
import "./Bulkupdate.css";
import { useParams, useNavigate } from "react-router-dom";

const Bulkupdate = () => {

    const usenav = useNavigate();


    const { id } = useParams();

    const handleadmindash = () => {
        usenav(`/adminlog/admin/${id}`);
    }
    // Sample Data matching the dashboard
    const [flights, setFlights] = useState([
        { id: 1, number: "6E 487", airline: "IndiGo", status: "On Time", gate: "A3", time: "10:30 AM" },
        { id: 2, number: "AI 220", airline: "Air India", status: "Delayed", gate: "B1", time: "11:15 AM" },
        { id: 3, number: "UK 812", airline: "Vistara", status: "On Time", gate: "C2", time: "12:00 PM" },
        { id: 4, number: "QP 134", airline: "Akasa", status: "Cancelled", gate: "-", time: "09:45 AM" },
        { id: 5, number: "6E 302", airline: "IndiGo", status: "On Time", gate: "A1", time: "01:20 PM" },
    ]);

    const [selectedFlights, setSelectedFlights] = useState([]);

    // Toggle Checkbox
    const handleCheckboxChange = (id) => {
        if (selectedFlights.includes(id)) {
            setSelectedFlights(selectedFlights.filter(flightId => flightId !== id));
        } else {
            setSelectedFlights([...selectedFlights, id]);
        }
    };

    const handleSelectAll = () => {
        if (selectedFlights.length === flights.length) {
            setSelectedFlights([]);
        } else {
            setSelectedFlights(flights.map(f => f.id));
        }
    };

    return (
        <div className="bulk-update-container">
            <div className="bulk-card">
                <div className="bulk-header">
                    <div className="header-text">
                        <h2>Bulk Flight Update</h2>
                        <p>Select multiple flights to update status or gate assigned</p>
                    </div>

                    <div className="bulk-controls">
                        <select className="control-select">
                            <option value="">Updated Status</option>
                            <option value="On Time">On Time</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <input type="text" placeholder="Gate" className="control-input" />

                        <button className="btn-apply" disabled={selectedFlights.length === 0}>
                            Apply Updates
                        </button>
                        <button className="btn-reset">
                            Reset
                        </button>
                        <button className="btn-cancel" onClick={handleadmindash}>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="bulk-table-wrapper">
                    <table className="bulk-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col">
                                    <input
                                        type="checkbox"
                                        checked={selectedFlights.length === flights.length && flights.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Flight Number</th>
                                <th>Airline</th>
                                <th>Current Status</th>
                                <th>Gate</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {flights.map((flight) => (
                                <tr key={flight.id} className={selectedFlights.includes(flight.id) ? "selected-row" : ""}>
                                    <td className="checkbox-col">
                                        <input
                                            type="checkbox"
                                            checked={selectedFlights.includes(flight.id)}
                                            onChange={() => handleCheckboxChange(flight.id)}
                                        />
                                    </td>
                                    <td><strong>{flight.number}</strong></td>
                                    <td>{flight.airline}</td>
                                    <td>
                                        <span className={`status-badge ${flight.status.toLowerCase().replace(" ", "-")}`}>
                                            {flight.status}
                                        </span>
                                    </td>
                                    <td>{flight.gate}</td>
                                    <td>{flight.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bulk-footer">
                    <span className="selection-count">
                        {selectedFlights.length} flights selected
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Bulkupdate;
