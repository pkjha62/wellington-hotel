/**
 * Email service using Nodemailer.
 *
 * Configure via environment variables:
 *   SMTP_HOST     - e.g. smtp.gmail.com
 *   SMTP_PORT     - e.g. 587
 *   SMTP_USER     - sender email address
 *   SMTP_PASS     - sender password / app password
 *   SMTP_FROM     - "From" display name and address
 *
 * If SMTP_HOST is not set, emails are skipped silently (dev mode).
 */
import nodemailer from "nodemailer";
import type { Booking } from "@/types";

function createTransport() {
  const host = process.env.SMTP_HOST;
  if (!host) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function nights(checkIn: string, checkOut: string) {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export async function sendBookingConfirmation(booking: Booking): Promise<void> {
  const transport = createTransport();
  if (!transport) return; // SMTP not configured — skip

  const n = nights(booking.checkIn, booking.checkOut);
  const from = process.env.SMTP_FROM ?? `"The Deoghar Grand" <${process.env.SMTP_USER}>`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: Georgia, serif; color: #333; margin: 0; padding: 0; background: #f9f5ee; }
    .wrapper { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #1a1a1a; color: #c8a96e; padding: 32px 40px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; letter-spacing: 2px; text-transform: uppercase; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #999; letter-spacing: 1px; }
    .body { padding: 40px; }
    .greeting { font-size: 18px; margin-bottom: 16px; }
    .details { background: #fdf8f0; border: 1px solid #e8d8b0; border-radius: 6px; padding: 24px; margin: 24px 0; }
    .details table { width: 100%; border-collapse: collapse; }
    .details td { padding: 8px 0; vertical-align: top; font-size: 15px; }
    .details td:first-child { color: #888; width: 140px; }
    .details td:last-child { font-weight: 600; color: #1a1a1a; }
    .amount { font-size: 22px; color: #c8a96e; font-weight: bold; text-align: center; margin: 24px 0; }
    .footer { background: #1a1a1a; color: #888; padding: 24px 40px; text-align: center; font-size: 12px; }
    .footer a { color: #c8a96e; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>The Deoghar Grand</h1>
      <p>Hotel &amp; Spa · Deoghar, Jharkhand</p>
    </div>
    <div class="body">
      <p class="greeting">Dear ${booking.guestName},</p>
      <p>Thank you for choosing <strong>The Deoghar Grand</strong>. Your reservation has been confirmed. We look forward to welcoming you!</p>
      <div class="details">
        <table>
          <tr><td>Booking ID</td><td>${booking.id.toUpperCase()}</td></tr>
          <tr><td>Room</td><td>${booking.roomName}</td></tr>
          <tr><td>Check-in</td><td>${fmt(booking.checkIn)}</td></tr>
          <tr><td>Check-out</td><td>${fmt(booking.checkOut)}</td></tr>
          <tr><td>Duration</td><td>${n} night${n !== 1 ? "s" : ""}</td></tr>
          <tr><td>Guests</td><td>${booking.guests}</td></tr>
        </table>
      </div>
      <div class="amount">Total: ₹${booking.totalAmount.toLocaleString("en-IN")}</div>
      <p>For assistance, please contact us at <a href="mailto:reservations@deogharhotel.com">reservations@deogharhotel.com</a> or call <strong>+91 6432 234 567</strong>.</p>
      <p>We wish you a spiritually enriching and comfortable stay.</p>
      <p style="margin-top:32px;">Warm regards,<br/><strong>The Deoghar Grand Team</strong></p>
    </div>
    <div class="footer">
      <p>Temple Road, Near Baba Baidyanath Dham · Deoghar, Jharkhand 814112</p>
      <p><a href="mailto:reservations@deogharhotel.com">reservations@deogharhotel.com</a> · +91 6432 234 567</p>
    </div>
  </div>
</body>
</html>`;

  await transport.sendMail({
    from,
    to: booking.guestEmail,
    subject: `Booking Confirmed — ${booking.roomName} · The Deoghar Grand (#${booking.id.toUpperCase()})`,
    html,
  });
}
