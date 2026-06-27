import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '3rem' }}>404</h1>
        <p>The page you are looking for could not be found.</p>
        <Link to="/" className="btn btn-primary">
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
