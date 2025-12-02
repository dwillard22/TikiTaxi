import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <div className="nav-brand">
            <h1>🏝️ TikiTaxi</h1>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#contact">Contact</a>
            <button className="cta-button">Request Ride</button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Safe Ride Around <span className="highlight">Hampton Beach</span>
          </h1>
          <p className="hero-subtitle">
            Skip the walk, avoid the parking hassle, and get around Hampton Beach safely with our eco-friendly golf cart taxi service. Perfect for beach-goers, bar hoppers, and anyone who wants a fun, convenient ride.
          </p>
          <div className="hero-buttons">
            <button className="primary-button">Book Your Ride Now</button>
            <button className="secondary-button">Learn More</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Riders</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Service Available</span>
            </div>
            <div className="stat">
              <span className="stat-number">5★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
        <div className="facebook-video">
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F874494725157713%2F&show_text=false&width=267&t=0"
          width="267"
          height="476"
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
  </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TikiTaxi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚗</div>
              <h3>Quick & Easy Booking</h3>
              <p>Request a ride in seconds through our simple web platform. No app downloads required!</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏖️</div>
              <h3>Beach Specialist</h3>
              <p>We know Hampton Beach like the back of our hand. Get to any spot quickly and safely.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Easy Payments</h3>
              <p>Pay online securely or use cash/Venmo. Multiple payment options for your convenience.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>Our electric golf carts are environmentally friendly and perfect for beach areas.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Real-Time Updates</h3>
              <p>Track your ride, get driver info, and receive updates throughout your journey.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Safe & Reliable</h3>
              <p>Professional drivers, insured vehicles, and a commitment to getting you there safely.</p>
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
              <h3>Request Your Ride</h3>
              <p>Enter your pickup location and destination on our website</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Get Matched</h3>
              <p>We'll connect you with the nearest available driver</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track & Ride</h3>
              <p>See your driver's location and enjoy your safe ride</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Pay & Rate</h3>
              <p>Complete payment and rate your experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Ride?</h2>
          <p>Join hundreds of satisfied customers who choose TikiTaxi for safe, convenient transportation around Hampton Beach.</p>
          <button className="primary-button large">Book Your First Ride</button>
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
                  📸 Instagram
                </a>
                <a href="https://www.facebook.com/profile.php?id=61575173191389" target="_blank" rel="noopener noreferrer">
                  📘 Facebook
                </a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Service Area</h4>
              <p>Hampton Beach, NH<br />
              Seabrook Beach, NH<br />
              North Hampton, NH</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Text us for rides:<br />
              <strong>(Coming Soon: Online Booking)</strong></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 TikiTaxi. All rights reserved. | Ride safely, ride with TikiTaxi!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
