-- מחיקת בסיס הנתונים אם הוא קיים כדי להתחיל נקי
DROP DATABASE IF EXISTS project6;

-- יצירת בסיס הנתונים ובחירה בו
CREATE DATABASE project6;
USE project6;

-- יצירת טבלת משתמשים
CREATE TABLE users ( 
    id VARCHAR(36) PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    username VARCHAR(50) NOT NULL UNIQUE, 
    email VARCHAR(100) NOT NULL, 
    phone VARCHAR(20), 
    website VARCHAR(100)
);

-- יצירת טבלת סיסמאות
CREATE TABLE passwords ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת משימות
CREATE TABLE todos ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    completed BOOLEAN DEFAULT FALSE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת פוסטים
CREATE TABLE posts ( 
    id VARCHAR(36) PRIMARY KEY, 
    user_id VARCHAR(36) NOT NULL, 
    title VARCHAR(255) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת תגובות
CREATE TABLE comments ( 
    id VARCHAR(36) PRIMARY KEY, 
    post_id VARCHAR(36) NOT NULL, 
    user_id VARCHAR(36) NOT NULL, 
    name VARCHAR(255) NOT NULL, 
    email VARCHAR(100) NOT NULL, 
    body TEXT, 
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת אלבומים (מאובטח ב-UUID, ללא AUTO_INCREMENT!)
CREATE TABLE albums (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- יצירת טבלת תמונות (מאובטח ב-UUID, ללא AUTO_INCREMENT!)
CREATE TABLE photos (
    id VARCHAR(36) PRIMARY KEY,
    album_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    thumbnailUrl VARCHAR(255) NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- הכנסת נתונים לטבלת משתמשים
INSERT INTO users (id, name, username, email, phone, website) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Leanne Graham', 'Bret', 'sincere@april.biz', '1-770-736-0988', 'hildegard.org'),
('550e8400-e29b-41d4-a716-446655440001', 'Ervin Howell', 'Antonette', 'shanna@melissa.tv', '010-692-6593', 'anastasia.net'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'Clementine Bauch', 'Samantha', 'nathan@yesenia.net', '1-463-123-4447', 'ramiro.info'),
('6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'Patricia Lebsack', 'Karianne', 'julianne@kory.org', '493-170-9623', 'kale.biz'),
('6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'Chelsey Dietrich', 'Kamren', 'lucio@annie.ca', '254-954-1289', 'demarco.info');

-- הכנסת נתונים לטבלת סיסמאות
INSERT INTO passwords (id, user_id, password) VALUES
('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'hildegard.org'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'anastasia.net'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'ramiro.info'),
('6ba7b811-9dad-11d1-80b4-00c04fd430c9', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'kale.biz'),
('6ba7b812-9dad-11d1-80b4-00c04fd430ca', '6ba7b812-9dad-11d1-80b4-00c04fd430ca', 'demarco.info');

-- הכנסת נתונים לטבלת משימות
INSERT INTO todos (id, user_id, title, completed) VALUES
('t-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'delectus aut autem', FALSE), 
('t-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'quis ut nam facilis et officia qui', TRUE),
('t-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'molestiae ipsa aut voluptatibus', TRUE), 
('t-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ullam nobis libero sapiente', TRUE),
('t-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'suscipit repellat esse quibusdam', FALSE);

-- הכנסת נתונים לטבלת פוסטים
INSERT INTO posts (id, user_id, title, body) VALUES
('p-f47ac10b-58cc-0001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sunt aut facere repellat provident', 'quia et suscipit suscipit recusandae'), 
('p-f47ac10b-58cc-0002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'qui est esse', 'est rerum tempore vitae sequi sint nihil'), 
('p-f47ac10b-58cc-0003', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'ea molestias quasi exercitationem', 'et iusto sed quo iure voluptatem'), 
('p-f47ac10b-58cc-0004', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'eum et est occaecati', 'ullam et saepe reiciendis voluptatem'),
('p-550e8400-e29b-0001', '550e8400-e29b-41d4-a716-446655440001', 'et ea vero quia laudantium autem', 'delectus reiciendis molestiae occaecati non minima'),
('p-550e8400-e29b-0002', '550e8400-e29b-41d4-a716-446655440001', 'in quibusdam tempore odit est dolorm', 'itaque id aut magnam praesentium quia et ea'),
('p-550e8400-e29b-0003', '550e8400-e29b-41d4-a716-446655440001', 'dolorum ut in voluptas mollitia', 'aut dicta possimus sint mollitia voluptas commodi'),
('p-550e8400-e29b-0004', '550e8400-e29b-41d4-a716-446655440001', 'voluptatem eligendi optio', 'fuga et accusamus dolorum perferendis illo');

-- הכנסת נתונים לטבלת תגובות
INSERT INTO comments (id, post_id, user_id, name, email, body) VALUES
('c-00000001', 'p-f47ac10b-58cc-0001', '550e8400-e29b-41d4-a716-446655440001', 'id labore ex et quam laborum', 'Eliseo@gardner.biz', 'laudantium enim quasi est quidem magnam'),
('c-00000002', 'p-f47ac10b-58cc-0001', '6ba7b810-9dad-11d1-80b4-00c04fd430c8', 'quo vero reiciendis velit similique earum', 'Jayne_Kuhic@sydney.com', 'est natus enim nihil est dolore omnis'),
('c-00000006', 'p-f47ac10b-58cc-0002', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'et fugit eligendi deleniti quidem qui sint nihil autem', 'Presley.Mueller@myrl.com', 'doloribus at sed quis culpa deserunt'),
('c-00000016', 'p-f47ac10b-58cc-0004', '6ba7b811-9dad-11d1-80b4-00c04fd430c9', 'perferendis temporibus delectus optio ea eum ratione dolorum', 'Christine@ayana.info', 'iste ut laborum aliquid velit facere'),
('c-00000017', 'p-f47ac10b-58cc-0004', '550e8400-e29b-41d4-a716-446655440001', 'eos est animi quis', 'Preston_Hudson@blaise.tv', 'consequatur necessitatibus totam sed sit dolorum');

-- הכנסת נתונים לטבלת אלבומים (שימוש ב-UUID)
INSERT INTO albums (id, user_id, title) VALUES
('a-00000001', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'quidem molestiae enim'),
('a-00000002', 'f47ac10b-58cc-4372-a567-0e02b2c3d479', 'sunt qui excepturi placeat culpa'),
('a-00000003', '550e8400-e29b-41d4-a716-446655440001', 'quam nostrum impedit mollitia quod et dolor'),
('a-00000004', '550e8400-e29b-41d4-a716-446655440001', 'consequatur autem doloribus natus consectetur'),
('a-00000005', '550e8400-e29b-41d4-a716-446655440001', 'ab rerum non rerum consequatur ut ea unde'),
('a-00000006', '550e8400-e29b-41d4-a716-446655440001', 'ducimus molestias eos animi atque nihil'),
('a-00000007', '550e8400-e29b-41d4-a716-446655440001', 'ut pariatur rerum ipsum natus repellendus'),
('a-00000008', '550e8400-e29b-41d4-a716-446655440001', 'Sea');

-- הכנסת נתונים לטבלת תמונות (שימוש ב-UUID ומקושר לאלבומים לעיל)
INSERT INTO photos (id, album_id, title, url, thumbnailUrl) VALUES
('ph-00000001', 'a-00000001', 'accusamus beatae ad facilis cum similique qui sunt', 'https://picsum.photos/id/10/600/600', 'https://picsum.photos/id/10/150/150'),
('ph-00000002', 'a-00000001', 'reprehenderit est deserunt velit ipsam', 'https://picsum.photos/id/11/600/600', 'https://picsum.photos/id/11/150/150'),
('ph-00000003', 'a-00000002', 'non sunt voluptatem placeat consequuntur rem incidunt', 'https://picsum.photos/id/51/600/600', 'https://picsum.photos/id/51/150/150'),
('ph-00000004', 'a-00000002', 'eveniet pariatur quia nobis reiciendis laboriosam ea', 'https://picsum.photos/id/52/600/600', 'https://picsum.photos/id/52/150/150'),
('ph-00000005', 'a-00000002', 'soluta et harum aliquid officiis ab omnis consequatur', 'https://picsum.photos/id/53/600/600', 'https://picsum.photos/id/53/150/150'),
('ph-00000006', 'a-00000003', 'culpa ea consequuntur tempora t voluptas ipsum voluptatem', 'https://picsum.photos/id/548/600/600', 'https://picsum.photos/id/548/150/150'),
('ph-00000007', 'a-00000003', 'repudiandae dolorum corporis unde', 'https://picsum.photos/id/549/600/600', 'https://picsum.photos/id/549/150/150'),
('ph-00000008', 'a-00000004', 'eveniet debitis nihil', 'https://picsum.photos/id/551/600/600', 'https://picsum.photos/id/551/150/150'),
('ph-00000009', 'a-00000004', 'odit culpa optio nesciunt', 'https://picsum.photos/id/552/600/600', 'https://picsum.photos/id/552/150/150'),
('ph-00000010', 'a-00000005', 'dolor delectus nemo quas nobis beatae omnis', 'https://picsum.photos/id/603/600/600', 'https://picsum.photos/id/601/150/150'),
('ph-00000011', 'a-00000006', 'possimus voluptas dolore', 'https://picsum.photos/id/700/600/600', 'https://picsum.photos/id/700/150/150'),
('ph-00000012', 'a-00000007', 'incidunt mollitia ullam et magni', 'https://picsum.photos/id/701/600/600', 'https://picsum.photos/id/701/150/150');