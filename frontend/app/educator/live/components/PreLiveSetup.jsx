'use client';
import React from 'react';
import './PreLiveSetup.css';

// SVG Icons for toggle buttons
const MicOnIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
);

const MicOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
);

const CameraOnIcon = () => (
  <svg viewBox="0 0 16 18" width="28" height="28" xmlns="http://www.w3.org/2000/svg" fill="#fff" class="bi bi-camera"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"></path> <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"></path> </g></svg>
);

const CameraOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34m-7.72-2.06a4 4 0 1 1-5.56-5.56"></path></svg>
);


const PreLiveSetup = ({ onGoLive }) => {
    // State management for controls and inputs
    const [micOn, setMicOn] = React.useState(true);
    const [cameraOn, setCameraOn] = React.useState(true);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [thumbnailName, setThumbnailName] = React.useState('');
    const [stream, setStream] = React.useState(null);
    const [error, setError] = React.useState(null);
    const videoRef = React.useRef(null);

    // Effect to get user media
    React.useEffect(() => {
        // If camera is off, stop the stream
        if (!cameraOn) {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
                if(videoRef.current) videoRef.current.srcObject = null;
            }
            return;
        }

        // Function to get camera and microphone access
        const getMedia = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setError(null);
            } catch (err) {
                console.error("Error accessing media devices.", err);
                setError("Camera access denied. Please enable camera access in your browser settings.");
                setCameraOn(false);
            }
        };

        getMedia();

        // Cleanup function to stop all tracks when the component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [cameraOn]); // Rerun effect when cameraOn state changes

    // Toggle microphone on/off
    const handleMicToggle = () => {
        const newState = !micOn;
        setMicOn(newState);
        if (stream) {
            stream.getAudioTracks().forEach(track => {
                track.enabled = newState;
            });
        }
    };
    
    // Toggle camera on/off
    const handleCameraToggle = () => {
        setCameraOn(prevState => !prevState);
    };

    // Handle thumbnail file selection
    const handleThumbnailChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailName(e.target.files[0].name);
        } else {
            setThumbnailName('');
        }
    };

    // Handle form submission
    const handleGoLive = (e) => {
        e.preventDefault();
        if(!title.trim()) {
            alert("Please enter a session title.");
            return;
        }
        // In a real app, this would trigger the live stream service
        onGoLive();
        console.log({
            title,
            description,
            micOn,
            cameraOn,
            thumbnail: thumbnailName,
        });
        alert(`Going live with title: "${title}"`);
    };

    return (
        <div className="pre-live-container">
            <div className="pre-live-card">
                <div className='left'>
                <h1 className="card-header">Go Live Setup</h1>
                
                <div className="video-preview-container">
                    <video ref={videoRef} className="video-preview" autoPlay muted playsInline style={{ transform: 'scaleX(-1)' }}></video>
                    {error && <div className="video-error-overlay">{error}</div>}
                    {!cameraOn && !error && <div className="video-off-overlay">Camera is Off</div>}
                </div>

                <div className="controls-bar">
                    <button 
                        className={`control-button ${micOn ? 'on' : 'off'}`} 
                        onClick={handleMicToggle}
                        aria-pressed={micOn}
                        aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
                    >
                        {micOn ? <MicOnIcon /> : <MicOffIcon />}
                    </button>
                    <button 
                        className={`control-button ${cameraOn ? 'on' : 'off'}`} 
                        onClick={handleCameraToggle}
                        aria-pressed={cameraOn}
                        aria-label={cameraOn ? "Turn off camera" : "Turn on camera"}
                    >
                        {cameraOn ? <CameraOnIcon /> : <CameraOffIcon />}
                    </button>
                </div>
                </div>
                <div className='right'>
                <form className="setup-form" onSubmit={handleGoLive}>
                    <div className="form-group">
                        <label htmlFor="session-title">Session Title</label>
                        <input
                            id="session-title"
                            type="text"
                            className="input-field"
                            placeholder="e.g., React Hooks Masterclass"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="session-description">Description</label>
                        <textarea
                            id="session-description"
                            className="textarea-field"
                            placeholder="Tell viewers about your session..."
                            rows="4"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="thumbnail-upload" className="thumbnail-label">
                            Upload Thumbnail
                        </label>
                        <input
                            id="thumbnail-upload"
                            type="file"
                            className="thumbnail-input"
                            accept="image/png, image/jpeg"
                            onChange={handleThumbnailChange}
                        />
                        {thumbnailName && <span className="thumbnail-name">{thumbnailName}</span>}
                    </div>

                    <button type="submit" className="go-live-button">
                        Go Live
                    </button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default PreLiveSetup;
