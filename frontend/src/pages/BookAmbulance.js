import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/BookAmbulance.css';

const BookAmbulance = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    patientPhone: user?.phone || '',
    accidentType: 'Road Accident',
    address: ''
  });
  
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [nearbyAmbulances, setNearbyAmbulances] = useState([]);

  const accidentTypes = [
    'Road Accident',
    'Heart Attack',
    'Fire Injury',
    'Snake Bite',
    'Pregnancy Emergency',
    'Other'
  ];

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      loadNearbyAmbulances();
      getAddressFromCoordinates(location.lat, location.lng);
    }
  }, [location]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Please enable location services to book ambulance');
          // Default to Bangalore
          setLocation({ lat: 12.9716, lng: 77.5946 });
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLocation({ lat: 12.9716, lng: 77.5946 });
    }
  };

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results && data.results[0]) {
        setFormData(prev => ({
          ...prev,
          address: data.results[0].formatted_address
        }));
      }
    } catch (error) {
      console.error('Error getting address:', error);
    }
  };

  const loadNearbyAmbulances = async () => {
    if (!location) return;
    
    try {
      const response = await bookingAPI.getNearbyAmbulances(location.lat, location.lng);
      setNearbyAmbulances(response.data.ambulances || []);
    } catch (error) {
      console.error('Error loading ambulances:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
      setError('Location is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('patientName', formData.patientName);
      formDataToSend.append('patientPhone', formData.patientPhone);
      formDataToSend.append('accidentType', formData.accidentType);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('pickupLocation', JSON.stringify({
        coordinates: [location.lng, location.lat]
      }));
      
      if (photo) {
        formDataToSend.append('photo', photo);
      }

      const response = await bookingAPI.createBooking(formDataToSend);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  if (!location) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Getting your location...</p>
      </div>
    );
  }

  return (
    <div className="book-ambulance">
      <div className="book-header">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h1>Book Ambulance</h1>
        <p>Fill in the details for emergency assistance</p>
      </div>

      <div className="book-container">
        {/* LEFT SIDE - FORM */}
        <div className="book-form-section">
          {success && (
            <div className="success-message">
              ✅ Booking created successfully! Redirecting...
            </div>
          )}
          
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Patient Name *</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                placeholder="Enter patient name"
              />
            </div>

            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="patientPhone"
                value={formData.patientPhone}
                onChange={handleChange}
                required
                placeholder="Enter contact number"
              />
            </div>

            <div className="form-group">
              <label>Accident Type *</label>
              <select
                name="accidentType"
                value={formData.accidentType}
                onChange={handleChange}
                required
              >
                {accidentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Pickup Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Auto-detected address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Upload Accident Photo (Optional)</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="file-input"
              />
              {photoPreview && (
                <div className="photo-preview">
                  <img src={photoPreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="location-info">
              <p>📍 Your Location:</p>
              <p className="coordinates">
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </p>
            </div>

            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'Booking...' : '🚑 Book Ambulance Now'}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - MAP */}
        <div className="book-map-section">
          <div className="map-info">
            <h3>Your Location & Nearby Ambulances</h3>
            <p className="ambulance-count">
              {nearbyAmbulances.length} Ambulances Available Nearby
            </p>
          </div>
          
          <div className="map-container">
            <LoadScript 
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              onLoad={() => setIsMapLoaded(true)}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={location}
                zoom={13}
              >
                {/* Patient Location Marker */}
                {isMapLoaded && (
                  <Marker
                    position={location}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" fill="#FF0000"/>
                          <text x="12" y="16" font-size="14" text-anchor="middle" fill="white">📍</text>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(40, 40)
                    }}
                    label={{
                      text: 'You',
                      color: '#FF0000',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  />
                )}

                {/* Nearby Ambulances */}
                {isMapLoaded && nearbyAmbulances.map((ambulance, index) => (
                  <Marker
                    key={index}
                    position={{
                      lat: ambulance.currentLocation.coordinates[1],
                      lng: ambulance.currentLocation.coordinates[0]
                    }}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
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
                          <text x="12" y="18" font-size="10" text-anchor="middle" fill="white">🚑</text>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(35, 35)
                    }}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAmbulance;
