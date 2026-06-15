import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { loginUser } from '../services/authService';
import './Auth.css';

// דף התחברות
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // מנסה להתחבר ואם מצליח מנתב לדף הבית
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await loginUser(username, password);

      if (user) {
        login(user);
        navigate(`/users/${user.id}/info`);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Error connecting to the server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          {/* תצוגת שגיאה במידה ויש */}
          {error && <p className="error-message">{error}</p>}
          
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
            disabled={loading}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account yet? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;