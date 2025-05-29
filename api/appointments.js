// Vercel API route for handling appointment submissions
import { MongoClient } from 'mongodb';

// Connection URI from environment variable
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    const appointmentData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Connect to the MongoDB server
    await client.connect();
    const database = client.db('medicare');
    const collection = database.collection('appointments');

    // Add metadata to the appointment data
    const appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Insert the appointment into the database
    await collection.insertOne(appointment);
    
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
