import https from "https";

const STREAM_API_KEY = process.env.STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

// Helper function to make authenticated requests to Stream API
function makeStreamRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${STREAM_API_KEY}:${STREAM_API_SECRET}`).toString('base64');

    const options = {
      hostname: 'video.stream-io-api.com',
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ statusCode: res.statusCode, data: response });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

export async function createCall(req, res) {
  try {
    const { callId } = req.body;
    if (!callId) {
      return res.status(400).json({ message: "Call ID is required" });
    }

    // Create call using Stream's REST API
    const response = await makeStreamRequest(
      'POST',
      `/video/call/default`,
      {
        id: callId,
        created_by_id: req.user._id,
        members: [],
      }
    );

    if (response.statusCode === 201) {
      res.status(201).json({ message: "Call created successfully", callId });
    } else {
      res.status(response.statusCode).json({ message: "Failed to create call" });
    }
  } catch (error) {
    console.error("Error in createCall controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getVideoToken(req, res) {
  try {
    const { callId } = req.params;
    if (!callId) {
      return res.status(400).json({ message: "Call ID is required" });
    }

    // Generate video token using Stream's REST API
    const response = await makeStreamRequest(
      'POST',
      `/video/call/token`,
      {
        user_id: req.user._id,
        call_id: callId,
      }
    );

    if (response.statusCode === 201) {
      res.status(200).json({ token: response.data.token });
    } else {
      res.status(response.statusCode).json({ message: "Failed to get video token" });
    }
  } catch (error) {
    console.error("Error in getVideoToken controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}