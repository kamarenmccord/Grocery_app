import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <div className="landing">
            Landing
            <Link to='./login'>Login</Link>
        </div>
    )
}

export default Landing
