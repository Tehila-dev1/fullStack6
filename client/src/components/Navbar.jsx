import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // כפתור יציאה מהמערכת וניתוב לדף התחברות
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="top-navbar">
      <div className="nav-links">
       <NavLink to={`/users/${user?.id}/info`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Info</NavLink>
        <NavLink to={`/users/${user?.id}/todos`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Todos</NavLink>
        <NavLink to={`/users/${user?.id}/posts`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Posts</NavLink>
        <NavLink to={`/users/${user?.id}/albums`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Albums</NavLink>
      </div>
      
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;