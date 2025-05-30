// Vercel API route for handling contact form submissions
import { MongoClient } from 'mongodb';

// Connection URI - using direct connection string for testing
const uri = 'mongodb+srv://manoharreddy8431:Manu2004@cluster0.mwkxs7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Create a new MongoClient
  let client;
  
  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB client initialized successfully');
  } catch (initError) {
    console.error('Error initializing MongoDB client:', initError);
    return res.status(500).json({ 
      success: false, 
      message: 'Error initializing database connection',
      error: initError.message
    });
  }

  try {
    const contactData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!contactData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // Connect to the MongoDB server
    await client.connect();
    // Use the default database name from your connection string
    const database = client.db();
    const collection = database.collection('contacts');

    // Add metadata to the contact data
    const contact = {
      ...contactData,
      id: Date.now().toString(),
      status: 'unread',
      createdAt: new Date().toISOString()
    };

    // Insert the contact into the database
    await collection.insertOne(contact);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your message. Please try again.'
    });
  } finally {
    // Close the connection
    await client.close();
  }
}
