import { createContext, useState, useEffect, useContext} from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // מצב המשתמש הנוכחי

  //מצב טעינה כדי להבטיח שהאפליקציה לא תנסה לגשת למידע המשתמש לפני שהוא נטען
  const [loading, setLoading] = useState(true); 

  //טען את המידע של המשתמש מה-localStorage כאשר האפליקציה מתחילה
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // פונקציה לטיפול בתהליך ההתחברות של המשתמש
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // פונקציה לטיפול בתהליך ההתנתקות של המשתמש
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // אם האפליקציה עדיין בטעינה, הצג הודעת טעינה
  if (loading) return <div>loading...</div>;

  // ספק את המידע של המשתמש והפונקציות לטיפול בהתחברות ובהתנתקות לכל הרכיבים שמקבלים את ההקשר
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 