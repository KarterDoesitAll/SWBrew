const express = require("express");
const ImageKit = require("imagekit");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const {
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = process.env;

console.log("✅ Starting server...");
console.log("🔑 IMAGEKIT_PUBLIC_KEY:", typeof IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PUBLIC_KEY);
console.log("🔒 IMAGEKIT_PRIVATE_KEY:", typeof IMAGEKIT_PRIVATE_KEY, IMAGEKIT_PRIVATE_KEY ? "Loaded ✅" : "Missing ❌");
console.log("🌐 IMAGEKIT_URL_ENDPOINT:", typeof IMAGEKIT_URL_ENDPOINT, IMAGEKIT_URL_ENDPOINT);
console.log("🧪 Raw config passed to ImageKit:", {
  publicKey: IMAGEKIT_PUBLIC_KEY?.trim(),
  privateKey: IMAGEKIT_PRIVATE_KEY?.trim(),
  urlEndpoint: IMAGEKIT_URL_ENDPOINT?.trim(),
});

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY?.trim(),
  privateKey: IMAGEKIT_PRIVATE_KEY?.trim(),
  urlEndpoint: IMAGEKIT_URL_ENDPOINT?.trim(),
});

app.get("/auth", (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    console.log("✅ Generated ImageKit auth params:", result);
    res.send(result);
  } catch (error) {
    console.error("❌ Failed to generate auth params:", error.message);
    res.status(500).json({ error: "Server error generating auth params" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
