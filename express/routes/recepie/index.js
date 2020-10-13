const express = require('express');
const app = module.exports = express();

app.get('/recepie', (req, res) => {
  res.status.json({
    status: 200,
    message: "OK",
    data: [ ]
  })
})
