import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleBookRide = () => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/rides');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>🏝️ TikiTaxi</h1>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="cta-button">Sign Up</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Your Safe Ride Around <span className="highlight">Hampton Beach</span>
            </h1>
            <p className="hero-subtitle">
              Skip the walk, avoid the parking hassle, and get around Hampton Beach safely with our eco-friendly golf cart taxi service.
            </p>
            <div className="hero-buttons">
              <button onClick={handleBookRide} className="primary-button">Book Your Ride Now</button>
              <a href="#features" className="secondary-button">Learn More</a>
            </div>
          </div>
          <div className="hero-video">
            <iframe
              src="https://www.instagram.com/reel/DRqAYtQDrnB/embed/"
              width="100%"
              height="650"
              style={{ border: 'none', overflow: 'hidden' }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="TikiTaxi Instagram Reel"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TikiTaxi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Quick & Easy</h3>
              <p>Request a ride in seconds through our simple web platform.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏖️</div>
              <h3>Beach Specialist</h3>
              <p>We know Hampton Beach like the back of our hand.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Easy Payments</h3>
              <p>Pay online securely or use cash/Venmo.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>Our electric golf carts are environmentally friendly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Request</h3>
              <p>Enter your pickup and destination</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Matched</h3>
              <p>We connect you with the nearest driver</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Ride</h3>
              <p>Enjoy your safe ride around the beach</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Pay</h3>
              <p>Complete payment easily</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Ride?</h2>
          <p>Join hundreds of satisfied customers who choose TikiTaxi for safe, convenient transportation.</p>
          <button onClick={handleBookRide} className="primary-button large">Book Your First Ride</button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>🏝️ TikiTaxi</h3>
              <p>Your trusted golf cart taxi service in Hampton Beach, NH</p>
              <div className="social-links">
                <a href="https://www.instagram.com/the_tiki_taxi/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575173191389" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Service Area</h4>
              <p>Hampton Beach, NH<br />
              Seabrook Beach, NH<br />
              North Hampton, NH</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Text us for rides or book online</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 TikiTaxi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

