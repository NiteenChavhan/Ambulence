import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';
import '../styles/Services.css';

const Contact = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
          <li onClick={() => navigate('/about')}>About</li>
          <li className="active">Contact</li>
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

      {/* CONTACT HERO SECTION */}
      <div className="hero">
        <div className="hero-center-content">
          <h1 className="centered-heading">
            <span className="contact-blue">Contact</span> <span>Us</span> <br /> Anytime
          </h1>
          <p className="centered-text">
            Reach out to us for emergency services, partnerships, or general inquiries
          </p>
        </div>
      </div>

      {/* EMERGENCY CONTACT SECTION */}
      <div className="emergency-contact">
        <h2>Emergency Services</h2>
        <div className="emergency-grid">
          <div className="emergency-card">
            <div className="emergency-icon">📞</div>
            <h3>Emergency Hotline</h3>
            <p className="emergency-number">108</p>
            <p>Available 24/7 for emergency services</p>
          </div>
          <div className="emergency-card">
            <div className="emergency-icon">📱</div>
            <h3>General Helpline</h3>
            <p className="emergency-number">+91 98765 43210</p>
            <p>For non-emergency inquiries and bookings</p>
          </div>
          <div className="emergency-card">
            <div className="emergency-icon">✉️</div>
            <h3>Email Support</h3>
            <p className="emergency-number">support@grorul.com</p>
            <p>Respond within 24 hours</p>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="contact-form-section">
        <h2>Send us a Message</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter subject"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Message *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter your message"
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn">
            Send Message
          </button>
          
          {submitted && (
            <div className="success-message">
              ✅ Thank you for contacting us! We'll get back to you soon.
            </div>
          )}
        </form>
      </div>

      {/* OFFICE LOCATIONS */}
      <div className="office-section">
        <h2>Office Locations</h2>
        <div className="offices-grid">
          <div className="office-card">
            <div className="office-icon">🏢</div>
            <h3>Bangalore Office</h3>
            <p>123, Electronic City,</p>
            <p>Bangalore, Karnataka 560100</p>
            <p>Mon-Fri: 9AM - 6PM</p>
          </div>
          <div className="office-card">
            <div className="office-icon">🏛️</div>
            <h3>Mysore Branch</h3>
            <p>45, Palace Road,</p>
            <p>Mysore, Karnataka 570004</p>
            <p>Mon-Sun: 24/7 Emergency</p>
          </div>
          <div className="office-card">
            <div className="office-icon">🏪</div>
            <h3>Mangalore Hub</h3>
            <p>78, Hampankatta,</p>
            <p>Mangalore, Karnataka 575001</p>
            <p>Mon-Sun: 24/7 Emergency</p>
          </div>
        </div>
      </div>

      {/* EMERGENCY BUTTONS */}
      <div className="cta-section">
        <h2>Need Immediate Help?</h2>
        <div className="cta-buttons">
          <button className="call" onClick={() => window.location.href = 'tel:108'}>
            EMERGENCY CALL
          </button>
          <button className="book" onClick={() => navigate('/book')}>
            BOOK AMBULANCE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;