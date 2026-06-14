const BASE_URL = 'http://localhost:5000/albums';

//קריאת כל האלבומים
export const getAllAlbums = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Error loading albums');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//קריאת האלבומים של משתמש מסוים
export const getAlbumsByUserId = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    if (!response.ok) throw new Error('Error loading albums');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

//יצירת אלבום חדש
export const addAlbum = async (album) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(album)
    });
    if (!response.ok) throw new Error('Error creating album');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

//מחיקת אלבום לפי מזהה
export const deleteAlbumById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting album');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//עדכון אלבום לפי מזהה
export const updateAlbumData = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error('Error updating album');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};