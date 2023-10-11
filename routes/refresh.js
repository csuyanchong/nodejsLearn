const express = require('express');

const router = express.Router();

const refreshController = require('../controller/refreshTokenController');

router.post('/', refreshController.handleRefreshToken);

module.exports = router;