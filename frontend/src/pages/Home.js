import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Karnataka center coordinates
  const karnatakaCenter = {
    lat: 15.3173,
    lng: 75.7139
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    loadNearbyAmbulances();
  }, []);

  const loadNearbyAmbulances = async () => {
    try {
      const response = await bookingAPI.getAllAmbulances();
      setAmbulances(response.data.ambulances || []);
    } catch (error) {
      console.error('Error loading ambulances:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:108';
  };

  const handleBookAmbulance = () => {
    if (isAuthenticated) {
      navigate('/book');
    } else {
      navigate('/login');
    }
  };

  const handleSignUp = () => {
    navigate('/register');
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
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        {isAuthenticated ? (
          <button className="signup" onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        ) : (
          <button className="signup" onClick={handleSignUp}>
            Sign up
          </button>
        )}
      </nav>

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <h1>
            Smart <span>Ambulance</span> <br /> Services
          </h1>
          <p>
            Fast, Reliable & Advanced Emergency Care <br />
            Get help at the right time
          </p>

          <div className="buttons">
            <button className="call" onClick={handleCallNow}>
              CALL NOW
            </button>
            <button className="book" onClick={handleBookAmbulance}>
              BOOK AMBULANCE
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="ambulance-image-container">
            {/* Decorative elements */}
            <div className="heart-icon">❤️</div>
            <div className="pulse-icon">💓</div>
            <div className="plus-icon">+</div>
          </div>
        </div>
      </div>

      {/* MAP PREVIEW - Above features */}
      <div className="map-preview-centered">
        <p className="map-title">Nearby Ambulances</p>
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onLoad={() => setIsMapLoaded(true)}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={karnatakaCenter}
            zoom={7}
            options={{
              disableDefaultUI: true,
              zoomControl: false
            }}
          >
            {isMapLoaded && ambulances.map((ambulance, index) => (
              <Marker
                key={index}
                position={{
                  lat: ambulance.currentLocation.coordinates[1],
                  lng: ambulance.currentLocation.coordinates[0]
                }}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                      <defs>
                        <style>
                          .red { fill: #FF0000; }
                          .blue { fill: #0000FF; }
                          .light { animation: blink 1s infinite alternate; }
                          @keyframes blink {
                            0% { opacity: 1; }
                            100% { opacity: 0.5; }
                          }
                        </style>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="10" fill="#2E7D32"/>
                      <circle cx="8" cy="10" r="2" class="light red"/>
                      <circle cx="12" cy="10" r="2" class="light blue"/>
                      <circle cx="16" cy="10" r="2" class="light red"/>
                      <text x="12" y="18" font-size="10" text-anchor="middle" fill="white"> ambulance</text>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <div className="map-count">
          {ambulances.length} Ambulances Available
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🚨</div>
          <h3>24/7 Emergency</h3>
          <p>Round the clock emergency ambulance service</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>Real-time Tracking</h3>
          <p>Track ambulance location in real-time</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Response</h3>
          <p>Quick response time with shortest routes</p>
        </div>
      </div>
    </div>
  );
};

export default Home;