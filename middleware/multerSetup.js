// const multer = require('multer');

// // Storage configuration for Multer
// const storage = multer.memoryStorage(); // You can customize storage as needed

// // Create Multer instance with configuration
// const upload = multer({
//   storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // Limit file size if required
//   },
//   fileFilter: (req, file, callback) => {
//     // Implement file filtering if needed (e.g., check file types)
//     // Example:
//     // if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//     //   callback(null, true);
//     // } else {
//     //   callback(new Error('Invalid file type'), false);
//     // }
//     callback(null, true); // Allow all files by default
//   },
// });

// module.exports = upload;


// const multer = require('multer');
import multer from 'multer'

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single('profilePicture'); // Modify this to match your file field name

// module.exports = upload;

export default upload;
