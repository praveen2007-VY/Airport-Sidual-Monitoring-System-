import React, { useState } from 'react';
import './RunwayEditModal.css';
import { toast } from 'react-toastify';

const RunwayEditModal = ({ isOpen, onClose, runway, onSave }) => {
    const [selectedStatus, setSelectedStatus] = useState(runway ? runway.status : '');
    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen || !runway) return null;

    const statusOptions = [
        { id: 'Available', label: 'Available', icon: '✅', className: 'available' },
        { id: 'In Use', label: 'In Use', icon: '✈️', className: 'in-use' },
        { id: 'Maintenance', label: 'Maintenance', icon: '🛠️', className: 'maintenance' }
    ];
   
    const WEBHOOK="https://local.workflow-praveen.xyz/webhook-test/ef579df2-ab63-4f50-bebf-e4695d402026";
  const webhook = async ()=>{
    const res = await fetch(WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "RUNWAY"
        }),
  })};
    const handleSave = async () => {
        if (!selectedStatus) return;

        setIsSaving(true);
        try {
            await onSave(runway._id, selectedStatus);
            onClose();
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update status. Please try again.");
        } finally {
            setIsSaving(false);
        }
        webhook();
    };
    

  

    return (
        <div className="runway-modal-backdrop" onClick={onClose}>
            <div className="runway-modal-content" onClick={e => e.stopPropagation()}>
                <div className="runway-modal-header">
                    <h3 className="runway-modal-title">Update Runway Status</h3>
                </div>

                <div className="runway-modal-body">
                    <div className="runway-identifier">
                        Editing: <strong>{runway.gate}</strong> ({runway.runwayCode})
                    </div>

                    <div className="status-options-grid">
                        {statusOptions.map((option) => (
                            <div
                                key={option.id}
                                className={`status-option-card ${option.className} ${selectedStatus === option.id ? 'selected' : ''}`}
                                onClick={() => setSelectedStatus(option.id)}
                            >
                                <span className="status-icon">{option.icon}</span>
                                <span className="status-label">{option.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="runway-modal-footer">
                    <button className="modal-btn modal-btn-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="modal-btn modal-btn-save"
                        onClick={handleSave}
                        disabled={!selectedStatus || isSaving || selectedStatus === runway.status}
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RunwayEditModal;
