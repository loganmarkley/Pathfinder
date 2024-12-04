import React, { useState } from 'react';

function Chat() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/agent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Chat with Agent</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your query"
                />
                <button type="submit">Send</button>
            </form>
            {response && (
                <div>
                    <h2>Response:</h2>
                    <p>{response.response || response.error}</p>
                </div>
            )}
        </div>
    );
}

export default Chat; 