// Sample Data Script - Run this to add test ambulances to your database
// node seedData.js

const mongoose = require('mongoose');
require('dotenv').config();

const ambulancesData = [
  {
    vehicleNumber: "KA-01-AB-1234",
    driverName: "Rajesh Kumar",
    driverPhone: "9876543210",
    currentLocation: {
      type: "Point",
      coordinates: [77.5946, 12.9716] // Bangalore
    },
    available: true
  },
  {
    vehicleNumber: "KA-02-CD-5678",
    driverName: "Suresh Patil",
    driverPhone: "9876543211",
    currentLocation: {
      type: "Point",
      coordinates: [77.6031, 12.9698] // Near Bangalore
    },
    available: true
  },
  {
    vehicleNumber: "KA-03-EF-9012",
    driverName: "Mahesh Reddy",
    driverPhone: "9876543212",
    currentLocation: {
      type: "Point",
      coordinates: [77.5800, 12.9800] // Bangalore North
    },
    available: true
  },
  {
    vehicleNumber: "KA-04-GH-3456",
    driverName: "Venkatesh Rao",
    driverPhone: "9876543213",
    currentLocation: {
      type: "Point",
      coordinates: [77.6100, 12.9600] // Bangalore East
    },
    available: true
  },
  {
    vehicleNumber: "KA-05-IJ-7890",
    driverName: "Ramesh Gowda",
    driverPhone: "9876543214",
    currentLocation: {
      type: "Point",
      coordinates: [77.5700, 12.9500] // Bangalore South
    },
    available: true
  },
  {
    vehicleNumber: "KA-06-KL-2345",
    driverName: "Prakash Shetty",
    driverPhone: "9876543215",
    currentLocation: {
      type: "Point",
      coordinates: [75.7139, 15.3173] // Karnataka Central
    },
    available: true
  },
  {
    vehicleNumber: "KA-07-MN-6789",
    driverName: "Santosh Nayak",
    driverPhone: "9876543216",
    currentLocation: {
      type: "Point",
      coordinates: [74.8560, 12.9141] // Mangalore
    },
    available: true
  },
  {
    vehicleNumber: "KA-08-OP-0123",
    driverName: "Kiran Kumar",
    driverPhone: "9876543217",
    currentLocation: {
      type: "Point",
      coordinates: [76.6394, 12.2958] // Mysore
    },
    available: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Import models
    const User = require('./models/User');
    const Ambulance = require('./models/Ambulance');

    // Create driver users first
    console.log('Creating driver users...');
    const drivers = [];
    
    for (let i = 0; i < ambulancesData.length; i++) {
      const ambulanceData = ambulancesData[i];
      
      // Check if driver already exists
      let driver = await User.findOne({ phone: ambulanceData.driverPhone });
      
      if (!driver) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        driver = await User.create({
          name: ambulanceData.driverName,
          email: `driver${i + 1}@ambulance.com`,
          phone: ambulanceData.driverPhone,
          password: hashedPassword,
          role: 'DRIVER'
        });
        console.log(`✅ Created driver: ${driver.name}`);
      } else {
        console.log(`ℹ️ Driver already exists: ${driver.name}`);
      }
      
      drivers.push(driver);
    }

    // Create ambulances
    console.log('\nCreating ambulances...');
    
    for (let i = 0; i < ambulancesData.length; i++) {
      const ambulanceData = ambulancesData[i];
      
      // Check if ambulance already exists
      const existingAmbulance = await Ambulance.findOne({ 
        vehicleNumber: ambulanceData.vehicleNumber 
      });
      
      if (!existingAmbulance) {
        await Ambulance.create({
          driverId: drivers[i]._id,
          vehicleNumber: ambulanceData.vehicleNumber,
          driverName: ambulanceData.driverName,
          driverPhone: ambulanceData.driverPhone,
          currentLocation: ambulanceData.currentLocation,
          available: ambulanceData.available
        });
        console.log(`✅ Created ambulance: ${ambulanceData.vehicleNumber}`);
      } else {
        console.log(`ℹ️ Ambulance already exists: ${ambulanceData.vehicleNumber}`);
      }
    }

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ role: 'ADMIN' });
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await User.create({
        name: 'Admin User',
        email: 'admin@ambulance.com',
        phone: '9999999999',
        password: hashedPassword,
        role: 'ADMIN'
      });
      console.log('\n✅ Created admin user');
      console.log('   Email: admin@ambulance.com');
      console.log('   Password: admin123');
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Drivers: ${drivers.length}`);
    console.log(`   - Ambulances: ${ambulancesData.length}`);
    console.log(`   - Admin: 1`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
