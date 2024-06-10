import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Enter Your symptoms!' }]);
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const res = await axios.post('http://localhost:4000/api/chat', { message: `These are the symptoms: ${input} tell which type of doctor should I have an appointment with(Only the types of doctor nothing else)` });
            const botMessage = { sender: 'bot', text: res.data.message };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error('Error fetching response:', error);
        }

        setInput('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="chatbot-icon" onClick={toggleChat}>
                💬
                <div className="cloud-message"><b>doubts...</b></div>
            </button>
            <div className={`chat-container ${isOpen ? 'open' : ''}`}>
                <div className="chat-window">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your symptoms..."
                        />
                        <button className="btn" onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatBot;
