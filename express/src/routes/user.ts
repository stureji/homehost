import express  from 'express';
import { pool } from '../database';
import User, { UserJSON } from '../classes/data/User';

const app = module.exports = express();

app.get('/api/user', async (req: any, res: any) => {
  console.log('HTTP GET   /api/user');
  let status = 400;
  let message = "BAD_REQUEST";
  let data: UserJSON[];

  data = await pool.connect().then((connection) => {
    if(connection) {
      return pool.query('SELECT user_id, username FROM users');
    } else {
      throw new Error('Could not connect to database.');
    }
  }).then((dbresult) => {
    if(dbresult.rowCount > 0) {
      status = 200;
      message = "OK"
      console.log("HTTP RESPONSE: 200 OK");
      return dbresult.rows.map( r => {
        return new User(r.user_id, r.username, r.shoplist).toJson();
      });
    } else {
      status = 404;
      message = "NOT_FOUND";
      console.log("HTTP RESPONSE: 404 NOT_FOUND");
      return [];
    }
  }).catch((error) => {
    console.log(error);
    console.log("HTTP RESPONSE: 400 BAD_REQUEST");
    return [];
  });

  res.status(status).json({
    status,
    message,
    data
  });
});

app.get('/api/user/login', (req: any, res:any) => {
  console.log('HTTP GET   /api/user/login');
  console.log('HTTP RESPONSE: 400 BAD_REQUEST');
  res.status(400).json({
    status: 400,
    message: "BAD_REQUEST",
    data: [ ]
  })
});

app.post('/api/user/login', async (req: any, res: any) => {
  const requestId = parseInt(req.body.id);
  console.log('HTTP POST  /api/user/login' + requestId);
  let status = 401;
  let message = "UNAUTHORIZED";
  let data = JSON.stringify({});

  if(requestId != undefined && requestId != null && requestId > 0) {
    const queryResponse: User | undefined = await pool.connect().then((connection) => {
      if(connection) {
        return pool.query<{user_id: number, username: string}>('SELECT user_id, username FROM users WHERE user_id = $1', [requestId]);
      } else {
        throw new Error('Could not connect to database.');
      }
    }).then((dbresult) => {
      if(dbresult.rowCount == 1) {
        status = 200;
        message = "OK";
        return new User(dbresult.rows[0].user_id, dbresult.rows[0].username);
      } else {
        throw new Error('Authorization failed');
      }
    }).catch((error) => {
      console.log(error);
      return undefined;
    });

    if(queryResponse != undefined) {
      data = JSON.stringify(queryResponse.toJson());
    }
  } else {
    status = 400;
    message = "BAD_REQUEST"
  }

  res.status(status).json({
    status,
    message,
    data
  })
});
