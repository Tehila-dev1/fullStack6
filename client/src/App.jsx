import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import MainLayout from './layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterDetails from './pages/RegisterDetails';
import HomePage from './pages/HomePage';
import TodosPage from './pages/TodosPage';
import PostsPage from './pages/PostsPage';
import AlbumsPage from './pages/AlbumsPage';

// רכיב שמגן על הנתיבים שדורשים התחברות
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // אם אין משתמש מחובר, הפנה לדף ההתחברות
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} /> 
          <Route path="/register" element={<RegisterPage />} /> 
          <Route path="/register-details" element={<RegisterDetails />} />

          {/* כל הנתיבים שמתחילים ב-/home, /users/:userId/todos, /users/:userId/posts ו-/users/:userId/albums יהיו מוגנים וידרשו התחברות */ }
          <Route 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
           <Route path="/users/:userId/info" element={<HomePage />} />
            <Route path="/users/:userId/todos" element={<TodosPage />} />
            <Route path="/users/:userId/posts" element={<PostsPage />} />
            <Route path="/users/:userId/albums" element={<AlbumsPage />} />
          </Route>
          
          {/* ברירת מחדל, כל נתיב שלא מוגדר יפנה לדף ההתחברות */ }
        <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;