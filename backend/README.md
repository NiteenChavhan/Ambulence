# Smart Ambulance Services - Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ambulance-app
JWT_SECRET=your_jwt_secret_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

### 3. Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service

### 4. Run the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Bookings
- `POST /api/booking/create` - Create new booking (protected)
- `GET /api/booking/all` - Get all bookings (protected)
- `GET /api/booking/user` - Get user bookings (protected)
- `PUT /api/booking/update-status` - Update booking status (protected)

### Ambulances
- `GET /api/booking/ambulances/nearby?lat=X&lng=Y` - Get nearby ambulances
- `GET /api/booking/ambulances/all` - Get all ambulances
- `PUT /api/booking/ambulance/location` - Update ambulance location (protected)

## Socket.IO Events

### Client → Server
- `ambulanceLocationUpdate` - Update ambulance location
- `patientLocationUpdate` - Update patient location
- `bookingStatusUpdate` - Update booking status
- `newBooking` - New booking created
- `joinBooking` - Join specific booking room

### Server → Client
- `ambulanceLocationUpdate` - Broadcast ambulance location
- `patientLocationUpdate` - Broadcast patient location
- `bookingStatusUpdate` - Broadcast booking status
- `newBooking` - Broadcast new booking
- `bookingMessage` - Send message to booking room

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time tracking
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing
