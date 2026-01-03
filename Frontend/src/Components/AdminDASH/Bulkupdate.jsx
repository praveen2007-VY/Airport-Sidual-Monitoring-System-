import React, { useState, useEffect } from "react";
import "./Bulkupdate.css";
import { useParams, useNavigate } from "react-router-dom";
import FlightData from "./Flight.json";
import InternalData from "./internal.json";
import ExternalData from "./external.json";

const Bulkupdate = () => {
    const usenav = useNavigate();
    const { id } = useParams();

    const handleadmindash = () => {
        usenav(`/adminlog/admin/${id}`);
    }

    // Initialize Data
    const [flights, setFlights] = useState(FlightData);
    const [shuttles, setShuttles] = useState([...InternalData, ...ExternalData]);

    // Selection States
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [selectedShuttles, setSelectedShuttles] = useState([]);

    // --- Flight Selection Logic ---
    const handleCheckboxFlight = (flightId) => {
        if (selectedFlights.includes(flightId)) {
            setSelectedFlights(selectedFlights.filter(id => id !== flightId));
        } else {
            setSelectedFlights([...selectedFlights, flightId]);
        }
    };

    const handleSelectAllFlights = () => {
        if (selectedFlights.length === flights.length && flights.length > 0) {
            setSelectedFlights([]);
        } else {
            setSelectedFlights(flights.map(f => f.flight)); // Using 'flight' as unique ID based on JSON
        }
    };

    // --- Shuttle Selection Logic ---
    const handleCheckboxShuttle = (shuttleId) => {
        if (selectedShuttles.includes(shuttleId)) {
            setSelectedShuttles(selectedShuttles.filter(id => id !== shuttleId));
        } else {
            setSelectedShuttles([...selectedShuttles, shuttleId]);
        }
    };

    const handleSelectAllShuttles = () => {
        if (selectedShuttles.length === shuttles.length && shuttles.length > 0) {
            setSelectedShuttles([]);
        } else {
            setSelectedShuttles(shuttles.map(s => s.shuttleid));
        }
    };

    // --- Actions ---
    const handleReset = () => {
        setSelectedFlights([]);
        setSelectedShuttles([]);
    };

    const handleDelete = () => {
        const totalSelected = selectedFlights.length + selectedShuttles.length;
        if (totalSelected === 0) return;

        if (window.confirm(`Are you sure you want to delete ${totalSelected} items? This action cannot be undone.`)) {
            // Remove flights
            const newFlights = flights.filter(f => !selectedFlights.includes(f.flight));
            setFlights(newFlights);

            // Remove shuttles
            const newShuttles = shuttles.filter(s => !selectedShuttles.includes(s.shuttleid));
            setShuttles(newShuttles);

            // Clear selection
            handleReset();

            // In a real app, API calls would happen here
            console.log("Deleted Flights:", selectedFlights);
            console.log("Deleted Shuttles:", selectedShuttles);
        }
    };

    const totalSelectedCount = selectedFlights.length + selectedShuttles.length;

    return (
        <div className="bulk-update-container">
            <div className="bulk-card">

                {/* Header */}
                <div className="bulk-header">
                    <div className="header-text">
                        <h2>Bulk Management</h2>
                        <p>Delete flights or shuttle buses in bulk</p>
                        <span className="warning-text">Deleted items cannot be recovered</span>
                    </div>

                    <div className="bulk-controls">
                        <button
                            className="btn-delete"
                            disabled={totalSelectedCount === 0}
                            onClick={handleDelete}
                        >
                            Delete Selected
                        </button>
                        <button
                            className="btn-reset"
                            onClick={handleReset}
                            disabled={totalSelectedCount === 0}
                        >
                            Reset Selection
                        </button>
                        <button className="btn-cancel" onClick={handleadmindash}>
                            Cancel
                        </button>
                    </div>
                </div>

                <div className="bulk-content-scroll">
                    {/* Flights Section */}
                    <div className="section-container">
                        <h3 className="section-title">Flights</h3>
                        <div className="bulk-table-wrapper">
                            <table className="bulk-table">
                                <thead>
                                    <tr>
                                        <th className="checkbox-col">
                                            <input
                                                type="checkbox"
                                                checked={selectedFlights.length === flights.length && flights.length > 0}
                                                onChange={handleSelectAllFlights}
                                            />
                                        </th>
                                        <th>Flight Number</th>
                                        <th>Airline</th>
                                        <th>Status</th>
                                        <th>Gate</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {flights.length > 0 ? flights.map((flight, index) => (
                                        <tr key={index} className={selectedFlights.includes(flight.flight) ? "selected-row" : ""}>
                                            <td className="checkbox-col">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFlights.includes(flight.flight)}
                                                    onChange={() => handleCheckboxFlight(flight.flight)}
                                                />
                                            </td>
                                            <td><strong>{flight.flight}</strong></td>
                                            <td>{flight.airline}</td>
                                            <td>
                                                <span className={`status-badge ${flight.status.toLowerCase().replace(" ", "-")}`}>
                                                    {flight.status}
                                                </span>
                                            </td>
                                            <td>{flight.gate}</td>
                                            <td>{flight.time}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colspan="6" className="empty-state">No flights available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Shuttles Section */}
                    <div className="section-container">
                        <h3 className="section-title">Shuttle Buses</h3>
                        <div className="bulk-table-wrapper">
                            <table className="bulk-table">
                                <thead>
                                    <tr>
                                        <th className="checkbox-col">
                                            <input
                                                type="checkbox"
                                                checked={selectedShuttles.length === shuttles.length && shuttles.length > 0}
                                                onChange={handleSelectAllShuttles}
                                            />
                                        </th>
                                        <th>Shuttle ID</th>
                                        <th>Type</th>
                                        <th>Route</th>
                                        <th>Status</th>
                                        <th>Assigned Staff</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {shuttles.length > 0 ? shuttles.map((shuttle, index) => (
                                        <tr key={index} className={selectedShuttles.includes(shuttle.shuttleid) ? "selected-row" : ""}>
                                            <td className="checkbox-col">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedShuttles.includes(shuttle.shuttleid)}
                                                    onChange={() => handleCheckboxShuttle(shuttle.shuttleid)}
                                                />
                                            </td>
                                            <td><strong>{shuttle.shuttleid}</strong></td>
                                            <td>
                                                <span className={`type-badge ${shuttle.type.toLowerCase()}`}>
                                                    {shuttle.type}
                                                </span>
                                            </td>
                                            <td>{shuttle.routefrom} → {shuttle.routeto}</td>
                                            <td>
                                                <span className={`status-badge ${shuttle.status.toLowerCase().replace(" ", "-")}`}>
                                                    {shuttle.status}
                                                </span>
                                            </td>
                                            <td>{shuttle.staff}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colspan="6" className="empty-state">No shuttles available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bulk-footer">
                    <span className="selection-count">
                        {totalSelectedCount} items selected
                    </span>
                    <div className="bulk-controls">
                        <button
                            className="btn-delete"
                            disabled={totalSelectedCount === 0}
                            onClick={handleDelete}
                        >
                            Delete Selected
                        </button>
                        <button
                            className="btn-reset"
                            onClick={handleReset}
                            disabled={totalSelectedCount === 0}
                        >
                            Reset Selection
                        </button>
                        <button className="btn-cancel" onClick={handleadmindash}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bulkupdate;
