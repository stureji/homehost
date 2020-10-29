import express  from 'express';
import { pool } from '../../database/DatabaseConnectionPool';
import Grocery from '../../database/schemes/Grocery';
import ServerResponse from '../ServerResponse';
import Section from '../../database/schemes/Section';
import { QueryResult } from 'pg';
import GrocerySignature from '../../database/schemes/GrocerySignature';
const app = module.exports = express();

const GET_ALL_QUERY = `SELECT
grocery_id, grocery_name, grocery.section_id, section_name, sorting_order
FROM grocery
INNER JOIN section
ON grocery.section_id = section.section_id`;

const GET_BY_LETTER_QUERY = "SELECT * FROM grocery WHERE LOWER(grocery_name) LIKE $1 ORDER BY grocery_name";
const GET_SECTIONLESS = "SELECT * FROM grocery WHERE section_id IS NULL";

app.get('/api/grocery/all', async (req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/grocery/all');

  try {
    const result: QueryResult<any> = await pool.query(GET_ALL_QUERY);
    response.data = result.rows.map(r => {
      return new Grocery(r.grocery_id, r.grocery_name, new Section(r.section_id, r.section_name, r.sorting_order));
    });
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});

app.post('/api/grocery/add', async(req: any, res: any) => {
  /**
   * This API call is for adding a new grocery into the database. It does not need to have a
   * section, but if you do not assign a section; it will be recorded as null and sorting
   * will be imporper.
   */
});

app.get('/api/grocery/sectionless', async(req: any, res: any) => {
  const response = new ServerResponse('GET', '/api/grocery/sectionless');

  try {
    response.data = await pool.query(GET_SECTIONLESS).then((qres) => {
      return qres.rows.map(r => {
        return new GrocerySignature(r.grocery_id, r.grocery_name);
      });
    });
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});

app.get('/api/grocery/:c', async(req: any, res: any) => {
  const c = req.params.c[0];
  const response = new ServerResponse('GET', '/api/grocery/' + c);

  try {
    response.data = await pool.query(GET_BY_LETTER_QUERY, [c + '%']).then((qres) => {
      return qres.rows.map(r => {
        return new GrocerySignature(r.grocery_id, r.grocery_name);
      });
    });
  } catch (error) {
    console.log(error);
    if(error.code == 42501) {
      response.status = 403;
    }
  }

  res.status(response.status).json(response.json);
});

