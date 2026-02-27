import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { 
  CheckCircle, Calendar, Home, Users, 
  Mail, Phone, Download, ArrowLeft 
} from 'lucide-react'
import './Confirmation.css'

const Confirmation = () => {
  const navigate = useNavigate()
  const { bookingData, resetBooking } = useBooking()

  useEffect(() => {
    if (!bookingData.confirmed) {
      navigate('/booking')
    }
  }, [bookingData.confirmed, navigate])

  const handleNewBooking = () => {
    resetBooking()
    navigate('/booking')
  }

  const handleDownloadReceipt = () => {
    // Implement PDF download functionality
    alert('Receipt download functionality - integrate with PDF generation service')
  }

  if (!bookingData.confirmed) {
    return null
  }

  return (
    <div className="confirmation-page">
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
              className="btn-secondary"
              onClick={handleDownloadReceipt}
            >
              <Download size={20} />
              Download Receipt
            </button>
            <button 
              className="btn-primary"
              onClick={handleNewBooking}
            >
              Make Another Booking
            </button>
          </div>

          {/* Back to Home */}
          <div className="back-to-home">
            <Link to="/" className="btn-text">
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
