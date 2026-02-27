import React from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Waves, Sun, Coffee } from 'lucide-react'
import './Home.css'

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Your Exclusive Island Escape Awaits</h1>
          <p className="hero-subtitle">
            Discover paradise at Camotes Island's premier luxury resort
          </p>
          <div className="hero-buttons">
            <Link to="/booking" className="btn-primary-large">
              Book Your Stay Now
            </Link>
            <Link to="/accommodations" className="btn-secondary-large">
              View Suites
            </Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <span className="section-label">Welcome to Paradise</span>
              <h2>Mangodlong Paradise Beach Resort</h2>
              <p>
                Nestled on the pristine shores of Camotes Island, Mangodlong Paradise 
                Beach Resort offers an unparalleled escape from the ordinary. Our luxury 
                accommodations blend modern elegance with tropical charm, creating the 
                perfect sanctuary for discerning travelers.
              </p>
              <p>
                Immerse yourself in crystal-clear waters, bask in golden sunsets, and 
                experience world-class hospitality designed to exceed your every expectation.
              </p>
              <Link to="/experience" className="btn-text">
                Explore Our Resort →
              </Link>
            </div>
            <div className="about-image">
              <div className="image-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80" 
                  alt="Luxury resort pool with ocean view"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Experience Luxury</span>
            <h2>Unmatched Resort Amenities</h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Waves size={32} />
              </div>
              <h3>Beachfront Paradise</h3>
              <p>
                Direct access to pristine white sand beaches and crystal-clear turquoise 
                waters perfect for swimming, snorkeling, and water activities.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sparkles size={32} />
              </div>
              <h3>Luxury Accommodations</h3>
              <p>
                Elegantly appointed suites and cabanas featuring premium amenities, 
                ocean views, and tropical-modern design for ultimate comfort.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Coffee size={32} />
              </div>
              <h3>Fine Dining</h3>
              <p>
                Savor exquisite local and international cuisine prepared by our expert 
                chefs, with fresh seafood and farm-to-table ingredients.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Sun size={32} />
              </div>
              <h3>Island Adventures</h3>
              <p>
                Explore hidden caves, island-hop to nearby attractions, or simply 
                relax by our infinity pool with panoramic ocean views.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Paradise?</h2>
          <p>
            Book your exclusive island escape today and create memories that last a lifetime.
          </p>
          <Link to="/booking" className="btn-primary-large">
            Reserve Your Suite
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
