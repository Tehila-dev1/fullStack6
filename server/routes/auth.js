import express from 'express';
import pool from '../db.js';

const router = express.Router();

// POST /auth/login - התחברות
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // חיפוש המשתמש לפי username
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    const user = users[0];
    // בדיקת הסיסמה
    const [passwords] = await pool.query('SELECT * FROM passwords WHERE user_id = ?', [user.id]);
    if (passwords.length === 0 || passwords[0].password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /auth/check-username - בדיקה אם username קיים
router.get('/check-username', async (req, res) => {
  try {
    const { username } = req.query;
    const [rows] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    res.json({ exists: rows.length > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
