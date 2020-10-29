import express  from 'express';
import { QueryResult } from 'pg';
import { pool } from '../../database/DatabaseConnectionPool';
import User from '../../database/schemes/User';
import ServerResponse from '../ServerResponse';
const app = module.exports = express();

const GET_ALL_USERS_QUERY = 'SELECT user_id, username FROM users';
const GET_SPECIFIC_USER_QUERY = 'SELECT user_id, username FROM users WHERE user_id = $1';

app.get('/api/user', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/user');

  const result: QueryResult<any> = await pool.query(GET_ALL_USERS_QUERY);
  if(result.rowCount > 0) {
    response.data = result.rows.map(r => {
      return new User(r.user_id, r.username);
    });
  } else {
    response.data = [];
  }

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

    const result: QueryResult<any> = await pool.query(GET_SPECIFIC_USER_QUERY, [requestId]);
    const data = result.rows.map(r => {
      return new User(r.user_id, r.username);
    });

    if(data.length == 1) {
      response.data = data;
    } else {
      response.status = 401;
    }
  }

  res.status(response.status).json(response.json);
});
