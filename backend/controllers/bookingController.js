const Booking = require('../models/Booking');
const Ambulance = require('../models/Ambulance');

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { 
      patientName, 
      patientPhone, 
      pickupLocation, 
      accidentType, 
      address 
    } = req.body;

    const accidentPhoto = req.file ? req.file.filename : null;

    // Parse pickupLocation if it's a string
    let locationData;
    if (typeof pickupLocation === 'string') {
      try {
        locationData = JSON.parse(pickupLocation);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid location data' });
      }
    } else {
      locationData = pickupLocation;
    }

    // Validate coordinates
    if (!locationData || !locationData.coordinates || locationData.coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid coordinates. Please enable location services.' });
    }

    const [lng, lat] = locationData.coordinates;

    // Validate coordinate values
    if (isNaN(lng) || isNaN(lat)) {
      return res.status(400).json({ message: 'Invalid coordinate values' });
    }

    // Find nearest available ambulance
    const nearestAmbulance = await Ambulance.findOne({
      available: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: 50000 // 50km radius
        }
      }
    });

    const booking = new Booking({
      patientId: req.userId,
      patientName,
      patientPhone,
      ambulanceId: nearestAmbulance ? nearestAmbulance._id : null,
      pickupLocation: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)],
        address: address || ''
      },
      accidentType,
      accidentPhoto,
      status: nearestAmbulance ? 'ACCEPTED' : 'REQUESTED'
    });

    await booking.save();

    // Update ambulance availability if assigned
    if (nearestAmbulance) {
      nearestAmbulance.available = false;
      await nearestAmbulance.save();
    }

    const populatedBooking = await Booking.findById(booking._id)
      .populate('ambulanceId')
      .populate('patientId', '-password');

    res.status(201).json({
      message: 'Booking created successfully',
      booking: populatedBooking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('ambulanceId')
      .populate('patientId', '-password')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user's bookings
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ patientId: req.userId })
      .populate('ambulanceId')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status, estimatedTime, distance } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (estimatedTime) booking.estimatedTime = estimatedTime;
    if (distance) booking.distance = distance;
    booking.updatedAt = new Date();

    await booking.save();

    // If completed, make ambulance available again
    if (status === 'COMPLETED' && booking.ambulanceId) {
      await Ambulance.findByIdAndUpdate(booking.ambulanceId, { available: true });
    }

    const updatedBooking = await Booking.findById(bookingId)
      .populate('ambulanceId')
      .populate('patientId', '-password');

    res.json({
      message: 'Booking updated successfully',
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get nearby ambulances
exports.getNearbyAmbulances = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 50000 } = req.query;

    const ambulances = await Ambulance.find({
      available: true,
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).limit(10);

    res.json({ ambulances });
  } catch (error) {
    console.error('Get nearby ambulances error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update ambulance location
exports.updateAmbulanceLocation = async (req, res) => {
  try {
    const { ambulanceId, coordinates } = req.body;

    const ambulance = await Ambulance.findByIdAndUpdate(
      ambulanceId,
      {
        currentLocation: {
          type: 'Point',
          coordinates
        }
      },
      { new: true }
    );

    if (!ambulance) {
      return res.status(404).json({ message: 'Ambulance not found' });
    }

    res.json({
      message: 'Location updated successfully',
      ambulance
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all ambulances (for map view)
exports.getAllAmbulances = async (req, res) => {
  try {
    const ambulances = await Ambulance.find().populate('driverId', '-password');
    res.json({ ambulances });
  } catch (error) {
    console.error('Get all ambulances error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
