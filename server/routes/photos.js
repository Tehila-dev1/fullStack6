import express from 'express';
import { randomUUID } from 'crypto';
import pool from '../db.js';

const router = express.Router();

// GET /photos - שליפת תמונות לפי אלבום (תומך ב-Pagination)
router.get('/', async (req, res) => {
  try {
    const { albumId, _page, _per_page } = req.query;
    if (!albumId) {
      return res.status(400).json({ error: 'albumId is required' });
    }

    let query = 'SELECT * FROM photos WHERE album_id = ? ORDER BY id DESC';
    let queryParams = [albumId];

    // אם הפרונטאנד ביקש חלוקה לעמודים (Pagination)
    if (_page && _per_page) {
      const page = parseInt(_page, 10) || 1;
      const limit = parseInt(_per_page, 10) || 3;
      const offset = (page - 1) * limit;

      query += ' LIMIT ? OFFSET ?';
      queryParams.push(limit, offset);
    }

    // שליפת התמונות השייכות לאלבום מהמסד
    const [rows] = await pool.query(query, queryParams);
    
    // מיפוי השדות מפורמט ה-DB (עם קו תחתון) לפורמט ה-React (camelCase)
    const mappedPhotos = rows.map(photo => ({
      id: photo.id,
      albumId: photo.album_id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl
    }));

    res.json(mappedPhotos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /photos - הוספת תמונה חדשה לאלבום (מעודכן ל-UUID!)
router.post('/', async (req, res) => {
  try {
    const { albumId, title, url, thumbnailUrl } = req.body;

    if (!albumId || !title || !url) {
      return res.status(400).json({ error: 'albumId, title, and url are required' });
    }

    const photoId = randomUUID(); // מחולל מזהה מאובטח

    await pool.query(
      'INSERT INTO photos (id, album_id, title, url, thumbnailUrl) VALUES (?, ?, ?, ?, ?)',
      [photoId, albumId, title, url, thumbnailUrl || url]
    );

    const [newPhoto] = await pool.query('SELECT * FROM photos WHERE id = ?', [photoId]);

    res.status(201).json({
      id: newPhoto[0].id,
      albumId: newPhoto[0].album_id,
      title: newPhoto[0].title,
      url: newPhoto[0].url,
      thumbnailUrl: newPhoto[0].thumbnailUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /photos/:id - עדכון פרטי תמונה
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const [result] = await pool.query(
      'UPDATE photos SET title = ? WHERE id = ?',
      [title, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    const [updatedPhoto] = await pool.query('SELECT * FROM photos WHERE id = ?', [id]);

    res.json({
      id: updatedPhoto[0].id,
      albumId: updatedPhoto[0].album_id,
      title: updatedPhoto[0].title,
      url: updatedPhoto[0].url,
      thumbnailUrl: updatedPhoto[0].thumbnailUrl
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /photos/:id - מחיקת תמונה
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM photos WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;