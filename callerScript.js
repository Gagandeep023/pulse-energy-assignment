// callerScript.js

const { exec } = require('child_process');
const fs = require('fs');

const scriptToCall = 'Pub.js'; 

const ClientIdsjsonFilePath = 'ClientIds.json'; 

fs.readFile(ClientIdsjsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading JSON file: ${err}`);
    } else {
      try {
        const jsonArgs = JSON.parse(data);
        for (let argumentsToPass of jsonArgs){
  
        const command = `node ${scriptToCall} ${argumentsToPass}`;
  
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error running ${scriptToCall}: ${error}`);
          } else {
            console.log(stdout);
          }
        });
    }
      } catch (jsonParseError) {
        console.error(`Error parsing JSON: ${jsonParseError}`);
      }
    }
  });
