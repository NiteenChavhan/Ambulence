# 🚀 Quick Setup Guide - Smart Ambulance Services

## ⚡ Fast Setup (5 Minutes)

### 1️⃣ Install Dependencies

**Backend:**
```bash
cd d:\Pr_N\backend
npm install
```

**Frontend:**
```bash
cd d:\Pr_N\frontend
# Dependencies should already be installed
# If needed: npm install
```

### 2️⃣ Get Google Maps API Key

1. Visit: https://console.cloud.google.com/
2. Create new project
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API  
   - Directions API
4. Create API Key
5. Copy the key

### 3️⃣ Configure Environment

**Backend (.env):**
```bash
cd d:\Pr_N\backend
notepad .env
```
Replace `your_google_maps_api_key_here` with your actual key

**Frontend (.env):**
```bash
cd d:\Pr_N\frontend
notepad .env
```
Replace `your_google_maps_api_key_here` with your actual key

### 4️⃣ Start MongoDB

**Option A - Windows Service:**
```bash
net start MongoDB
```

**Option B - Command:**
```bash
mongod
```

### 5️⃣ Run the Application

**Terminal 1 - Backend:**
```bash
cd d:\Pr_N\backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd d:\Pr_N\frontend
npm start
```

### 6️⃣ Access Application

Open browser: `http://localhost:3000`

---

## 📋 First Time Use

1. **Register** - Create account (choose role: Patient/Admin)
2. **Login** - Use credentials
3. **Book** - Click "Book Ambulance"
4. **Track** - View in Dashboard

---

## 🎯 Testing Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can register user
- [ ] Can login
- [ ] Can see home page with map
- [ ] Can book ambulance
- [ ] Can view dashboard

---

## 🔧 Common Issues

**MongoDB not starting?**
```bash
# Check if MongoDB is installed
mongod --version

# Start as service
net start MongoDB
```

**Port 5000 busy?**
```bash
# Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Maps not loading?**
- Add valid API key in .env files
- Enable required APIs in Google Cloud

---

## 🎨 Project Structure

```
d:\Pr_N
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth middleware
│   ├── uploads/         # Uploaded photos
│   ├── server.js        # Main server
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/       # React pages
    │   ├── components/  # React components
    │   ├── services/    # API services
    │   ├── context/     # Auth context
    │   ├── styles/      # CSS files
    │   └── App.js
    ├── package.json
    └── .env
```

---

## 📱 User Roles

### Patient
- Book ambulance
- Upload accident photo
- Track booking status
- View history

### Admin
- View all bookings
- Assign ambulances
- Update status
- Track on map
- Calculate routes & ETA

### Driver (Future)
- Accept bookings
- Update location
- Navigate to patient

---

## 🌟 Key Features

✅ Auto-location detection
✅ Photo upload from camera
✅ Accident type selection
✅ Nearby ambulances display
✅ Real-time tracking
✅ Route & ETA calculation
✅ WebSocket notifications
✅ Admin dashboard
✅ Status management
✅ Karnataka map view

---

## 💡 Pro Tips

1. **Enable Location**: Allow browser location access
2. **Use HTTPS**: For production deployment
3. **Test Locally**: Use localhost first
4. **Create Test Data**: Add sample ambulances in MongoDB
5. **Monitor Console**: Check for errors in browser & terminal

---

## 📞 Need Help?

1. Check README.md for detailed guide
2. Review console logs
3. Verify .env configuration
4. Ensure MongoDB is running
5. Confirm API key is valid

---

**Happy Coding! 🚑💻**
