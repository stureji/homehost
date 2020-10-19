import { Pool } from 'pg';

export const pool = new Pool({
  user: "USERNAME",
  password: "PASSWORD",
  host: "localhost",
  port: 5432,
  database: "homehost"
});

