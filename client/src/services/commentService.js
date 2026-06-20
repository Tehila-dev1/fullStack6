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

// commentService.js (ודאי שזה המבנה)
export const deleteCommentById = async (id, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { 
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }) // השרת מקבל את זה עכשיו!
    });
    return response.ok;
  } catch (error) { return false; }
};

export const updateComment = async (id, updatedComment) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedComment) // כאן ה-userId נמצא בתוך updatedComment
    });
    if (!response.ok) throw new Error('Error updating comment');
    return await response.json();
  } catch (error) { return null; }
};