// Vercel API route for handling contact form submissions

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
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

    // In a real application, you would store this data in a database
    // For example, using Vercel KV, Vercel Postgres, or a third-party service
    
    // Example with Vercel KV (uncomment and configure when setting up Vercel KV)
    /*
    import { kv } from '@vercel/kv';
    
    // Generate a unique ID for the contact submission
    const id = Date.now().toString();
    
    // Add metadata
    const contact = {
      ...contactData,
      id,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    
    // Store in Vercel KV
    await kv.set(`contact:${id}`, JSON.stringify(contact));
    */
    
    // For now, we'll just return a success response
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
  }
}
