const multer = require('multer');

// Set up Multer storage (in-memory storage for temporary file storage)
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // Allowed file extensions and MIME types
    const allowedExtensions = /pdf|txt|docx/;
    const allowedMimeTypes = /application\/pdf|text\/plain|application\/vnd.openxmlformats-officedocument.wordprocessingml.document/;
  
    const extname = allowedExtensions.test(file.originalname.split('.').pop().toLowerCase());
    const mimetype = allowedMimeTypes.test(file.mimetype);
  
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
    },
    fileFilter: fileFilter,
});

module.exports = upload;
