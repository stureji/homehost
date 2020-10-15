const express = require('express');
const app = module.exports = express();

app.get('/user', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  })
});
