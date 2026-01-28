# 📁 Project File Structure

## Complete Smart Ambulance Services Application

### 📂 Backend Files (Node.js + Express)

```
backend/
├── models/
│   ├── User.js                 # User schema (Patient/Driver/Admin)
│   ├── Ambulance.js            # Ambulance schema with geolocation
│   └── Booking.js              # Booking schema with accident details
│
├── routes/
│   ├── authRoutes.js           # Authentication routes (login, register)
│   └── bookingRoutes.js        # Booking & ambulance routes
│
├── controllers/
│   ├── authController.js       # Auth business logic
│   └── bookingController.js    # Booking operations & nearby search
│
├── middleware/
│   └── auth.js                 # JWT authentication middleware
│
├── uploads/                    # Uploaded accident photos (auto-created)
│   └── .gitkeep
│
├── server.js                   # Main server with Socket.IO
├── seedData.js                 # Sample data generator
├── package.json                # Dependencies & scripts
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
└── README.md                   # Backend documentation
```

### 📂 Frontend Files (React)

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.js                 # Landing page with Karnataka map
│   │   ├── Login.js                # Login page
│   │   ├── Register.js             # Registration page
│   │   ├── BookAmbulance.js        # Booking form with map
│   │   └── Dashboard.js            # Admin dashboard with tracking
│   │
│   ├── components/                 # Reusable components (empty for now)
│   │
│   ├── services/
│   │   └── api.js                  # Axios API service
│   │
│   ├── context/
│   │   └── AuthContext.js          # Authentication context
│   │
│   ├── styles/
│   │   ├── Auth.css                # Login/Register styles
│   │   ├── Home.css                # Home page styles
│   │   ├── BookAmbulance.css       # Booking page styles
│   │   └── Dashboard.css           # Dashboard styles
│   │
│   ├── App.js                      # Main app with routing
│   ├── App.css                     # App styles
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── package.json                    # Dependencies
├── .env                            # Environment variables
└── .gitignore
```

### 📄 Root Files

```
d:\Pr_N/
├── backend/                    # Backend folder
├── frontend/                   # Frontend folder
├── README.md                   # Main documentation
└── SETUP_GUIDE.md             # Quick setup guide
```

---

## 📦 Dependencies

### Backend Dependencies
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **socket.io** - Real-time WebSocket
- **multer** - File upload handling

### Frontend Dependencies
- **react** - UI library
- **react-router-dom** - Routing
- **axios** - HTTP client
- **socket.io-client** - WebSocket client
- **@react-google-maps/api** - Google Maps integration

---

## 🔧 Configuration Files

### Backend .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ambulance-app
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### Frontend .env
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

---

## 🗄️ Database Collections

### users
- Patient accounts
- Driver accounts  
- Admin accounts

### ambulances
- Vehicle details
- Driver mapping
- Current location (GeoJSON)
- Availability status

### bookings
- Patient information
- Pickup location (GeoJSON)
- Accident details
- Photo path
- Status tracking
- ETA & distance

---

## 🚀 Scripts

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon (auto-restart)
node seedData.js # Add sample data
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

---

## 🌟 Features Implemented

✅ **Authentication System**
- User registration with role selection
- JWT-based login
- Protected routes
- Auto-login on page refresh

✅ **Booking System**
- Auto-location detection using GPS
- Accident type selection (6 types)
- Camera/photo upload from device
- Address auto-fill using Geocoding API
- Nearby ambulance search with geospatial queries

✅ **Real-Time Tracking**
- Socket.IO WebSocket connection
- Live location updates
- Status change notifications
- Booking updates broadcast

✅ **Admin Dashboard**
- All bookings display
- Map with all ambulances
- Route calculation with Directions API
- ETA & distance display
- Status management (4 states)
- Click booking to show route

✅ **Maps Integration**
- Google Maps JavaScript API
- Geocoding API (address lookup)
- Directions API (route calculation)
- Distance Matrix API (ETA)
- Custom markers for ambulances/patients

✅ **Responsive Design**
- Mobile-friendly
- Tablet support
- Desktop optimized
- Touch-friendly controls

---

## 📱 Pages & Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Home | Public | Landing page with map |
| `/login` | Login | Public | Login form |
| `/register` | Register | Public | Registration form |
| `/book` | BookAmbulance | Protected | Booking form with map |
| `/dashboard` | Dashboard | Protected | Admin dashboard |

---

## 🎨 UI Components

### Home Page
- Navbar with navigation
- Hero section (matching design)
- Call Now & Book buttons
- Mini map preview
- Feature cards
- Karnataka map center

### Login/Register
- Modern gradient design
- Form validation
- Error handling
- Role selection (Register)
- Responsive cards

### Book Ambulance
- Split-screen layout
- Left: Form with photo upload
- Right: Live map with markers
- Auto-location
- Nearby ambulances display

### Dashboard
- Statistics cards
- Scrollable booking list
- Full map view
- Route visualization
- Status buttons
- Real-time updates

---

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Protected API routes
- CORS configuration
- Input validation
- File upload restrictions (images only)
- Environment variables for secrets

---

## 📊 API Endpoints

### Public
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/booking/ambulances/nearby`

### Protected
- `GET /api/auth/me`
- `POST /api/booking/create`
- `GET /api/booking/all`
- `GET /api/booking/user`
- `PUT /api/booking/update-status`
- `GET /api/booking/ambulances/all`
- `PUT /api/booking/ambulance/location`

---

## 🎯 Sample Data

Run `node seedData.js` to create:
- 8 Drivers
- 8 Ambulances (across Karnataka)
- 1 Admin account
  - Email: admin@ambulance.com
  - Password: admin123

---

## 🌐 WebSocket Events

### Emit (Client → Server)
- `ambulanceLocationUpdate`
- `patientLocationUpdate`
- `bookingStatusUpdate`
- `newBooking`
- `joinBooking`

### Listen (Server → Client)
- `ambulanceLocationUpdate`
- `patientLocationUpdate`
- `bookingStatusUpdate`
- `newBooking`
- `bookingMessage`

---

## 💡 Key Technical Decisions

1. **MongoDB GeoJSON** - Used Point type for location data to enable geospatial queries
2. **Socket.IO** - Real-time updates without polling
3. **JWT** - Stateless authentication for scalability
4. **Multer** - Easy file upload handling
5. **Context API** - State management for authentication
6. **React Router v6** - Modern routing with Navigate
7. **Google Maps API** - Industry standard for maps

---

## 🔄 Application Flow

1. User registers/logs in
2. Patient books ambulance
3. Location auto-detected
4. Photo uploaded (optional)
5. Nearest ambulance found
6. Booking created in DB
7. Socket notification sent
8. Admin sees booking
9. Admin updates status
10. Patient notified
11. Route calculated
12. ETA displayed
13. Booking completed

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development
- RESTful API design
- Real-time WebSocket communication
- Geospatial database queries
- Google Maps API integration
- File upload handling
- JWT authentication
- React hooks & context
- Responsive design
- Modern UI/UX

---

## 🏆 Project Highlights

✨ **Production-Ready Features**
✨ **Clean Code Structure**
✨ **Comprehensive Documentation**
✨ **Real-World Use Case**
✨ **Scalable Architecture**
✨ **Modern Tech Stack**

---

**Created with ❤️ for Emergency Healthcare**
