import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import MainLayout from './layout/MainLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterDetails from './pages/RegisterDetails';
import HomePage from './pages/HomePage';
import TodosPage, { todosLoader } from './pages/TodosPage'; // הוספת הייבוא של ה-loader
import PostsPage, { loader as postsLoader } from './pages/PostsPage';
import AlbumsPage, { loader as albumsLoader } from './pages/AlbumsPage';

// רכיב שמגן על הנתיבים שדורשים התחברות
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  // אם אין משתמש מחובר, הפנה לדף ההתחברות
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/register-details',
    element: <RegisterDetails />,
  },
  {
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/users/:userId/info',
        element: <HomePage />,
      },
      {
        path: '/users/:userId/todos',
        element: <TodosPage />,
        loader: todosLoader, // חיבור ה-loader למשימות
      },
      {
        path: '/users/:userId/posts',
        element: <PostsPage />,
        loader: postsLoader,
      },
      {
        path: '/users/:userId/albums',
        element: <AlbumsPage />,
        loader: albumsLoader,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;