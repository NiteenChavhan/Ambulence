const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Booking routes
router.post('/create', auth, upload.single('photo'), bookingController.createBooking);
router.get('/all', auth, bookingController.getAllBookings);
router.get('/user', auth, bookingController.getUserBookings);
router.put('/update-status', auth, bookingController.updateBookingStatus);

// Ambulance routes
router.get('/ambulances/nearby', bookingController.getNearbyAmbulances);
router.get('/ambulances/all', bookingController.getAllAmbulances);
router.put('/ambulance/location', auth, bookingController.updateAmbulanceLocation);

module.exports = router;
