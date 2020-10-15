import express  from 'express';
const app = module.exports = express();

app.get('/recipe', (req: any, res: any) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  })
});
