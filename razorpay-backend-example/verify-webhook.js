/**
 * Optional Serverless Webhook / Payment Verification Handler (Node.js)
 * 
 * If you want 100% automated backend verification, deploy this to Vercel (api/verify.js),
 * Netlify Functions, or an Express server.
 */

const crypto = require('crypto');

// Environment variables
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'YOUR_KEY_SECRET';

/**
 * Verify Razorpay payment signature
 */
function verifyPaymentSignature({ order_id, payment_id, signature }) {
  const text = `${order_id}|${payment_id}`;
  const generatedSignature = crypto
    .createHmac('sha256', RAZORPAY_KEY_SECRET)
    .update(text)
    .digest('hex');

  return generatedSignature === signature;
}

/**
 * Generate a cryptographically random license key
 */
function generateLicenseKey() {
  const segment = () => crypto.randomBytes(2).toString('hex').toUpperCase();
  return `MCP-${segment()}-${segment()}-${segment()}-${segment()}`;
}

// Sample Vercel Serverless Function Handler
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email, plan } = req.body;

  // 1. Verify Signature
  const isValid = verifyPaymentSignature({
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    signature: razorpay_signature
  });

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });
  }

  // 2. Generate unique license key
  const licenseKey = generateLicenseKey();

  // 3. (Optional) Store in database (Supabase, Firebase, MongoDB, PostgreSQL)

  // 4. (Optional) Dispatch email with Resend / SendGrid / Postmark

  return res.status(200).json({
    success: true,
    message: 'Payment verified successfully',
    licenseKey,
    downloadUrl: 'https://github.com/uttammandal/Mac-Check/releases/latest/download/MacCheck-Installer.dmg'
  });
};
