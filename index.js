require("dotenv").config();
const express = require('express');
const db = require("./models");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const port= process.env.port || 3500

const app = express();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(require('./routes')); 


db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
  });
});
