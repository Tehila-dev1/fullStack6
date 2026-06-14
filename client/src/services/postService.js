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

//מחיקת פוסט לפי מזהה
export const deletePost = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting post');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//עדכון פוסט לפי מזהה
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