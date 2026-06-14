import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import './MainLayout.css'; 

//קומפוננטת פריסה ראשית שמכילה את הניווט והאזור המרכזי להצגת התוכן של הדפים השונים
function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="layout-container">
      <Navbar />
      <div className="content-area">
        <header className="user-header">
          <h2>Hello, {user?.name}</h2>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;