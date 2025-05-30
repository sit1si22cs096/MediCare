// Test MongoDB connection locally
const { MongoClient } = require('mongodb');

// New MongoDB connection string
const uri = 'mongodb+srv://manoharreddy8431:Manu2004@cluster0.mwkxs7a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  const client = new MongoClient(uri);
  
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB successfully!');
    
    // List databases
    const adminDb = client.db('admin');
    const dbs = await adminDb.admin().listDatabases();
    console.log('Available databases:', dbs.databases.map(db => db.name));
    
    // Create a test document
    const database = client.db();
    const collection = database.collection('test');
    
    const testDoc = {
      test: true,
      message: 'Test connection local',
      timestamp: new Date().toISOString()
    };
    
    const result = await collection.insertOne(testDoc);
    console.log('Test document inserted:', result);
    
  } catch (error) {
    console.error('MongoDB connection error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testConnection();
