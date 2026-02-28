import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { 
  CheckCircle, Calendar, Home, Users, 
  Mail, Phone, Download, ArrowLeft, X 
} from 'lucide-react'
import './Confirmation.css'

const Confirmation = () => {
  const navigate = useNavigate()
  const { bookingData, resetBooking } = useBooking()
  const [showModal, setShowModal] = useState(true)

  useEffect(() => {
    if (!bookingData.confirmed) {
      navigate('/booking')
    }
  }, [bookingData.confirmed, navigate])

  const formatDate = (date) => {
    if (!date) return ''
    const d = date instanceof Date ? date : new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const handleReturnHome = () => {
    resetBooking()
    navigate('/')
  }

  if (!bookingData.confirmed) {
    return null
  }

  return (
    <div className="confirmation-page">
      {/* Modal Overlay */}
      {showModal && (
        <div className="confirmation-modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-header">
              <h3>Booking Confirmed</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-success-icon">
                <CheckCircle size={56} />
              </div>
              <h2 className="modal-heading">
                You are going to <em>Paradise!</em>
              </h2>
              <p className="modal-subtext">Your booking has been confirmed</p>

              <div className="modal-details-card">
                <div className="modal-detail-row">
                  <span>Reference</span>
                  <strong className="accent">#{bookingData.bookingId}</strong>
                </div>
                <div className="modal-detail-row">
                  <span>Room</span>
                  <strong>{bookingData.roomName}</strong>
                </div>
                <div className="modal-detail-row">
                  <span>Guests</span>
                  <strong>
                    {bookingData.adults} {bookingData.adults === 1 ? 'Adult' : 'Adults'}
                    {bookingData.children > 0 && `, ${bookingData.children} ${bookingData.children === 1 ? 'Child' : 'Children'}`}
                  </strong>
                </div>
                <div className="modal-detail-row">
                  <span>Dates</span>
                  <strong>
                    {formatDate(bookingData.checkinDate)} – {formatDate(bookingData.checkoutDate)}
                  </strong>
                </div>
                <div className="modal-detail-row">
                  <span>Total Paid</span>
                  <strong className="accent">₱{bookingData.total.toLocaleString()}</strong>
                </div>
              </div>

              <button className="modal-return-btn" onClick={handleReturnHome}>
                RETURN TO HOME
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <CheckCircle size={64} />
          </div>
          <h1>Booking Confirmed!</h1>
          <p>Your reservation has been successfully completed</p>
        </div>

        <div className="confirmation-content">
          {/* Booking ID */}
          <div className="booking-id-section">
            <span className="label">Booking Reference</span>
            <h2 className="booking-id">{bookingData.bookingId}</h2>
            <p className="booking-note">
              Please save this reference number for your records
            </p>
          </div>

          {/* Booking Details */}
          <div className="booking-details-card">
            <h3>Reservation Details</h3>
            
            <div className="detail-row">
              <div className="detail-icon">
                <Home size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Accommodation</span>
                <strong>{bookingData.roomName}</strong>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon">
                <Calendar size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Check-in</span>
                <strong>
                  {bookingData.checkinDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </strong>
                <span className="detail-note">After 2:00 PM</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon">
                <Calendar size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Check-out</span>
                <strong>
                  {bookingData.checkoutDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </strong>
                <span className="detail-note">Before 12:00 PM</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon">
                <Users size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Guests</span>
                <strong>
                  {bookingData.adults} {bookingData.adults === 1 ? 'Adult' : 'Adults'}
                  {bookingData.children > 0 && `, ${bookingData.children} ${bookingData.children === 1 ? 'Child' : 'Children'}`}
                  {bookingData.pets > 0 && `, ${bookingData.pets} ${bookingData.pets === 1 ? 'Pet' : 'Pets'}`}
                </strong>
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-row">
              <div className="detail-icon">
                <Mail size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Contact Email</span>
                <strong>{bookingData.guestEmail}</strong>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-icon">
                <Phone size={20} />
              </div>
              <div className="detail-content">
                <span className="detail-label">Mobile/WhatsApp</span>
                <strong>{bookingData.guestMobile}</strong>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="payment-summary-card">
            <h3>Payment Summary</h3>
            
            <div className="summary-row">
              <span>
                {bookingData.roomName} × {bookingData.nights} {bookingData.nights === 1 ? 'night' : 'nights'}
              </span>
              <strong>₱{bookingData.subtotal.toLocaleString()}</strong>
            </div>

            <div className="summary-row">
              <span>Taxes & Fees (12%)</span>
              <strong>₱{bookingData.taxAmount.toLocaleString()}</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total">
              <span>Total Paid</span>
              <strong>₱{bookingData.total.toLocaleString()}</strong>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          {bookingData.emailSent && (
            <div className="email-sent-notice">
              <Mail size={20} />
              <span>A confirmation email has been sent to <strong>{bookingData.guestEmail}</strong></span>
            </div>
          )}

          {/* What's Next */}
          <div className="next-steps-card">
            <h3>What happens next?</h3>
            <ul className="next-steps-list">
              <li>
                <CheckCircle size={20} />
                <span>A confirmation email has been sent to {bookingData.guestEmail}</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>You'll receive a WhatsApp message at {bookingData.guestMobile} with your e-voucher</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>Our team will contact you 24 hours before check-in to confirm your arrival</span>
              </li>
              <li>
                <CheckCircle size={20} />
                <span>For any changes or inquiries, contact us at +63 917 123 4567</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="confirmation-actions">
            <button 
              className="btn-primary"
              onClick={handleReturnHome}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
