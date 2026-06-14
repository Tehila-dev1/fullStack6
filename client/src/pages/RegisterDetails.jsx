import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/authService';
import './Auth.css';

//דף פרטים מלאים של המשתמש
function RegisterDetails() {
  //סטייט שמכיל את כל הפרטים הנוספים שהמשתמש צריך למלא כדי להשלים את ההרשמה
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    street: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  //בודק אם יש משתמש זמני שנשמר בלוקל סטורג' מהשלב הקודם של ההרשמה, אם לא - מנטב חזרה לדף הרישום
  useEffect(() => {
    const temp = localStorage.getItem('tempUser');
    if (!temp) {
      navigate('/register');
    }
  }, [navigate]);

  //פונקציה שמעדכנת את הסטייט של הטופס בכל שינוי בשדות הקלט
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //פונקציה שמטפלת בהרשמה
  const handleFinish = async (e) => {
    e.preventDefault();
    
    //יוצר אובייקט בלוקל סטורג'
    const tempUser = JSON.parse(localStorage.getItem('tempUser'));

    const newUser = {
      name: formData.name,
      username: tempUser.username,
      email: formData.email,
      address: {
        street: formData.street,
        suite: "", 
        city: formData.city,
        zipcode: "",
        geo: { lat: "", lng: "" }
      },
      phone: formData.phone,
      website: tempUser.password, 
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    };

    try {
      const createdUser = await registerUser(newUser);
      localStorage.removeItem('tempUser');
      
      login(createdUser);
      navigate('/home');
      
    } catch (error) {
      console.error(error);
      alert('Failed to complete registration. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Complete Profile</h1>
        <p className="auth-subtitle">Please provide your additional details to finish registration.</p>
        
        <form onSubmit={handleFinish} className="auth-form">
          <input 
            name="name"
            type="text" 
            placeholder="Full Name" 
            value={formData.name}
            onChange={handleChange} 
            required 
          />
          <input 
            name="email"
            type="email" 
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange} 
            required 
          />
          <input 
            name="phone"
            type="text" 
            placeholder="Phone Number" 
            value={formData.phone}
            onChange={handleChange} 
            required 
          />
          <input 
            name="city"
            type="text" 
            placeholder="City" 
            value={formData.city}
            onChange={handleChange} 
            required 
          />
          <input 
            name="street"
            type="text" 
            placeholder="Street" 
            value={formData.street}
            onChange={handleChange} 
            required 
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterDetails;