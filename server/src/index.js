const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(helmet());

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,  // 30 minutes
    max: 50,
    message: "Too many requests from this IP, please try again later",
    handler: (req, res) => {
        // Custom error response when rate limit is exceeded
        return res.status(429).json({
            error: 'Too many requests from this IP, please try again later.',
        });
    },
});

app.use(limiter);

app.use(express.json());

app.use(routes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err)

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            error: 'File size is too large. The maximum allowed size is 5MB.'
        });
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({
            error: 'Only single file is allowed.'
        });
    }

    // Handle custom errors like unsupported file types
    if (err.message === 'File type not allowed') {
        return res.status(400).json({
            error: 'Only .txt, .pdf, and .docx files are allowed.'
        });
    }

    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
