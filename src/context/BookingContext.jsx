import React, { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    // Step 1: Guests
    adults: 2,
    children: 0,
    pets: 0,
    
    // Step 2: Room
    roomType: '',
    roomName: '',
    roomRate: 0,
    roomAmenities: [],
    
    // Step 3: Dates
    checkinDate: '',
    checkoutDate: '',
    nights: 0,
    
    // Step 4: Guest Info & Payment
    guestName: '',
    guestEmail: '',
    guestMobile: '',
    
    // Pricing
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    
    // Confirmation
    bookingId: '',
    confirmed: false
  })

  const [currentStep, setCurrentStep] = useState(1)

  const updateBookingData = (updates) => {
    setBookingData(prev => ({ ...prev, ...updates }))
  }

  const calculateTotal = () => {
    const subtotal = bookingData.roomRate * bookingData.nights
    const taxAmount = subtotal * 0.12 // 12% tax
    const total = subtotal + taxAmount
    
    updateBookingData({
      subtotal,
      taxAmount,
      total
    })
  }

  const resetBooking = () => {
    setBookingData({
      adults: 2,
      children: 0,
      pets: 0,
      roomType: '',
      roomName: '',
      roomRate: 0,
      roomAmenities: [],
      checkinDate: '',
      checkoutDate: '',
      nights: 0,
      guestName: '',
      guestEmail: '',
      guestMobile: '',
      subtotal: 0,
      taxAmount: 0,
      total: 0,
      bookingId: '',
      confirmed: false
    })
    setCurrentStep(1)
  }

  const value = {
    bookingData,
    updateBookingData,
    currentStep,
    setCurrentStep,
    calculateTotal,
    resetBooking
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}
