import express  from 'express';
import { pool } from '../database';
import User, { UserJSON } from '../classes/data/User';

const app = module.exports = express();

app.get('/api/user', async (req: any, res: any) => {
  console.log('HTTP GET   /api/user');

  const data: UserJSON[] = await pool.connect().then((connection) => {
    if(connection) {
      return pool.query('SELECT * FROM users');
    } else {
      throw new Error('Could not connect to database.');
    }
  }).then((dbresult) => {
    return dbresult.rows.map( r => {
      return new User(r.user_id, r.username).toJson();
    });
  }).catch((error) => {
    console.log(error);
    return [ new User(0, 'error').toJson() ];
  });

  res.status(200).json({
    status: 200,
    message: "OK",
    data
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
