import React, { useState, useEffect } from "react";
import "./RunwayStatus.css";
import RunwayEditModal from "./RunwayEditModal";

const RunwayStatus = () => {
    const [runways, setRunways] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRunway, setSelectedRunway] = useState(null);
    const API = import.meta.env.VITE_API_URL;
    const fetchRunways = async () => {
        try {
            const response = await fetch(`${API}/runwaystatus`);
            if (!response.ok) {
                throw new Error("Failed to fetch runway status");
            }
            const data = await response.json();
            setRunways(data);
        } catch (error) {
            console.error("Error fetching runways:", error);
        }
    };

    useEffect(() => {
        fetchRunways();
    }, []);

    const handleEditClick = (runway) => {
        setSelectedRunway(runway);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRunway(null);
    };

    const handleSaveStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`${API}/runwaystatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) {
                throw new Error("Failed to update status");
            }


            await fetchRunways();

        } catch (error) {
            console.error("Error updating status:", error);
            throw error; 
        }
    };

    return (
        <div className="runway-container">
            {runways.map((runway) => {
                let statusClass = "runway-status--available"; 
                let cardClass = "runway-card--available"; 

                if (runway.status === "In Use") {
                    statusClass = "runway-status--in-use";
                    cardClass = "runway-card--in-use";
                }
                if (runway.status === "Maintenance") {
                    statusClass = "runway-status--maintenance";
                    cardClass = "runway-card--maintenance";
                }

                return (
                    <div className={`runway-card ${cardClass}`} key={runway._id}>
                        <div className="runway-card__header">
                            <span className="runway-card__title">{runway.gate}</span>
                            <span className={`runway-status ${statusClass}`}>{runway.status}</span>
                        </div>

                        <div className="runway-card__body">
                            <h2 className="runway-card__id">{runway.runwayCode}</h2>
                            <span className="runway-card__sublabel">Operational Status</span>
                        </div>

                        <div className="runway-card__footer">
                            <span className="runway-card__updated">Live Updates</span>
                            <button
                                className="runway-card__edit-btn"
                                onClick={() => handleEditClick(runway)}
                            >
                                <span className="edit-icon">✎</span> Edit
                            </button>
                        </div>
                    </div>
                );
            })}

            <RunwayEditModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                runway={selectedRunway}
                onSave={handleSaveStatus}
            />
        </div>
    );
};

export default RunwayStatus;
