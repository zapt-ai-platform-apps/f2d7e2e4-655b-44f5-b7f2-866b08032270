import React, { useState } from 'react';
import { createEvent } from '../supabaseClient';
import MessageList from './MessageList';
import ChatForm from './ChatForm';

export default function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);
        console.log('User submitted a message:', input);

        try {
            const response = await createEvent('chatgpt_request', {
                prompt: input,
                response_type: 'text'
            });
            console.log('Received response from AI:', response);

            const aiMessage = { sender: 'ai', text: response };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
            const errorMessage = { sender: 'ai', text: 'Sorry, something went wrong. Please try again later.' };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">AI Chatbot</h2>
            <MessageList messages={messages} />
            <ChatForm
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                loading={loading}
            />
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="mt-4 text-sm text-blue-500">
                Made on ZAPT
            </a>
        </div>
    );
}