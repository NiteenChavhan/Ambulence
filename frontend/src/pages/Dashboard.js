import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { bookingAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [directions, setDirections] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const karnatakaCenter = {
    lat: 15.3173,
    lng: 75.7139
  };

  const mapContainerStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    loadData();
    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  const initializeSocket = () => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
    });

    newSocket.on('newBooking', (data) => {
      loadData();
    });

    newSocket.on('bookingStatusUpdate', (data) => {
      loadData();
    });

    newSocket.on('ambulanceLocationUpdate', (data) => {
      loadData();
    });
  };

  const loadData = async () => {
    try {
      const [bookingsRes, ambulancesRes] = await Promise.all([
        bookingAPI.getAllBookings(),
        bookingAPI.getAllAmbulances()
      ]);

      setBookings(bookingsRes.data.bookings || []);
      setAmbulances(ambulancesRes.data.ambulances || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateRoute = async (booking) => {
    if (!booking.ambulanceId || !window.google) return;

    const directionsService = new window.google.maps.DirectionsService();

    const origin = {
      lat: booking.ambulanceId.currentLocation.coordinates[1],
      lng: booking.ambulanceId.currentLocation.coordinates[0]
    };

    const destination = {
      lat: booking.pickupLocation.coordinates[1],
      lng: booking.pickupLocation.coordinates[0]
    };

    try {
      const result = await directionsService.route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      });

      setDirections(result);
      
      const route = result.routes[0];
      const distance = route.legs[0].distance.text;
      const duration = route.legs[0].duration.text;

      // Update booking with ETA
      await bookingAPI.updateStatus({
        bookingId: booking._id,
        status: booking.status,
        estimatedTime: duration,
        distance: distance
      });

      loadData();
    } catch (error) {
      console.error('Error calculating route:', error);
    }
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    if (booking.ambulanceId) {
      calculateRoute(booking);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      await bookingAPI.updateStatus({
        bookingId,
        status: newStatus
      });
      
      if (socket) {
        socket.emit('bookingStatusUpdate', { bookingId, status: newStatus });
      }
      
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'REQUESTED': '#FFA500',
      'ACCEPTED': '#2196F3',
      'ON_WAY': '#FF9800',
      'COMPLETED': '#4CAF50',
      'CANCELLED': '#F44336'
    };
    return colors[status] || '#999';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1>🚑 Smart Ambulance Dashboard</h1>
          <p>Welcome, {user?.name} ({user?.role})</p>
        </div>
        <div className="header-right">
          <button className="btn-home" onClick={() => navigate('/')}>
            Home
          </button>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚑</div>
          <div className="stat-info">
            <h3>{ambulances.filter(a => a.available).length}</h3>
            <p>Available Ambulances</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{bookings.filter(b => b.status === 'REQUESTED' || b.status === 'ON_WAY').length}</h3>
            <p>Active Requests</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{bookings.filter(b => b.status === 'COMPLETED').length}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-content">
        {/* BOOKINGS LIST */}
        <div className="bookings-section">
          <h2>All Bookings</h2>
          <div className="bookings-list">
            {bookings.length === 0 ? (
              <div className="no-data">No bookings found</div>
            ) : (
              bookings.map(booking => (
                <div
                  key={booking._id}
                  className={`booking-card ${selectedBooking?._id === booking._id ? 'active' : ''}`}
                  onClick={() => handleBookingClick(booking)}
                >
                  <div className="booking-header">
                    <span 
                      className="booking-status"
                      style={{ backgroundColor: getStatusColor(booking.status) }}
                    >
                      {booking.status}
                    </span>
                    <span className="booking-time">
                      {new Date(booking.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="booking-info">
                    <p><strong>Patient:</strong> {booking.patientName}</p>
                    <p><strong>Phone:</strong> {booking.patientPhone}</p>
                    <p><strong>Type:</strong> {booking.accidentType}</p>
                    {booking.ambulanceId && (
                      <p><strong>Ambulance:</strong> {booking.ambulanceId.vehicleNumber}</p>
                    )}
                    {booking.estimatedTime && (
                      <p className="eta">🕐 ETA: {booking.estimatedTime}</p>
                    )}
                    {booking.distance && (
                      <p className="distance">📍 Distance: {booking.distance}</p>
                    )}
                  </div>

                  {booking.accidentPhoto && (
                    <div className="booking-photo">
                      <img 
                        src={`${process.env.REACT_APP_API_URL}/uploads/${booking.accidentPhoto}`} 
                        alt="Accident"
                      />
                    </div>
                  )}

                  {user?.role === 'ADMIN' && booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
                    <div className="booking-actions">
                      {booking.status === 'REQUESTED' && (
                        <button 
                          className="btn-accept"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(booking._id, 'ACCEPTED');
                          }}
                        >
                          Accept
                        </button>
                      )}
                      {booking.status === 'ACCEPTED' && (
                        <button 
                          className="btn-onway"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(booking._id, 'ON_WAY');
                          }}
                        >
                          On Way
                        </button>
                      )}
                      {booking.status === 'ON_WAY' && (
                        <button 
                          className="btn-complete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(booking._id, 'COMPLETED');
                          }}
                        >
                          Complete
                        </button>
                      )}
                      <button 
                        className="btn-cancel"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(booking._id, 'CANCELLED');
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* MAP VIEW */}
        <div className="map-section">
          <h2>Live Tracking Map</h2>
          <div className="map-wrapper">
            <LoadScript 
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              onLoad={() => setIsMapLoaded(true)}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={selectedBooking ? {
                  lat: selectedBooking.pickupLocation.coordinates[1],
                  lng: selectedBooking.pickupLocation.coordinates[0]
                } : karnatakaCenter}
                zoom={selectedBooking ? 13 : 7}
              >
                {/* Patient Markers */}
                {isMapLoaded && bookings.map(booking => (
                  <Marker
                    key={booking._id}
                    position={{
                      lat: booking.pickupLocation.coordinates[1],
                      lng: booking.pickupLocation.coordinates[0]
                    }}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" fill="${getStatusColor(booking.status)}"/>
                          <text x="12" y="16" font-size="12" text-anchor="middle" fill="white">👤</text>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(35, 35)
                    }}
                    onClick={() => handleBookingClick(booking)}
                  />
                ))}

                {/* Ambulance Markers */}
                {isMapLoaded && ambulances.map((ambulance, index) => (
                  <Marker
                    key={`ambulance-${index}`}
                    position={{
                      lat: ambulance.currentLocation.coordinates[1],
                      lng: ambulance.currentLocation.coordinates[0]
                    }}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
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
                          <rect x="2" y="2" width="20" height="20" rx="10" fill="${ambulance.available ? '#00C853' : '#FF5252'}"/>
                          <circle cx="8" cy="10" r="2" class="light red"/>
                          <circle cx="12" cy="10" r="2" class="light blue"/>
                          <circle cx="16" cy="10" r="2" class="light red"/>
                          <text x="12" y="18" font-size="10" text-anchor="middle" fill="white">🚑</text>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(40, 40)
                    }}
                  />
                ))}

                {/* Route */}
                {directions && <DirectionsRenderer directions={directions} />}
              </GoogleMap>
            </LoadScript>
          </div>

          {selectedBooking && (
            <div className="selected-booking-info">
              <h3>Selected Booking Details</h3>
              <p><strong>Patient:</strong> {selectedBooking.patientName}</p>
              <p><strong>Address:</strong> {selectedBooking.pickupLocation.address}</p>
              <p><strong>Accident Type:</strong> {selectedBooking.accidentType}</p>
              {selectedBooking.estimatedTime && (
                <p className="highlight"><strong>ETA:</strong> {selectedBooking.estimatedTime}</p>
              )}
              {selectedBooking.distance && (
                <p className="highlight"><strong>Distance:</strong> {selectedBooking.distance}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
