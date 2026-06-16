import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /posts?userId=X - posts של משתמש
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const [rows] = await pool.query('SELECT * FROM posts WHERE user_id = ? ORDER BY id', [userId]);
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM posts ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /posts/:id - post לפי id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /posts - הוספת post חדש
router.post('/', async (req, res) => {
  try {
    const { userId, title, body } = req.body;
    const postId = randomUUID();
    await pool.query(
      'INSERT INTO posts (id, user_id, title, body) VALUES (?, ?, ?, ?)',
      [postId, userId, title, body]
    );
    const [newPost] = await pool.query('SELECT * FROM posts WHERE id = ?', [postId]);
    res.status(201).json(newPost[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /posts/:id - עדכון post 
router.put('/:id', async (req, res) => {
  try {
    const { title, body, userId } = req.body; 
    
    // הוספנו פה את הבדיקה AND user_id=?
    const [result] = await pool.query(
      'UPDATE posts SET title=?, body=? WHERE id=? AND user_id=?', 
      [title, body, req.params.id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'Not authorized to edit this post' });
    }

    const [updated] = await pool.query('SELECT * FROM posts WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /posts/:id - מחיקת post 
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.query;

    // הוספנו פה את הבדיקה AND user_id=?
    const [result] = await pool.query(
      'DELETE FROM posts WHERE id = ? AND user_id = ?', 
      [req.params.id, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
