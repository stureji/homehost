import { Pool, QueryResult } from 'pg';
require('dotenv').config();

const portNumber = () => {
  if(process.env.DB_PORT != undefined) {
    return parseInt(process.env.DB_PORT);
  }
  else 5432
}

export const pool = {
  pool: new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: portNumber(),
    database: process.env.DB_NAME
  }),
  query: (queryString: string, values?: any[]): Promise<QueryResult<any>> => pool.pool.query(queryString, values)
};

