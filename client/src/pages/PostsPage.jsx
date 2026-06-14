import { useAuth } from '../context/AuthContext';
import { usePostsManager } from '../hooks/usePostsManager';
import './PostsPage.css';

//עמוד הפוסטים יש אפשרות לסנן, לצפות בפוסט להוסיף וכו'
function PostsPage() {
  const { user } = useAuth();
  
  const {
    searchQuery, setSearchQuery, searchCriteria, setSearchCriteria,
    isAdding, setIsAdding, newPost, setNewPost,
    selectedPost, setSelectedPost, comments, setComments, showComments, setShowComments,
    isMyPost, handleAddPost, handleUpdatePost, handleDeletePost,
    handleFetchComments, handleAddComment, handleDeleteComment, handleEditComment,
    filteredPosts
  } = usePostsManager(user);

  return (
    <div className="posts-container">
      <div className="posts-top-bar">
        <div className="search-box">
          <input 
            className="search-input" 
            placeholder={`Search by ${searchCriteria}...`} 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
          <select value={searchCriteria} onChange={e => setSearchCriteria(e.target.value)}>
            <option value="title">Title</option>
            <option value="id">ID</option>
          </select>
        </div>
        <button className="add-btn" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? "Close" : "+ New Post"}
        </button>
      </div>

      {isAdding && (
        <form className="add-form-card" onSubmit={handleAddPost}>
          <input placeholder="Post Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required />
          <textarea placeholder="Post Body" value={newPost.body} onChange={e => setNewPost({...newPost, body: e.target.value})} required />
          <button type="submit">Publish</button>
        </form>
      )}

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div 
            key={post.id} 
            className={`post-card-square ${isMyPost(post) ? 'mine' : ''}`} 
            onClick={() => { setSelectedPost(post); setShowComments(false); setComments([]); }}
          >
            <span className="p-id">#{post.id}</span>
            <h3 className="p-title">{post.title}</h3>
            {isMyPost(post) && <div className="owner-tag">My Post</div>}
          </div>
        ))}
      </div>

      {selectedPost && (
        <div className="modal-overlay" onClick={() => setSelectedPost(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPost(null)}>×</button>
            <div className="modal-header-info">
               <span className="modal-post-id">Post #{selectedPost.id}</span>
               <h2>{selectedPost.title}</h2>
            </div>
            
            <p className="modal-body-text">{selectedPost.body}</p>
            
            <div className="modal-actions">
              <button className="action-btn comm" onClick={handleFetchComments}>
                {showComments ? "Refresh Comments" : "Show Comments"}
              </button>
              
              {isMyPost(selectedPost) && (
                <>
                  <button className="action-btn edit" onClick={() => {
                    const newTitle = prompt("Edit Title:", selectedPost.title);
                    const newBody = prompt("Edit Body:", selectedPost.body);
                    if (newTitle || newBody) {
                      handleUpdatePost(selectedPost.id, {
                        ...selectedPost,
                        title: newTitle || selectedPost.title,
                        body: newBody || selectedPost.body
                      });
                    }
                  }}>Edit</button>
                  <button className="action-btn del" onClick={() => handleDeletePost(selectedPost.id)}>Delete</button>
                </>
              )}
            </div>

            {showComments && (
              <div className="comments-modal-section">
                <h4>Comments</h4>
                <div className="comments-list">
                  {comments.length > 0 ? comments.map(c => (
                    <div key={c.id} className="comment-item">
                      <div className="comm-text"><strong>{c.name}:</strong> {c.body}</div>
                      {c.email === user.email && (
                        <div className="comm-actions">
                          <button onClick={() => handleEditComment(c)}>Edit</button>
                          <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  )) : <p className="no-comments-text">No comments yet.</p>}
                </div>
                <button className="add-comm-modal-btn" onClick={handleAddComment}>+ Write a comment</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostsPage;