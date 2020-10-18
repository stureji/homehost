'use strict';

/* Imports */

import express  from 'express';
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

/* Middleware */

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Define end points */

const endpoints = Array();
endpoints.push(require('./routes/grocery'));
endpoints.push(require('./routes/recipe'));
endpoints.push(require('./routes/section'));
endpoints.push(require('./routes/user'));

/* Use the defined endpoints */

endpoints.forEach(e => app.use(e));

/* Root end point */

app.get('/', (req:any, res:any) => {
  console.log('HTTP GET   /')
  res.status(404).json({
    status: 404,
    message: "NOT_FOUND"
  });
});

app.get('/api', (req: any, res: any) => {
  console.log('HTTP GET   /api');
  res.status(200).json({
    status: 200,
    message: "OK"
  });
});

app.listen(process.env.HOST_PORT, () => {
  console.log('Server listening on port ' + process.env.HOST_PORT);
})
