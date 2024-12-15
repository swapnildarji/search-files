const s3Client = require('../clients/awsS3Client');
const openSearchClient = require('../clients/openSearchClient');
const config = require('../../config.js');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { PutObjectCommand } = require("@aws-sdk/client-s3");

module.exports = {
    search,
    upload
}

async function search(req, res) {

    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ message: 'Please provide a search query' });
    }

    try {

        const pattern = `.*${q}.*`

        // Perform the search query
        const response = await openSearchClient.search({
            index: 'documents', // The OpenSearch index name
            body: {
                query: {
                    regexp: {
                        content: {  // Field name
                            value: pattern  // Regular expression pattern
                        }
                    }
                }
            },
        });

        const hits = response.body.hits.hits;

        // if (hits.length === 0) {
        //     return res.status(404).json({ message: 'No results found' });
        // }

        return res.status(200).json({
            message: 'Data Fetched Successfully',
            data: hits.map(hit => ({
                // id: hit._id,
                title: hit._source.title,
                // content: hit._source.content,
                url: hit._source.url,
                filePath: hit._source.filePath,
                uploadedAt: hit._source.uploadedAt,
            })),
        });
    } catch (error) {

        console.error('Error executing search query:', error);
        return res.status(500).json({ message: 'Error performing search' });
    }
}

async function upload(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileExtention = req.file.originalname.split('.').pop().toLowerCase()

    const bucketName = `my-borneo-bucket`;
    const newFileName = `${Date.now()}_${req.file.originalname}`

    const params = {
        Bucket: bucketName, // Your S3 bucket name
        Key: `uploads/${newFileName}`, // Unique file name
        Body: req.file.buffer, // File buffer from multer
        ContentType: req.file.mimetype,
        ACL: 'public-read'
    };
    const encodedFilePath = encodeURIComponent(params.Key);

    try {
        // Upload file to S3
        const command = new PutObjectCommand(params);
        await s3Client.send(command);


        const document = {
            title: newFileName,
            content: '',
            url: `https://${bucketName}.s3.${config.awsRegion}.amazonaws.com/${encodedFilePath}`,
            filePath: params.Key,
            uploadedAt: new Date(),
        };

        if (fileExtention == 'txt') {
            document.content = req.file.buffer.toString('utf-8');
        } else if (fileExtention == 'pdf') {
            const data = await pdfParse(req.file.buffer);
            document.content = data.text
        } else {
            const data = await mammoth.extractRawText({ buffer: req.file.buffer })
            document.content = data.value
        }

        const indexResponse = await openSearchClient.index({
            index: 'documents',
            body: document
        });

        res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: `https://${bucketName}.s3.${config.awsRegion}.amazonaws.com/${encodedFilePath}`,
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
}