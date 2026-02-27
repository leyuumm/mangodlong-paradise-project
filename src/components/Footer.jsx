import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mangodlong Paradise</h3>
          <p className="footer-description">
            Your exclusive island escape awaits in the heart of Camotes Island, Philippines.
            Experience luxury, tranquility, and tropical beauty.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/accommodations">Accommodations</Link></li>
            <li><Link to="/experience">Experience</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/booking">Reserve Now</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} />
              <span>Mangodlong, Camotes Island<br />Cebu, Philippines</span>
            </li>
            <li>
              <Phone size={18} />
              <span>+63 917 123 4567</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@mangodlongparadise.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Facebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Mangodlong Paradise Beach Resort. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
