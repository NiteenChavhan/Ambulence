const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientPhone: {
    type: String,
    required: true
  },
  ambulanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ambulance'
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    address: {
      type: String
    }
  },
  accidentType: {
    type: String,
    enum: ['Road Accident', 'Heart Attack', 'Fire Injury', 'Snake Bite', 'Pregnancy Emergency', 'Other'],
    required: true
  },
  accidentPhoto: {
    type: String
  },
  status: {
    type: String,
    enum: ['REQUESTED', 'ACCEPTED', 'ON_WAY', 'COMPLETED', 'CANCELLED'],
    default: 'REQUESTED'
  },
  estimatedTime: {
    type: String
  },
  distance: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for geospatial queries
bookingSchema.index({ pickupLocation: '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);
