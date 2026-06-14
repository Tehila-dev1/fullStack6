import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { checkUsernameExists } from '../services/authService';
import './Auth.css'; 

//עמוד רישום התחלתי
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const navigate = useNavigate();

  //בודק אם הסיסמאות תואמות ואם השם משתמש כבר קיים
  const handleNext = async (e) => {
    e.preventDefault();

    if (password !== verifyPassword) {
      return alert('Passwords do not match!');
    }

    try {
      const isExists = await checkUsernameExists(username);

      if (isExists) {
        return alert('Username already exists! Please choose another one.');
      }

      const tempUser = { username, password };
      localStorage.setItem('tempUser', JSON.stringify(tempUser));
      
      navigate('/register-details');
      
    } catch (error) {
      alert('Error connecting to the server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>
        <form onSubmit={handleNext} className="auth-form">
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
          <input 
            type="password" 
            placeholder="Verify Password" 
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)} 
            required 
          />
          <button type="submit">Next Step</button>
        </form>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;