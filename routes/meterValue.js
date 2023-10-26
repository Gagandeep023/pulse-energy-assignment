const router = require('express').Router();   
const meterValueController = require("../controlller/meterValue.controller");

router.post('/records-by-client-ids', meterValueController.MeterValueByClientIds);
router.get('/all-records', meterValueController.AllMeterValue);

module.exports = router;
