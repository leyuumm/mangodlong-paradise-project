import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { 
  Wifi, Wind, Bath, Eye, Sofa, Sparkles, 
  Users, PawPrint, ArrowRight 
} from 'lucide-react'
import './Accommodations.css'

const Accommodations = () => {
  const navigate = useNavigate()
  const { updateBookingData, setCurrentStep } = useBooking()

  const rooms = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      description: 'Comfortable and elegantly designed room perfect for couples or solo travelers seeking a premium island experience.',
      rate: 4500,
      currency: 'PHP',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
      amenities: [
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Bath, label: 'Premium Bath' },
        { icon: Sparkles, label: 'Premium Linens' }
      ],
      highlights: [
        'Queen-size bed',
        '32" Smart TV',
        'Mini refrigerator',
        'Private balcony',
        'Coffee/tea maker'
      ],
      maxGuests: 2
    },
    {
      id: 'cabana',
      name: 'Island Cabana Suite',
      description: 'Spacious tropical cabana with authentic island charm, featuring a private patio and lush garden views.',
      rate: 6500,
      currency: 'PHP',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      amenities: [
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Sofa, label: 'Living Area' },
        { icon: Bath, label: 'Premium Bath' },
        { icon: Sparkles, label: 'Mini-bar' }
      ],
      highlights: [
        'King-size bed',
        'Separate living area',
        'Private patio with seating',
        'Garden or pool view',
        'Mini-bar included',
        'Luxury toiletries'
      ],
      maxGuests: 3
    },
    {
      id: 'beachfront',
      name: 'Beachfront Suite',
      description: 'Our signature luxury suite offering direct beach access, panoramic ocean views, and world-class amenities.',
      rate: 9500,
      currency: 'PHP',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      amenities: [
        { icon: Eye, label: 'Ocean View Balcony' },
        { icon: Sofa, label: 'Living Area' },
        { icon: Wind, label: 'Air Conditioning' },
        { icon: Bath, label: 'Luxury Bathroom' },
        { icon: Sparkles, label: 'Premium Mini-bar' }
      ],
      highlights: [
        'King-size bed with ocean view',
        'Spacious living area',
        'Large private balcony',
        'Direct beach access',
        'Premium mini-bar',
        'Jacuzzi bathtub',
        'Premium toiletries & robes'
      ],
      maxGuests: 4,
      featured: true
    }
  ]

  const handleCheckRates = (room) => {
    updateBookingData({
      roomType: room.id,
      roomName: room.name,
      roomRate: room.rate,
      roomAmenities: room.highlights
    })
    setCurrentStep(1)
    navigate('/booking')
  }

  return (
    <div className="accommodations-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>Luxury Accommodations</h1>
          <p>Choose from our selection of elegantly appointed rooms and suites</p>
        </div>
      </section>

      <div className="container">
        <section className="rooms-section">
          {rooms.map((room) => (
            <div 
              key={room.id} 
              className={`room-card ${room.featured ? 'featured' : ''}`}
            >
              {room.featured && (
                <div className="featured-badge">
                  <Sparkles size={16} />
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="room-image">
                <img src={room.image} alt={room.name} />
                <div className="room-image-overlay">
                  <button 
                    className="btn-view-details"
                    onClick={() => handleCheckRates(room)}
                  >
                    View Details
                  </button>
                </div>
              </div>

              <div className="room-content">
                <div className="room-header">
                  <h2>{room.name}</h2>
                  <div className="room-rate">
                    <span className="rate-amount">₱{room.rate.toLocaleString()}</span>
                    <span className="rate-period">per night</span>
                  </div>
                </div>

                <p className="room-description">{room.description}</p>

                <div className="room-amenities">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-tag">
                      <amenity.icon size={18} />
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>

                <div className="room-highlights">
                  <h4>Room Highlights</h4>
                  <ul>
                    {room.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="room-footer">
                  <div className="room-capacity">
                    <Users size={18} />
                    <span>Up to {room.maxGuests} guests</span>
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => handleCheckRates(room)}
                  >
                    Check Rates
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="booking-info">
          <div className="info-card">
            <h3>Booking Information</h3>
            <ul>
              <li><strong>Check-in:</strong> 2:00 PM</li>
              <li><strong>Check-out:</strong> 12:00 PM</li>
              <li><strong>Cancellation:</strong> Free cancellation up to 48 hours before check-in</li>
              <li><strong>Pets:</strong> <PawPrint size={16} /> Pet-friendly rooms available (additional fee applies)</li>
              <li><strong>Payment:</strong> We accept major credit cards, GCash, and Maya</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Accommodations
