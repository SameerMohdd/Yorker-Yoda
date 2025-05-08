// API route for proxying requests to Cricinfo
// This can be deployed to Vercel or similar serverless environments

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  
  // Get URL from query parameter
  const url = req.query.url;
  
  if (!url) {
    res.status(400).json({ error: 'URL parameter is required' });
    return;
  }
  
  try {
    // Fetch the target URL
    const response = await fetch(url);
    
    // Get content type from response to properly forward it
    const contentType = response.headers.get('content-type');
    
    // Forward the content type
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // Get the response body
    const body = await response.text();
    
    // Send the response
    res.status(response.status).send(body);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch the URL', details: error.message });
  }
}
