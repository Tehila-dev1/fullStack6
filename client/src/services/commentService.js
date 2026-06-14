const BASE_URL = 'http://localhost:5000/comments';

// קריאת כל התגובות של פוסט מסוים לפי מזהה הפוסט
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}?postId=${postId}`);
    if (!response.ok) throw new Error('Error loading comments');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// קריאת תגובה לפי מזהה
export const addComment = async (comment) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });
    if (!response.ok) throw new Error('Error creating comment');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// מחיקת תגובה לפי מזהה
export const deleteCommentById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting comment');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// עדכון תגובה לפי מזהה
export const updateComment = async (id, updatedComment) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment)
    });
    if (!response.ok) throw new Error('Error updating comment');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};