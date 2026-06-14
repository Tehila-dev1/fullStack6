import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import todosRouter from './routes/todos.js';
import postsRouter from './routes/posts.js';
import commentsRouter from './routes/comments.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/todos', todosRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// בדיקה שהשרת עובד
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
