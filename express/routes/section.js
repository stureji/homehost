const express = require('express');
const app = module.exports = express();

app.get('/section', (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  })
});
