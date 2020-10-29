import express  from 'express';
import { pool } from '../../database/DatabaseConnectionPool';
import Grocery from '../../database/schemes/Grocery';
import ServerResponse from '../ServerResponse';
import Section from '../../database/schemes/Section';
import { QueryResult } from 'pg';
const app = module.exports = express();

const GET_ALL_GROCERY_QUERY = '' +
'SELECT ' +
'grocery_id, grocery_name, grocery.section_id, section_name, sorting_order ' +
'FROM grocery ' +
'INNER JOIN section ' +
'ON grocery.section_id = section.section_id';

app.get('/api/grocery/all', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/grocery/all');

  try {
    const result: QueryResult<any> = await pool.query(GET_ALL_GROCERY_QUERY);
    if(result.rowCount > 0) {
      response.data = result.rows.map(r => {
        console.log(r)
        return new Grocery(r.grocery_id, r.grocery_name, new Section(r.section_id, r.section_name, r.sorting_order));
      });
    } else {
      response.data = [];
    }
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});
