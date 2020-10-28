'use strict';

/* Imports */

import express  from 'express';
import ServerResponse from './ServerResponse';
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

/* Middleware */

export const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Define end points */

const endpoints = Array();
endpoints.push(require('./api/grocery'));
endpoints.push(require('./api/recipe'));
endpoints.push(require('./api/section'));
endpoints.push(require('./api/user'));

/* Use the defined endpoints */

endpoints.forEach(e => app.use(e));

/* Root end point */

app.get('/api*', (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api');
  response.status = 401;
  res.status(response.status).json(response.json);
});

app.get('/', (req: Request, res: any) => {
  const response = new ServerResponse('GET', '/');
  response.status = 202;
  res.status(response.status).json(response.json);
});

app.get('/*', (req: Request, res: any) => {
  const response = new ServerResponse('GET', '/*');
  response.status = 404;
  res.status(response.status).json(response.json);
});

app.listen(process.env.HOST_PORT, () => {
  console.log('Server listening on port ' + process.env.HOST_PORT);
})
