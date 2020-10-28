import express  from 'express';
import { pool } from '../../database/DatabaseConnectionPool';
import Grocery from '../../database/schemes/Grocery';
import ServerResponse from '../../providers/ServerResponse';
import Section from '../../database/schemes/Section';
const app = module.exports = express();

const GET_ALL_GROCERY_QUERY = '' +
'SELECT ' +
'grocery_id, grocery_name, grocery.section_id, section_name, sorting_order ' +
'FROM grocery ' +
'INNER JOIN section ' +
'ON grocery.section_id = section.section_id';

app.get('/api/grocery/all', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/grocery/all');

  response.data = await pool.connect().then((connection) => {
    if(connection) {
      const query = pool.query(GET_ALL_GROCERY_QUERY);
      connection.release();
      return query;
    } else {
      throw new Error('Could not connect to database.');
    }
  }).then((res) => {
    if(res.rowCount > 0) {
      return res.rows.map( r => {
        return new Grocery(r.grocery_id, r.grocery_name, new Section(r.section_id, r.section_name));
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
