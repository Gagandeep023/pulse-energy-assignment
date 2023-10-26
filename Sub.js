const mqtt = require("mqtt");
const uuid = require("uuid");
const { MeterValueRecords } = require("./models");

var client = mqtt.connect("mqtt://broker.hivemq.com");

client.on("connect", function () {

    client.subscribe("GaganPulseEnergy");

    console.log("Client subscribed ");

});


client.on('message', async (topic, message) => {
    const meterValueString = message.toString();

    const jsonStartIndex = meterValueString.indexOf('{');
    let chargePointId;
    let Payload;
    if (jsonStartIndex !== -1) {
        chargePointId = meterValueString.slice(0, jsonStartIndex -1);
        Payload = meterValueString.slice(jsonStartIndex);
    } else {
      console.error('No payload found in the input string.');
    }

    const uuidToken = uuid.v4();
    const newRecords = new MeterValueRecords({
        uuid: uuidToken,
        charge_point_id: chargePointId,
        payload: Payload,
    });

    try {

        newRecords.save()
            .then(() => {
                console.log('success')
            }).catch(error => {
                console.log(error)
            })

    } catch (err) {

        res.json({ success: false, msg: err });

    }
    
})



