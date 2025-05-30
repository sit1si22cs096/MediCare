// Test file to verify MongoDB connection
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  // Log the environment variable (redacted for security)
  console.log('MongoDB URI available:', !!process.env.MONGODB_URI);
  
  // Connection URI from environment variable
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return res.status(500).json({ 
      success: false, 
      message: 'MongoDB URI not found in environment variables'
    });
  }

  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    // List databases to verify connection
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    
    // Create a test document in your database
    // Use the default database name from your connection string
    const database = client.db();
    const collection = database.collection('test');
    
    // Insert a test document
    const testDoc = {
      test: true,
      message: 'Test connection from Vercel',
      timestamp: new Date().toISOString()
    };
    
    const result = await collection.insertOne(testDoc);
    
    return res.status(200).json({ 
      success: true, 
      message: 'MongoDB connection successful',
      databases: dbs.databases.map(db => db.name),
      insertResult: result
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to connect to MongoDB',
      error: error.message
    });
  } finally {
    // Close the connection
    await client.close();
  }
}
