import express  from 'express';
const app = module.exports = express();

app.get('/api/section/all', (req: any, res: any) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: [ ]
  });
});

app.post('/api/section/add', async(req: any, res: any) => {
  /**
   * This api call will allow an admin to submit new sections into the database.
   */
})
