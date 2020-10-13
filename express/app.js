'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const User = require('./classes/User.js');

const mock_users = [new User(0, "user0", 0), new User(1, "user1", 0)];

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Implement endpoints

app.get('/', (req, res) => {
  console.log('HTTP GET  /');
  res.status(200).json({
    status: 200,
    message: "OK",
    data: mock_users
  })
})

app.listen(4000, () => {
  console.log('Server listening on port 4000');
})
