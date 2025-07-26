import React, { useState, useEffect, useRef } from 'react';
import './ChatPanel.css';

// Send Icon SVG
const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const ChatPanel = () => {
    // Dummy messages for initial state
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Alice', text: 'Hey everyone, excited for the stream!' },
        { id: 2, sender: 'Bob', text: 'Hello! What are we learning today?' },
        { id: 3, sender: 'Charlie', text: 'Can you show an example of React Hooks?' },
        { id: 4, sender: 'Alice', text: 'Yes, that would be great! Especially `useEffect`.' },
        { id: 5, sender: 'David', text: 'Looking forward to it.' },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Function to scroll to the bottom of the messages container
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Handle sending a new message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const newMsg = {
            id: messages.length + 1,
            sender: 'Instructor', // Assuming the instructor is sending the message
            text: newMessage,
        };

        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    return (
        <div className="chat-panel-container">
            <header className="chat-header">
                <h3>Live Chat</h3>
            </header>

            <div className="messages-area">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-bubble ${msg.sender === 'Instructor' ? 'instructor' : ''}`}>
                        <span className="message-sender">{msg.sender}</span>
                        <p className="message-text">{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    aria-label="Chat message input"
                />
                <button type="submit" className="send-button" aria-label="Send message">
                    <SendIcon />
                </button>
            </form>
        </div>
    );
};

export default ChatPanel;
