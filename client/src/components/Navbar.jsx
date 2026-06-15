import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  //כפתור יציאה מהמערכת
  const { user, logout } = useAuth();

  return (
    <nav className="top-navbar">
      <div className="nav-links">
       <NavLink to={`/users/${user?.id}/info`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Info</NavLink>
        <NavLink to={`/users/${user?.id}/todos`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Todos</NavLink>
        <NavLink to={`/users/${user?.id}/posts`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Posts</NavLink>
        <NavLink to={`/users/${user?.id}/albums`} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>Albums</NavLink>
      </div>
      
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;