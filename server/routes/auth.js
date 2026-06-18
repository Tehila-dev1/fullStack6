import express from 'express';
import pool from '../db.js';

const router = express.Router();

// POST /auth/login - התחברות
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // שליפת נתוני המשתמש (ללא סיסמה, כי היא בטבלה נפרדת)
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    // יצירת עותק של המשתמש כדי לא לשנות את המידע המקורי מהמסד
    const user = { ...users[0] }; 
    
    // שליפת הסיסמה מהטבלה הנפרדת לבדיקה בלבד
    const [passwords] = await pool.query('SELECT * FROM passwords WHERE user_id = ?', [user.id]);
    
    if (passwords.length === 0 || passwords[0].password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // סעיף א' - הסתרת הסיסמה:
    // מוודאים שאפילו אם מישהו יוסיף בטעות סיסמה לאובייקט בעתיד, היא תימחק לפני השליחה ללקוח
    delete user.password; 

    // שליחת האובייקט הנקי והבטוח לדפדפן
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