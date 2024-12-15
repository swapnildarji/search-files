const express = require('express');
const controllers = require('../controllers')
const upload = require('../middlewares/fileUpload');

let router = express.Router();

router.get('/search', controllers.search)
router.post('/upload', upload.single('file'), controllers.upload)

module.exports = router;