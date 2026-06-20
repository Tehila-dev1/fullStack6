import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /albums - קבלת אלבומים
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId) {
      const [rows] = await pool.query('SELECT * FROM albums WHERE user_id = ? ORDER BY id DESC', [userId]);
      const mapped = rows.map(r => ({ ...r, userId: r.user_id }));
      return res.json(mapped);
    }
    const [rows] = await pool.query('SELECT * FROM albums ORDER BY id DESC');
    const mapped = rows.map(r => ({ ...r, userId: r.user_id }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /albums - יצירת אלבום חדש (מעודכן ל-UUID!)
router.post('/', async (req, res) => {
  try {
    const { userId, title } = req.body;
    const albumId = randomUUID(); // מחולל מזהה מאובטח

    await pool.query(
      'INSERT INTO albums (id, user_id, title) VALUES (?, ?, ?)',
      [albumId, userId, title]
    );

    const [newAlbum] = await pool.query('SELECT * FROM albums WHERE id = ?', [albumId]);
    
    res.status(201).json({
      ...newAlbum[0],
      userId: newAlbum[0].user_id
    }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;