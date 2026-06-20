import { useLoaderData } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAlbumsManager } from '../hooks/useAlbumsManager';
import * as albumService from '../services/albumService';
import './AlbumsPage.css';

export const loader = async () => {
  return albumService.getAllAlbums();
};

//דף האלבומים - מציג את כל האלבומים, מאפשר חיפוש, יצירה וכניסה לאלבום לצפייה בתמונות שלו
function AlbumsPage() {
  const { user } = useAuth();
  const initialAlbums = useLoaderData();
  const {
    albums, searchQuery, setSearchQuery, searchCriteria, setSearchCriteria,
    selectedAlbum, setSelectedAlbum, photos, loadMorePhotos, hasMore, 
    handleSelectAlbum, isMyAlbum, addAlbum, addPhoto, deletePhoto, editPhoto
  } = useAlbumsManager(user, initialAlbums);

  return (
    <div className="albums-page">
      {!selectedAlbum ? (
        <div className="albums-browser">
          <div className="albums-header">
            <h1>Community <span>Albums</span></h1>
            <div className="top-bar">
              <div className="search-box">
                <input 
                  placeholder={`Search by ${searchCriteria}...`} 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                />
                <select value={searchCriteria} onChange={e => setSearchCriteria(e.target.value)}>
                  <option value="title">Title</option>
                  <option value="id">ID</option>
                </select>
              </div>
              <button className="add-btn" onClick={addAlbum}>+ New Album</button>
            </div>
          </div>

          <div className="albums-grid">
            {albums.map(album => (
              <div key={album.id} 
                   className={`album-card ${isMyAlbum(album) ? 'mine' : ''}`} 
                   onClick={() => handleSelectAlbum(album)}>
                <span className="album-id">#{album.id}</span>
                <h3 className="p-title">{album.title}</h3>
                {isMyAlbum(album) && <div className="owner-tag">My Album</div>}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* גלריית תמונות */
        <div className="gallery-view">
          <div className="gallery-header">
            <button className="back-btn" onClick={() => setSelectedAlbum(null)}>← Back to Albums</button>
            <h2>{selectedAlbum.title} <small>(#{selectedAlbum.id})</small></h2>
          </div>
          
          <div className="photos-grid">
            {Array.isArray(photos) && photos.length > 0 ? (
              photos.map(photo => (
                <div key={photo.id} className="photo-card">
                  <img src={photo.thumbnailUrl || photo.url} alt={photo.title} loading="lazy" />
                  <p className="photo-title">{photo.title}</p>
                  
                  {isMyAlbum(selectedAlbum) && (
                    <div className="photo-mgmt">
                      <button onClick={() => editPhoto(photo)}>Edit</button>
                      <button className="del" onClick={() => deletePhoto(photo.id)}>Delete</button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="no-data">Loading photos or no photos found...</p>
            )}
          </div>
          
          <div className="gallery-footer">
            {hasMore && (
              <button className="load-more" onClick={loadMorePhotos}>
                Load More Photos
              </button>
            )}
            
            {isMyAlbum(selectedAlbum) && (
              <button className="add-photo-btn" onClick={addPhoto}>
                + Add Photo to Album
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AlbumsPage;