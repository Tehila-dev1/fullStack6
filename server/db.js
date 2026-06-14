import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tehila2003', // ← שני את זה לסיסמה שלך
  database: 'project6',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;
