import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { loginUser } from '../services/authService';
import './Auth.css';

//דף התחברות
function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  //מנסה להתחבר ואם מצליח מנטב לדף הבית
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginUser(username, password);

      if (user) {
        login(user);
        navigate('/home');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      alert('Error connecting to the server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <form onSubmit={handleLogin} className="auth-form">
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account yet? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;