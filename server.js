const express = require("express");
const ImageKit = require("imagekit");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// 🔍 Log the environment variables for debugging
console.log("✅ Starting server...");
console.log("🔑 IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY);
console.log("🔒 IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY ? "Loaded ✅" : "Missing ❌");
console.log("🌐 IMAGEKIT_URL_ENDPOINT:", process.env.IMAGEKIT_URL_ENDPOINT);

const imagekit = new ImageKit({
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
  console.log(`🚀 Server running on port ${PORT}`);
});
