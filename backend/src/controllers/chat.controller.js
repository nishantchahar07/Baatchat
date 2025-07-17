import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = await generateStreamToken(req.user._id);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in getStream controller :", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
