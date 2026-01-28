import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const TestMap = () => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '20px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.15)',
    margin: '20px auto',
    maxWidth: '1200px'
  };

  const center = {
    lat: 12.9716,
    lng: 77.5946
  };

  // Sample ambulance locations for testing
  const testLocations = [
    { id: 1, lat: 12.9716, lng: 77.5946, name: 'Ambulance 1', status: 'Available' },
    { id: 2, lat: 12.9611, lng: 77.6044, name: 'Ambulance 2', status: 'On Duty' },
    { id: 3, lat: 12.9833, lng: 77.5833, name: 'Ambulance 3', status: 'Available' },
    { id: 4, lat: 12.9500, lng: 77.6000, name: 'Ambulance 4', status: 'Maintenance' },
    { id: 5, lat: 13.0000, lng: 77.5800, name: 'Ambulance 5', status: 'Available' }
  ];

  return (
    <div className="home">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Grorul</h2>
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/services')}>Services</li>
          <li onClick={() => navigate('/about')}>About</li>
          <li onClick={() => navigate('/contact')}>Contact</li>
        </ul>
        <button className="signup" onClick={() => navigate('/login')}>
          Sign Up
        </button>
      </nav>

      <div className="hero">
        <div className="hero-left">
          <h1>
            Test <span>Map</span> <br /> Page
          </h1>
          <p>
            This is a dedicated page for testing Google Maps functionality
          </p>
        </div>
      </div>

      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>Interactive Test Map</h2>
        <p>Click on any ambulance marker to see details</p>
        
        <LoadScript 
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
            }}
          >
            {testLocations.map((location) => (
              <Marker
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                      <defs>
                        <style>
                          .red { fill: ${location.status === 'Available' ? '#00C853' : location.status === 'On Duty' ? '#FF9800' : '#FF5252'}; }
                          .light { animation: blink 1s infinite alternate; }
                          @keyframes blink {
                            0% { opacity: 1; }
                            100% { opacity: 0.7; }
                          }
                        </style>
                      </defs>
                      <circle cx="12" cy="12" r="10" class="red"/>
                      <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">🚑</text>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                onClick={() => setSelectedMarker(selectedMarker === location.id ? null : location.id)}
              />
            ))}
            
            {selectedMarker && (
              (() => {
                const location = testLocations.find(loc => loc.id === selectedMarker);
                return (
                  <InfoWindow
                    position={{ lat: location.lat, lng: location.lng }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div>
                      <h3>{location.name}</h3>
                      <p>Status: {location.status}</p>
                      <p>Location: {location.lat}, {location.lng}</p>
                    </div>
                  </InfoWindow>
                );
              })()
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="cta-section">
        <h2>Continue Exploring</h2>
        <div className="cta-buttons">
          <button className="book" onClick={() => navigate('/')}>
            BACK TO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestMap;