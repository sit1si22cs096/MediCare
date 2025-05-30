// Vercel API route for handling appointment submissions
import { MongoClient } from 'mongodb';

// Connection URI - using direct connection string for testing
const uri = 'mongodb+srv://manoharreddy8431:Manu2004@cluster0.mwkxs7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// For debugging
console.log('Appointments API route loaded');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Create a new MongoClient
  let client;
  
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (initError) {
    console.error('Error initializing MongoDB client:', initError);
    return res.status(500).json({ 
      success: false, 
      message: 'Error initializing database connection',
      error: initError.message
    });
  }

  try {
    console.log('Processing appointment request');
    const appointmentData = req.body;
    console.log('Appointment data received:', JSON.stringify(appointmentData));
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        console.log(`Validation failed: Missing required field: ${field}`);
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Connect to the MongoDB server
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    // Use the default database name from your connection string
    const database = client.db();
    console.log('Database selected');
    
    const collection = database.collection('appointments');
    console.log('Collection selected: appointments');

    // Add metadata to the appointment data
    const appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Insert the appointment into the database
    console.log('Attempting to insert appointment data');
    const result = await collection.insertOne(appointment);
    console.log('Appointment inserted successfully:', result);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Appointment request submitted successfully! We will contact you shortly.'
    });
  } catch (error) {
    console.error('Error processing appointment:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request. Please try again.'
    });
  } finally {
    // Close the connection
    await client.close();
  }
}
