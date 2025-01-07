import React from 'react';

export default function MessageList({ messages }) {
    return (
        <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        {msg.text}
                    </span>
                </div>
            ))}
        </div>
    );
}