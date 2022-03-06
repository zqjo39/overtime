var express = require('express');
var router = express.Router();
const pageController = require('../controllers/pageController');

router.get('/', pageController.renderDashboard)
router.get('/accounting', pageController.renderAccounting);
router.get('/marketing', pageController.renderMarketing);
router.get('/sales',pageController.renderSales);
router.get('/hr', pageController.renderHR);


module.exports = router;
