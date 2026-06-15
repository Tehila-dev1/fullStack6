import { useState, useEffect } from 'react';
import * as postService from '../services/postService';
import * as commentService from '../services/commentService';

/* אחראי על כל הלוגיקה של הפוסטים והתגובות,
כולל טעינת נתונים, הוספה, מחיקה ועריכה 
 */
export const usePostsManager = (user) => {
  const [posts, setPosts] = useState([]); //כל הפוסטים
  const [searchQuery, setSearchQuery] = useState(''); //חיפוש פוסטים לפי שדה מסוים
  const [searchCriteria, setSearchCriteria] = useState('title'); //ברירת מחדל של חיפוש הוא לפי כותרת
  const [isAdding, setIsAdding] = useState(false); //מצב האם נמצא בתהליך הוספת פוסט חדש
  const [newPost, setNewPost] = useState({ title: '', body: '' }); //נתוני הפוסט החדש שנוצר

  const [selectedPost, setSelectedPost] = useState(null); //הפוסט שנבחר לצפייה בתגובות שלו
  const [comments, setComments] = useState([]); //התגובות של הפוסט הנבחר
  const [showComments, setShowComments] = useState(false); //מצב האם להציג את התגובות או לא

  //טעינת כל הפוסטים בעת הרכבת הקומפוננטה
  useEffect(() => {
    loadPosts();
  }, []);

  //פונקציה לטעינת כל הפוסטים מהשרת והצגתם בסדר הפוך (החדשים ביותר ראשונים)
  const loadPosts = async () => {
    const data = await postService.getAllPosts();
    setPosts(data.reverse());
  };

  const isMyPost = (post) => String(post.userId) === String(user.id); //בדיקה אם הפוסט שייך למשתמש הנוכחי

  //פונקציה עזר שמוודאת שה-id הוא מספר לפני השימוש בו, כדי למנוע שגיאות עם id שאינו מספרי
  const getSafeId = (id) => {
    return isNaN(id) ? id : Number(id);
  };

  //הוספת פוסט חדש
  const handleAddPost = async (e) => {
    e.preventDefault();
    const saved = await postService.addPost({ ...newPost, userId: user.id });
    if (saved) {
      setPosts([saved, ...posts]);
      setNewPost({ title: '', body: '' });
      setIsAdding(false);
    }
  };

  //עדכון פוסט קיים
  const handleUpdatePost = async (postId, updatedData) => {
    const updated = await postService.updatePost(postId, updatedData);
    if (updated) {
      setPosts(posts.map(p => p.id === postId ? updated : p));
      setSelectedPost(updated);
    }
  };

  //מחיקת פוסט
  const handleDeletePost = async (postId) => {
    if (window.confirm("Delete Post?")) {
      // הוספנו את user.id לקריאה לשרת כדי לאמת בעלות!
      await postService.deletePost(postId, user.id); 
      setPosts(posts.filter(p => p.id !== postId));
      setSelectedPost(null);
    }
  };

  //טעינת התגובות של הפוסט הנבחר והצגתם
  const handleFetchComments = async () => {
    const safeId = getSafeId(selectedPost.id);
    const data = await commentService.getCommentsByPostId(safeId);
    setComments(data);
    setShowComments(true);
  };

  //הוספת תגובה חדשה לפוסט הנבחר
  const handleAddComment = async () => {
    const text = prompt("Your comment:");
    if (!text) return;
    const commentData = {
      postId: getSafeId(selectedPost.id),
      name: user.name,
      email: user.email,
      body: text
    };
    const saved = await commentService.addComment(commentData);
    if (saved) setComments([...comments, saved]);
  };

  //מחיקת תגובה
  const handleDeleteComment = async (id) => {
    if (window.confirm("Delete comment?")) {
      await commentService.deleteCommentById(id);
      setComments(comments.filter(c => c.id !== id));
    }
  };

  //עריכת תגובה
  const handleEditComment = async (comment) => {
    const newText = prompt("Edit comment:", comment.body);
    if (newText) {
      const updated = await commentService.updateComment(comment.id, { ...comment, body: newText });
      setComments(comments.map(c => c.id === comment.id ? updated : c));
    }
  };

  //סינון הפוסטים לפי הקריטריון והשאילתה שהמשתמש הזין
  const filteredPosts = posts.filter(p => {
    const valueToSearch = String(p[searchCriteria]).toLowerCase();
    return valueToSearch.includes(searchQuery.toLowerCase());
  });

  return {
    posts, searchQuery, setSearchQuery, searchCriteria, setSearchCriteria,
    isAdding, setIsAdding, newPost, setNewPost,
    selectedPost, setSelectedPost, comments, setComments, showComments, setShowComments,
    isMyPost, handleAddPost, handleUpdatePost, handleDeletePost,
    handleFetchComments, handleAddComment, handleDeleteComment, handleEditComment,
    filteredPosts
  };
};