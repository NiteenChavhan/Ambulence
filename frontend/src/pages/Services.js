import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Services.css';

const Services = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-container">
          <div className="logo-ambulance">🚑</div>
        </div>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li className="active">Services</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        {isAuthenticated ? (
          <button className="signup" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        ) : (
          <button className="signup" onClick={() => handleNavigation('/login')}>
            Sign Up
          </button>
        )}
      </nav>

      {/* SERVICES HERO SECTION */}
      <div className="hero">
        <div className="hero-center-content">
          <h1 className="centered-heading">
            Our <span className="emergency-blue">Emergency</span> <br /> Services
          </h1>
          <p className="centered-text">
            Comprehensive ambulance services designed to save lives and provide critical care
          </p>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🚑</div>
          <h3>Emergency Ambulance</h3>
          <p>24/7 emergency medical transport services with trained paramedics and advanced life support equipment</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🏥</div>
          <h3>Medical Transport</h3>
          <p>Non-emergency medical transport for patients requiring scheduled transfers between medical facilities</p>
        </div>

        <div className="service-card">
          <div className="service-icon">📍</div>
          <h3>Real-time Tracking</h3>
          <p>Track your ambulance in real-time and get live updates on arrival time and location</p>
        </div>

        <div className="service-card">
          <div className="service-icon">⚡</div>
          <h3>Fast Response</h3>
          <p>Quick response times with our strategically located fleet across Karnataka</p>
        </div>

        <div className="service-card">
          <div className="service-icon">📞</div>
          <h3>Emergency Hotline</h3>
          <p>Direct access to emergency services through our dedicated hotline number</p>
        </div>

        <div className="service-card">
          <div className="service-icon">🛡️</div>
          <h3>Advanced Equipment</h3>
          <p>Fully equipped ambulances with life-saving medical devices and supplies</p>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🚨</div>
          <h3>24/7 Availability</h3>
          <p>Round the clock emergency services without interruption</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>GPS Tracking</h3>
          <p>Real-time location tracking for transparency and efficiency</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Response</h3>
          <p>Quick response time with shortest route optimization</p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <h2>Need Emergency Assistance?</h2>
        <div className="cta-buttons">
          <button className="call" onClick={() => window.location.href = 'tel:108'}>
            CALL NOW
          </button>
          <button className="book" onClick={() => navigate('/book')}>
            BOOK AMBULANCE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;