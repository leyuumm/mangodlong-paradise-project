import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './pages/Home'
import Accommodations from './pages/Accommodations'
import Booking from './pages/Booking'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Confirmation from './pages/Confirmation'
import './App.css'

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/accommodations" element={<Accommodations />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </BookingProvider>
  )
}

export default App
