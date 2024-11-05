import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Website Manage",
  password: "h168035853",
  port: 5432,
});
db.connect();
export { db };
