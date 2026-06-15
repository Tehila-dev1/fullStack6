const BASE_URL = 'http://localhost:5000/posts';

//קריאת כל הפוסטים
export const getAllPosts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error loading posts');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//יצירת פוסט חדש
export const addPost = async (post) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    if (!response.ok) throw new Error('Error creating post');
    return await response.json();
  } catch (error) {  
    console.error(error);
    return null;
  }
};

//מחיקת פוסט לפי מזהה (מאובטח - מעביר גם את ה-userId של המבקש)
export const deletePost = async (id, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}?userId=${userId}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting post');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//עדכון פוסט לפי מזהה (מאובטח - ה-userId כבר קיים בתוך אובייקט ה-updatedPost)
export const updatePost = async (id, updatedPost) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost)
    });
    if (!response.ok) throw new Error('Error updating post');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};