const cloudinary = require("cloudinary").v2;
const {
  API_CLOUDINARY_CLOUD_NAME,
  API_CLOUDINARY_API_KEY,
  API_CLOUDINARY_API_SECRET,
} = process.env;

cloudinary.config({
  cloud_name: API_CLOUDINARY_CLOUD_NAME,
  api_key: API_CLOUDINARY_API_KEY,
  api_secret: API_CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = {
  cloudinary,
};
