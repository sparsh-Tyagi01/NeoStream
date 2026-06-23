# 🎬 NeoStream — Modern Movie Streaming & Synchronous Chat Platform

NeoStream is a premium, full-stack video streaming application that delivers adaptive HLS streaming combined with real-time, synchronized group chat rooms for each movie. Designed with a gorgeous, dark-themed UI, glassmorphism styling, and robust micro-animations, it provides an engaging viewing experience for users and comprehensive management tools for administrators.

---

## 🌟 Key Features

### 📡 Adaptive Video Streaming
* **HLS Adaptive Bitrate (ABR)**: Uses `hls.js` to parse `.m3u8` video streaming profiles generated on the fly via Cloudinary.
* **Smart Fallbacks**: Automatically falls back to high-quality progressive MP4 streams if HLS is unsupported or if network conditions fail.
* **Optimal CDN Delivery**: Leverages Cloudinary's media transformations to adjust formats and qualities dynamically.

### 💬 Real-Time Live Watch Party Chat
* **Movie-Specific Rooms**: Joining a movie page automatically joins a dedicated Socket.io chat room using the movie's unique ID.
* **Instant Messaging**: Chat simultaneously with other users watching the same movie.
* **Overlay Mode**: View messages sliding directly over the movie cover, styled with beautiful glowing gradients.

### 🔒 Modern Auth System with Hosting Workarounds
* **Secure Signup & OTP Verification**: Validates registration using OTPs stored in MongoDB with standard expiration windows.
* **Render SMTP Workaround (Recruiter-Friendly)**: Render's free tier blocks outbound SMTP ports. To bypass this, the server races the email delivery against a 10-second timeout. If it fails/hangs, the backend returns the OTP directly in the API response, which the frontend displays in a gorgeous **"Deployment Notice" glassmorphism banner** explaining the restriction.
* **Stale Record Cleanup**: Automatically wipes out incomplete user registrations (where OTP was generated but never verified) to allow immediate retries using the same email/username.

### ⚡ Performance & Caching
* **Redis Caching**: Caches expensive database aggregations (Top Picks, Trending lists, total user counts) and static resources (movie details) with configurable TTL policies.
* **Socket.io Redis Adapter**: Prepared for horizontal scaling by distributing Socket.io socket messages across a Redis Pub/Sub backplane.

### 🛠️ Admin Operations Dashboard
* **Dynamic Statistics**: Overview of total registered users and catalog counts.
* **Direct Asset Ingestion**: Admins can upload video and image poster files together. They are handled by `multer` disk storage and directly streamed to Cloudinary for transcoding.
* **Safe Catalog Audits**: Support for library-wide movie deletion, which simultaneously cleans up MongoDB records and purges active Cloudinary media keys.

---

## 🛠️ Tech Stack

### Frontend
* **Core**: React 18, TypeScript, Vite
* **Routing**: React Router DOM v6
* **Styling & Animations**: Tailwind CSS, Framer Motion, Lucide React
* **Components**: Radix UI (via shadcn/ui components)
* **Real-time & Media**: Socket.io-client, `hls.js`, React Hot Toast

### Backend
* **Runtime & Framework**: Node.js, Express
* **Database & Caching**: MongoDB (Mongoose), Redis (with `@redis/client` and Socket.io Redis adapter)
* **Media Handling**: Cloudinary, Multer
* **Real-time Server**: Socket.io
* **Authentication & Mail**: JWT (jsonwebtoken), Bcrypt, Nodemailer

---

## 📂 Project Architecture

```
NeoStream/
├── backend/
│   ├── connections/      # MongoDB connection management & index-dropping
│   ├── controllers/      # Route controllers (user/auth, movie management)
│   ├── middlewares/      # Authentication & authorization checks
│   ├── models/           # Mongoose schemas (User, Movie)
│   ├── routes/           # Express API endpoints
│   ├── utils/            # Utilities (Cloudinary upload, Redis cache, Mailer transport)
│   ├── index.js          # Entrypoint & Socket.io server setup
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # UI Pages (register, login, movie details, homepage, admin dashboard)
    │   ├── lib/          # API Clients (axios configuration with interceptors)
    │   ├── main.tsx      # App render root
    │   └── index.css     # Global CSS rules
    ├── tailwind.config.js
    └── package.json
```

---

## ⚙️ Environment Variables Setup

### Backend Environment (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_signature_secret
BASE_URL=http://localhost:5173

# Admin Account Email
ADMIN_EMAIL=admin@example.com

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Redis Cache configuration (Prepend redis://)
REDIS_URL=redis://your_redis_host:your_redis_port

# Nodemailer configuration (for OTP emails)
EMAIL_USER=your_gmail_user@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Frontend Environment (`frontend/.env`)
Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🚀 Installation & Running Locally

### Prerequisites
* Node.js (v18+)
* MongoDB & Redis instances running locally or hosted (e.g. MongoDB Atlas, Redis Labs)

### 1. Set Up the Backend
```bash
cd backend
npm install

# Start in development mode with nodemon
npm run dev
```

### 2. Set Up the Frontend
```bash
cd ../frontend
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` to explore NeoStream!
