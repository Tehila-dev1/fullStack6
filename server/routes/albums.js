import express from 'express';
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

// POST /albums - יצירת אלבום חדש (מותאם ל-AUTO_INCREMENT)
router.post('/', async (req, res) => {
  try {
    const { userId, title } = req.body;

    // נותנים ל-MySQL לייצר ID מספרי אוטומטי
    const [result] = await pool.query(
      'INSERT INTO albums (user_id, title) VALUES (?, ?)',
      [userId, title]
    );

    // שליפת האלבום שנוצר לפי ה-insertId שחזר
    const [newAlbum] = await pool.query('SELECT * FROM albums WHERE id = ?', [result.insertId]);
    
    res.status(201).json({
      ...newAlbum[0],
      userId: newAlbum[0].user_id
    }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;