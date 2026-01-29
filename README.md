# 🚑 Smart Ambulance Services

A modern emergency ambulance booking system with real-time tracking and location-based services.

## 🌟 Features

- **Real-time Ambulance Tracking**: Live location monitoring with Google Maps integration
- **Emergency Booking**: Quick ambulance booking with photo upload capability
- **Location-based Services**: Automatic detection of nearby available ambulances
- **User Authentication**: Secure login/signup with role-based access
- **Dashboard Management**: Admin panel for managing bookings and ambulances
- **Responsive Design**: Mobile-friendly interface for all devices

## 🏗️ Tech Stack

### Frontend
- React.js with Hooks
- Google Maps API integration
- Responsive CSS styling
- Real-time updates with Socket.IO

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- Socket.IO for real-time communication

## 📁 Project Structure

```
Pr_N/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Ambulance.js
│   │   ├── Booking.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── bookingRoutes.js
│   ├── uploads/           # Image uploads directory
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── BookAmbulance.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Services.js
│   │   │   ├── About.js
│   │   │   └── Contact.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Google Maps API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NiteenChavhan/Ambulence.git
cd Ambulence
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure environment variables**
Create `.env` files in both backend and frontend directories:

**Backend (.env)**
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_SOCKET_URL=http://localhost:5000
```

5. **Start the development servers**

**Backend**
```bash
cd backend
npm run dev
```

**Frontend**
```bash
cd frontend
npm start
```

## 🎯 Usage

1. **Register/Login** as a user or admin
2. **Book Ambulance** by filling the form and uploading incident photos
3. **Track Real-time** ambulance location on the map
4. **Manage Bookings** through the admin dashboard
5. **View Services** and contact information

## 🔐 Default Credentials

**Admin User:**
- Email: niteenchavhan770@gmail.com
- Password: Niteen@2007

## 🛠️ Development

### Available Scripts

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

**Frontend:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## 📱 Screenshots

*(Add screenshots of your application here)*

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Niteen Chavhan**
- GitHub: [@NiteenChavhan](https://github.com/NiteenChavhan)
- Email: niteenchavhan770@gmail.com

## 🙏 Acknowledgments

- Google Maps Platform for mapping services
- MongoDB for database solutions
- React community for amazing libraries and tools