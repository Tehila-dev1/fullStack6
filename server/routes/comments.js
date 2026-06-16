import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /comments?postId=X - comments של post
router.get('/', async (req, res) => {
  try {
    const { postId } = req.query;
    if (postId) {
      const [rows] = await pool.query('SELECT * FROM comments WHERE post_id = ? ORDER BY id', [postId]);
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM comments ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /comments - הוספת comment חדש
router.post('/', async (req, res) => {
  try {
    const { postId, userId, name, email, body } = req.body;
    const commentId = randomUUID();
    await pool.query(
      'INSERT INTO comments (id, post_id, user_id, name, email, body) VALUES (?, ?, ?, ?, ?, ?)',
      [commentId, postId, userId, name, email, body]
    );
    const [newComment] = await pool.query('SELECT * FROM comments WHERE id = ?', [commentId]);
    res.status(201).json(newComment[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /comments/:id - עדכון comment (רק אם שייך למשתמש)
router.put('/:id', async (req, res) => {
  try {
    const { body, userId } = req.body;
    const [comment] = await pool.query('SELECT * FROM comments WHERE id = ?', [req.params.id]);
    if (comment.length === 0) return res.status(404).json({ error: 'Comment not found' });
    if (comment[0].user_id !== userId) return res.status(403).json({ error: 'Not authorized' });

    await pool.query('UPDATE comments SET body=? WHERE id=?', [body, req.params.id]);
    const [updated] = await pool.query('SELECT * FROM comments WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /comments/:id - מחיקת comment (רק אם שייך למשתמש)
router.delete('/:id', async (req, res) => {
  try {
    const { userId } = req.body;
    const [comment] = await pool.query('SELECT * FROM comments WHERE id = ?', [req.params.id]);
    if (comment.length === 0) return res.status(404).json({ error: 'Comment not found' });
    if (comment[0].user_id !== userId) return res.status(403).json({ error: 'Not authorized' });

    await pool.query('DELETE FROM comments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
