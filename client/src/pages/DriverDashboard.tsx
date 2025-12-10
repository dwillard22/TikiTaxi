import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tikiLogo from '../assets/TikiTaxiLogo.png';
import './DriverDashboard.css';
import '../App.css';

interface RideRequest {
  id: string;
  riderName: string;
  phone: string;
  pickup: string;
  destination: string;
  requestedAt: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed';
}

const DriverDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState<any>(null);

  useEffect(() => {
    // Check if driver is logged in
    const driverData = localStorage.getItem('driver');
    if (!driverData) {
      navigate('/driver/login');
    } else {
      setDriver(JSON.parse(driverData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('driver');
    localStorage.removeItem('driverToken');
    navigate('/');
  };
  const [rideRequests, setRideRequests] = useState<RideRequest[]>([
    {
      id: '1',
      riderName: 'John Doe',
      phone: '(603) 555-0123',
      pickup: '123 Ocean Blvd, Hampton Beach',
      destination: 'Hampton Beach State Park',
      requestedAt: '2 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      riderName: 'Jane Smith',
      phone: '(603) 555-0456',
      pickup: 'Hampton Beach Casino',
      destination: 'Seabrook Beach',
      requestedAt: '5 minutes ago',
      status: 'pending'
    }
  ]);

  const handleAccept = (id: string) => {
    setRideRequests(requests =>
      requests.map(req =>
        req.id === id ? { ...req, status: 'accepted' } : req
      )
    );
  };

  const handleDecline = (id: string) => {
    setRideRequests(requests =>
      requests.filter(req => req.id !== id)
    );
  };

  const pendingRequests = rideRequests.filter(r => r.status === 'pending');
  const activeRides = rideRequests.filter(r => r.status === 'accepted' || r.status === 'in-progress');

  // Show loading or redirect if not logged in
  if (!driver) {
    return null;
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src={tikiLogo} alt="TikiTaxi logo" className="nav-logo" />
              <h1> TikiTaxi</h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <span style={{ color: '#F5A623', fontWeight: 600 }}>Driver Portal</span>
            <button 
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '2px solid #E8734E',
                color: '#E8734E',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                marginLeft: '1rem'
              }}
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div className="driver-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1>Driver Dashboard</h1>
            <p>Welcome, {driver?.name || 'Driver'}! Manage your ride requests</p>
          </div>

          {activeRides.length > 0 && (
            <section className="active-rides-section">
              <h2>Active Rides</h2>
              <div className="rides-list">
                {activeRides.map(ride => (
                  <div key={ride.id} className="ride-card active">
                    <div className="ride-header">
                      <div className="ride-info">
                        <h3>{ride.riderName}</h3>
                        <p className="ride-phone">{ride.phone}</p>
                      </div>
                      <span className="status-badge active">Active</span>
                    </div>
                    <div className="ride-details">
                      <div className="location">
                        <span className="location-label">From:</span>
                        <span className="location-text">{ride.pickup}</span>
                      </div>
                      <div className="location">
                        <span className="location-label">To:</span>
                        <span className="location-text">{ride.destination}</span>
                      </div>
                    </div>
                    <div className="ride-actions">
                      <button className="action-button message">Message Rider</button>
                      <button className="action-button complete">Complete Ride</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="requests-section">
            <h2>New Ride Requests</h2>
            {pendingRequests.length === 0 ? (
              <div className="no-requests">
                <p>No new ride requests at the moment</p>
              </div>
            ) : (
              <div className="rides-list">
                {pendingRequests.map(ride => (
                  <div key={ride.id} className="ride-card">
                    <div className="ride-header">
                      <div className="ride-info">
                        <h3>{ride.riderName}</h3>
                        <p className="ride-phone">{ride.phone}</p>
                        <p className="ride-time">{ride.requestedAt}</p>
                      </div>
                      <span className="status-badge pending">New</span>
                    </div>
                    <div className="ride-details">
                      <div className="location">
                        <span className="location-label">From:</span>
                        <span className="location-text">{ride.pickup}</span>
                      </div>
                      <div className="location">
                        <span className="location-label">To:</span>
                        <span className="location-text">{ride.destination}</span>
                      </div>
                    </div>
                    <div className="ride-actions">
                      <button
                        className="action-button accept"
                        onClick={() => handleAccept(ride.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="action-button decline"
                        onClick={() => handleDecline(ride.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;

