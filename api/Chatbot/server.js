// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv

// Load environment variables from .env file
dotenv.config();

// Import Groq SDK
const Groq = require('groq-sdk');
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Use the API key from environment variables
});

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: 'user',
                    content: userMessage,
                },
            ],
            model: 'llama3-8b-8192',
        });
        const botMessage = response.choices[0]?.message?.content || 'I am not sure how to respond to that.';
        res.json({ message: botMessage });
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        res.status(500).json({ message: 'Error fetching response from AI' });
    }
});

app.listen(port, () => {
    console.log(`Server running `);
});
