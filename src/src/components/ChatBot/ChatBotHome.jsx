import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const ChatBotHome = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Any Questions!' }]);
    const [isOpen, setIsOpen] = useState(false);

    const apiUrl = process.env.REACT_APP_CHAT_BOT; // Updated variable

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);

        try {
            const res = await axios.post(`${apiUrl}/api/chat`, { message: `
            Book with Ease
            Heal with Confidence
            
            Docmate offers seamless doctor-patient appointment booking, ensuring hassle-free scheduling for all medical needs. With our user-friendly platform, patients can easily find available slots, empowering them to take control of their health journey with confidence and convenience. 
            
            Choose Docmate for effortless access to medical care. Our platform offers unmatched convenience, allowing you to book appointments with ease. With a user-friendly interface and a wide network of healthcare providers, we prioritize your needs, ensuring a seamless experience that empowers you to prioritize your health with confidence
    
            Need an appointment?
            
            Access healthcare at any time with our 24-hour appointment service, ensuring round-the-clock availability for booking appointments according to your schedule.
            Emergency Cases
            +1 518 531 6950
            
            Our 24/7 customer care ensures support whenever you need it. Reach out anytime for assistance with bookings, inquiries, or concerns, providing peace of mind and reliable assistance around the clock
            Insurance Accepted
            
            Our platform lists accepted insurance types, simplifying payment options for patients. Clear information on coverage helps patients understand their options and reduces confusion during the billing process
            
            Docmate simplifies healthcare with a user-friendly doctor appointment booking app and secure doctor-patient communication platform. 
            
            123, Silver Street,
            Koramangala 4th Block, Bengaluru
            
            +1 518 531 6950
            
            Docmateservices@gmail.com
            
            Docmate streamlines healthcare with its dual-functionality app. Patients effortlessly schedule appointments with preferred doctors while accessing medical records and receiving appointment reminders. The platform fosters secure doctor-patient communication through messaging features, enhancing care coordination and patient engagement. With Health Ease, accessing quality healthcare and maintaining meaningful doctor-patient relationships has never been easier or more convenient.

            Answer this question "${input}" based on the Above data (Behave like a Chatbot).
            ` });
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
                <div className="cloud-message"><b>Try...</b></div>
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

export default ChatBotHome;
