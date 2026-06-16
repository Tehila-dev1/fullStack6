import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /todos?userId=X - todos של משתמש
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const [rows] = await pool.query('SELECT * FROM todos WHERE user_id = ? ORDER BY id', [userId]);
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM todos ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /todos/:id - todo לפי id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Todo not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos - הוספת todo חדש
router.post('/', async (req, res) => {
  try {
    const { userId, title, completed = false } = req.body;
    const todoId = randomUUID();
    await pool.query(
      'INSERT INTO todos (id, user_id, title, completed) VALUES (?, ?, ?, ?)',
      [todoId, userId, title, completed]
    );
    const [newTodo] = await pool.query('SELECT * FROM todos WHERE id = ?', [todoId]);
    res.status(201).json(newTodo[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /todos/:id - עדכון todo
router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;
    await pool.query(
      'UPDATE todos SET title=?, completed=? WHERE id=?',
      [title, completed, req.params.id]
    );
    const [updated] = await pool.query('SELECT * FROM todos WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id - מחיקת todo
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM todos WHERE id = ?', [req.params.id]);
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
