import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                {/* ... other links ... */}
                <li><Link to="/chat">Chat</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar; 