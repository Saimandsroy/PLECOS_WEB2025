import React from 'react';
import './ParticpantsPanel.css';

// SVG Icon for Hand Raised
const HandRaisedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18.5a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 013 0v6a1.5 1.5 0 01-1.5 1.5zM12 18.5a1.5 1.5 0 01-1.5-1.5v-10a1.5 1.5 0 013 0v10a1.5 1.5 0 01-1.5 1.5zM6 18.5a1.5 1.5 0 01-1.5-1.5v-2a1.5 1.5 0 113 0v2a1.5 1.5 0 01-1.5 1.5z"></path>
        <path d="M2.5 10.5a1 1 0 011-1h17a1 1 0 011 1v1a8 8 0 01-8 8h-3a8 8 0 01-8-8v-1z"></path>
    </svg>
);

// Dummy data for participants
const participantsData = [
    { id: 1, name: 'Alice Smith', status: 'active' },
    { id: 2, name: 'Bob Johnson', status: 'muted' },
    { id: 3, name: 'Charlie Brown', status: 'hand-raised' },
    { id: 4, name: 'Diana Prince', status: 'active' },
    { id: 5, name: 'Ethan Hunt', status: 'active' },
    { id: 6, name: 'Fiona Glenanne', status: 'muted' },
    { id: 7, name: 'George Costanza', status: 'active' },
    { id: 8, name: 'Hannah Montana', status: 'active' },
];

// Simple component to generate an avatar from initials
const Avatar = ({ name }) => {
    const initials = name.split(' ').map(n => n[0]).join('');
    return <div className="participant-avatar">{initials}</div>;
};

const ParticipantsPanel = () => {
    return (
        <div className="participants-panel-container">
            <header className="participants-header">
                <h3>Participants ({participantsData.length})</h3>
            </header>

            <div className="participants-list">
                {participantsData.map(participant => (
                    <div key={participant.id} className="participant-item">
                        <Avatar name={participant.name} />
                        <div className="participant-info">
                            <span className="participant-name">{participant.name}</span>
                        </div>
                        <div className="participant-status">
                            {participant.status === 'active' && <span className="status-indicator active" title="Active"></span>}
                            {participant.status === 'muted' && <span className="status-indicator muted" title="Muted"></span>}
                            {participant.status === 'hand-raised' && (
                                <div className="status-indicator hand-raised" title="Hand Raised">
                                    <HandRaisedIcon />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParticipantsPanel;
