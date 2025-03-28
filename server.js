const express = require("express");
const ImageKit = require("imagekit");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

console.log("✅ Starting server...");

// Log env variable types and values
console.log("🔑 IMAGEKIT_PUBLIC_KEY:", typeof process.env.IMAGEKIT_PUBLIC_KEY, process.env.IMAGEKIT_PUBLIC_KEY);
console.log("🔒 IMAGEKIT_PRIVATE_KEY:", typeof process.env.IMAGEKIT_PRIVATE_KEY, process.env.IMAGEKIT_PRIVATE_KEY ? "Loaded ✅" : "Missing ❌");
console.log("🌐 IMAGEKIT_URL_ENDPOINT:", typeof process.env.IMAGEKIT_URL_ENDPOINT, process.env.IMAGEKIT_URL_ENDPOINT);

if (
  !process.env.IMAGEKIT_PUBLIC_KEY ||
  !process.env.IMAGEKIT_PRIVATE_KEY ||
  !process.env.IMAGEKIT_URL_ENDPOINT
) {
  console.error("❌ Missing ImageKit credentials. Check Render Environment Variables.");
  process.exit(1); // exit before crashing
}

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

console.log("🧪 Raw config passed to ImageKit:", {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.get("/auth", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
