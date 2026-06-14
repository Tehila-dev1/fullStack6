const BASE_URL = 'http://localhost:5000/todos';

// קריאת המשימות של משתמש מסוים
export const getTodosByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    if (!response.ok) throw new Error('Error loading tasks');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// יצירת משימה חדשה
export const addTodo = async (todo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    if (!response.ok) throw new Error('Error creating task');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

// מחיקת משימה לפי מזהה
export const deleteTodo = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting task');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// עדכון משימה לפי מזהה   
export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo)
    });
    if (!response.ok) throw new Error('Error updating task');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};