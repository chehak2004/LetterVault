// db.js
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root", // change if needed
  password: "", // your MySQL password
  database: "drdo_letters", // make sure this database exists
});

export default db;
