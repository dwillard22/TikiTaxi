import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Rides.css';
import '../App.css';

const Rides: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Connect to backend API
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Ride request submitted! You will receive a confirmation shortly.');
      setPickup('');
      setDestination('');
      setPhone('');
    }, 1000);
  };

  // Show loading or redirect if not logged in
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h1>🏝️ TikiTaxi</h1>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/rides">Request Ride</Link>
            <button onClick={handleLogout} className="cta-button logout-button">
              Logout
            </button>
          </div>
        </nav>
      </header>
      <div className="rides-page">
        <div className="rides-container">
        <div className="rides-header">
          <h1>Request a Ride</h1>
          <p>Quick and easy ride booking for Hampton Beach</p>
        </div>

        <form className="rides-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pickup">Pickup Location</label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter your pickup address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Where would you like to go?"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(603) 555-0123"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Request Ride'}
          </button>
        </form>

        <div className="rides-info">
          <div className="info-card">
            <h3>Estimated Wait Time</h3>
            <p className="wait-time">5-10 minutes</p>
          </div>
          <div className="info-card">
            <h3>Service Hours</h3>
            <p>Daily: 9:00 AM - 11:00 PM</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Rides;

