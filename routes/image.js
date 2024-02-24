const express = require('express');

const { getImage } = require('../controllers/image');

const router = express.Router();

router.get('/getimage', getImage);

module.exports = router;
