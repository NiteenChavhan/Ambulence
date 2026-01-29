import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import '../styles/Services.css';

const About = () => {
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
          <li onClick={() => navigate('/services')}>Services</li>
          <li className="active">About</li>
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

      {/* ABOUT HERO SECTION */}
      <div className="hero">
        <div className="hero-center-content">
          <h1 className="centered-heading">
            About <span className="mission-blue">Our Mission</span> <br /> & Vision
          </h1>
          <p className="centered-text">
            Saving lives through innovative technology and compassionate care
          </p>
        </div>
      </div>

      {/* MISSION SECTION */}
      <div className="about-section">
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>
              At Grorul Smart Ambulance Services, our mission is to provide rapid, reliable, and 
              technologically advanced emergency medical transportation services. We leverage cutting-edge 
              GPS tracking, real-time monitoring, and strategic fleet deployment to ensure the fastest 
              response times and highest quality patient care during critical moments.
            </p>
          </div>
          
          <div className="vision">
            <h2>Our Vision</h2>
            <p>
              To revolutionize emergency medical services by integrating technology with compassionate 
              healthcare delivery. We envision a world where no life is lost due to delayed emergency 
              response, and where every citizen has access to efficient, transparent, and reliable 
              ambulance services.
            </p>
          </div>
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="company-info">
        <div className="info-card">
          <h3>Established</h3>
          <p>2023</p>
        </div>
        <div className="info-card">
          <h3>Ambulances</h3>
          <p>50+ Fleet</p>
        </div>
        <div className="info-card">
          <h3>Coverage Area</h3>
          <p>Karnataka State</p>
        </div>
        <div className="info-card">
          <h3>Response Time</h3>
          <p>&lt; 10 Minutes</p>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">❤️</div>
            <h3>Compassion</h3>
            <p>Providing care with empathy and respect for every patient</p>
          </div>
          <div className="value-card">
            <div className="value-icon">⚡</div>
            <h3>Speed</h3>
            <p>Delivering the fastest response times in emergency situations</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🔒</div>
            <h3>Reliability</h3>
            <p>Consistent, dependable service when you need it most</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🔧</div>
            <h3>Innovation</h3>
            <p>Leveraging technology to improve emergency healthcare</p>
          </div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="team-section">
        <h2>Our Professional Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-icon">👨‍⚕️</div>
            <h3>Trained Paramedics</h3>
            <p>Highly skilled medical professionals</p>
          </div>
          <div className="team-member">
            <div className="member-icon">🚗</div>
            <h3>Professional Drivers</h3>
            <p>Experienced emergency vehicle operators</p>
          </div>
          <div className="team-member">
            <div className="member-icon">💻</div>
            <h3>Tech Support</h3>
            <p>24/7 technical assistance and monitoring</p>
          </div>
          <div className="team-member">
            <div className="member-icon">🏥</div>
            <h3>Medical Staff</h3>
            <p>On-call doctors and specialists</p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="cta-section">
        <h2>Ready to Partner with Us?</h2>
        <div className="cta-buttons">
          <button className="call" onClick={() => navigate('/contact')}>
            CONTACT US
          </button>
          <button className="book" onClick={() => navigate('/book')}>
            BOOK AMBULANCE
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;