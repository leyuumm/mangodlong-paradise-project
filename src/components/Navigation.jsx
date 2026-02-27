import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navigation.css'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`navigation ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-text">Mangodlong Paradise</span>
        </Link>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link 
            to="/accommodations" 
            className={isActive('/accommodations') ? 'active' : ''}
          >
            Accommodations
          </Link>
          <Link 
            to="/experience" 
            className={isActive('/experience') ? 'active' : ''}
          >
            Experience
          </Link>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
          >
            Contact
          </Link>
          <Link 
            to="/booking" 
            className="btn-primary"
          >
            Reserve Now
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
