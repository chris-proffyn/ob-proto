// netlify/functions/webhook.js

export async function handler(event, context) {
  const VERIFY_TOKEN = "proffyn-secret";

  // Meta's verification request (GET)
  if (event.httpMethod === "GET") {
    const params = new URLSearchParams(event.queryStringParameters);
    const mode = params.get("hub.mode");
    const token = params.get("hub.verify_token");
    const challenge = params.get("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return { statusCode: 200, body: challenge };
    } else {
      return { statusCode: 403, body: "Verification failed" };
    }
  }

  // WhatsApp's incoming messages (POST)
  if (event.httpMethod === "POST") {
    const body = JSON.parse(event.body || "{}");
    console.log("Incoming message:", JSON.stringify(body, null, 2));

    // You can now process messages or trigger responses here.
    return { statusCode: 200, body: "EVENT_RECEIVED" };
  }

  return { statusCode: 405, body: "Method Not Allowed" };
}

