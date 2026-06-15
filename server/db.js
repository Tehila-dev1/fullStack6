import mysql from 'mysql2/promise';
import 'dotenv/config'; // השורה הזו שואבת את הנתונים מקובץ ה-.env

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS, // עכשיו הסיסמה נמשכת בסוד מאחורי הקלעים!
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;