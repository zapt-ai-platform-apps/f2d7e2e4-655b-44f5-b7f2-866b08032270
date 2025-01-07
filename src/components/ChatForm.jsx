import React from 'react';

export default function ChatForm({ input, setInput, handleSubmit, loading }) {
    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                className="flex-1 border border-gray-300 rounded-l px-4 py-2 box-border text-gray-800"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
            />
            <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white rounded-r cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>
        </form>
    );
}