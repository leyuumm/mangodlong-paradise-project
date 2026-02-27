# Quick Start Guide - Mangodlong Paradise Resort Website

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This installs:
- React 18.2
- React Router 6
- React DatePicker
- Lucide React (icons)
- Vite (build tool)
- Stripe integration packages

### Step 2: Start Development Server

```powershell
npm run dev
```

The website will open automatically at: **http://localhost:3000**

### Step 3: Explore the Pages

Navigate through the site:
- **Home:** http://localhost:3000/
- **Accommodations:** http://localhost:3000/accommodations
- **Booking:** http://localhost:3000/booking
- **Experience:** http://localhost:3000/experience
- **Contact:** http://localhost:3000/contact

---

## 📁 Project Structure

```
resort/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   └── Footer.jsx       # Site footer
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Accommodations.jsx
│   │   ├── Booking.jsx      # 4-step booking flow
│   │   ├── Experience.jsx
│   │   ├── Contact.jsx
│   │   └── Confirmation.jsx # Booking success
│   ├── context/
│   │   └── BookingContext.jsx  # Global booking state
│   ├── App.jsx              # Main app component
│   └── main.jsx             # React entry point
├── package.json             # Dependencies
└── vite.config.js           # Build configuration
```

---

## 🎨 Customization Guide

### Change Colors

Edit `src/index.css` (lines 8-22):

```css
:root {
  --sand: #F5E6D3;      /* Beach sand color */
  --teal: #2A9D8F;      /* Primary brand color */
  --ocean: #264653;     /* Dark accent */
  /* ... other colors */
}
```

### Update Resort Information

**Resort Name:**
- `src/components/Navigation.jsx` - Line 28
- `src/components/Footer.jsx` - Line 15

**Contact Details:**
- `src/components/Footer.jsx` - Lines 42-56
- `src/pages/Contact.jsx` - Lines 67-113

**Room Prices:**
- `src/pages/Accommodations.jsx` - Lines 14, 34, 54 (rate field)
- `src/pages/Booking.jsx` - Lines 32, 39, 46 (rate field)

### Replace Placeholder Images

All images currently use Unsplash placeholders. Replace with your resort photos:

**Format:** JPG or WebP, optimized for web

**Images needed:**
1. **Hero/Landing** (1920x1080px)
   - `Home.jsx` line 23: Hero background
   - Navigation transparent overlay

2. **Rooms** (1200x800px)
   - Deluxe Room
   - Island Cabana Suite
   - Beachfront Suite
   
3. **Activities** (800x600px)
   - 6 activity photos in Experience page

**To replace:**
```jsx
// Change this:
src="https://images.unsplash.com/photo-xxxxx?w=800&q=80"

// To your image:
src="/images/your-resort-photo.jpg"
```

Then place images in: `public/images/`

---

## 🔧 Common Tasks

### Add a New Room Type

1. **Edit** `src/pages/Accommodations.jsx`
2. **Add to rooms array** (line 14)
3. **Copy existing room object** and modify:
   ```jsx
   {
     id: 'your-room-id',
     name: 'Your Room Name',
     rate: 8000,
     image: 'your-image-url',
     amenities: [...],
     highlights: [...],
     maxGuests: 4
   }
   ```
4. **Update** `src/pages/Booking.jsx` `rooms` array (line 30)

### Modify Booking Steps

**Location:** `src/pages/Booking.jsx`

- **Step 1 (Guests):** Lines 142-207
- **Step 2 (Room):** Lines 209-240
- **Step 3 (Dates):** Lines 242-290
- **Step 4 (Checkout):** Lines 292-380

### Change Policy/Rules

**Check-in/Check-out times:**
- `src/pages/Accommodations.jsx` - Line 220
- `src/pages/Confirmation.jsx` - Lines 78-92

**Cancellation policy:**
- `src/pages/Accommodations.jsx` - Line 221

**Pet policy:**
- `src/pages/Accommodations.jsx` - Line 222

---

## 💳 Payment Integration

### Stripe Setup (Test Mode)

1. **Get Stripe Test Keys:**
   - Sign up at [stripe.com](https://stripe.com)
   - Get publishable key from dashboard

2. **Create** `.env` file in root:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxx
   ```

3. **Test Cards:**
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry, any CVV

### GCash/Maya Integration

**Philippine Payment Options:**
- Register with [GCash Business](https://www.gcash.com/business/)
- Get API credentials
- Implement redirect flow in Step 4 (Checkout)

---

## 📧 Email Configuration

### Resend Email Service

1. **Sign up** at [resend.com](https://resend.com)
2. **Get API key** from dashboard
3. **Add to** `.env`:
   ```env
   VITE_RESEND_API_KEY=re_xxxxxxxxxxxx
   ```
4. **Configure email templates** in Resend dashboard

**Emails to set up:**
- Booking confirmation
- Pre-arrival reminder (24hrs before)
- Post-stay thank you

---

## 🔄 Automation with Make.com

### Workflow Ideas

**New Booking:**
1. Trigger: Booking completed on website
2. Action: Send confirmation email (Resend)
3. Action: Send WhatsApp message (Twilio)
4. Action: Create row in Google Sheets
5. Action: Notify staff via Gmail

**Pre-Arrival:**
1. Trigger: Time-based (24hrs before check-in)
2. Action: Send reminder email
3. Action: Send WhatsApp message
4. Action: Alert front desk

---

## 📱 Testing on Mobile

### Local Network Testing

1. **Find your IP address:**
   ```powershell
   ipconfig
   ```
   Look for "IPv4 Address"

2. **Start dev server:**
   ```powershell
   npm run dev
   ```

3. **On mobile browser, visit:**
   ```
   http://YOUR-IP-ADDRESS:3000
   ```

### Responsive Design Tools

**Chrome DevTools:**
- Press `F12`
- Click "Toggle Device Toolbar" (Ctrl+Shift+M)
- Select device: iPhone 12, iPad, etc.

---

## 🚀 Building for Production

### Build Command

```powershell
npm run build
```

Creates optimized production files in `dist/` folder.

### Preview Production Build

```powershell
npm run preview
```

Test the production build locally before deploying.

### Deploy to Vercel

**Option 1: Vercel CLI**
```powershell
npm install -g vercel
vercel
```

**Option 2: GitHub Integration**
1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com)
3. Auto-deploy on every push

**Option 3: Manual Upload**
1. Build: `npm run build`
2. Upload `dist/` folder to any static host

---

## 🐛 Troubleshooting

### Port Already in Use

**Problem:** Port 3000 is occupied

**Solution:**
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Or use different port
npm run dev -- --port 3001
```

### Images Not Loading

**Problem:** Images showing broken

**Solution:**
- Check image URLs are correct
- Replace Unsplash URLs with your images
- Place images in `public/images/` folder
- Reference as `/images/your-image.jpg`

### Booking State Not Saving

**Problem:** Booking data resets on page refresh

**Solution:** This is expected! Booking state resets on refresh. For persistence:
- Add localStorage (browser storage)
- Or integrate with backend database

### Date Picker Not Working

**Problem:** Calendar not appearing

**Solution:**
- Check if `react-datepicker` CSS imported
- Import in `Booking.jsx`: 
  ```jsx
  import 'react-datepicker/dist/react-datepicker.css'
  ```

---

## 📚 Helpful Resources

**React Documentation:**
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)

**Component Libraries:**
- [React DatePicker](https://reactdatepicker.com)
- [Lucide Icons](https://lucide.dev)

**Payment Gateways:**
- [Stripe Docs](https://stripe.com/docs)
- [GCash Business](https://help.gcash.com/s/)

**Hosting:**
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

---

## 💡 Next Steps

1. ✅ **Install and run** the project
2. 📸 **Replace placeholder images** with resort photos
3. ✏️ **Update resort information** (name, contact, prices)
4. 🎨 **Customize colors** to match brand
5. 💳 **Set up Stripe** test mode
6. 📧 **Configure Resend** for emails
7. 📱 **Test on mobile** devices
8. 🚀 **Deploy to Vercel**

---

## 🆘 Need Help?

**Common Issues:**
- Check [GitHub Issues](https://github.com/facebook/react/issues) for React
- Search [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- Review documentation files in this project

**Documentation Files in this project:**
- `REACT-README.md` - Complete project overview
- `DESIGN-WIREFRAMES.md` - Visual design guide
- `FEATURE-SPECIFICATION.md` - Detailed features
- `QUICK-START.md` - This file!

---

**Happy Building! 🏖️** 

*Your luxury resort website is ready to launch!*
