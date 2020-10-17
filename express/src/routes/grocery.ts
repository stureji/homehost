import express  from 'express';
const app = module.exports = express();

app.get('/api/grocery', (req: any, res: any) => {
  console.log('HTTP GET   /api/grocery');
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  });
});
