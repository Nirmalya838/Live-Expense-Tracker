const express = require('express');
const router = express.Router();
const getReportPageController = require('../controllers/getReportPageController');

router.get('/report', getReportPageController.getReportPage);

module.exports = router;