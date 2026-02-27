import React from 'react'
import { 
  Waves, Utensils, Activity, Camera, 
  Ship, Mountain, Sun, Heart 
} from 'lucide-react'
import './Experience.css'

const Experience = () => {
  const activities = [
    {
      icon: Waves,
      title: 'Water Sports',
      description: 'Kayaking, paddleboarding, snorkeling, and jet ski adventures in crystal-clear waters.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80'
    },
    {
      icon: Ship,
      title: 'Island Hopping',
      description: 'Explore nearby islands, hidden beaches, and stunning limestone caves with our guided tours.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80'
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Savor fresh seafood and international cuisine at our beachfront restaurant with ocean views.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80'
    },
    {
      icon: Activity,
      title: 'Beach Activities',
      description: 'Beach volleyball, frisbee, sandcastle building, and sunset yoga sessions on pristine sands.',
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80'
    },
    {
      icon: Camera,
      title: 'Photography Tours',
      description: 'Capture stunning landscapes and sunsets with our professional photography guides.',
      image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=600&q=80'
    },
    {
      icon: Mountain,
      title: 'Cave Exploration',
      description: 'Discover the famous Timubo Cave and other natural wonders of Camotes Island.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80'
    }
  ]

  const facilities = [
    'Infinity Pool with Ocean View',
    'Private Beach Access',
    'Beachfront Restaurant & Bar',
    'Spa & Wellness Center',
    '24/7 Concierge Service',
    'Free Wi-Fi Throughout',
    'Water Sports Equipment',
    'Island Tour Arrangements',
    'Airport/Port Transfers',
    'Complimentary Breakfast'
  ]

  return (
    <div className="experience-page">
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>The Mangodlong Experience</h1>
          <p>Discover endless possibilities for adventure, relaxation, and unforgettable memories</p>
        </div>
      </section>

      <div className="container">
        {/* Activities Grid */}
        <section className="activities-section">
          <div className="section-header">
            <span className="section-label">Things to Do</span>
            <h2>Activities & Adventures</h2>
          </div>

          <div className="activities-grid">
            {activities.map((activity, index) => (
              <div key={index} className="activity-card">
                <div className="activity-image">
                  <img src={activity.image} alt={activity.title} />
                  <div className="activity-icon">
                    <activity.icon size={32} />
                  </div>
                </div>
                <div className="activity-content">
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Section */}
        <section className="facilities-section">
          <div className="section-header">
            <span className="section-label">Resort Amenities</span>
            <h2>World-Class Facilities</h2>
          </div>

          <div className="facilities-grid">
            {facilities.map((facility, index) => (
              <div key={index} className="facility-item">
                <Heart size={20} />
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section">
          <div className="section-header">
            <span className="section-label">Guest Reviews</span>
            <h2>What Our Guests Say</h2>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p>
                "An absolute paradise! The beachfront suite was stunning, the staff was 
                incredibly welcoming, and the food was exceptional. We'll definitely be back!"
              </p>
              <div className="testimonial-author">
                <strong>Sarah Johnson</strong>
                <span>Manila, Philippines</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p>
                "Perfect honeymoon destination. The island hopping tour was amazing, and 
                watching the sunset from our balcony was unforgettable. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <strong>Michael & Lisa Chen</strong>
                <span>Singapore</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p>
                "Best family vacation ever! The kids loved the beach activities, we enjoyed 
                the spa, and everyone raved about the restaurant. Five stars all around!"
              </p>
              <div className="testimonial-author">
                <strong>David Martinez</strong>
                <span>Cebu, Philippines</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Experience
