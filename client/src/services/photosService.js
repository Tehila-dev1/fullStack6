const BASE_URL = 'http://localhost:5000/photos';

//קריאת התמונות של אלבום מוגבל ל10 תמונות לעמוד
export const getPhotosByAlbum = async (albumId, page = 1, limit = 3) => {
  try {
    const response = await fetch(`${BASE_URL}?albumId=${albumId}&_page=${page}&_per_page=${limit}`);
    if (!response.ok) throw new Error('Error loading photos');
    return await response.json();
  } catch (error) {
    return [];
  }
};

//יצירת תמונה חדשה
export const addPhoto = async (photo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo)
    });
    if (!response.ok) throw new Error('Error creating photo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

//מחיקת תמונה לפי מזהה
export const deletePhoto = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Error deleting photo');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

//עדכון תמונה לפי מזהה
export const updatePhotoData = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    if (!response.ok) throw new Error('Error updating photo');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};