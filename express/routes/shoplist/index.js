const express = require('express');
const app = module.exports = express();

app.get('/shoplist', (req, res) => {
  res.status.json({
    status: 200,
    message: "OK",
    data: [ ]
  })
})
