const fs = require('fs');
var { parse } = require("csv-parse")
const uniqueClientIds = [];

fs.createReadStream('meter_values_dump_10k.csv')
    .pipe(parse({ delimiter: ',' }))
    .on('data', (row) => {
        if (!uniqueClientIds.includes(row[0]) && row[0] !== 'charge_point_id') {
            uniqueClientIds.push(row[0]);
        }
    })
    .on('end', () => {
        console.log(uniqueClientIds);
        const jsonData = JSON.stringify(uniqueClientIds, null, 2); // The second argument (null) is for a replacer function, and the third argument (2) is for indentation.

        fs.writeFile('ClientIds.json', jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
            } else {
                console.log('JSON file has been created.');
            }
        });
    });
