import express  from 'express';
const app = module.exports = express();

app.get('/api/section', (req: any, res: any) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  });
});
