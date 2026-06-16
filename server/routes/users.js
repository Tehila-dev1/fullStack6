import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /users - כל המשתמשים
router.get('/', async (req, res) => {
  try {
    const { username } = req.query;
    if (username) {
      const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id - משתמש לפי id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users - הוספת משתמש חדש
router.post('/', async (req, res) => {
  try {
    const { name, username, email, phone, website, password } = req.body;
    const userId = randomUUID();
    const passwordId = randomUUID();
    await pool.query(
      'INSERT INTO users (id, name, username, email, phone, website) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, name, username, email, phone, website]
    );
    // שמירת הסיסמה בטבלת passwords
    await pool.query('INSERT INTO passwords (id, user_id, password) VALUES (?, ?, ?)', [passwordId, userId, password]);
    const [newUser] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
    res.status(201).json(newUser[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /users/:id - עדכון משתמש
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, website } = req.body;
    await pool.query(
      'UPDATE users SET name=?, email=?, phone=?, website=? WHERE id=?',
      [name, email, phone, website, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
