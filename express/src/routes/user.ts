import express  from 'express';
import User from '../classes/data/User';

const sverker = new User(0, 'Sverker Petersson');
const lina = new User(1, 'Bosse Bosinna');
const users = new Array<User>(sverker, lina);

const app = module.exports = express();

app.get('/api/user', (req: any, res: any) => {
  console.log('HTTP GET   /api/user');
  res.status(200).json({
    status: 200,
    message: "OK",
    data: users.map(u => u.toJson())
  });
});

app.post('/api/user/login', (req: any, res: any) => {
  console.log('HTTP POST  /api/user/login');
  let status = 401;
  let message = "UNAUTHORIZED";
  let data = JSON.stringify({});
  const requestId = req.body.id;

  if(requestId != undefined && requestId != null) {
    const search = users.find(u => u.id == requestId);
    if(search) {
      status = 200;
      message = "OK";
      data = JSON.stringify(search.toJson());
    }
  }

  res.status(status).json({
    status,
    message,
    data
  })
})
