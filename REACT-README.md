# Mangodlong Paradise Beach Resort - React Website

## 🏖️ Project Overview

A professional, luxury resort booking website built with React, featuring a complete booking engine, accommodation showcase, and guest experience platform for Mangodlong Paradise Beach Resort in Camotes Island, Philippines.

## ✨ Features

### Core Pages
- **Landing/Home Page**
  - Stunning hero section with full-screen background imagery
  - Resort overview and description
  - Featured amenities grid
  - Call-to-action sections
  
- **Accommodations**
  - 3 room types: Deluxe Room, Island Cabana Suite, Beachfront Suite
  - Detailed room cards with images, amenities, and pricing
  - Room highlights and capacity information
  - Direct booking integration

- **Booking Engine (4-Step Process)**
  - **Step 1: Guests** - Select adults, children, and pets
  - **Step 2: Room** - Choose accommodation type
  - **Step 3: Dates** - Pick check-in/check-out with calendar
  - **Step 4: Checkout** - Enter guest info and payment details
  - Real-time price calculation
  - Booking summary sidebar

- **Experience**
  - Resort activities and adventures
  - Facilities and amenities showcase
  - Guest testimonials and reviews

- **Contact**
  - Contact information and location
  - Inquiry form with validation
  - Interactive map integration

- **Confirmation**
  - Booking confirmation page
  - Booking reference number
  - Detailed reservation summary
  - E-voucher download option

## 🎨 Design System

### Color Palette (Sand & Teal Theme)
- **Primary Colors:**
  - Sand: `#F5E6D3` (warm, beachy)
  - Teal: `#2A9D8F` (oceanic, luxury)
  - Ocean: `#264653` (deep, elegant)
  
- **Accent Colors:**
  - Coral: `#E76F51`
  - Gold: `#D4AF37`
  
- **Typography:**
  - Headings: Cormorant Garamond (serif, elegant)
  - Body: Montserrat (clean, modern)

### Design Principles
- Professional luxury aesthetic
- Clean, minimalist layouts
- Generous white space
- High-quality imagery
- Smooth animations and transitions
- Mobile-first responsive design

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI framework
- **React Router 6** - Navigation and routing
- **React DatePicker** - Date selection component
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Planned Integrations
- **Stripe** - Payment processing
- **GCash/Maya** - Local payment options
- **Google Workspace** - Staff email and collaboration
- **Make.com** - Automation workflows
- **Resend** - Transactional emails

### Hosting Options
- **Vercel** (Recommended) - Automatic deployments, edge network
- **AWS** - Scalable cloud infrastructure
- **Netlify** - Alternative hosting with CI/CD

## 📁 Project Structure

```
resort/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Accommodations.jsx
│   │   ├── Accommodations.css
│   │   ├── Booking.jsx
│   │   ├── Booking.css
│   │   ├── Experience.jsx
│   │   ├── Experience.css
│   │   ├── Contact.jsx
│   │   ├── Contact.css
│   │   ├── Confirmation.jsx
│   │   └── Confirmation.css
│   ├── context/
│   │   └── BookingContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index-react.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:3000`

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=your_backend_api_url
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
```

### Payment Integration

#### Stripe Setup
1. Create a Stripe account at stripe.com
2. Get your publishable key
3. Add to environment variables
4. Configure webhook endpoints for payment confirmation

#### GCash/Maya Setup
1. Register as a merchant
2. Obtain API credentials
3. Implement payment gateway integration
4. Add payment method options in checkout

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

All pages adapt seamlessly to different screen sizes with optimized layouts and touch-friendly interactions.

## 🎯 User Flow

```
Landing Page
    ↓
Accommodations → Select Room
    ↓
Booking Step 1 (Guests)
    ↓
Booking Step 2 (Room)
    ↓
Booking Step 3 (Dates)
    ↓
Booking Step 4 (Checkout & Payment)
    ↓
Confirmation Page
    ↓
Email Confirmation & E-Voucher
```

## 🔐 Security Considerations

- [ ] Implement HTTPS/SSL certificate
- [ ] Sanitize user inputs
- [ ] Use secure payment gateway (PCI compliant)
- [ ] Implement CSRF protection
- [ ] Add rate limiting for API endpoints
- [ ] Secure session management
- [ ] Regular security audits

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

### Alternative: Manual Build Upload

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder to your hosting provider

## 📊 Performance Optimization

- Image optimization (lazy loading, WebP format)
- Code splitting with React Router
- CSS optimization and minification
- Asset preloading for critical resources
- Service worker for offline capability (optional)

## 🔄 Future Enhancements

- [ ] Multi-language support (English, Tagalog, etc.)
- [ ] Admin dashboard for booking management
- [ ] Real-time availability calendar
- [ ] Chat support integration (WhatsApp/Messenger)
- [ ] Customer review system
- [ ] Loyalty program
- [ ] Special offers and promotions
- [ ] Blog section for travel tips
- [ ] Photo gallery with lightbox
- [ ] Weather widget for Camotes Island

## 📝 License

© 2026 Mangodlong Paradise Beach Resort. All rights reserved.

## 👥 Contact

For development inquiries or support:
- Email: dev@mangodlongparadise.com
- Website: www.mangodlongparadise.com

## 🙏 Acknowledgments

- Design inspiration from luxury resort websites
- Icons by Lucide React
- Fonts by Google Fonts
- Images by Unsplash (replace with actual resort photos)

---

**Built with ❤️ for Mangodlong Paradise Beach Resort**
