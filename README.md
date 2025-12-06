# 🛒 JioMart Coupon Generator & Checker

use: https://jiomart-bulk-check.vercel.app (to checkin bulk and bypass rate limit)

A simple web app to **generate random 10-character coupon codes** and **test them against JioMart’s coupon API**.  
Built with **Bootstrap 5 + Plain JavaScript** and deployed on **Vercel**.

### ⚠️ Rate Limit Warning

The JioMart API may enforce strict rate limiting.

 - Each coupon request is delayed by 5 seconds in this webapp to reduce risk of 403 Forbidden errors.
 - 10 coupon request is allowed per 1 / 2 minutes as per api limit.

Sending too many requests too fast may cause:

  - Temporary IP bans
  - Blocked auth tokens
  - Permanent denial of service

---

## ✨ Features

- ✅ **Multi-Platform Support**: JioMart and BigBasket
- ✅ Generate **JioMart 10-character coupons** (strict rule enforced).  
- ✅ Generate **BigBasket 26-character coupons** (format: BBSAVE150-4XXXXXXXXXXXXXXX).  
- ✅ Supports **prefix-based coupons** or **fully random generation**.  
- ✅ **Validates prefix length** (max 10 chars, warning + red border if exceeded).  
- ✅ **Alternate Number–Letter pattern** in coupon codes.  
- ✅ Test multiple coupons automatically.  
- ✅ 3-second delay between each coupon check (to avoid spamming).  
- ✅ Responsive Bootstrap UI.  

---

## 📂 Project Structure

```
.
├── public/
│   └── index.html                  # Frontend UI (Bootstrap + JS)
├── api/
│   ├── check-coupon.js             # JioMart API (Node.js + Axios, runs on Vercel)
│   └── check-bigbasket-coupon.js   # BigBasket API (Node.js + Axios, runs on Vercel)
├── vercel.json                     # Vercel deployment config
├── package.json                    # Dependencies for serverless function
└── README.md                       # Documentation
```

---

## 🚀 Setup & Deployment

### 1. Clone the repo
```bash
git clone https://github.com/your-username/jiomart-coupon-checker.git
cd jiomart-coupon-checker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
You can use [Vercel CLI](https://vercel.com/docs/cli) to test:
```bash
vercel dev
```

### 4. Deploy to Vercel
```bash
vercel
```

---

## ⚙️ How It Works

1. Enter:
   - **Cart ID**
   - **Auth Token**
   - **User ID**
   - **PIN**
   - Number of coupons to test
   - (Optional) **Prefix** for coupon codes  

2. Click **Generate & Check**.

3. The app will:
   - Generate coupons (prefix + random fill OR full random if no prefix).
   - Enforce **exact 10-character rule**.
   - Call `/api/check-coupon` for each coupon with a **5-second delay**.
   - Display results in a table:  
     - ✅ Valid (discount applied)  
     - ❌ Invalid (reason shown)  
     - ⚠️ Error (network/server issue)  

---

## 📜 Example Coupon Patterns

### JioMart Coupons (10 characters)
- Prefix `1J7M` → `1J7M5G5K7V`  
- Prefix `3M9B` → `3M9B1V2Y9A`  
- No prefix → `8K2J4R9M7D` (fully random)

### BigBasket Coupons (26 characters)
- Default prefix `BBSAVE150-4` → `BBSAVE150-4RMY02FEAGKBRP1`
- Custom prefix `BBTEST-4` → `BBTEST-4RRQQ1UXTGCX0RX000`
- Format: `[PREFIX]-4[15 random alphanumeric chars]`

---

## 🛠 Tech Stack

- **Frontend:** HTML, Bootstrap 5, Vanilla JS  
- **Backend:** Node.js (Axios, Serverless function on Vercel)  
- **Hosting:** Vercel  

---

## ⚠️ Disclaimer

This tool is built **for educational purposes only**.  
Do not misuse it to spam or exploit third-party services.  
Use responsibly 🚀  

---

## 📸 Screenshot (UI)

![App Screenshot](https://github.com/user-attachments/assets/28a86bdc-bd35-4621-b88f-8b5a989b8c87)

