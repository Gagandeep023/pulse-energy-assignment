const mqtt = require("mqtt");
const fs = require('fs');
var { parse } = require("csv-parse")
const args = process.argv.slice(2);
console.log(args);

var client = mqtt.connect("mqtt://broker.hivemq.com");
let clientId = args[0];
const dataOfclient = [];

const publishDataForID = (data) => {
    data.forEach((row, index) => {
      setTimeout(() => {
        console.log(row[0], index);
        client.publish("GaganPulseEnergy",row.toString());
     }, index*10000); 
    });
  };
  
client.on("connect",function()
{
    fs.createReadStream('meter_values_dump_10k.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
        if (row[0] == clientId) {
            dataOfclient.push(row)            
        }
    }).on('end', () => {
        if (dataOfclient.length > 0) {
            publishDataForID( dataOfclient);
        } else {
          console.log(`No data found for ID: ${clientId}`);
        }
      });

});

