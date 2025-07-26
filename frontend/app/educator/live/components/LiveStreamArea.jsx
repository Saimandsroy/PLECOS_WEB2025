import React, { useState, useEffect, useRef } from 'react';
import ChatPanel from './ChatPanel'; // Assuming ChatPanel is in the same directory
import ParticipantsPanel from './ParticipantsPanel'; // Assuming ParticipantsPanel is in the same directory
import './LiveStreamArea.css';
import './GoLivePage.css'; // Importing for side-panel styles

// SVG Icons for controls
const MicOnIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> );
const MicOffIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg> );
const CameraOnIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg> );
const CameraOffIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path></svg> );
const EndStreamIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line></svg> );

const LiveStreamArea = ({ onEndStream }) => {
    // Component state
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [stream, setStream] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const videoRef = useRef(null);

    // State for side panels, moved from GoLivePage
    const [activePanel, setActivePanel] = useState(null); // 'chat', 'participants', null

    // Function to toggle panels, moved from GoLivePage
    const togglePanel = (panel) => {
        setActivePanel(activePanel === panel ? null : panel);
    };

    useEffect(() => {
        let mediaStream;
        const getMedia = async () => {
            try {
                mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        };
        getMedia();
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleMicToggle = () => {
        stream?.getAudioTracks().forEach(track => { track.enabled = !micOn; });
        setMicOn(!micOn);
    };

    const handleCameraToggle = () => {
        stream?.getVideoTracks().forEach(track => { track.enabled = !cameraOn; });
        setCameraOn(!cameraOn);
    };

    const handleEndStreamClick = () => setShowConfirmModal(true);

    const confirmEndStream = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
        setShowConfirmModal(false);
        onEndStream();
    };

    return (
        <div className="live-view-container">
            <div className={`main-content ${activePanel ? 'with-panel' : ''}`}>
                <div className="live-stream-container">
                    <div className="video-wrapper">
                        <div className="live-badge">LIVE</div>
                        <video ref={videoRef} className="live-video" autoPlay muted playsInline style={{ transform: 'scaleX(-1)' }}></video>
                        {!cameraOn && <div className="cam-off-overlay">Camera is Off</div>}
                    </div>

                    <div className="controls-container">
                        {/* Mic and Camera Buttons */}
                        <button className={`control-btn ${micOn ? 'mic-on' : 'mic-off'}`} onClick={handleMicToggle} title={micOn ? "Mute" : "Unmute"}>
                            {micOn ? <MicOnIcon /> : <MicOffIcon />}
                        </button>
                        <button className={`control-btn ${cameraOn ? 'cam-on' : 'cam-off'}`} onClick={handleCameraToggle} title={cameraOn ? "Stop camera" : "Start camera"}>
                            {cameraOn ? <CameraOnIcon /> : <CameraOffIcon />}
                        </button>
                        
                    
                        <button className={`control-btn icon-with-text ${activePanel === 'participants' ? 'active' : ''}`} onClick={() => togglePanel('participants')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            <span>Participants</span>
                        </button>
                        <button className={`control-btn icon-with-text ${activePanel === 'chat' ? 'active' : ''}`} onClick={() => togglePanel('chat')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v3c0 .6.4 1 1 1h.5c.2 0 .5-.1.7-.3L14.6 18H20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 14H6v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
                            <span>Chat</span>
                        </button>

                        {/* End Stream Button */}
                        <button className="control-btn end-stream-btn" onClick={handleEndStreamClick} title="End stream">
                            <EndStreamIcon />
                            <span>End Stream</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Panel moved from GoLivePage */}
            <div className={`side-panel ${activePanel ? 'open' : ''}`}>
                <div className="panel-header">
                    <h3 className="panel-title">{activePanel === 'chat' ? 'Chat' : 'People'}</h3>
                    <button className="close-panel-btn" onClick={() => setActivePanel(null)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
                <div className="panel-content">
                    {activePanel === 'chat' && <ChatPanel />}
                    {activePanel === 'participants' && <ParticipantsPanel />}
                </div>
            </div>

            {/* Panel Overlay and Modal */}
            {activePanel && <div className="panel-overlay" onClick={() => setActivePanel(null)} />}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>End Stream?</h3>
                        <p>Are you sure you want to end the live stream?</p>
                        <div className="modal-actions">
                            <button className="modal-btn cancel-btn" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                            <button className="modal-btn confirm-btn" onClick={confirmEndStream}>End Stream</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveStreamArea;