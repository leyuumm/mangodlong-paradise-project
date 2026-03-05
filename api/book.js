import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { jsPDF } from 'jspdf'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
)

const resend = new Resend(process.env.RESEND_API_KEY)

// Use a verified domain sender. Set RESEND_FROM_EMAIL in your environment.
// Example: "Mangodlong Paradise <bookings@yourdomain.com>"
// If not set, falls back to onboarding@resend.dev (only delivers to your own Resend account email).
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Mangodlong Paradise <onboarding@resend.dev>'

function generateBookingRef() {
  const num = Math.floor(1000 + Math.random() * 9000)
  return `MPR-${num}`
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function formatCurrency(amount) {
  return `₱${Number(amount).toLocaleString('en-PH')}`
}

function buildConfirmationEmail(booking) {
  const googleMapsLink =
    process.env.VITE_GOOGLE_MAPS_LINK ||
    'https://www.google.com/maps/dir//Mangodlong+Paradise+Beach+Resort'

  const firstName = booking.guest_name.split(' ')[0]

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f0ece4;font-family:Georgia,'Times New Roman',Times,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ece4;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="640" cellpadding="0" cellspacing="0" style="max-width:640px;width:100%;background-color:#faf8f4;border-radius:8px;overflow:hidden;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color:#6b9fa1;padding:36px 24px;text-align:center;">
              <h1 style="margin:0;font-size:28px;letter-spacing:6px;color:#ffffff;font-weight:400;">
                M A N G O D L O N G &nbsp; P A R A D I S E
              </h1>
              <p style="margin:8px 0 0;font-size:13px;letter-spacing:4px;color:#d4e8e9;font-weight:300;">
                B E A C H &nbsp; R E S O R T &nbsp; · &nbsp; C A M O T E S &nbsp; I S L A N D
              </p>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding:40px 24px 0;text-align:center;">
              <div style="width:80px;height:80px;border-radius:50%;background-color:#b8d8d9;margin:0 auto;display:flex;align-items:center;justify-content:center;">
                <img src="https://img.icons8.com/ios-filled/50/6b9fa1/checkmark--v1.png" alt="✓" width="40" height="40" style="display:block;margin:auto;" />
              </div>
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td style="padding:24px 24px 0;text-align:center;">
              <h2 style="margin:0;font-size:28px;color:#3a3a3a;font-weight:400;">
                Your Escape is <em>Confirmed!</em>
              </h2>
              <p style="margin:12px 0 0;font-size:15px;color:#7a7a7a;">
                Dear ${firstName}, pack your bags — paradise awaits.
              </p>
            </td>
          </tr>

          <!-- Booking Details Card -->
          <tr>
            <td style="padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd6;border-radius:6px;overflow:hidden;">
                
                <!-- Booking Reference -->
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #e0ddd6;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">
                          BOOKING REFERENCE
                        </td>
                        <td align="right" style="font-size:22px;color:#6b9fa1;font-weight:700;">
                          #${booking.booking_ref}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Room -->
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #e0ddd6;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">ROOM</p>
                    <p style="margin:0;font-size:16px;color:#3a3a3a;">${booking.room_name}</p>
                  </td>
                </tr>

                <!-- Guests -->
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #e0ddd6;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">GUESTS</p>
                    <p style="margin:0;font-size:16px;color:#3a3a3a;">
                      ${booking.adults} Adult${booking.adults > 1 ? 's' : ''}${booking.children > 0 ? `, ${booking.children} Child${booking.children > 1 ? 'ren' : ''}` : ''}${booking.pets > 0 ? `, ${booking.pets} Pet${booking.pets > 1 ? 's' : ''}` : ''}
                    </p>
                  </td>
                </tr>

                <!-- Check-in / Check-out -->
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #e0ddd6;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%">
                          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">CHECK-IN</p>
                          <p style="margin:0;font-size:16px;color:#3a3a3a;">${formatDate(booking.checkin_date)}</p>
                        </td>
                        <td width="50%">
                          <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">CHECK-OUT</p>
                          <p style="margin:0;font-size:16px;color:#3a3a3a;">${formatDate(booking.checkout_date)}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Duration -->
                <tr>
                  <td style="padding:16px 24px;border-bottom:1px solid #e0ddd6;">
                    <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">DURATION</p>
                    <p style="margin:0;font-size:16px;color:#3a3a3a;">${booking.nights} Night${booking.nights > 1 ? 's' : ''}</p>
                  </td>
                </tr>

                <!-- Total Paid -->
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-size:11px;letter-spacing:2px;color:#7a7a7a;font-weight:600;">
                          TOTAL PAID
                        </td>
                        <td align="right" style="font-size:24px;color:#6b9fa1;font-weight:700;">
                          ${formatCurrency(booking.total)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Journey Info Card -->
          <tr>
            <td style="padding:0 40px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd6;border-radius:6px;overflow:hidden;background-color:#fdfcfa;">
                
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 12px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">
                      YOUR JOURNEY TO THE ISLAND
                    </p>
                    <p style="margin:0;font-size:15px;color:#5a5a5a;font-style:italic;line-height:1.6;">
                      Upon arrival at Consuelo or Poro Port, look for the Mangodlong Paradise shuttle. Your private transfer is ready and waiting.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 24px 24px;">
                    <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;color:#6b9fa1;font-weight:600;">
                      HOW TO GET HERE
                    </p>

                    <p style="margin:0 0 12px;font-size:14px;color:#3a3a3a;line-height:1.5;">
                      ✈️ <strong>From Mactan:</strong> Take the Fast Craft from Mactan Wharf (Behind Marina Mall).
                    </p>

                    <p style="margin:0 0 8px;font-size:14px;color:#3a3a3a;line-height:1.5;">
                      ⚓ <strong>From Danao:</strong> Take Jomalia Shipping Lines from
                      <a href="https://maps.app.goo.gl/sandsgatewaydanao" style="color:#6b9fa1;">Sands Gateway Port</a>, Danao.
                    </p>
                    <p style="margin:0;font-size:12px;color:#9a9a9a;font-style:italic;">
                      Proudly owned and operated by our sister company, <a href="#" style="color:#6b9fa1;">Jomalia Shipping</a>.
                    </p>
                  </td>
                </tr>

                <!-- Map Button -->
                <tr>
                  <td style="padding:0 24px 28px;text-align:center;">
                    <a href="${googleMapsLink}" target="_blank"
                       style="display:inline-block;background-color:#6b9fa1;color:#ffffff;text-decoration:none;padding:14px 36px;border-radius:6px;font-size:13px;letter-spacing:2px;font-weight:600;">
                      📍 OPEN LIVE MAP DIRECTIONS
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:14px;color:#9a9a9a;">
                Thank you for choosing Mangodlong Paradise Beach Resort.
              </p>
              <p style="margin:0;font-size:14px;color:#9a9a9a;">
                We look forward to welcoming you to Camotes Island.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

function generateBookingPDF(booking) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - margin * 2

  // ── Header banner ──
  doc.setFillColor(107, 159, 161) // #6b9fa1
  doc.rect(0, 0, pageWidth, 48, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('MANGODLONG PARADISE', pageWidth / 2, 22, { align: 'center' })
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('BEACH RESORT  ·  CAMOTES ISLAND', pageWidth / 2, 32, { align: 'center' })
  doc.setFontSize(9)
  doc.text('BOOKING CONFIRMATION RECEIPT', pageWidth / 2, 42, { align: 'center' })

  // ── Booking Reference ──
  let y = 62
  doc.setTextColor(107, 159, 161)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('BOOKING REFERENCE', margin, y)
  doc.setTextColor(60, 60, 60)
  doc.setFontSize(22)
  doc.text(`#${booking.booking_ref}`, pageWidth - margin, y, { align: 'right' })

  // Divider
  y += 8
  doc.setDrawColor(220, 220, 220)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)

  // ── Detail rows ──
  const addDetailRow = (label, value) => {
    y += 16
    doc.setTextColor(107, 159, 161)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(label, margin, y)
    doc.setTextColor(60, 60, 60)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(String(value), margin, y + 8)
    // Light divider
    doc.setDrawColor(235, 235, 235)
    doc.line(margin, y + 14, pageWidth - margin, y + 14)
    y += 14
  }

  addDetailRow('GUEST NAME', booking.guest_name)
  addDetailRow('EMAIL', booking.guest_email)
  if (booking.guest_mobile) {
    addDetailRow('MOBILE / WHATSAPP', booking.guest_mobile)
  }
  addDetailRow('ROOM', booking.room_name)

  // Guests line
  let guestStr = `${booking.adults} Adult${booking.adults > 1 ? 's' : ''}`
  if (booking.children > 0) guestStr += `, ${booking.children} Child${booking.children > 1 ? 'ren' : ''}`
  if (booking.pets > 0) guestStr += `, ${booking.pets} Pet${booking.pets > 1 ? 's' : ''}`
  addDetailRow('GUESTS', guestStr)

  addDetailRow('CHECK-IN', formatDate(booking.checkin_date))
  addDetailRow('CHECK-OUT', formatDate(booking.checkout_date))
  addDetailRow('DURATION', `${booking.nights} Night${booking.nights > 1 ? 's' : ''}`)

  // ── Payment section ──
  y += 20
  doc.setFillColor(250, 248, 244) // light bg
  doc.roundedRect(margin, y - 6, contentWidth, 60, 3, 3, 'F')
  doc.setTextColor(107, 159, 161)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENT SUMMARY', margin + 8, y + 6)

  y += 18
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Subtotal', margin + 8, y)
  doc.text(formatCurrency(booking.subtotal), pageWidth - margin - 8, y, { align: 'right' })

  y += 12
  doc.text('Tax', margin + 8, y)
  doc.text(formatCurrency(booking.tax_amount), pageWidth - margin - 8, y, { align: 'right' })

  y += 14
  doc.setDrawColor(107, 159, 161)
  doc.setLineWidth(0.8)
  doc.line(margin + 8, y - 4, pageWidth - margin - 8, y - 4)
  doc.setTextColor(107, 159, 161)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Total Paid', margin + 8, y + 4)
  doc.text(formatCurrency(booking.total), pageWidth - margin - 8, y + 4, { align: 'right' })

  // ── Status badge ──
  y += 26
  doc.setFillColor(184, 216, 217) // #b8d8d9
  doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F')
  doc.setTextColor(50, 100, 102)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('STATUS: CONFIRMED & PAID', pageWidth / 2, y + 13, { align: 'center' })

  // ── Footer ──
  y += 34
  doc.setTextColor(160, 160, 160)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Thank you for choosing Mangodlong Paradise Beach Resort.', pageWidth / 2, y, { align: 'center' })
  doc.text('We look forward to welcoming you to Camotes Island.', pageWidth / 2, y + 12, { align: 'center' })

  y += 26
  doc.setFontSize(8)
  doc.text(`Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth / 2, y, { align: 'center' })

  // Return as Buffer
  const arrayBuffer = doc.output('arraybuffer')
  return Buffer.from(arrayBuffer)
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const {
      adults,
      children,
      pets,
      roomType,
      roomName,
      roomRate,
      checkinDate,
      checkoutDate,
      nights,
      guestName,
      guestEmail,
      guestMobile,
      subtotal,
      taxAmount,
      total
    } = req.body

    // Validate required fields
    if (!guestName || !guestEmail || !roomType || !checkinDate || !checkoutDate) {
      return res.status(400).json({ error: 'Missing required booking fields' })
    }

    // Generate unique booking reference
    const bookingRef = generateBookingRef()

    // Insert into Supabase
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert({
        booking_ref: bookingRef,
        guest_name: guestName,
        guest_email: guestEmail,
        guest_mobile: guestMobile || '',
        adults: adults || 2,
        children: children || 0,
        pets: pets || 0,
        room_type: roomType,
        room_name: roomName,
        room_rate: roomRate,
        checkin_date: checkinDate,
        checkout_date: checkoutDate,
        nights: nights || 1,
        subtotal: subtotal || 0,
        tax_amount: taxAmount || 0,
        total: total || 0,
        status: 'confirmed',
        payment_status: 'paid',
        confirmation_email_sent: false
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return res.status(500).json({ error: 'Failed to save booking', details: dbError.message })
    }

    // Generate PDF receipt
    let pdfBuffer = null
    try {
      pdfBuffer = generateBookingPDF(booking)
    } catch (pdfError) {
      console.error('PDF generation error:', pdfError)
    }

    // Send confirmation email via Resend
    let emailSent = false
    try {
      const emailHtml = buildConfirmationEmail(booking)

      // Build email payload
      const emailPayload = {
        from: FROM_EMAIL,
        to: [guestEmail],
        subject: `Booking Confirmed: Mangodlong Paradise #${bookingRef}`,
        html: emailHtml
      }

      // Attach PDF receipt if generated successfully
      if (pdfBuffer) {
        emailPayload.attachments = [
          {
            filename: `Mangodlong-Paradise-Booking-${bookingRef}.pdf`,
            content: pdfBuffer.toString('base64'),
            content_type: 'application/pdf'
          }
        ]
      }

      await resend.emails.send(emailPayload)

      emailSent = true

      // Update email sent flag
      await supabase
        .from('bookings')
        .update({ confirmation_email_sent: true })
        .eq('id', booking.id)
    } catch (emailError) {
      console.error('Email send error:', emailError)
      // Don't fail the booking if email fails
    }

    return res.status(200).json({
      success: true,
      bookingRef,
      bookingId: booking.id,
      emailSent,
      booking
    })
  } catch (err) {
    console.error('Booking API error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
