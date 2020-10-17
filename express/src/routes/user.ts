import express  from 'express';
import User from '../classes/User';

const sverker = new User(0, 'Sverker Petersson');
const lina = new User(1, 'Bosse Bosinna');
const users = new Array<User>(sverker, lina);

const app = module.exports = express();

app.get('/user', (req: any, res: any) => {
  res.status(200).json({
    status: 200,
    message: "OK",
    data: users.map(u => u.toJson())
  })
});
