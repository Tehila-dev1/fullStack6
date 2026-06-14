const BASE_URL = 'http://localhost:5000';

// התחברות של משתמש - מול השרת שלנו
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// רישום של משתמש חדש
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Error creating user');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// בדיקה אם שם המשתמש כבר קיים
export const checkUsernameExists = async (username) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/check-username?username=${username}`);
    if (!response.ok) throw new Error('Error checking username');
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
