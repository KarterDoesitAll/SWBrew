const express = require('express');
const ImageKit = require('imagekit');
const cors = require('cors');

require('dotenv').config(); // ✅ this line is required

const app = express();
app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});
