import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

//דף הבית - מציג ברוך הבא למשתמש ומאפשר הצגת פרטי החשבון שלו בלחיצה על כפתור
function HomePage() {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false); 

  if (!user) return null;

  return (
    <div className="home-container">
      <section className="welcome-hero">
        <h1>Welcome, <span>{user.name}</span>!</h1>
        <p>You are now logged into your personal dashboard.</p>
        
        <button 
          className={`toggle-info-btn ${showInfo ? 'active' : ''}`} 
          onClick={() => setShowInfo(!showInfo)}
        >
          {showInfo ? 'Hide My Profile' : 'Show My Profile'}
        </button>
      </section>

      {showInfo && (
        <div className="profile-details-card">
          <div className="card-header">
            <i className="fa-solid fa-id-card"></i>
            <h2>Account Information</h2>
          </div>
          
          <div className="details-grid">
            <div className="detail-item">
              <label>Full Name</label>
              <p>{user.name}</p>
            </div>
            <div className="detail-item">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
            <div className="detail-item">
              <label>Username</label>
              <p>{user.username}</p>
            </div>
            <div className="detail-item">
              <label>Phone</label>
              <p>{user.phone}</p>
            </div>
            {user.address && (
              <div className="detail-item full-width">
                <label>Address</label>
                <p>{user.address.street}, {user.address.city}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;