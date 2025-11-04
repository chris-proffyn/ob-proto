export async function handler(event) {
  if (event.httpMethod === 'GET') {
    const params = event.queryStringParameters;
    const mode = params['hub.mode'];
    const token = params['hub.verify_token'];
    const challenge = params['hub.challenge'];

    if (mode === 'subscribe' && token === 'proffyn-secret') {
      // ✅ Respond to Meta’s verification challenge
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: challenge, // must be plain string
      };
    } else {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Verification failed',
      };
    }
  }

  if (event.httpMethod === 'POST') {
    // ✅ Handle incoming webhook notifications
    try {
      const body = JSON.parse(event.body || '{}');
      console.log('Incoming webhook:', JSON.stringify(body, null, 2));
    } catch (err) {
      console.error('Error parsing webhook body:', err);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/plain' },
      body: 'EVENT_RECEIVED',
    };
  }

  // Fallback for unsupported methods
  return {
    statusCode: 404,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Not Found',
  };
}
