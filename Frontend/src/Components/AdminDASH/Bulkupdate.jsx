import React, { useState, useEffect } from "react";
import "./Bulkupdate.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Bulkupdate = () => {
  const usenav = useNavigate();
  const { id } = useParams();

  const handleadmindash = () => {
    usenav(-1);
  };

  
  const [flights, setFlights] = useState([]);
  const [shuttles, setShuttles] = useState([]);


  const [selectedFlights, setSelectedFlights] = useState([]);
  const [selectedShuttles, setSelectedShuttles] = useState([]);
  const WEBHOOK="https://local.workflow-praveen.xyz/webhook-test/ef579df2-ab63-4f50-bebf-e4695d402026";
  const webhook = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "DELETE"
        }),
  })};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [flightRes, internalRes, externalRes] = await Promise.all([
          axios.get("http://localhost:5000/flightdetail"),
          axios.get("http://localhost:5000/internalshuttle"),
          axios.get("http://localhost:5000/externalshuttle")
        ]);

        setFlights(flightRes.data);

       
        const internal = internalRes.data.map(item => ({ ...item, shuttleType: "internal", type: "Internal" }));
        const external = externalRes.data.map(item => ({ ...item, shuttleType: "external", type: "External" }));
        setShuttles([...internal, ...external]);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
      setSelectedFlights(flights.map(f => f._id));
    }
  };

 
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
      setSelectedShuttles(shuttles.map(s => s._id));
    }
  };

 
  const handleReset = () => {
    setSelectedFlights([]);
    setSelectedShuttles([]);
  };

  const handleDelete = async () => {
    const totalSelected = selectedFlights.length + selectedShuttles.length;
    if (totalSelected === 0) return;

    try {
      const deletePromises = [];

      
      selectedFlights.forEach(flightId => {
        deletePromises.push(axios.delete(`http://localhost:5000/flightdetail/${flightId}`));
      });

    
      selectedShuttles.forEach(shuttleId => {
        const shuttle = shuttles.find(s => s._id === shuttleId);
        if (shuttle) {
          const endpoint = shuttle.shuttleType === "internal" ? "internalshuttle" : "externalshuttle";
          deletePromises.push(axios.delete(`http://localhost:5000/${endpoint}/${shuttleId}`));
        }
      });

    
      await Promise.all(deletePromises);

      -
      setFlights(prev => prev.filter(f => !selectedFlights.includes(f._id)));
      setShuttles(prev => prev.filter(s => !selectedShuttles.includes(s._id)));

      handleReset();
       webhook(); 
      toast.success("Selected items deleted successfully")
      

    } catch (error) {
      console.error("Error deleting items:", error);
      toast.error("An error occurred while deleting items. Some items may not have been deleted.")
    }
  };

  const totalSelectedCount = selectedFlights.length + selectedShuttles.length;

  return (
    <div className="bulk-update-container">
      <div className="bulk-card">
        <div className="bulk-header">
          <div className="header-text">
            <h2>Bulk Management</h2>
            <p>Delete flights or shuttle buses in bulk</p>
            <span className="warning-text">
              Deleted items cannot be recovered
            </span>
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
          <div className="section-container">
            <h3 className="section-title">Flights</h3>
            <div className="bulk-table-wrapper">
              <table className="bulk-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={flights.length > 0 && selectedFlights.length === flights.length}
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
                  {flights.length > 0 ? (
                    flights.map((flight) => (
                      <tr
                        key={flight._id}
                        className={
                          selectedFlights.includes(flight._id)
                            ? "selected-row"
                            : ""
                        }
                      >
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedFlights.includes(flight._id)}
                            onChange={() => handleCheckboxFlight(flight._id)}
                          />
                        </td>
                        <td>
                          <strong>{flight.flight}</strong>
                        </td>
                        <td>{flight.airline}</td>
                        <td>
                          <span
                            className={`status-badge ${flight.status
                              ? flight.status.toLowerCase().replace(" ", "-")
                              : ""}`}
                          >
                            {flight.status}
                          </span>
                        </td>
                        <td>{flight.gate}</td>
                        <td>{flight.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No flights available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="section-container">
            <h3 className="section-title">Shuttle Buses</h3>
            <div className="bulk-table-wrapper">
              <table className="bulk-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={shuttles.length > 0 && selectedShuttles.length === shuttles.length}
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
                  {shuttles.length > 0 ? (
                    shuttles.map((shuttle) => (
                      <tr
                        key={shuttle._id}
                        className={
                          selectedShuttles.includes(shuttle._id)
                            ? "selected-row"
                            : ""
                        }
                      >
                        <td className="checkbox-col">
                          <input
                            type="checkbox"
                            checked={selectedShuttles.includes(shuttle._id)}
                            onChange={() => handleCheckboxShuttle(shuttle._id)}
                          />
                        </td>
                        <td>
                          <strong>{shuttle.shuttleid}</strong>
                        </td>
                        <td>
                          <span
                            className={`type-badge ${shuttle.type.toLowerCase()}`}
                          >
                            {shuttle.type}
                          </span>
                        </td>
                        <td>
                          {shuttle.routefrom} → {shuttle.routeto}
                        </td>
                        <td>
                          <span
                            className={`status-badge ${shuttle.status
                              ? shuttle.status.toLowerCase().replace(" ", "-")
                              : ""}`}
                          >
                            {shuttle.status}
                          </span>
                        </td>
                        <td>{shuttle.staff}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        No shuttles available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
