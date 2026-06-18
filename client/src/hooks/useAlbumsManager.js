
import { useState, useEffect } from 'react';
import * as albumService from '../services/albumService';
import * as photosService from '../services/photosService';

/* מנהל האלבומים ותמונות - אחראי על כל הלוגיקה של האלבומים והתמונות, 
כולל טעינת נתונים, הוספה, מחיקה ועריכה
*/
export const useAlbumsManager = (user) => {
  const [albums, setAlbums] = useState([]); //כל האלבומים
  const [searchQuery, setSearchQuery] = useState(''); //חיפוש אלבומים לפי שדה מסוים
  const [searchCriteria, setSearchCriteria] = useState('title'); //ברירת מחדל של חיפוש הוא לפי כותרת
  const [selectedAlbum, setSelectedAlbum] = useState(null); //האלבום שנבחר לצפייה בתמונות שלו
  
  const [photos, setPhotos] = useState([]); //התמונות של האלבום הנבחר
  const [page, setPage] = useState(1); //עמוד הטעינה הנוכחי של התמונות
  const [hasMore, setHasMore] = useState(true); //אם יש עוד תמונות לטעון 

  //טעינת כל האלבומים בעת הרכבת הקומפוננטה
  useEffect(() => {
    albumService.getAllAlbums().then(setAlbums);
  }, []);

  //ניקוי כאשר יצא מהאלבום מאפס את התמונות והעמוד
  useEffect(() => {
    if (!selectedAlbum) {
      setPhotos([]);
      setPage(1);
      setHasMore(true);
    }
  }, [selectedAlbum]);

  //בדיקה אם האלבום שייך למשתמש הנוכחי (תומך גם ב-userId וגם ב-user_id מה-DB)
  const isMyAlbum = (album) => {
    const albumUserId = album?.userId || album?.user_id;
    return String(albumUserId) === String(user?.id);
  };

  // פונקציית עזר בטוחה להמרת מזהים - מטפלת במספרים ובמחרוזות UUID בצורה חלקה
  const getSafeId = (id) => {
    if (id === undefined || id === null) return id;
    return isNaN(id) ? id : Number(id);
  };
  
  //בחירת אלבום לצפייה בתמונות שלו
  const handleSelectAlbum = async (album) => {
    setSelectedAlbum(album);
    setPhotos([]);
    setPage(1);
  
    //טעינת 3 תמונות ראשונות של האלבום הנבחר
    const result = await photosService.getPhotosByAlbum(getSafeId(album.id), 1, 3);
    const actualPhotos = Array.isArray(result) ? result : result.data;
  
    //אם יש תמונות, עדכון הסטייט והגדרת האם יש עוד תמונות לטעינה
    if (actualPhotos) {
      setPhotos(actualPhotos);
      setHasMore(Array.isArray(result) ? actualPhotos.length === 3 : !!result.next);
    }
  };

  //טעינת עוד תמונות כאשר המשתמש מגיע לסוף הרשימה
  const loadMorePhotos = async () => {
    const nextPage = page + 1;
    const result = await photosService.getPhotosByAlbum(getSafeId(selectedAlbum.id), nextPage, 3);
    const actualPhotos = Array.isArray(result) ? result : result.data;

    if (actualPhotos && actualPhotos.length > 0) {
      setPhotos(prev => [...prev, ...actualPhotos]);
      setPage(nextPage);
      setHasMore(Array.isArray(result) ? actualPhotos.length === 3 : !!result.next);
    } else {
      setHasMore(false);
    }
  };

  //הוספת אלבום חדש
  const addAlbum = async () => {
    const title = prompt("Enter new album title:");
    if (!title) return;
    const saved = await albumService.addAlbum({ title, userId: user.id });
    if (saved) setAlbums([saved, ...albums]);
  };

  // הוספת תמונה חדשה לאלבום הנבחר - מתוקן!
  const addPhoto = async () => {
    if (!selectedAlbum) return;

    const title = prompt("Photo Title:");
    // שינוי ברירת המחדל לקישור רנדומלי נקי ללא כוכביות כדי שלא ייכשל בשרת
    const url = prompt("Photo URL:", "https://picsum.photos/id/**/600/600");
    
    if (!title || !url) return;

    // חילוץ מזהה האלבום בצורה בטוחה ומספרית
    const cleanAlbumId = getSafeId(selectedAlbum.id);

    const saved = await photosService.addPhoto({ 
      albumId: cleanAlbumId, 
      title, 
      url, 
      thumbnailUrl: url 
    });
    
    if (saved) {
      // הוספת התמונה החדשה ישירות לראש הרשימה המוצגת
      setPhotos(prev => [saved, ...prev]);
    } else {
      alert("נכשלה הוספת התמונה. בדקי את ה-Console בדפדפן או את הטרמינל של השרת לשגיאות.");
    }
  };

  //מחיקת תמונה
  const deletePhoto = async (id) => {
    if (window.confirm("Delete photo?")) {
      await photosService.deletePhoto(id);
      setPhotos(prev => prev.filter(p => p.id !== id));
    }
  };

  //עריכת כותרת של תמונה
  const editPhoto = async (photo) => {
    const newTitle = prompt("New Title:", photo.title);
    if (newTitle) {
      const updated = await photosService.updatePhotoData(photo.id, { ...photo, title: newTitle });
      if (updated) setPhotos(prev => prev.map(p => p.id === photo.id ? updated : p));
    }
  };

  //סינון האלבומים לפי הקריטריון והשאילתה שהמשתמש הזין
  const filteredAlbums = albums.filter(a => 
    String(a[searchCriteria]).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    albums: filteredAlbums, searchQuery, setSearchQuery, searchCriteria, setSearchCriteria,
    selectedAlbum, setSelectedAlbum, photos, loadMorePhotos, hasMore, handleSelectAlbum,
    isMyAlbum, addAlbum, addPhoto, deletePhoto, editPhoto
  };
};