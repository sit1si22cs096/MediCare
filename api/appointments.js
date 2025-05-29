// Vercel API route for handling appointment submissions

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const appointmentData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        return res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    // In a real application, you would store this data in a database
    // For example, using Vercel KV, Vercel Postgres, or a third-party service
    
    // Example with Vercel KV (uncomment and configure when setting up Vercel KV)
    /*
    import { kv } from '@vercel/kv';
    
    // Generate a unique ID for the appointment
    const id = Date.now().toString();
    
    // Add metadata
    const appointment = {
      ...appointmentData,
      id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Store in Vercel KV
    await kv.set(`appointment:${id}`, JSON.stringify(appointment));
    */
    
    // For now, we'll just return a success response
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
  }
}
