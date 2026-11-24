# Complete Razorpay & Payment Gateway Integration Guide for MacCheck Pro 💳

This guide walks you through setting up **Razorpay** (and international alternatives like **Lemon Squeezy**, **Paddle**, and **Stripe**) to sell **MacCheck Pro** directly to customers, receive funds in your bank account, and automatically deliver the `.dmg` installer and license keys.

---

## 🚀 Overview of Payment Integration Approaches

When selling software through a website, you have 3 practical options depending on your preference:

| Method | Setup Effort | Backend Server Needed? | Best For |
| :--- | :--- | :--- | :--- |
| **Option A: Razorpay Payment Button** | 5 Minutes | ❌ **No (100% No-Code)** | Fastest launch; Razorpay sends automatic email receipt and redirects to `success.html`. |
| **Option B: Razorpay Standard Checkout (Integrated into the site)** | 10 Minutes | ❌ **No (Client-Side JS SDK)** | Custom branded modal directly on your domain; triggers instant redirect. |
| **Option C: Razorpay Webhooks + Serverless Function** | 30 Minutes | ✅ **Optional (Vercel/Node.js)** | Cryptographic HMAC verification, generating unique cryptographic license keys into a database. |
| **Option D: Lemon Squeezy / Paddle (Global MoR)** | 15 Minutes | ❌ **No** | **Recommended for selling outside India**, handles global VAT/sales tax & license keys automatically. |

---

## 🛠️ Step 1: Create and Verify Your Razorpay Account

1. Go to [https://razorpay.com](https://razorpay.com) and click **Sign Up**.
2. Complete your merchant onboarding (Individual or Business/LLC/Proprietorship).
   - Enter your PAN, Bank Account details for daily settlements.
   - For selling software, select category: **Software / Web Development / Digital Goods**.
3. Once logged in to the [Razorpay Dashboard](https://dashboard.razorpay.com/):
   - Switch between **Test Mode** (for testing without real money) and **Live Mode** (for collecting real payments).

---

## 🔑 Step 2: Generate Your Razorpay API Keys

1. In the Razorpay Dashboard, navigate to **Settings** → **API Keys**.
2. Click **Generate Key** (or **Regenerate Key**).
3. You will receive:
   - **Key ID**: Looks like `rzp_test_XXXXXXXXXXXXXX` (in Test mode) or `rzp_live_XXXXXXXXXXXXXX` (in Live mode).
   - **Key Secret**: Looks like `YYYYYYYYYYYYYYYYYYYYYYYY` (Keep this private! Never commit Key Secret to a public GitHub repo).

---

## ⚡ Step 3: Link Razorpay to the Website

Open `website/assets/js/main.js` in your editor. At the top of the file, replace the placeholder with your actual **Key ID**:

```javascript
const CONFIG = {
  // Replace with your real Razorpay Key ID:
  razorpayKeyId: 'rzp_live_YourActualKeyIdHere',
  pricing: {
    inr: {
      personal: { amount: 59, original: 149, symbol: '₹', label: '59', originalLabel: '149' },
      pro: { amount: 149, original: 499, symbol: '₹', label: '149', originalLabel: '499' }
    },
    usd: {
      personal: { amount: 5, original: 15, symbol: '$', label: '5', originalLabel: '15' },
      pro: { amount: 15, original: 45, symbol: '$', label: '15', originalLabel: '45' }
    }
  },
  currentCurrency: 'INR'
};
```

That's it! When a visitor clicks **Buy Lifetime License**, the website launches the official **Razorpay Checkout modal** supporting:
- **UPI** (Google Pay, PhonePe, Paytm, CRED, BHIM)
- **Credit & Debit Cards** (Visa, Mastercard, RuPay, Amex)
- **NetBanking** (All major Indian banks)
- **Wallets** (Paytm, Mobikwik, etc.)
- **International Cards**

Once payment succeeds, Razorpay automatically redirects the buyer to `success.html` with their payment ID, email, and generated license key, allowing them to download `MacCheck-Installer.dmg` instantly!

---

## 🎯 Option A: Using Razorpay Payment Buttons (Zero Code)

If you prefer Razorpay to handle customer details, invoices, and automated emails entirely on their servers:

1. In the Razorpay Dashboard, go to **Payment Buttons** (under Payment Products).
2. Click **Create Payment Button** → Select **Buy Now / Product Sale**.
3. Set the button details:
   - **Title**: `MacCheck Pro (Early Bird Lifetime License)`
   - **Amount**: `₹59` (or `₹149` for Pro Inspector)
4. Under **Post-Payment Page**:
   - Select **Redirect to your own website**.
   - Enter your website's URL: `https://yourdomain.com/success.html`.
5. Razorpay will generate a small `<form>` snippet:
   ```html
   <form>
     <script src="https://checkout.razorpay.com/v1/payment-button.js"
             data-payment_button_id="pl_XXXXXXXXXXXXX"
             async> </script>
   </form>
   ```
6. Paste this button code into `website/index.html` under the pricing section!

---

## 📦 How License Delivery & Software Download Works

### 1. Instant Client-Side Delivery (Included by Default)
The included `website/success.html` immediately renders:
- An instant download button for `MacCheck-Installer.dmg`
- A unique cryptographic activation code: `MCP-PRO-XXXX-XXXX-XXXX`
- Quick-start instructions for dragging the app to `/Applications`

### 2. Automated Email Delivery (Recommended)
You can configure automatic delivery emails so customers also have permanent access in their inbox:
- **Via Razorpay Settings**: In **Settings** → **Email Notifications**, turn on *Customer Payment Receipt*. You can attach the download link inside the receipt email!
- **Via Zapier / Make.com (No-Code)**:
  - Trigger: *New Payment in Razorpay*
  - Action: *Send Email via Gmail / SendGrid / Resend* with the DMG download link and license key.
- **Via GitHub Releases**: Upload `MacCheck-Installer.dmg` to your GitHub repository Releases page (e.g. `https://github.com/USER/REPO/releases/latest/download/MacCheck-Installer.dmg`).

---

## 🌍 Selling Globally (US, Europe, UK, Worldwide)

While Razorpay is the gold standard for India (UPI/RuPay), international customers often prefer or require dedicated global checkout platforms. 

For international software distribution, consider these **Merchant of Record (MoR)** platforms:

### 1. [Lemon Squeezy](https://www.lemonsqueezy.com/) (Highly Recommended for Mac Apps)
- Specially tailored for digital software and macOS utilities.
- Acts as Merchant of Record: handles global sales tax, EU VAT, compliance, and currency conversion automatically.
- **Built-in License Key Generator**: Generates and activates license keys natively without writing any backend code.
- How to link: Create a product in Lemon Squeezy, grab the checkout overlay link, and add it to the button.

### 2. [Paddle](https://www.paddle.com/)
- The classic choice for macOS developers (used by apps like CleanMyMac, BetterDisplay, etc.).
- Comprehensive global tax handling and localized currencies.

### 3. [Stripe Checkout](https://stripe.com/)
- Standard global payment processing with Apple Pay and Credit Cards.
- Create a **Stripe Payment Link** in 2 clicks and paste it onto your buttons.

---

## 🧪 Testing Checklist Before Launch

- [ ] Tested payment with Razorpay Test Mode Key (`rzp_test_...`).
- [ ] Confirmed redirect to `success.html` displays the payment ID and license key.
- [ ] Tested downloading `MacCheck-Installer.dmg`.
- [ ] Verified that UPI, Card, and NetBanking options render properly on mobile and desktop.
- [ ] Switched `razorpayKeyId` to Live Key (`rzp_live_...`) before promoting the website.
