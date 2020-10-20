import express  from 'express';
import { pool } from '../database';
import User, { UserJSON } from '../classes/data/User';
import Grocery from '../classes/data/Grocery';
import Section from '../classes/data/Section';

const app = module.exports = express();

app.get('/api/user', async (req: any, res: any) => {
  console.log('HTTP GET   /api/user');

  const data: User[] = await pool.connect().then((connection) => {
    if(connection) {
      return pool.query('SELECT * FROM users');
    } else {
      throw new Error('Could not connect to database.');
    }
  }).then((dbresult) => {
    return dbresult.rows.map( r => {
      return new User(r.user_id, r.username, r.shoplist);
    });
  }).catch((error) => {
    console.log(error);
    return [ new User(0, 'error') ];
  });

  data[0].shoppinglist.add(new Grocery(1337, 'l33t root', new Section(1337, 'l33t place')));

  res.status(200).json({
    status: 200,
    message: "OK",
    data: data.map(x => x.toJson())
  });
});

app.post('/api/user/login', (req: any, res: any) => {
  const sverker = new User(0, 'Sverker Petersson');
  const lina = new User(1, 'Bosse Bosinna');
  const users = new Array<User>(sverker, lina);

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
