const router = require('express').Router();

router.use('/api/v1/meter-value', require('./meterValue'));

module.exports = router;