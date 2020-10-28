import express  from 'express';
import { pool } from '../../database/DatabaseConnectionPool';
import User from '../../database/schemes/User';
import ServerResponse from '../../providers/ServerResponse';
const app = module.exports = express();

app.get('/api/user', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/user');

  response.data = await pool.connect().then((connection) => {
    if(connection) {
      const query = pool.query('SELECT user_id, username FROM users');
      connection.release();
      return query;
    } else {
      throw new Error('Could not connect to database.');
    }
  }).then((res) => {
    if(res.rowCount > 0) {
      return res.rows.map( r => {
        return new User(r.user_id, r.username, r.shoplist);
      });
    } else {
      return [];
    }
  }).catch((error) => {
    response.error = error;
    return [];
  });

  res.status(response.status).json(response.json);
});

app.get('/api/user/login*', (req: any, res:any) => {
  const response = new ServerResponse('GET', '/api/user/login');
  res.status(response.status).json(response.json);
});

app.post('/api/user/login', async (req: any, res: any) => {
  // parseFloat to remove scientific notation
  const requestId = parseFloat(req.body.id);
  const response = new ServerResponse('POST', '/api/user/login/' + requestId);

  // should not be null, undefined and should be positve. requestId % 1 == 0 ensures non-decimal
  if(requestId != undefined && requestId != null && requestId > 0 && requestId % 1 == 0) {
    const data: User[] = await pool.connect().then((connection) => {
      if(connection) {
        const query = pool.query('SELECT user_id, username FROM users WHERE user_id = $1', [requestId]);
        connection.release();
        return query;
      } else {
        throw new Error('Could not connect to database.');
      }
    }).then((res) => {
      if(res.rowCount == 1) {
        return [new User(res.rows[0].user_id, res.rows[0].username)];
      } else {
        return [];
      }
    }).catch((error) => {
      response.error = error;
      return [];
    });

    if(data.length == 1) {
      response.data = data;
    } else {
      response.status = 401;
    }
  }

  res.status(response.status).json(response.json);
});
