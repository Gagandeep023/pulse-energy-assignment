const { MeterValueRecords } = require("../models");


const meterValueController = {};

meterValueController.MeterValueByClientIds = async (req, res, next) => {
    if(!req.body.charge_point_id){
        res.status(401).json({ success: false, msg: "Please Provide charge point id" });
    }

    const offset = req.body.offset? req.body.offset: 0;
    const limit = req.body.limit? req.body.limit: 100;


    MeterValueRecords.findAll({where:{ charge_point_id: req.body.charge_point_id },  offset: offset, limit: limit,})
        .then((record) => {
            if (record) {
                res.status(200).json({success: true,  MeterValueRecords: record});
            } else {
                res.status(401).json({ success: false, msg: "You have entered the wrong email or password." });
            }

        })
        .catch((err) => {
            next(err);
        });

};
meterValueController.AllMeterValue = async (req, res, next) => {

    const offset = req.query.offset? req.query.offset: 0;
    const limit = req.query.limit? req.query.limit: 100;


    MeterValueRecords.findAll({ offset: offset, limit: limit})
        .then((record) => {
            if (record) {
                res.status(200).json({success: true,  MeterValueRecords: record});
            } else {
                res.status(401).json({ success: false, msg: "You have entered the wrong email or password." });
            }

        })
        .catch((err) => {
            next(err);
        });

};
module.exports = meterValueController;