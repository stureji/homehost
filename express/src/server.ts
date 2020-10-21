'use strict';

/* Imports */

import express  from 'express';
import ServerResponse from './classes/ServerResponse';
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
  const response = new ServerResponse('HTTP GET   /');
  response.status = 404;
  res.status(response.status).json(response.json);
});

app.get('/api', (req: any, res: any) => {
  const response = new ServerResponse('HTTP GET   /api');
  response.status = 200;
  res.status(response.status).json(response.json);
});

app.listen(process.env.HOST_PORT, () => {
  console.log('Server listening on port ' + process.env.HOST_PORT);
})
