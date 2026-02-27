import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { 
  Users, Plus, Minus, Home, Calendar, 
  CreditCard, Check, ChevronRight, ChevronLeft 
} from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Booking.css'

const Booking = () => {
  const navigate = useNavigate()
  const { 
    bookingData, 
    updateBookingData, 
    currentStep, 
    setCurrentStep,
    calculateTotal 
  } = useBooking()

  const steps = [
    { number: 1, title: 'Guests', icon: Users },
    { number: 2, title: 'Room', icon: Home },
    { number: 3, title: 'Dates', icon: Calendar },
    { number: 4, title: 'Checkout', icon: CreditCard }
  ]

  const rooms = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      rate: 4500,
      maxGuests: 2,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=80'
    },
    {
      id: 'cabana',
      name: 'Island Cabana Suite',
      rate: 6500,
      maxGuests: 3,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=80'
    },
    {
      id: 'beachfront',
      name: 'Beachfront Suite',
      rate: 9500,
      maxGuests: 4,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80'
    }
  ]

  const handleGuestChange = (type, delta) => {
    const newValue = Math.max(0, bookingData[type] + delta)
    if (type === 'adults' && newValue < 1) return
    updateBookingData({ [type]: newValue })
  }

  const handleRoomSelect = (room) => {
    updateBookingData({
      roomType: room.id,
      roomName: room.name,
      roomRate: room.rate
    })
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates
    updateBookingData({
      checkinDate: start,
      checkoutDate: end
    })
    
    if (start && end) {
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      updateBookingData({ nights })
    }
  }

  useEffect(() => {
    if (bookingData.nights > 0 && bookingData.roomRate > 0) {
      calculateTotal()
    }
  }, [bookingData.nights, bookingData.roomRate])

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.adults >= 1
      case 2:
        return bookingData.roomType !== ''
      case 3:
        return bookingData.checkinDate && bookingData.checkoutDate
      case 4:
        return bookingData.guestName && bookingData.guestEmail && bookingData.guestMobile
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed()) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1)
      } else {
        handleCheckout()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCheckout = () => {
    const bookingId = 'MPB' + Date.now().toString().slice(-8)
    updateBookingData({ 
      bookingId,
      confirmed: true 
    })
    navigate('/confirmation')
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Progress Steps */}
        <div className="booking-steps">
          {steps.map((step) => (
            <div 
              key={step.number}
              className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
            >
              <div className="step-icon">
                {currentStep > step.number ? (
                  <Check size={20} />
                ) : (
                  <step.icon size={20} />
                )}
              </div>
              <div className="step-content">
                <span className="step-number">Step {step.number}</span>
                <span className="step-title">{step.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="booking-content">
          {/* Step 1: Guests */}
          {currentStep === 1 && (
            <div className="step-panel">
              <h2>How many guests?</h2>
              <p className="step-description">
                Select the number of guests for your reservation
              </p>

              <div className="guest-counters">
                <div className="counter-group">
                  <div className="counter-label">
                    <Users size={24} />
                    <div>
                      <strong>Adults</strong>
                      <span>Ages 13+</span>
                    </div>
                  </div>
                  <div className="counter-controls">
                    <button 
                      onClick={() => handleGuestChange('adults', -1)}
                      disabled={bookingData.adults <= 1}
                    >
                      <Minus size={20} />
                    </button>
                    <span>{bookingData.adults}</span>
                    <button onClick={() => handleGuestChange('adults', 1)}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="counter-group">
                  <div className="counter-label">
                    <Users size={24} />
                    <div>
                      <strong>Children</strong>
                      <span>Ages 2-12</span>
                    </div>
                  </div>
                  <div className="counter-controls">
                    <button 
                      onClick={() => handleGuestChange('children', -1)}
                      disabled={bookingData.children <= 0}
                    >
                      <Minus size={20} />
                    </button>
                    <span>{bookingData.children}</span>
                    <button onClick={() => handleGuestChange('children', 1)}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="counter-group">
                  <div className="counter-label">
                    <Users size={24} />
                    <div>
                      <strong>Pets</strong>
                      <span>Additional fee applies</span>
                    </div>
                  </div>
                  <div className="counter-controls">
                    <button 
                      onClick={() => handleGuestChange('pets', -1)}
                      disabled={bookingData.pets <= 0}
                    >
                      <Minus size={20} />
                    </button>
                    <span>{bookingData.pets}</span>
                    <button onClick={() => handleGuestChange('pets', 1)}>
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Room Selection */}
          {currentStep === 2 && (
            <div className="step-panel">
              <h2>Choose your room</h2>
              <p className="step-description">
                Select the perfect accommodation for your stay
              </p>

              <div className="room-selection">
                {rooms.map((room) => (
                  <div 
                    key={room.id}
                    className={`room-option ${bookingData.roomType === room.id ? 'selected' : ''}`}
                    onClick={() => handleRoomSelect(room)}
                  >
                    <img src={room.image} alt={room.name} />
                    <div className="room-option-content">
                      <h3>{room.name}</h3>
                      <div className="room-option-details">
                        <span>Up to {room.maxGuests} guests</span>
                        <span className="room-rate">₱{room.rate.toLocaleString()}/night</span>
                      </div>
                    </div>
                    {bookingData.roomType === room.id && (
                      <div className="selected-badge">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date Selection */}
          {currentStep === 3 && (
            <div className="step-panel">
              <h2>Select your dates</h2>
              <p className="step-description">
                Choose your check-in and check-out dates
              </p>

              <div className="date-selection">
                <DatePicker
                  selected={bookingData.checkinDate}
                  onChange={handleDateChange}
                  startDate={bookingData.checkinDate}
                  endDate={bookingData.checkoutDate}
                  selectsRange
                  inline
                  minDate={new Date()}
                  monthsShown={2}
                />

                {bookingData.nights > 0 && (
                  <div className="date-summary">
                    <div className="date-info">
                      <strong>Check-in:</strong>
                      <span>{bookingData.checkinDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="date-info">
                      <strong>Check-out:</strong>
                      <span>{bookingData.checkoutDate?.toLocaleDateString()}</span>
                    </div>
                    <div className="date-info highlight">
                      <strong>Duration:</strong>
                      <span>{bookingData.nights} {bookingData.nights === 1 ? 'night' : 'nights'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Guest Info & Payment */}
          {currentStep === 4 && (
            <div className="step-panel">
              <h2>Guest Information & Payment</h2>
              <p className="step-description">
                Please provide your details to complete the booking
              </p>

              <div className="checkout-form">
                <div className="form-section">
                  <h3>Contact Information</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={bookingData.guestName}
                      onChange={(e) => updateBookingData({ guestName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={bookingData.guestEmail}
                      onChange={(e) => updateBookingData({ guestEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      value={bookingData.guestMobile}
                      onChange={(e) => updateBookingData({ guestMobile: e.target.value })}
                      placeholder="+63 917 123 4567"
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>Payment Method</h3>
                  <div className="payment-methods">
                    <button className="payment-method active">
                      <CreditCard size={24} />
                      <span>Credit/Debit Card</span>
                    </button>
                    <button className="payment-method">
                      <img src="https://via.placeholder.com/24" alt="GCash" />
                      <span>GCash</span>
                    </button>
                    <button className="payment-method">
                      <img src="https://via.placeholder.com/24" alt="Maya" />
                      <span>Maya</span>
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Booking Summary Sidebar */}
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          
          {bookingData.roomName && (
            <>
              <div className="summary-item">
                <span>Room Type</span>
                <strong>{bookingData.roomName}</strong>
              </div>
              <div className="summary-item">
                <span>Guests</span>
                <strong>
                  {bookingData.adults} {bookingData.adults === 1 ? 'Adult' : 'Adults'}
                  {bookingData.children > 0 && `, ${bookingData.children} ${bookingData.children === 1 ? 'Child' : 'Children'}`}
                  {bookingData.pets > 0 && `, ${bookingData.pets} ${bookingData.pets === 1 ? 'Pet' : 'Pets'}`}
                </strong>
              </div>
            </>
          )}

          {bookingData.nights > 0 && (
            <>
              <div className="summary-item">
                <span>Check-in</span>
                <strong>{bookingData.checkinDate?.toLocaleDateString()}</strong>
              </div>
              <div className="summary-item">
                <span>Check-out</span>
                <strong>{bookingData.checkoutDate?.toLocaleDateString()}</strong>
              </div>
              <div className="summary-item">
                <span>Duration</span>
                <strong>{bookingData.nights} {bookingData.nights === 1 ? 'night' : 'nights'}</strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item">
                <span>₱{bookingData.roomRate.toLocaleString()} × {bookingData.nights} nights</span>
                <strong>₱{bookingData.subtotal.toLocaleString()}</strong>
              </div>
              <div className="summary-item">
                <span>Taxes & Fees (12%)</span>
                <strong>₱{bookingData.taxAmount.toLocaleString()}</strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total Amount</span>
                <strong>₱{bookingData.total.toLocaleString()}</strong>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="booking-actions">
          {currentStep > 1 && (
            <button className="btn-secondary" onClick={handleBack}>
              <ChevronLeft size={20} />
              Back
            </button>
          )}
          <button 
            className="btn-primary"
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentStep === 4 ? 'Complete Booking' : 'Continue'}
            {currentStep < 4 && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Booking
